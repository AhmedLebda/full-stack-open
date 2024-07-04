const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app.cjs");
const api = supertest(app);
// db
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// Models
const Blog = require("../models/blog.cjs");
const User = require("../models/user.cjs");
const Comment = require("../models/comment.cjs");
// Helpers
const authHelper = require("../utils/auth_helper.cjs");
const blogApiHelper = require("../utils/test_helpers/blog_api_helper.cjs");
const { listWithSeveralBlogs } = require("./blogsData.cjs");

// Just a different color to make my console logs more clear in the terminal
const LOG_COLOR = "\x1b[35m";

// Access Token
let token = null;
let createdUserId = null;
let firstBlogId = null;

// ## Reset the db before every test ## //
beforeEach(async () => {
    console.log(LOG_COLOR, "############################################");
    console.log(LOG_COLOR, "=====> resetting db...");

    console.log(LOG_COLOR, "=====> Resetting Users collection");
    await User.deleteMany({});
    const user = new User({
        username: "root",
        password: "UA0FYIgXIYSp2K",
        name: "super user",
    });
    user.password = await bcrypt.hash(user.password, 10);
    const createdUser = await user.save();
    createdUserId = createdUser._id;
    console.log(LOG_COLOR, `=====>user ${user.name} is created!`);

    console.log(LOG_COLOR, "=====> Logging in.... (creating access token)");
    token = authHelper.createAccessToken({
        username: createdUser.username,
        id: createdUser._id,
    });

    console.log(LOG_COLOR, "=====> Resetting Blogs collection");
    await Blog.deleteMany({});
    const blogPromises = listWithSeveralBlogs.map((blog) => {
        const createdBlog = new Blog({ ...blog, user: createdUserId });
        return createdBlog.save();
    });
    const blogsList = await Promise.all(blogPromises);
    firstBlogId = blogsList[0]._id;

    console.log(LOG_COLOR, "=====> Resetting Comments collection");
    await Comment.deleteMany({});
    let commentPromises = [];
    for (let blog of blogsList) {
        const createdComment = new Comment({
            content: `comment for: ${blog.title}`,
            blog: blog._id,
            user: createdUserId,
        });
        commentPromises.push(createdComment.save());
    }
    await Promise.all(commentPromises);

    console.log(LOG_COLOR, "############################################");
});

describe("api responds correctly", () => {
    test("Comments are returned as json", async () => {
        await api
            .get(`/api/blogs/${firstBlogId}/comments`)
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test("First blog have only one comment", async () => {
        const response = await api.get(`/api/blogs/${firstBlogId}/comments`);
        assert.strictEqual(response.body.length, 1);
    });
});

describe("comments are created correctly", () => {
    test("Valid comment can be added successfully", async () => {
        const comment = {
            content: "this is a test comment",
            blogId: firstBlogId,
        };

        await api
            .post(`/api/blogs/${firstBlogId}/comments`)
            .send(comment)
            .set({ Authorization: `Bearer ${token}` })
            .expect(201)
            .expect("Content-Type", /json/);
        const response = await api.get(`/api/blogs/${firstBlogId}/comments`);
        assert.strictEqual(response.body.length, 2);
    });

    test("Invalid comment can't be added", async () => {
        const comment = {
            blogId: firstBlogId,
        };

        await api
            .post(`/api/blogs/${firstBlogId}/comments`)
            .send(comment)
            .set({ Authorization: `Bearer ${token}` })
            .expect(400)
            .expect("Content-Type", /json/);
        const response = await api.get(`/api/blogs/${firstBlogId}/comments`);
        assert.strictEqual(response.body.length, 1);
    });

    test("Can't create a comment with invalid token", async () => {
        const comment = {
            content: "this is a test comment",
            blogId: firstBlogId,
        };

        await api
            .post(`/api/blogs/${firstBlogId}/comments`)
            .send(comment)
            .set({ Authorization: `Bearer Invalid Token` })
            .expect(401)
            .expect("Content-Type", /json/);
        const response = await api.get(`/api/blogs/${firstBlogId}/comments`);
        assert.strictEqual(response.body.length, 1);
    });
});

// ## Close the db connection after running all tests ## //
after(async () => {
    await mongoose.connection.close();
    console.log(LOG_COLOR, "MongoDB connection closed.");
});

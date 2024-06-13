const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app.cjs");
const Blog = require("../models/blog.cjs");
const User = require("../models/user.cjs");
const { listWithSeveralBlogs } = require("./blogsData.cjs");
const blogApiHelper = require("../utils/test_helpers/blog_api_helper.cjs");
const bcrypt = require("bcrypt");
const api = supertest(app);
const authHelper = require("../utils/auth_helper.cjs");

// Just a different color to make my console logs more clear ini the terminal
const LOG_COLOR = "\x1b[35m";

// Access Token
let token = null;
let createdUserId = null;

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
    const access_token = authHelper.createAccessToken({
        username: createdUser.username,
        id: createdUser._id,
    });
    token = access_token;

    console.log(LOG_COLOR, "=====> Resetting Blogs collection");
    await Blog.deleteMany({});
    const blogPromises = listWithSeveralBlogs.map((blog) => {
        const createdBlog = new Blog({ ...blog, user: createdUserId });
        return createdBlog.save();
    });
    await Promise.all(blogPromises);
    console.log(LOG_COLOR, "############################################");
});

describe("api responds correctly", () => {
    test("blogs are returned as json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test("there are six blogs", async () => {
        const response = await api.get("/api/blogs");
        assert.strictEqual(response.body.length, 6);
    });

    test("first blog title is 'first blog'", async () => {
        const response = await api.get("/api/blogs");
        const firstBlogTitle = response.body[0].title;
        assert.strictEqual(firstBlogTitle, "React patterns");
    });

    test("unique identifier property of the blog posts is named id", async () => {
        const blogs = await blogApiHelper.blogsInDb();

        blogs.forEach((blog) => {
            assert(Object.keys(blog).includes("id"));
        });
    });
});

describe("posts are created correctly", () => {
    test("A valid blog can be added to db", async () => {
        const blog = {
            title: "result sense",
            url: "http://zun.nr/kilwogsez",
            likes: 110,
        };
        await api
            .post("/api/blogs")
            .send(blog)
            .set({ Authorization: `Bearer ${token}` })
            .expect(201)
            .expect("Content-Type", /json/);
        const blogsInDb = await blogApiHelper.blogsInDb();
        assert.strictEqual(blogsInDb.length, listWithSeveralBlogs.length + 1);
    });

    test("Invalid blog data can't be added to db", async () => {
        const blog = {};
        await api
            .post("/api/blogs")
            .send(blog)
            .set({ Authorization: `Bearer ${token}` })
            .expect(400);

        const blogsInDb = await blogApiHelper.blogsInDb();

        assert.strictEqual(blogsInDb.length, listWithSeveralBlogs.length);
    });

    test("Can't create a post with Invalid token", async () => {
        const blog = {
            title: "result sense",
            url: "http://zun.nr/kilwogsez",
        };

        await api
            .post("/api/blogs")
            .send(blog)
            .set({ Authorization: `Bearer invalidToken` })
            .expect(401);

        const blogsInDb = await blogApiHelper.blogsInDb();

        assert.strictEqual(blogsInDb.length, listWithSeveralBlogs.length);
    });

    test("Blog without likes specified will default to 0", async () => {
        const blog = {
            title: "result sense",
            url: "http://zun.nr/kilwogsez",
        };

        const response = await api
            .post("/api/blogs")
            .send(blog)
            .set({ Authorization: `Bearer ${token}` })
            .expect(201)
            .expect("Content-Type", /json/);

        assert.strictEqual(response.body.likes, 0);
    });
});

describe("Post Delete", () => {
    test("succeeds with status code 200 if id is valid", async () => {
        const initialPosts = await blogApiHelper.blogsInDb();

        const firstPost = initialPosts[0];

        await api
            .delete(`/api/blogs/${firstPost.id}`)
            .set({ Authorization: `Bearer ${token}` })
            .expect(200);

        const postsAfterDeletion = await blogApiHelper.blogsInDb();
        assert.strictEqual(postsAfterDeletion.length, initialPosts.length - 1);
    });

    test("fails if id is invalid", async () => {
        const initialPosts = await blogApiHelper.blogsInDb();

        const invalidId = await blogApiHelper.nonExistingId();

        console.log(invalidId);

        await api
            .delete(`/api/blogs/${invalidId}`)
            .set({ Authorization: `Bearer ${token}` })
            .expect(404);

        const postsAfterDeletion = await blogApiHelper.blogsInDb();

        assert.strictEqual(postsAfterDeletion.length, initialPosts.length);
    });
});

describe("Post Update", async () => {
    test("succeeds with status code 200 if id is valid", async () => {
        const initialPosts = await blogApiHelper.blogsInDb();
        const firstPost = initialPosts[0];
        firstPost.likes = 1010;

        await api
            .put(`/api/blogs/${firstPost.id}`)
            .set({ Authorization: `Bearer ${token}` })
            .send(firstPost)
            .expect(200);
        const postsAfterUpdate = await blogApiHelper.blogsInDb();
        const firstPostAfterUpdate = postsAfterUpdate[0];

        assert.strictEqual(firstPostAfterUpdate.likes, 1010);
    });
});

// ## Close the db connection after running all tests ## //
after(async () => {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
});

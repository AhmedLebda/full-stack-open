const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app.cjs");
const Blog = require("../models/blog.cjs");
const { listWithSeveralBlogs } = require("./blogsData.cjs");
const blogApiHelper = require("../utils/test_helpers/blog_api_helper.cjs");

const api = supertest(app);

// ## Reset the db before every test ## //
beforeEach(async () => {
    console.log("resetting db...");
    await Blog.deleteMany({});
    const blogPromises = listWithSeveralBlogs.map((blog) => {
        const createdBlog = new Blog(blog);
        return createdBlog.save();
    });
    await Promise.all(blogPromises);
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

    test("Blog without likes specified will default to 0", async () => {
        const blog = {
            title: "result sense",
            userId: "6669cc536a0fc550bda2de5c",
            url: "http://zun.nr/kilwogsez",
        };

        const response = await api
            .post("/api/blogs")
            .send(blog)
            .expect(201)
            .expect("Content-Type", /json/);

        assert.strictEqual(response.body.likes, 0);
    });
});

describe("posts are created correctly", () => {
    test("A valid blog can be added to db", async () => {
        const blog = {
            title: "result sense",
            userId: "6669cc536a0fc550bda2de5c",
            url: "http://zun.nr/kilwogsez",
            likes: 110,
        };
        await api
            .post("/api/blogs")
            .send(blog)
            .expect(201)
            .expect("Content-Type", /json/);
        const blogsInDb = await blogApiHelper.blogsInDb();
        assert.strictEqual(blogsInDb.length, listWithSeveralBlogs.length + 1);
    });

    test("Invalid blog can't be added to db", async () => {
        const blog = {};
        await api.post("/api/blogs").send(blog).expect(400);

        const blogsInDb = await blogApiHelper.blogsInDb();

        assert.strictEqual(blogsInDb.length, listWithSeveralBlogs.length);
    });
});

describe("Post Delete", () => {
    test("succeeds with status code 200 if id is valid", async () => {
        const initialPosts = await blogApiHelper.blogsInDb();

        const firstPost = initialPosts[0];

        await api.delete(`/api/blogs/${firstPost.id}`).expect(200);

        const postsAfterDeletion = await blogApiHelper.blogsInDb();
        assert.strictEqual(postsAfterDeletion.length, initialPosts.length - 1);
    });

    test("fails if id is invalid", async () => {
        const initialPosts = await blogApiHelper.blogsInDb();

        const invalidId = await blogApiHelper.nonExistingId();

        console.log(invalidId);

        await api.delete(`/api/blogs/${invalidId}`).expect(400);

        const postsAfterDeletion = await blogApiHelper.blogsInDb();

        assert.strictEqual(postsAfterDeletion.length, initialPosts.length);
    });
});

describe("Post Update", async () => {
    test("succeeds with status code 204 if id is valid", async () => {
        const initialPosts = await blogApiHelper.blogsInDb();
        const firstPost = initialPosts[0];
        firstPost.likes = 1010;

        const response = await api
            .put(`/api/blogs/${firstPost.id}`)
            .send(firstPost)
            .expect(204);
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

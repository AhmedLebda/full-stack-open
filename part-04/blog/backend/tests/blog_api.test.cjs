const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app.cjs");
const Blog = require("../models/blog.cjs");
const { listWithSeveralBlogs } = require("./blogsData.cjs");
const blogApiHelper = require("../utils/test_helpers/blog_api_helper.cjs");

const api = supertest(app);

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

test("A valid blog can be added", async () => {
    const blog = {
        title: "result sense",
        author: "Gregory Ward",
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

test("Invalid blog can't be added", async () => {
    const blog = {};
    await api.post("/api/blogs").send(blog).expect(400);

    const blogsInDb = await blogApiHelper.blogsInDb();

    assert.strictEqual(blogsInDb.length, listWithSeveralBlogs.length);
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
        author: "Gregory Ward",
        url: "http://zun.nr/kilwogsez",
    };
    await api
        .post("/api/blogs")
        .send(blog)
        .expect(201)
        .expect("Content-Type", /json/);
    const blogsInDb = await blogApiHelper.blogsInDb();
    const createdBlog = blogsInDb[blogsInDb.length - 1];
    assert.strictEqual(createdBlog.likes, 0);
});

beforeEach(async () => {
    console.log("resetting db...");
    await Blog.deleteMany({});
    const blogPromises = listWithSeveralBlogs.map((blog) => {
        const createdBlog = new Blog(blog);
        return createdBlog.save();
    });
    await Promise.all(blogPromises);
});

after(async () => {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
});

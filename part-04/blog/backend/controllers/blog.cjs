const Blog = require("../models/blog.cjs");

const blogs_list = async (req, res, next) => {
    const blogs = await Blog.find({});
    res.json(blogs);
};

const blog_create = async (req, res, next) => {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
};

module.exports = { blogs_list, blog_create };

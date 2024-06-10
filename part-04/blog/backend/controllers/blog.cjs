const Blog = require("../models/blog.cjs");

const blogs_list = async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.json(blogs);
    } catch (error) {
        next(error);
    }
};

const blog_create = async (req, res) => {
    try {
        const blog = new Blog(req.body);
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        next(error);
    }
};

module.exports = { blogs_list, blog_create };

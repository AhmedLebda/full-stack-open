const Blog = require("../models/blog.cjs");
const User = require("../models/user.cjs");

const blogs_list = async (req, res) => {
    const blogs = await Blog.find({}).populate("user", {
        password: 0,
        posts: 0,
        __v: 0,
    });
    res.json(blogs);
};

const blog_create = async (req, res) => {
    const { title, url } = req.body;
    const userId = req.userId;

    const blog = new Blog({ title, url, user: userId });

    const createdBlog = await blog.save();

    const user = await User.findByIdAndUpdate(userId, {
        $push: { posts: createdBlog._id },
    });

    res.status(201).json(blog);
};

const blog_detail = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        throw Error("This blog doesn't exist");
    }
    res.json(blog);
};

const blog_delete = async (req, res) => {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
        throw Error("This post is already deleted");
    }

    res.status(200).json(deletedBlog);
};

const blog_update = async (req, res) => {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        context: "query",
    });

    if (!updatedBlog) {
        throw Error("This post doesn't exist");
    }

    res.status(204).json(updatedBlog);
};

module.exports = {
    blogs_list,
    blog_create,
    blog_detail,
    blog_delete,
    blog_update,
};

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

    const savedBlog = await blog.save();

    const createdBlog = await Blog.findById(savedBlog._id).populate("user", {
        password: 0,
        posts: 0,
        __v: 0,
    });

    await User.findByIdAndUpdate(userId, {
        $push: { posts: savedBlog._id },
    });

    res.status(201).json(createdBlog);
};

const blog_detail = async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("user", {
        password: 0,
        posts: 0,
        __v: 0,
    });
    if (!blog) {
        throw Error("This blog doesn't exist");
    }
    res.json(blog);
};

const blog_delete = async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
    }

    if (blog.user.toJSON() === req.userId) {
        await blog.deleteOne();
        res.status(200).json(blog);
    } else {
        res.status(401).json({ error: "only author can delete this blog" });
    }
};

const blog_update = async (req, res) => {
    const { title } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
    }

    if (blog.user.toJSON() === req.userId) {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, $inc: { likes: 1 } },
            {
                new: true,
                runValidators: true,
                context: "query",
            }
        ).populate("user", {
            password: 0,
            posts: 0,
            __v: 0,
        });
        res.status(200).json(updatedBlog);
    } else {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            {
                new: true,
                runValidators: true,
                context: "query",
            }
        ).populate("user", {
            password: 0,
            posts: 0,
            __v: 0,
        });
        res.status(200).json(updatedBlog);
    }
};

module.exports = {
    blogs_list,
    blog_create,
    blog_detail,
    blog_delete,
    blog_update,
};

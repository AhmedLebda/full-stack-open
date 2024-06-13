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
    const { title, likes } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
    }

    if (blog.user.toJSON() === req.userId) {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
                context: "query",
            }
        );
        res.status(200).json(updatedBlog);
    } else {
        res.status(401).json({ error: "only author can update this blog" });
    }
};

module.exports = {
    blogs_list,
    blog_create,
    blog_detail,
    blog_delete,
    blog_update,
};

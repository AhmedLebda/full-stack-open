const Blog = require("../../models/blog.cjs");
const User = require("../../models/user.cjs");

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
};

const nonExistingId = async () => {
    const blog = new Blog({
        title: "mood saw",
        user: "6669cc536a0fc550bda2de5c",
        url: "http://rugul.mh/joig",
    });
    await blog.save();
    await blog.deleteOne();
    return blog._id.toString();
};

const usersInDb = async () => {
    const users = await User.find({});
    return users.map((user) => user.toJSON());
};

module.exports = { blogsInDb, nonExistingId, usersInDb };

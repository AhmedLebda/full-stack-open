const Blog = require("../../models/blog.cjs");

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
};

module.exports = { blogsInDb };

const Blog = require("../../models/blog.cjs");

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
};

const nonExistingId = async () => {
    const blog = new Blog({
        title: "mood saw",
        author: "Christian Floyd",
        url: "http://rugul.mh/joig",
    });
    await blog.save();
    await blog.deleteOne();

    return blog._id.toString();
};

module.exports = { blogsInDb, nonExistingId };

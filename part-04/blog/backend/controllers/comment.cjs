const Comment = require("../models/comment.cjs");

const comments_list = async (req, res) => {
    const blogId = req.params.blogId;
    const blogComments = await Comment.find(
        { blog: blogId },
        { blog: 0 }
    ).populate("user", {
        password: 0,
        posts: 0,
        createdAt: 0,
        updatedAt: 0,
    });
    res.status(200).json(blogComments);
};

const comment_create = async (req, res) => {
    const { content, blogId } = req.body;
    const userId = req.userId;
    const comment = new Comment({ content, user: userId, blog: blogId });
    const createdComment = await comment.save();

    res.status(201).json(createdComment);
};

module.exports = { comments_list, comment_create };

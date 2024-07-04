const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, "Can't add an empty comment"],
            maxLength: [300, "Comment is too long"],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "user is required"],
        },
        blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog",
            required: [true, "Comment must be associated with a blog"],
        },
        likes: {
            type: Number,
            min: [0, "likes can't be less than 0"],
            default: 0,
        },
    },
    { timestamps: true }
);

commentSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("Comment", commentSchema);

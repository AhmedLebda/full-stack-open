const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            minLength: [3, "username is too short"],
            maxLength: [30, "username is too long"],
            required: [true, "Please enter a username"],
            unique: [true, "This username already exists"],
            trim: true,
        },
        password: {
            type: String,
            minLength: [6, "password is too short"],
            required: [true, "Please enter a password"],
        },
        name: {
            type: String,
            minLength: [3, "name is too short"],
            maxLength: [30, "name is too long"],
            required: [true, "Please enter a name"],
        },
        posts: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Blog",
        },
    },
    { timestamps: true }
);

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject._password;
    },
});

module.exports = mongoose.model("User", userSchema);

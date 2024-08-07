const User = require("../models/user.cjs");
const authHelper = require("../utils/auth_helper.cjs");

const users_list = async (req, res) => {
    const users = await User.find({}, { name: 1, posts: 1 }).populate("posts", {
        user: 0,
    });
    res.json(users);
};
const user_detail = async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne(
        { _id: id },
        { name: 1, posts: 1 }
    ).populate("posts", {
        user: 0,
    });
    res.json(user);
};

const user_create = async (req, res) => {
    const { username, password, name } = req.body;

    if (password?.length < 6) {
        throw Error("Password is too short");
    }

    const hashedPassword = await authHelper.generateHashedPassword(password);

    const user = new User({ username, password: hashedPassword, name });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
};

const user_login = async (req, res) => {
    const { username, password } = req.body;

    const user = await authHelper.login(username, password);

    const token = authHelper.createAccessToken({
        username: user.username,
        id: user._id,
    });

    res.json({
        access_token: token,
        username: user.username,
        name: user.name,
        id: user.id,
    });
};

module.exports = { users_list, user_create, user_login, user_detail };

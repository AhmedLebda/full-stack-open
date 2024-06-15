const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("./config.cjs");
const User = require("../models/user.cjs");

const generateHashedPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
};

const createAccessToken = (payload) => {
    return jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
    });
};

const verifyAccessToken = (token) => {
    return jwt.verify(token, config.ACCESS_TOKEN_SECRET);
};

const login = async (username, password) => {
    if (!username || !password) throw Error("Invalid username or password");

    const user = await User.findOne({ username });

    if (!user) {
        throw Error("Invalid username or password");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        throw Error("Invalid username or password");
    }

    return user;
};

const getBearerToken = (req) => {
    const authorization = req.get("authorization");

    if (authorization && authorization.startsWith("Bearer ")) {
        return authorization.replace("Bearer ", "");
    }
    return null;
};

module.exports = {
    generateHashedPassword,
    createAccessToken,
    verifyAccessToken,
    login,
    getBearerToken,
};

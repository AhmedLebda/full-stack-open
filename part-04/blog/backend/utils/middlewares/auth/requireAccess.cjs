const AuthHelper = require("../../auth_helper.cjs");

const requireAccessToken = (req, res, next) => {
    const token = AuthHelper.getBearerToken(req);

    const decodedToken = AuthHelper.verifyAccessToken(token);

    if (!decodedToken.id) {
        return res.status(401).json({ error: "invalid token" });
    }

    req.userId = decodedToken.id;
    next();
};

module.exports = requireAccessToken;

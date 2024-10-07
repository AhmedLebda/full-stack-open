const { User } = require("../../models/index");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../../util/config");

const requireAuth = async (req, res, next) => {
	const authorization = req.get("authorization");
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		try {
			const decodedToken = jwt.verify(authorization.substring(7), SECRET);
			const user = await User.findByPk(decodedToken.id);
			if (!user) return res.status(403).json({ error: "user not found" });

			if (user.disabled) {
				response.status(401).json({
					error: "account disabled, please contact admin",
				});
				return;
			}

			req.user = user;
			next();
		} catch {
			res.status(401).json({ error: "token invalid" });
		}
	} else {
		res.status(401).json({ error: "token missing" });
	}
};

module.exports = requireAuth;

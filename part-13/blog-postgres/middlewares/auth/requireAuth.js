const jwt = require("jsonwebtoken");
const { User } = require("../../models/index");
const { JWT_SECRET } = require("../../util/config");
const { AssociatedDataError, JwtError } = require("../../util/error_classes");

const requireAuth = async (req, _res, next) => {
	const authorization = req.get("authorization");
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		try {
			const token = authorization.substring(7);
			const decodedToken = jwt.verify(token, JWT_SECRET);
			const loggedUser = await User.findByPk(decodedToken.id);
			if (!loggedUser) {
				throw new AssociatedDataError("user doesn't exist");
			}
			req.user = loggedUser;
			next();
		} catch {
			throw new JwtError(`Invalid token`);
		}
	} else {
		throw new JwtError("No token provided");
	}
};

module.exports = requireAuth;

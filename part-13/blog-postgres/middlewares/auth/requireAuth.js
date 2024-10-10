const jwt = require("jsonwebtoken");
const { User } = require("../../models/index");
const { JWT_SECRET } = require("../../util/config");
const { AssociatedDataError, JwtError } = require("../../util/error_classes");

const requireAuth = async (req, _res, next) => {
	const authorization = req.get("authorization");
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		const token = authorization.substring(7);
		const decodedToken = jwt.verify(token, JWT_SECRET);

		const loggedUser = await User.scope("activeSession").findByPk(
			decodedToken.id
		);

		if (!loggedUser) {
			throw new AssociatedDataError("user doesn't exist");
		}
		if (loggedUser.disabled) {
			await loggedUser.update({ activeSession: null });
			throw new AssociatedDataError(
				"Account disabled, please contact admin"
			);
		}
		if (!loggedUser.activeSession || loggedUser.activeSession !== token) {
			const result = await loggedUser.update({ activeSession: null });
			console.log(result);
			throw new JwtError("Invalid session");
		}
		req.user = loggedUser;
		next();
	} else {
		throw new JwtError("No token provided");
	}
};

module.exports = requireAuth;

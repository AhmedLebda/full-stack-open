const isAdmin = async (req, res, next) => {
	console.log(req.user);
	if (!req.user.admin) {
		res.status(401).json("Only admins can access this endpoint");
		return;
	}
	next();
};

module.exports = isAdmin;

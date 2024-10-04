const errorHandler = (error, _req, res, _next) => {
	console.log(`INFO: ${error.name} | ${error.message}`);

	if (error.name === "AssociatedDataError") {
		res.status(error.statusCode).json({ error: error.message });
	} else if (error.name === "JwtError") {
		res.status(error.statusCode).json({ error: error.message });
	} else if (error.name === "PermissionError") {
		res.status(error.statusCode).json({ error: error.message });
	} else if (error.name === "SequelizeUniqueConstraintError") {
		res.status(400).json({ error: "Username already exists" });
	} else if (error.name === "SequelizeValidationError") {
		res.status(400).json({ error: error.message });
	} else {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = errorHandler;

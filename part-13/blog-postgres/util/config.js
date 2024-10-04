require("dotenv").config();

module.exports = {
	DATABASE_URI: process.env.DATABASE_URI,
	PORT: process.env.PORT || 3001,
	SALT_ROUNDS: process.env.SALT_ROUNDS,
	JWT_SECRET: process.env.JWT_SECRET,
};

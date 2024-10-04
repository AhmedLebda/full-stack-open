require("dotenv").config();

module.exports = {
	DATABASE_URI: process.env.DATABASE_URI,
	PORT: process.env.PORT || 3001,
	SECRET: process.env.SECRET,
};

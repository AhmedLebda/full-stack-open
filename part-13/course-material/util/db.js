const { Sequelize } = require("sequelize");
const { DATABASE_URI } = require("./config");

const sequelize = new Sequelize(DATABASE_URI, {
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
});

const connectToDatabase = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connected to the database");
	} catch (error) {
		console.error("Error connecting to the database", error);
		return process.exit(1);
	}

	return null;
};

module.exports = {
	sequelize,
	connectToDatabase,
};

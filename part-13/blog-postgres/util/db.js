const { Sequelize } = require("sequelize");
const { DATABASE_URI } = require("./config");
const { Umzug, SequelizeStorage } = require("umzug");

const sequelize = new Sequelize(DATABASE_URI, {
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
});

const migrationConfig = {
	migrations: {
		glob: "migrations/*.js",
	},
	storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
	context: sequelize.getQueryInterface(),
	logger: console,
};

const runMigrations = async () => {
	const migrator = new Umzug(migrationConfig);
	const migrations = await migrator.up();
	console.log("Migrations up to date", {
		files: migrations.map((mig) => mig.name),
	});
};

const rollbackMigration = async () => {
	await sequelize.authenticate();
	const migrator = new Umzug(migrationConfig);
	await migrator.down();
};

const ConnectToDatabase = async () => {
	try {
		await sequelize.authenticate();
		await runMigrations();
		console.log("Connected to the database");
	} catch (error) {
		console.error("Error connecting to the database", error);
		process.exit(1);
	}

	return null;
};

module.exports = {
	sequelize,
	ConnectToDatabase,
	rollbackMigration,
};

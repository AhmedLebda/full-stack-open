const { DataTypes } = require("sequelize");

module.exports = {
	up: async ({ context: queryInterface }) => {
		console.log("Creating users table");
		await queryInterface.createTable("users", {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			username: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		});
		console.log("users table Created");

		console.log("Creating notes table");
		await queryInterface.createTable("notes", {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			content: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			important: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			date: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
		});
		console.log("notes table Created");

		console.log("Adding user_id foreign key to notes table");
		await queryInterface.addColumn("notes", "user_id", {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "users",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE",
		});
		console.log("user_id foreign key to notes table added");
	},

	down: async ({ context: queryInterface }) => {
		await queryInterface.removeColumn("notes", "user_id");
		await queryInterface.dropTable("notes");
		await queryInterface.dropTable("users");
	},
};

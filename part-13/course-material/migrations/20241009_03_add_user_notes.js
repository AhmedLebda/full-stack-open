const { DataTypes } = require("sequelize");

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.createTable("user_notes", {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			user_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "users",
					key: "id",
				},
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			},
			note_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "notes",
					key: "id",
				},
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			},
		});
	},

	down: async ({ context: queryInterface }) => {
		await queryInterface.dropTable("user_notes");
	},
};

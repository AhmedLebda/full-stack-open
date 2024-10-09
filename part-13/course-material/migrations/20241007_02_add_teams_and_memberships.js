const { DataTypes } = require("sequelize");

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.createTable("teams", {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
			},
		});

		await queryInterface.createTable("memberships", {
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
			team_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "teams",
					key: "id",
				},
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			},
		});
	},

	down: async ({ context: queryInterface }) => {
		await queryInterface.dropTable("teams");
		await queryInterface.dropTable("memberships");
	},
};

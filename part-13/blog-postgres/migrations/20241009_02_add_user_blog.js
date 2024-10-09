const { DataTypes } = require("sequelize");

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.createTable("user_blogs", {
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
			blog_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "blogs",
					key: "id",
				},
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
			},
			read: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
				allowNull: false,
				validate: {
					isBoolean: true,
				},
			},
		});
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.dropTable("user_blogs");
	},
};

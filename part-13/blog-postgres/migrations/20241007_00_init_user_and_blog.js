const { DataTypes } = require("sequelize");

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.createTable("users", {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isAlphanumeric: true,
				},
			},
			username: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate: {
					isEmail: true,
					min: 4,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			created_at: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
			updated_at: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
		});

		await queryInterface.createTable("blogs", {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			url: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			author: {
				type: DataTypes.STRING,
			},
			likes: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "users",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
		});
	},

	down: async ({ context: queryInterface }) => {
		await queryInterface.dropTable("users");
		await queryInterface.dropTable("blogs");
	},
};

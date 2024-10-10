const { sequelize } = require("../util/db");
const { Model, DataTypes } = require("sequelize");

class User extends Model {}

User.init(
	{
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
		disabled: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
			validate: {
				isBoolean: true,
			},
		},
		activeSession: {
			type: DataTypes.STRING,
			defaultValue: null,
		},
	},
	{
		sequelize,
		modelName: "user",
		timestamps: true,
		underscored: true,
		defaultScope: {
			attributes: { exclude: ["password", "activeSession"] },
			where: {
				disabled: false,
			},
		},
		scopes: {
			disabled: { where: { disabled: true } },
			withPassword: {
				attributes: { include: ["password"] },
			},
			activeSession: {
				attributes: { include: ["activeSession"] },
			},
		},
	}
);

module.exports = User;

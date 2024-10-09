const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Membership extends Model {}

Membership.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			references: {
				model: "users",
				key: "id",
			},
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		},
		teamId: {
			type: DataTypes.INTEGER,
			references: {
				model: "teams",
				key: "id",
			},
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
		},
	},
	{
		sequelize,
		underscored: true,
		timestamps: false,
		modelName: "membership",
	}
);

module.exports = Membership;

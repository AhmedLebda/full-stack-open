const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class UserNotes extends Model {}

UserNotes.init(
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
		noteId: {
			type: DataTypes.INTEGER,
			references: {
				model: "notes",
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
		modelName: "user_notes",
	}
);

module.exports = UserNotes;

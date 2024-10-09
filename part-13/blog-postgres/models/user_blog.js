const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

class UserBlog extends Model {}

UserBlog.init(
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
		blogId: {
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
	},
	{
		sequelize,
		modelName: "user_blog",
		timestamps: false,
		underscored: true,
	}
);

module.exports = UserBlog;

const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

class Blog extends Model {}
Blog.init(
	{
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
		yearWritten: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: 1991,
				max: new Date().getFullYear(),
			},
		},
	},
	{
		sequelize,
		modelName: "blog",
		timestamps: false,
		underscored: true,
	}
);

module.exports = Blog;

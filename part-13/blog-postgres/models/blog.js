const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URI, {
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
});
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
	},
	{
		sequelize,
		modelName: "blog",
		timestamps: false,
		underscored: true,
	}
);

module.exports = Blog;

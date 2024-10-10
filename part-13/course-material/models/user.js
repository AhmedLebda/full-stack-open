const { Model, DataTypes, Op, fn, col, literal } = require("sequelize");
const { sequelize } = require("../util/db");
const Note = require("./note");

class User extends Model {
	async number_of_notes() {
		return (await this.getNotes()).length;
	}

	static async with_notes(limit) {
		return await this.findAll({
			attributes: {
				include: [[fn("COUNT", col("notes.id")), "notes_count"]],
			},
			include: [{ model: Note, attributes: [] }],
			group: ["user.id"],
			having: literal(`COUNT(notes.id)> ${limit}`),
		});
	}
}
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
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		admin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
		disabled: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
	},

	{
		sequelize,
		modelName: "user",
		timestamps: false,
		underscored: true,
		defaultScope: {
			attributes: { exclude: ["password"] },
			where: { disabled: false },
		},
		scopes: {
			admin: { where: { admin: true } },
			disabled: { where: { disabled: true } },
			name(value) {
				return {
					where: {
						name: { [Op.iLike]: `%${value}%` },
					},
				};
			},
		},
	}
);

module.exports = User;

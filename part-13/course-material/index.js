require("dotenv").config();
const { Sequelize, DataTypes, Model } = require("sequelize");
const express = require("express");
const app = express();
app.use(express.json());
const sequelize = new Sequelize(process.env.DATABASE_URI, {
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
});

class Note extends Model {}
Note.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		completed: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		date: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		sequelize,
		modelName: "note",
		timestamps: false,
		underscored: true,
	}
);

app.get("/api/notes", async (_req, res) => {
	try {
		const notes = await Note.findAll();
		res.json(notes);
	} catch (err) {
		console.log(err);
	}
});
app.post("/api/notes", async (req, res) => {
	try {
		console.log(req.body);
		const createdNote = await Note.create(req.body);
		res.status(201).json(createdNote);
	} catch (err) {
		console.log(err);
	}
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

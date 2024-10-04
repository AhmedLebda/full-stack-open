const router = require("express").Router();

const { Note, User } = require("../models/index.js");
const noteFinder = require("../middleware/note/noteFinder.js");
const requireAuth = require("../middleware/auth/requireAuth");

router.get("/", async (_req, res) => {
	try {
		const notes = await Note.findAll({
			attributes: { exclude: ["userId"] },
			include: {
				model: User,
				attributes: ["id", "name"],
			},
		});
		res.json(notes);
	} catch (err) {
		console.log(err);
	}
});

router.post("/", requireAuth, async (req, res) => {
	try {
		const user = req.user;
		const createdNote = await Note.create({ ...req.body, userId: user.id });
		res.status(201).json(createdNote);
	} catch (err) {
		console.log(err);
	}
});

router.get("/:id", noteFinder, async (req, res) => {
	try {
		res.json(req.note);
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
});

router.patch("/:id", noteFinder, async (req, res) => {
	try {
		const note = req.note;
		note.completed = false;
		await note.save();
		res.json(note);
	} catch (err) {
		console.log(err);
	}
});

router.delete("/:id", noteFinder, async (req, res) => {
	try {
		await req.note.destroy();
		res.status(204).end();
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
});

module.exports = router;

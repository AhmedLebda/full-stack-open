const router = require("express").Router();

const { Note } = require("../models/index.js");
const noteFinder = require("../middleware/note/noteFinder.js");

router.get("/", async (_req, res) => {
	try {
		const notes = await Note.findAll();
		res.json(notes);
	} catch (err) {
		console.log(err);
	}
});

router.post("/", async (req, res) => {
	try {
		const createdNote = await Note.create(req.body);
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

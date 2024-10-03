const { Note } = require("../../models/index");

const noteFinder = async (req, res, next) => {
	try {
		const note = await Note.findByPk(req.params.id);
		if (!note) {
			return res.status(404).json({ error: "Note not found" });
		}
		req.note = note;
		next();
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
};

module.exports = noteFinder;

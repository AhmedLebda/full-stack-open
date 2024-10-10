const router = require("express").Router();

const isAdmin = require("../middleware/auth/isAdmin");
const requireAuth = require("../middleware/auth/requireAuth");
const { User, Note, Team } = require("../models/index");

router.get("/", async (_req, res) => {
	const users = await User.findAll();
	res.json(users);
});

router.post("/", async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.json(user);
	} catch (error) {
		return res.status(400).json({ error });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id, {
			include: [
				{ model: Note, attributes: { exclude: ["userId"] } },
				{
					model: Note,
					as: "marked_notes",
					attributes: { exclude: ["userId"] },
					through: { attributes: [] },
					include: { model: User, attributes: ["name"] },
				},
			],
		});
		if (!user) {
			res.status(404).end();
		}

		let teams;
		if (req.query.teams) {
			teams = await user.getTeams({
				attributes: ["id", "name"],
				joinTableAttributes: [],
			});
		}

		res.json({ ...user.toJSON(), teams });
	} catch (err) {
		console.log(err);
		res.status(404).end();
	}
});

router.post("/:username", requireAuth, isAdmin, async (req, res) => {
	try {
		const targetUser = await User.findOne({
			where: { username: req.params.username },
		});
		if (!targetUser) {
			res.status(400).json("This user doesn't exist");
			return;
		}
		const { disabled } = req.body;

		if (!disabled) {
			res.status(400).json("missing data");
			return;
		}

		await targetUser.update({ disabled });
		res.json(targetUser);
	} catch (err) {
		res.status(400).json("something went wrong", err);
	}
});

module.exports = router;

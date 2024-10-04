const { User, Blog } = require("../models/index");
const { AssociatedDataError } = require("../util/error_classes");
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../util/config");

const router = require("express").Router();

router.get("/", async (_req, res) => {
	const users = await User.findAll({
		attributes: { exclude: ["password"] },
		include: { model: Blog, attributes: { exclude: ["userId"] } },
	});
	res.json(users);
});

router.post("/", async (req, res) => {
	const createdUser = User.build(req.body);
	const hashedPassword = await bcrypt.hash(
		createdUser.password,
		Number(SALT_ROUNDS)
	);
	createdUser.password = hashedPassword;
	await createdUser.save();
	res.status(201).json({ user: createdUser });
});

router.patch("/:username", async (req, res) => {
	const user = await User.findOne({
		where: { username: req.params.username },
	});
	if (!user) throw new AssociatedDataError("User not found");
	const { username } = req.body;

	user.update({ username });
	res.json(user);
});

router.delete("/:id", async (req, res) => {
	const user = await User.findByPk(req.params.id);
	if (!user) throw new AssociatedDataError("User not found");

	await user.destroy();
	res.status(204).end();
});

module.exports = router;

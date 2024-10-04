const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AssociatedDataError } = require("../util/error_classes");
const { JWT_SECRET } = require("../util/config");
const router = require("express").Router();

router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ where: { username } });

	if (!user) {
		throw new AssociatedDataError("Invalid username or password");
	}

	const passwordMatch = await bcrypt.compare(password, user.password);

	if (!passwordMatch) {
		throw new AssociatedDataError("Invalid username or password");
	}

	const token = jwt.sign({ id: user.id }, JWT_SECRET, {
		expiresIn: "24h",
	});

	res.json({ token });
});

module.exports = router;

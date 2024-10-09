const router = require("express").Router();
const requireAuth = require("../middlewares/auth/requireAuth");
const { UserBlog } = require("../models/index");
const { AssociatedDataError } = require("../util/error_classes");

router.post("/", requireAuth, async (req, res) => {
	const { blogId } = req.body;
	const userId = req.user.id;

	if (!blogId) {
		throw new AssociatedDataError("missing blog id");
	}

	await UserBlog.create({ userId, blogId });
	res.status(201).json({ message: "Blog added to reading list" });
});

router.patch("/:id", requireAuth, async (req, res) => {
	const { read } = req.body;
	const { id: blogId } = req.params;
	const userId = req.user.id;

	if (!blogId || typeof read !== "boolean") {
		throw new AssociatedDataError("invalid request body");
	}

	const userBlog = await UserBlog.findOne({
		where: { userId, blogId },
	});

	if (!userBlog) {
		throw new AssociatedDataError("blog not found in reading list");
	}

	userBlog.update({ read });
	res.json(userBlog);
});

module.exports = router;

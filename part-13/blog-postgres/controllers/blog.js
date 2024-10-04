const router = require("express").Router();
const { Blog, User } = require("../models/index");
const blogFinder = require("../middlewares/blog/blogFinder");
const requireAuth = require("../middlewares/auth/requireAuth");
const { PermissionError } = require("../util/error_classes");

router.get("/", async (_req, res) => {
	const blogs = await Blog.findAll({
		include: {
			model: User,
			attributes: { exclude: ["password", "createdAt", "updatedAt"] },
		},
	});
	res.json(blogs);
});

router.post("/", requireAuth, async (req, res) => {
	const user = req.user;
	const createdBlog = await Blog.create({ ...req.body, userId: user.id });
	res.status(201).json(createdBlog);
});

router.delete("/:id", requireAuth, blogFinder, async (req, res) => {
	const user = req.user;
	if (user.id !== req.blog.userId) throw new PermissionError("Unauthorized");
	await req.blog.destroy();
	res.status(204).end();
});

router.patch("/:id", blogFinder, async (req, res) => {
	const blog = req.blog;
	blog.likes += 1;
	await blog.save();
	res.json({ likes: blog.likes });
});

module.exports = router;

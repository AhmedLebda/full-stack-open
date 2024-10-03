const router = require("express").Router();
const { Blog } = require("../models/index");
const { AssociatedDataError } = require("../util/error_classes");
const blogFinder = require("../middlewares/blog/blogFinder");

router.get("/", async (_req, res) => {
	const blogs = await Blog.findAll();
	res.json(blogs);
});

router.post("/", async (req, res) => {
	const createdBlog = await Blog.create(req.body);
	res.status(201).json(createdBlog);
});

router.delete("/:id", blogFinder, async (req, res) => {
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

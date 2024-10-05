const router = require("express").Router();
const { Blog } = require("../models/index");
const { fn, col } = require("sequelize");

router.get("/", async (_req, res) => {
	const blogs = await Blog.findAll({
		attributes: [
			"author",
			[fn("SUM", col("likes")), "totalLikes"],
			[fn("COUNT", col("id")), "blogCount"],
		],
		group: ["author"],
		order: [[col("totalLikes"), "DESC"]],
	});
	res.json(blogs);
});

module.exports = router;

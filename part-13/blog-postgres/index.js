require("dotenv").config();
const express = require("express");
const Blog = require("./models/blog");
const app = express();

// Middlewares
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`INFO: Server running on port ${PORT}`);
});

app.get("/api/blogs", async (_req, res) => {
	try {
		const blogs = await Blog.findAll();
		res.json(blogs);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
});

app.post("/api/blogs", async (req, res) => {
	try {
		const createdBlog = await Blog.create(req.body);
		res.status(201).json(createdBlog);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error" });
	}
});

app.delete("/api/blogs/:id", async (req, res) => {
	try {
		const blog = await Blog.findByPk(req.params.id);
		if (!blog) {
			return res.status(404).json({ error: "Blog not found" });
		}
		await blog.destroy();
		res.status(204).end();
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
});

app.patch("/api/blogs/:id", async (req, res) => {
	try {
		const blog = await Blog.findByPk(req.params.id);
		if (!blog) {
			return res.status(404).json({ error: "Blog not found" });
		}
		blog.likes += 1;
		await blog.save();
		res.json(blog);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
});

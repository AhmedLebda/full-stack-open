const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog.cjs");

router.get("/", blogController.blogs_list);

router.post("/", blogController.blog_create);

module.exports = router;

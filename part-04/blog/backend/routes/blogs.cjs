const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog.cjs");

router.get("/", blogController.blogs_list);

router.post("/", blogController.blog_create);

router.get("/:id", blogController.blog_detail);

router.delete("/:id", blogController.blog_delete);

router.put("/:id", blogController.blog_update);

module.exports = router;

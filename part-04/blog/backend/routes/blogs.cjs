const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog.cjs");
const requireAccess = require("../utils/middlewares/auth/requireAccess.cjs");

router.get("/", blogController.blogs_list);

router.get("/:id", blogController.blog_detail);

router.use(requireAccess);

router.post("/", blogController.blog_create);

router.delete("/:id", blogController.blog_delete);

// router.put("/:id", blogController.blog_update);

router.patch("/:id", blogController.blog_like);

module.exports = router;

const express = require("express");
const router = express.Router({ mergeParams: true });
const commentController = require("../controllers/comment.cjs");
const requireAccess = require("../utils/middlewares/auth/requireAccess.cjs");

router.get("/", commentController.comments_list);

router.use(requireAccess);

router.post("/", commentController.comment_create);

module.exports = router;

const express = require("express");
const PostController = require("../controller/PostController");
const authMiddleware = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post("/api/post/create", authMiddleware, PostController.createPost);
router.get(
  "/api/post/getPostsByUser",
  authMiddleware,
  PostController.getPostsByUser
);

module.exports = router;

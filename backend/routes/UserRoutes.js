const express = require("express");
const UserController = require("../controller/UserController");
const authMiddleware = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post("/api/user/signUp", UserController.signUp);
router.post("/api/user/signIn", UserController.signIn);
router.get("/api/user/allUser", authMiddleware, UserController.getAll);
router.put(
  "/api/user/updateUser/:id",
  authMiddleware,
  UserController.editProfile
);

module.exports = router;

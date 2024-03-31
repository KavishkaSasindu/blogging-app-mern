const express = require("express");
const UserController = require("../controller/UserController");

const router = express.Router();

router.post("/api/user/signIn", UserController.signIn);

module.exports = router;

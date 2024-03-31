const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Minimum character is 6"],
  },
  postCount: {
    type: Number,
    default: 0,
  },
});

const user = mongoose.model("users", UserModel);

module.exports = user;

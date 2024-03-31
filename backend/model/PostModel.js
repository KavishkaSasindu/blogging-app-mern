const mongoose = require("mongoose");

const PostModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const post = mongoose.model("posts", PostModel);
module.exports = post;

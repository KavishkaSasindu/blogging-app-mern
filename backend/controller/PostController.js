const authMiddleware = require("../middleware/AuthMiddleware");
const PostModel = require("../model/PostModel");
const UserModel = require("../model/UserModel");

const createPost = async (request, response) => {
  const { title, imageUrl, description } = request.body;

  const authorId = request.user.id;
  console.log(authorId);

  try {
    const findUser = await UserModel.findById(authorId);
    if (!findUser) {
      return response.status(500).json({
        message: "error user not found",
      });
    }

    const newPost = await PostModel.create({
      title: title,
      imageUrl: imageUrl,
      description: description,
      author: authorId,
    });

    if (!newPost) {
      return response.status(500).json({
        message: "post not created",
      });
    }
    findUser.postCount += 1;
    await findUser.save();
    return response.status(200).json({
      message: "posts created",
      post: newPost,
    });
  } catch (error) {
    return response.status(500).json({
      message: "error",
      error: error.message,
    });
  }
};

const getPostsByUser = async (request, response) => {
  const authorId = request.user.id;
  try {
    const findUser = await UserModel.findById(authorId);
    if (!findUser) {
      return response.status(404).json({
        message: "User not here",
      });
    }

    const getPosts = await PostModel.find({ author: authorId });
    if (!getPosts) {
      return response.status(404).json({
        message: "no posts here",
      });
    }

    return response.status(200).json({
      message: "fetching all posts",
      posts: getPosts,
    });
  } catch (error) {
    return response.status(404).json({
      message: "error occur",
      error: error.message,
    });
  }
};

module.exports = { createPost, getPostsByUser };

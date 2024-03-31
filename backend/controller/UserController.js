const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// sign in user
const signIn = async (request, response) => {
  const { username, email, password } = request.body;
  try {
    const existUser = await UserModel.findOne({ email: email });
    if (!existUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await UserModel.create({
        username: username,
        email: email,
        password: hashedPassword,
      });
      if (!newUser) {
        return response.status(500).json({
          message: "user not created",
        });
      }
      return response.status(201).json({
        message: "User created",
        user: newUser.email,
      });
    }
    return response.status(500).json({
      message: "User already exist",
    });
  } catch (error) {
    return response.status(500).json({
      message: "error occur",
      error: error.message,
    });
  }
};

module.exports = { signIn };

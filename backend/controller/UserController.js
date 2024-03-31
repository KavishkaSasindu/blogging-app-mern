const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// sign in user
const signUp = async (request, response) => {
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

const signIn = async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return response.status(401).json({
        message: "user not found wrong email address",
      });
    }
    const verifyUser = await bcrypt.compare(password, user.password);
    if (!verifyUser) {
      return response.status(401).json({
        message: "invalid password , password does not match",
      });
    }

    const token = await jwt.sign(
      { id: user._id, email: email },
      process.env.SECRET,
      {
        expiresIn: "24h",
      }
    );

    return response.status(200).json({
      message: " User logged in",
      jwt: token,
    });
  } catch (error) {
    return response.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};

// getAll Users
const getAll = async (request, response) => {
  try {
    const allUsers = await UserModel.find({}).select("-password");
    if (!allUsers) {
      return response.status(404).json({
        message: "No users in db",
      });
    }

    return response.status(200).json({
      message: "found users",
      users: allUsers,
    });
  } catch (error) {
    return response.status(500).json({
      message: "fetching error",
      error: error.message,
    });
  }
};

const editProfile = async (request, response) => {
  const { id } = request.params;
  try {
    const updateUser = await UserModel.findByIdAndUpdate(id, request.body);
    if (!updateUser) {
      return response.status(500).json({
        message: "user not found",
      });
    }
    return response.status(200).json({
      message: "User updated",
    });
  } catch (error) {
    return response.status(500).json({
      message: "error",
      error: error.message,
    });
  }
};

module.exports = { signUp, signIn, getAll, editProfile };

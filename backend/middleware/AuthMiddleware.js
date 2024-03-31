const jwt = require("jsonwebtoken");

const authMiddleware = async (request, response, next) => {
  try {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
      return response.status(401).json({
        message: "unauthorized user",
      });
    }

    const token = await authorizationHeader.split(" ")[1];

    const verifyUser = jwt.verify(token, process.env.SECRET);

    if (!verifyUser) {
      return response.status(401).json({
        message: "unauthorized user",
      });
    }

    request.user = verifyUser;
    next();
  } catch (error) {
    return response.status(401).json({
      message: "unauthorized user",
    });
  }
};

module.exports = authMiddleware;

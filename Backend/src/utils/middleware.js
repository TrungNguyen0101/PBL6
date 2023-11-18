const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization !== undefined) {
    if (authorization.toLowerCase().startsWith("bearer ")) {
      return authorization.substring(7);
    }
  }
  return null;
};
const authMiddleWare = (req, res, next) => {
  const token = getTokenFrom(req);
  if (!token) {
    return res.status(404).json({
      message: "Token is invalid",
    });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, User) {
    if (err) {
      return res.status(404).json({
        message: "The user is not authemtication",
      });
    }
    req.User = User;
    next();
  });
};
const tokenToUser = (req, res, next) => {
  const token = getTokenFrom(req);
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, User) {
      if (!err) {
        req.User = User;
      }
    });
  }
  next();
};

module.exports = {
  authMiddleWare,
  tokenToUser,
};

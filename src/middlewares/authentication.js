const jwt = require("jsonwebtoken");
const response = require("../utils/response");
const { JWT_KEY } = process.env;

const authentication = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) return response(res, 401, false, "Unauthorized!", null);

    req.user = jwt.verify(token, JWT_KEY);

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError")
      return response(res, 401, false, "Unauthorized!", null);
    if (err.name === "JsonWebTokenError")
      return response(res, 401, false, "Token invalid!", null);

    return response(res, 401, false, err.message, null);
  }
};

module.exports = authentication;

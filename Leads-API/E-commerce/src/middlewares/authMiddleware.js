const HttpError = require("../errors/HttpError");
const jwt = require("jsonwebtoken");
const usersModel = require("../models/usersModel");

module.exports = {
  ensureUserIsAuth: (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new HttpError(400, "Authentication needed!!");

    const token = authHeader.split(" ")[1];

    try {
      const { id } = jwt.verify(token, process.env.JWT_KEY);
      const user = usersModel.getUserById(id);
      if (!user) throw new HttpError(404, "User not found!!");

      req.authenticatedUser = user;
      console.log(user);
      next();
    } catch (error) {
      throw new HttpError(401, "Invalid token!!");
    }
  },

  ensureUserIsAdmin: (req, res, next) => {
    if (req.authenticatedUser?.role === "Admin") {
      next();
    } else {
      throw new HttpError("403", "Permission denied!!");
    }
  },
};

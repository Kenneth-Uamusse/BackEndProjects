import { Handler } from "express";
import { HttpError } from "../errors/HttpError";
import jwt from "jsonwebtoken";
import { UsersModel } from "../models/UsersModel";

export class AuthMiddleware {
  ensureUserIsAuth: Handler = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(new HttpError(400, "Authentication needed!!"));
    }

    const token = authHeader.split(" ")[1];

    try {
      const { id } = jwt.verify(
        token,
        process.env.JWT_KEY as string
      ) as jwt.JwtPayload;

      const user = UsersModel.getUserById(+id);
      if (!user) {
        return next(new HttpError(404, "User not found!!"));
      }

      req.authenticatedUser = user;
      console.log("AuthMiddleware: User authenticated", user);
      next();
    } catch (error) {
      if (!res.headersSent) next(new HttpError(401, "Invalid token!!"));    }
  };

  ensureUserIsAdmin: Handler = (req, res, next) => {
    if (req.authenticatedUser?.role === "admin") {
      next();
    } else {
      next(new HttpError(403, "Permission denied"));
    }
  };

  ensureUserIsEmployee: Handler = (req, res, next) => {
    if (req.authenticatedUser?.role === "employee") {
      next();
    } else {
      next(new HttpError(403, "Permission denied"));
    }
  };
}

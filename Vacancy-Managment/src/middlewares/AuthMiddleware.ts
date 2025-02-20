import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/HttpError";
import jwt from "jsonwebtoken";
import { UsersModel } from "../models/UsersModel";

export class AuthMiddleware {
  ensureUserIsAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new HttpError(400, "Authentication need!!");

    const token = authHeader.split(" ")[1];

    try {
      const { id } = jwt.verify(
        token,
        process.env.JWT_KEY as string
      ) as jwt.JwtPayload;

      const user = UsersModel.getUserById(+id);
      if (!user) throw new HttpError(404, "User not found!!");

      req.authenticatedUser = user;
      console.log("AuthMiddleware: User authenticated", user);
      next();
    } catch (error) {
      throw new HttpError(401, "Invalid token!!");
    }
  };
}

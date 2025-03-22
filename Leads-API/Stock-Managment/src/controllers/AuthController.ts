import {
  StoredUserLoginRequestSchema,
  StoredUserRequestSchema,
} from "../schema/requestSchema";
import { UsersModel } from "../models/UsersModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/HttpError";

export class AuthController {
  //POST /ecoShop/registration
  register = (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedBody = StoredUserRequestSchema.parse(req.body);

      const newUser = UsersModel.registerUser(parsedBody);
      res.status(201).json(newUser);
    } catch (error) {
      if (!res.headersSent) next(error);
    }
  };

  //POST /ecoShop/login
  login = (req: Request, res: Response) => {
    const parsedBoy = StoredUserLoginRequestSchema.parse(req.body);

    const user = UsersModel.getUserByEmail(parsedBoy.email);
    if (!user) throw new HttpError(400, "User not found!!");

    const isPasswordValid = bcrypt.compareSync(
      parsedBoy.password,
      user.password
    );
    if (!isPasswordValid) throw new HttpError(400, "Invalid credentials!!");

    const payload = { id: user.id, email: user.email, role: user.role };

    const token = jwt.sign(payload, process.env.JWT_KEY as string, {
      expiresIn: "1d",
    });

    res.json({ token });
  };
}

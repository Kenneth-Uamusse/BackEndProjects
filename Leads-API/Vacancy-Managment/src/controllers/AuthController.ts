import { HttpError } from "../errors/HttpError";
import { UsersModel } from "../models/UsersModel";
import { UserLoginSchema, UserRegistrationSchema } from "../schema/allSchemas";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export class AuthController {
  register = (req: Request, res: Response) => {
    const parsedBody = UserRegistrationSchema.parse(req.body);

    const newUser = UsersModel.userRegistration(parsedBody);
    if (!newUser) throw new HttpError(400, "Email already in use!!");

    res.status(201).json(newUser);
  };

  login = (req: Request, res: Response) => {
    const parsedBody = UserLoginSchema.parse(req.body);

    const user = UsersModel.getUserByEmail(parsedBody.email);
    if (!user) throw new HttpError(404, "User not found");

    const isPasswordValid = bcrypt.compareSync(
      parsedBody.password,
      user.password
    );
    if (!isPasswordValid) throw new HttpError(401, "Invalid credentials");

    const payload = { id: user.id, email: user.email, role: user.role };

    const token = jwt.sign(payload, process.env.JWT_KEY as string, {
      expiresIn: "1d",
    });

    res.json({ token });
  };
}

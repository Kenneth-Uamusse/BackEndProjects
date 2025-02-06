import { HttpError } from "../errors/HttpError";
import { UsersModel } from "../models/UsersModel";
import { UserRegistrationSchema } from "../schema/allSchemas";
import { Request, Response } from "express";

export class AuthController {
  register = (req: Request, res: Response) => {
    const user = UserRegistrationSchema.parse(req.body);

    const newUser = UsersModel.userRegistration(user);
    if (!newUser) throw new HttpError(400, "Email already in use!!");

    res.status(201).json( newUser );
  };
}

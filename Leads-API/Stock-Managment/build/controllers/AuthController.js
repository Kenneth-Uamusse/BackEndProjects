"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const requestSchema_1 = require("../schema/requestSchema");
const UsersModel_1 = require("../models/UsersModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    constructor() {
        //POST /ecoShop/registration
        this.register = (req, res) => {
            const parsedBody = requestSchema_1.StoredUserRequestSchema.parse(req.body);
            const newUser = UsersModel_1.UsersModel.registerUser(parsedBody);
            res.status(201).json(newUser);
        };
        //POST /ecoShop/login
        this.login = (req, res) => {
            const parsedBody = requestSchema_1.StoredUserLoginRequestSchema.parse(req.body);
            const user = UsersModel_1.UsersModel.getUserByEmail(parsedBody.email);
            if (!user) {
                res.status(400).json({ message: "User not found" });
                return;
            }
            const isPasswordValid = bcrypt_1.default.compareSync(parsedBody.password, user.password);
            if (!isPasswordValid) {
                res.status(400).json({ message: "Invalid credentials" });
                return;
            }
            const payload = { id: user.id, email: user.email, role: user.role };
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY, {
                expiresIn: "1d",
            });
            res.json({ token });
        };
    }
}
exports.AuthController = AuthController;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const authRouter = express_1.default.Router();
const authController = new AuthController_1.AuthController();
authRouter.post("/registration", authController.register);
authRouter.post("/login", authController.login);
exports.default = authRouter;

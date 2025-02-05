"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const HttpError_1 = require("../errors/HttpError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UsersModel_1 = require("../models/UsersModel");
class AuthMiddleware {
  constructor() {
    this.ensureUserIsAuth = (req, res, next) => {
      const authHeader = req.headers.authorization;
      if (!authHeader)
        throw new HttpError_1.HttpError(400, "Authentication needed!!");
      const token = authHeader.split(" ")[1];
      try {
        const { id } = jsonwebtoken_1.default.verify(
          token,
          process.env.JWT_KEY
        );
        const user = UsersModel_1.UsersModel.getUserById(+id);
        if (!user) {
          throw new HttpError_1.HttpError(404, "User not found!!");
        }
        req.authenticatedUser = user;
        next();
      } catch (error) {
        throw new HttpError_1.HttpError(401, "Invalid token!!");
      }
    };
    this.ensureUserIsAdmin = (req, res, next) => {
      var _a;
      if (
        ((_a = req.authenticatedUser) === null || _a === void 0
          ? void 0
          : _a.role) === "admin"
      ) {
        next();
      } else {
        throw new HttpError_1.HttpError(403, "Permission denied");
      }
    };
  }
}
exports.AuthMiddleware = AuthMiddleware;

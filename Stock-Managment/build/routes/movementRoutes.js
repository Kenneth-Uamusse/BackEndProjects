"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MovementsController_1 = require("../controllers/MovementsController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const movementRouter = express_1.default.Router();
const movementController = new MovementsController_1.MovementsController();
const authMiddleware = new authMiddleware_1.AuthMiddleware();
movementRouter.get("/employee/movements", authMiddleware.ensureUserIsAuth, movementController.index);
movementRouter.get("/employee/movements/:id", authMiddleware.ensureUserIsAuth, movementController.show);
movementRouter.post("/employee/movements", authMiddleware.ensureUserIsAuth, movementController.save);
exports.default = movementRouter;

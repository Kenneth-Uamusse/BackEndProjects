import express from "express";
import { MovementsController } from "../controllers/MovementsController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const movementRouter = express.Router();
const movementController = new MovementsController();
const authMiddleware = new AuthMiddleware();

movementRouter.get(
  "/employee/movements",
  authMiddleware.ensureUserIsAuth,
  authMiddleware.ensureUserIsEmployee,
  movementController.index
);
movementRouter.get(
  "/employee/movements/:id",
  authMiddleware.ensureUserIsAuth,
  authMiddleware.ensureUserIsEmployee,
  movementController.show
);
movementRouter.post(
  "/employee/movements",
  authMiddleware.ensureUserIsAuth,
  authMiddleware.ensureUserIsEmployee,
  movementController.save
);
movementRouter.put(
  "/employee/movements/:id",
  authMiddleware.ensureUserIsAuth,
  authMiddleware.ensureUserIsEmployee,
  movementController.update
);

export default movementRouter;
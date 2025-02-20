import express from "express";
import { CandidacyController } from "../controllers/CandidacyController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const candidacyRouter = express.Router();
const candidacyController = new CandidacyController();
const authMiddleware = new AuthMiddleware();

candidacyRouter.use(authMiddleware.ensureUserIsAuth);

candidacyRouter.get(
  "/candidacies",
  authMiddleware.ensureUserIsAdmin,
  candidacyController.index
);

candidacyRouter.get(
  "/candidacies/:id",
  authMiddleware.ensureUserIsAdmin,
  candidacyController.show
);

candidacyRouter.post("/applies/:id", candidacyController.apply);

candidacyRouter.post(
  "/candidacy/changeStatus/:id",
  authMiddleware.ensureUserIsAdmin,
  candidacyController.change
);

export default candidacyRouter;

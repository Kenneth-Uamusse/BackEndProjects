import express from "express";
import { CandidacyController } from "../controllers/CandidacyController";

const candidacyRouter = express.Router();
const candidacyController = new CandidacyController();

candidacyRouter.get("/candidacies", candidacyController.index)
candidacyRouter.get('/candidacies/:id', candidacyController.show)
candidacyRouter.post("/applies/:id", candidacyController.apply);

export default candidacyRouter
import express from "express";
import { CandidacyController } from "../controllers/CandidacyController";

const candidacyRouter = express.Router();
const candidacyController = new CandidacyController();

candidacyRouter.post("/applies/:id", candidacyController.apply);

export default candidacyRouter
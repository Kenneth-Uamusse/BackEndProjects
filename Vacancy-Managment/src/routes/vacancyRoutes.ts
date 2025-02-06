import express from "express";
import { VacancyController } from "../controllers/VacancyController";

const vacancyRouter = express.Router();
const vacancyController = new VacancyController();

vacancyRouter.get("/vacancies", vacancyController.index);

export default vacancyRouter;

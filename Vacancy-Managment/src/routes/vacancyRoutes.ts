import express from "express";
import { VacancyController } from "../controllers/VacancyController";

const vacancyRouter = express.Router();
const vacancyController = new VacancyController();

vacancyRouter.get("/vacancies", vacancyController.index);
vacancyRouter.get('/vacancies/:id', vacancyController.show)

vacancyRouter.post('/vacancies/create', vacancyController.create)
vacancyRouter.put('/vacancies/update/:id', vacancyController.update)
vacancyRouter.delete('/vacancies/delete/:id', vacancyController.delete)	

export default vacancyRouter;

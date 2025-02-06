import { Request, Response } from "express";
import { VacancyModel } from "../models/VacancyModel";

export class VacancyController {
  //GET /jobFlow/vacancies
  index = (req: Request, res: Response) => {
    const vacancies = VacancyModel.getAllVacancies();

    if (vacancies.length === 0) {
      res.json({ message: "No vacancies found" });
    } else {
      res.json(vacancies);
    }
  };
}

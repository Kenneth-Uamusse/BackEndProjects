import { Request, Response } from "express";
import { VacancyModel } from "../models/VacancyModel";
import { HttpError } from "../errors/HttpError";

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

  //GET /jobFlow/vacancies/:id
  show = (req: Request, res: Response) =>{
    const {id} = req.params
    const vacancy = VacancyModel.getVacancyById(+id)

    if(!vacancy) throw new HttpError(404, 'Vacancy not found')

    res.json(vacancy)
  }
}

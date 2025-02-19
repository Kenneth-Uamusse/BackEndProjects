import { Request, Response } from "express";
import { CandidacySchema } from "../schema/allSchemas";
import { VacancyModel } from "../models/VacancyModel";
import { HttpError } from "../errors/HttpError";
import { CandidacyModel } from "../models/CandidacyModel";

export class CandidacyController {
  //GET jobFlow/candidacies
  index = (req: Request, res: Response) =>{
    const candidacies = CandidacyModel.getAllCandiacies()
    if(candidacies.length === 0){
      res.json('No candiacies yet!!')
    }else{
      res.json(candidacies)
    }
  }

  //GET jobFlow/candidacies/:id
  show = (req: Request, res: Response) => {
    const { id } = req.params;
    const candidacy = CandidacyModel.getCandidacyById(+id);

    if (!candidacy) throw new HttpError(404, "Candidacy not found!!");

    res.status(200).json(candidacy);
  };

  //POST jobFlow/applies/:id
  apply = (req: Request, res: Response) => {
    const { id } = req.params;
    const vacancy = VacancyModel.getVacancyById(+id);

    if (!vacancy) throw new HttpError(404, "Vacancy Not Found!!");

    const parsedBody = CandidacySchema.parse(req.body);

    const candidacy = CandidacyModel.applyForJob(parsedBody);

    vacancy.candidates.push(candidacy);

    res.status(201).json({ candidacy });
  };
}

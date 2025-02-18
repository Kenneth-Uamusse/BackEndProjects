import { Request, Response } from "express";
import { CandidacySchema } from "../schema/allSchemas";
import { VacancyModel } from "../models/VacancyModel";
import { HttpError } from "../errors/HttpError";
import { CandidacyModel } from "../models/CandidacyModel";

export class CandidacyController {
  //POST jobFlow/applies
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

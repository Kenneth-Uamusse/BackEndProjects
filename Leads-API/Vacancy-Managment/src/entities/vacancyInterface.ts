import CandidacyModel from "../models/CandidacyModel";

export default interface VacancyAttributes {
  id: number;
  title: string;
  description: string;
  limitDate: string;
  candidates: CandidacyModel[]
}

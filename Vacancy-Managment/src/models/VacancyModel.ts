import VacancyAttributes from "../entities/vacancyInterface";
import CandidacyModel from "./CandidacyModel";

export class VacancyModel {
  id: number;
  title: string;
  description: string;
  limitDate: string;
  candidates: CandidacyModel[];

  private static vacancies: VacancyModel[] = [
    {
      id: 1,
      title: "Fullstack Developer",
      description:
        "We are looking for a Fullstack Developer who understands react, node and express",
      limitDate: "05/03/2025",
      candidates: [],
    },
  ];

  private static nextId: number = VacancyModel.calculateNextId();

  constructor(attributes: VacancyAttributes) {
    this.id = attributes.id;
    this.title = attributes.title;
    this.description = attributes.description;
    this.limitDate = attributes.limitDate;
    this.candidates = attributes.candidates;
  }

  private static calculateNextId(): number {
    const maxId = this.vacancies.reduce(
      (max, vacancy) => (vacancy.id > max ? vacancy.id : max),
      0
    );
    return maxId + 1;
  }

  static getAllVacancies(): VacancyModel[] {
    return [...this.vacancies];
  }

  static getVacancyById(id: number): VacancyModel | undefined {
    const vacancy = this.vacancies.find((vacancy) => vacancy.id === id);

    if (!vacancy) return undefined;

    return vacancy;
  }

  static createVacancy(
    attributes: Omit<VacancyAttributes, "id" | "candidates">
  ): VacancyModel {
    const newId = this.nextId++;
    const newVacancy = new VacancyModel({
      ...attributes,
      id: newId,
      candidates: [],
    });

    this.vacancies.push(newVacancy);

    return newVacancy;
  }

  static updateVacancy(
    id: number,
    attributes: Partial<Omit<VacancyAttributes, "id">>
  ): VacancyModel | undefined {
    const vacancy = this.getVacancyById(id);
    if (!vacancy) return undefined;

    // Actualiza os atributos apenas se forem definidos
    Object.assign(vacancy, attributes);

    return vacancy;
  }

  static deleteVacancy(id: number): VacancyModel | undefined {
    const vacancyIndex = this.vacancies.findIndex(
      (vacancy) => vacancy.id === id
    );
    if (vacancyIndex === -1) return undefined;

    return this.vacancies.splice(vacancyIndex, 1)[0];
  }
}

import VacancyAttributes from "../entities/vacancyInterface";

export class VacancyModel {
  id: number;
  title: string;
  description: string;
  limitDate: string;

  private static vacancies: VacancyModel[] = [
    {
      id: 1,
      title: "Fullstack Developer",
      description:
        "We are looking for a Fullstack Developer who understands react, node and express",
      limitDate: "05/03/2025",
    },
  ];

  private static nextId: number = 1;

  constructor(attributes: VacancyAttributes) {
    this.id = attributes.id;
    this.title = attributes.title;
    this.description = attributes.description;
    this.limitDate = attributes.limitDate;
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
    attributes: Omit<VacancyAttributes, "id">
  ): VacancyModel {
    const newVacancy = new VacancyModel({ ...attributes, id: this.nextId++ });

    this.vacancies.push(newVacancy);

    return newVacancy;
  }
}

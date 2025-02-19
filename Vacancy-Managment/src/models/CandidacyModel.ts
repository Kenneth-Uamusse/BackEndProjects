import CandidacyAttributes from "../entities/candidacyInterface";

export class CandidacyModel {
  id: number;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: number;
  status: "pending" | "approved" | "rejected";

  private static candidacies: CandidacyModel[] = [];
  private static nextId: number = CandidacyModel.calculateNextId();

  constructor(attributes: CandidacyAttributes) {
    this.id = attributes.id;
    this.candidateName = attributes.candidateName;
    this.candidateEmail = attributes.candidateEmail;
    this.candidatePhone = attributes.candidatePhone;
    this.status = attributes.status;
  }

  private static calculateNextId(): number {
    const maxId = this.candidacies.reduce(
      (max, candidacy) => (candidacy.id > max ? candidacy.id : max),
      0
    );
    return maxId + 1;
  }

  static getCandidacyById(id: number): CandidacyModel | undefined {
    const candidacy = this.candidacies.find((candidacy) => candidacy.id === id);

    if (!candidacy) return undefined;

    return candidacy;
  }

  static applyForJob(
    attributes: Omit<CandidacyAttributes, "id" | "status">
  ): CandidacyModel {
    const newId = this.nextId++;
    const candidacy = new CandidacyModel({
      id: newId,
      status: "pending",
      ...attributes,
    });

    return candidacy;
  }
}

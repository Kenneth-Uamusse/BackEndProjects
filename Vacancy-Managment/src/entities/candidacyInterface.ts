export default interface CandidacyAttributes {
  id: number;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: number;
  status: "pending" | "approved" | "rejected";
}

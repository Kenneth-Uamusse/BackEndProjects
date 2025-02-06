export default interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "recruiter" | "candidate";
}

import UserAttributes from "../entities/userInterface";
import bcrypt from "bcrypt";

export class UsersModel {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "recruiter" | "candidate";

  private static users: UsersModel[] = [
    {
      id: 1,
      name: "Kenneth",
      email: "kenneth@gmail.com",
      password: bcrypt.hashSync("123456", 10),
      role: "recruiter",
    },
  ];

  constructor(attributes: UserAttributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.email = attributes.email;
    this.password = attributes.password;
    this.role = attributes.role;
  }

  static getUserById(id: number): UsersModel | undefined {
    const user = this.users.find((user) => user.id === id);

    if (!user) return undefined;

    return user;
  }

  static getUserByEmail(email: string): UsersModel | undefined {
    const user = this.users.find((user) => user.email === email);

    if (!user) return undefined;

    return user;
  }
}

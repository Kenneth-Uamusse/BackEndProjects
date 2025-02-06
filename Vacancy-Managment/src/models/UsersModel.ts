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

  private static nextId: number = UsersModel.calculateNextId();

  constructor(attributes: UserAttributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.email = attributes.email;
    this.password = attributes.password;
    this.role = attributes.role;
  }

  private static calculateNextId(): number {
    const maxId = this.users.reduce(
      (max, user) => (user.id > max ? user.id : max),
      0
    );
    return maxId + 1;
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

  static userRegistration(
    attributes: Omit<UserAttributes, "id" | "role">
  ): UsersModel | undefined {
    const emailInUse = this.users.find(
      (user) => user.email === attributes.email
    );

    if (emailInUse) return undefined;

    const newId = this.nextId++;

    const newUser = new UsersModel({
      id: newId,
      name: attributes.name,
      email: attributes.email,
      password: bcrypt.hashSync(attributes.password, 10),
      role: "candidate",
    });

    this.users.push(newUser);

    return newUser;
  }
}

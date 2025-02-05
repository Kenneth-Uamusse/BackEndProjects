import bcrypt from "bcrypt";
import UserAttributes from "../entities/userInterface";
import { HttpError } from "../errors/HttpError";

export class UsersModel {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "employee";

  private static users: UsersModel[] = [
    {
      id: 1,
      name: "Kenneth",
      email: "kenneth@gmail.com",
      password: bcrypt.hashSync("123456", 10),
      role: "admin",
    },
    {
      id: 2,
      name: "John Doe",
      email: "jdoe@gmail.com",
      password: bcrypt.hashSync("000000", 10),
      role: "employee",
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

  static getAllUsers(): UsersModel[] {
    return [...this.users];
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

  static registerUser(
    attributes: Omit<UserAttributes, "id" | "role">
  ): UsersModel | undefined {
    const user = this.getUserByEmail(attributes.email);
    if (user) {
      throw new HttpError(400, "Email already in use");
    }

    const newId = this.nextId++;

    const newUser = new UsersModel({
      id: newId,
      name: attributes.name,
      email: attributes.email,
      password: bcrypt.hashSync(attributes.password, 10),
      role: "employee",
    });

    this.users.push(newUser);
    return newUser;
  }
}
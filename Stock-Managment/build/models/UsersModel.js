"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const HttpError_1 = require("../errors/HttpError");
class UsersModel {
    constructor(attributes) {
        this.id = attributes.id;
        this.name = attributes.name;
        this.email = attributes.email;
        this.password = attributes.password;
        this.role = attributes.role;
    }
    static getAllUsers() {
        return [...this.users];
    }
    static getUserById(id) {
        const user = this.users.find((user) => user.id === id);
        if (!user)
            return undefined;
        return user;
    }
    static getUserByEmail(email) {
        const user = this.users.find((user) => user.email === email);
        if (!user)
            return undefined;
        return user;
    }
    static registerUser(attributes) {
        const user = this.getUserByEmail(attributes.email);
        if (user) {
            throw new HttpError_1.HttpError(400, "Email already in use");
        }
        const newUser = new UsersModel({
            id: this.nextId++,
            name: attributes.name,
            email: attributes.email,
            password: bcrypt_1.default.hashSync(attributes.password, 10),
            role: "employee",
        });
        this.users.push(newUser);
        return newUser;
    }
}
exports.UsersModel = UsersModel;
UsersModel.nextId = 1;
UsersModel.users = [
    {
        id: 1,
        name: "Kenneth",
        email: "kenneth@gmail.com",
        password: bcrypt_1.default.hashSync("123456", 10),
        role: "admin",
    },
    {
        id: 2,
        name: "John Doe",
        email: "jdoe@gmail.com",
        password: bcrypt_1.default.hashSync("000000", 10),
        role: "employee",
    },
];

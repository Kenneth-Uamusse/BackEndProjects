import UserAttributes from "./entities/userInterface";

export {};
declare global {
  namespace Express {
    interface Request {
      authenticatedUser?: UserAttributes;
    }
  }
}
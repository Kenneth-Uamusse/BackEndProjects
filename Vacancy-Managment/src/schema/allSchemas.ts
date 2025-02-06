import { link } from "fs";
import z from "zod";

export const UserRegistrationSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export const UserLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const VacancyCreationSchema = z.object({
  title: z.string(),
  description: z.string(),
  limitDate: z.string(),
});

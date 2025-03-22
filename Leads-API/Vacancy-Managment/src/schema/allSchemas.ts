import { link } from "fs";
import z from "zod";
import {CandidacyModel} from "../models/CandidacyModel";

export const UserRegistrationSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export const UserLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const CandidacySchema = z.object({
  candidateName: z.string(),
  candidateEmail: z.string(),
  candidatePhone: z.number(),
  status: z.enum(["pending", "approved", "rejected"]).optional()
})

export const VacancyCreationSchema = z.object({
  title: z.string(),
  description: z.string(),
  limitDate: z.string(),
  candidates: z.array(CandidacySchema).optional()
});

export const VacancyUpdateSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  limitDate: z.string().optional(),
})
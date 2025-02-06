import z from "zod";

export const UserRegistrationSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

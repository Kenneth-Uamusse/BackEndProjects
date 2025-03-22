import { z } from "zod";

const StoredProductRequestSchema = z.object({
  name: z.string(),
  category: z.string(),
  quantity: z.number(),
  price: z.number(),
  expirationDate: z.string(),
});

const UpdateProductRequestSchema = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
  quantity: z.number().optional(),
  price: z.number().optional(),
  expirationDate: z.string().optional(),
});

const StoredMovementRequestSchema = z.object({
  productId: z.number(),
  type: z.enum(["inBound", "outBound"]),
  quantity: z.number(),
});

const StoredUserRequestSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

const StoredUserLoginRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export {
  StoredProductRequestSchema,
  StoredMovementRequestSchema,
  UpdateProductRequestSchema,
  StoredUserRequestSchema,
  StoredUserLoginRequestSchema,
};

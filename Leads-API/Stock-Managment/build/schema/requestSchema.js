"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoredUserLoginRequestSchema = exports.StoredUserRequestSchema = exports.UpdateProductRequestSchema = exports.StoredMovementRequestSchema = exports.StoredProductRequestSchema = void 0;
const zod_1 = require("zod");
const StoredProductRequestSchema = zod_1.z.object({
    name: zod_1.z.string(),
    category: zod_1.z.string(),
    quantity: zod_1.z.number(),
    price: zod_1.z.number(),
    expirationDate: zod_1.z.string(),
});
exports.StoredProductRequestSchema = StoredProductRequestSchema;
const UpdateProductRequestSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    quantity: zod_1.z.number().optional(),
    price: zod_1.z.number().optional(),
    expirationDate: zod_1.z.string().optional(),
});
exports.UpdateProductRequestSchema = UpdateProductRequestSchema;
const StoredMovementRequestSchema = zod_1.z.object({
    productId: zod_1.z.number(),
    type: zod_1.z.enum(["inBound", "outBound"]),
    quantity: zod_1.z.number(),
});
exports.StoredMovementRequestSchema = StoredMovementRequestSchema;
const StoredUserRequestSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.StoredUserRequestSchema = StoredUserRequestSchema;
const StoredUserLoginRequestSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.StoredUserLoginRequestSchema = StoredUserLoginRequestSchema;

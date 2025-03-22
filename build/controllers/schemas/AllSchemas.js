"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLeadRequestSchema = exports.CreateLeadRequestSchema = void 0;
const zod_1 = require("zod");
const CreateLeadRequestSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    phone: zod_1.z.string().optional(),
    status: zod_1.z
        .enum([
        "New",
        "Contacted",
        "Qualified",
        "Converted",
        "Unresponsive",
        "Disqualified",
        "Archived",
    ])
        .optional(),
});
exports.CreateLeadRequestSchema = CreateLeadRequestSchema;
const UpdateLeadRequestSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    status: zod_1.z
        .enum([
        "New",
        "Contacted",
        "Qualified",
        "Converted",
        "Unresponsive",
        "Disqualified",
        "Archived",
    ])
        .optional(),
});
exports.UpdateLeadRequestSchema = UpdateLeadRequestSchema;

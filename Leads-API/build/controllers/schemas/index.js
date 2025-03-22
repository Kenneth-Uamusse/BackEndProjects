"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddLeadToGroupRequestSchema = exports.UpdateLeadStatusRequestSchema = exports.AddLeadRequestSchema = exports.GetCampaignLeadsRequestSchema = exports.UpdateCampaignRequestSchema = exports.CreateCampaignRequestSchema = exports.UpdateGroupRequestSchema = exports.CreateGroupRequestSchema = exports.UpdateLeadRequestSchema = exports.CreateLeadRequestSchema = exports.GetLeadsLequestSchema = void 0;
const zod_1 = require("zod");
const LeadStatusSchema = zod_1.z.enum([
    "New",
    "Contacted",
    "Qualified",
    "Converted",
    "Unresponsive",
    "Disqualified",
    "Archived",
]);
const LeadCampaignStatusSchema = zod_1.z.enum([
    "New",
    "Engaged",
    "FollowUp_Scheduled",
    "Contacted",
    "Qualified",
    "Converted",
    "Unresponsive",
    "Disqualified",
    "Re_Engaged",
    "Opted_Out",
]);
exports.GetLeadsLequestSchema = zod_1.z.object({
    page: zod_1.z.string().optional(),
    pageSize: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    status: LeadStatusSchema.optional(),
    sortBy: zod_1.z.enum(["name", "status", "createdAt"]).optional(),
    order: zod_1.z.enum(["asc", "desc"]).optional(),
});
const CreateLeadRequestSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    phone: zod_1.z.string().optional(),
    status: LeadStatusSchema.optional(),
});
exports.CreateLeadRequestSchema = CreateLeadRequestSchema;
const UpdateLeadRequestSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    status: LeadStatusSchema.optional(),
});
exports.UpdateLeadRequestSchema = UpdateLeadRequestSchema;
const CreateGroupRequestSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
});
exports.CreateGroupRequestSchema = CreateGroupRequestSchema;
const UpdateGroupRequestSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
});
exports.UpdateGroupRequestSchema = UpdateGroupRequestSchema;
const CreateCampaignRequestSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    startDate: zod_1.z.coerce.date(),
    endDate: zod_1.z.coerce.date().optional(),
});
exports.CreateCampaignRequestSchema = CreateCampaignRequestSchema;
const UpdateCampaignRequestSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    startDate: zod_1.z.coerce.date().optional(),
    endDate: zod_1.z.coerce.date().optional(),
});
exports.UpdateCampaignRequestSchema = UpdateCampaignRequestSchema;
const GetCampaignLeadsRequestSchema = zod_1.z.object({
    page: zod_1.z.string().optional(),
    pageSize: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    status: LeadCampaignStatusSchema.optional(),
    sortBy: zod_1.z.enum(["name", "createdAt"]).optional(),
    order: zod_1.z.enum(["asc", "desc"]).optional(),
});
exports.GetCampaignLeadsRequestSchema = GetCampaignLeadsRequestSchema;
const AddLeadRequestSchema = zod_1.z.object({
    leadId: zod_1.z.number(),
    status: LeadCampaignStatusSchema.optional(),
});
exports.AddLeadRequestSchema = AddLeadRequestSchema;
const AddLeadToGroupRequestSchema = zod_1.z.object({
    leadId: zod_1.z.number(),
});
exports.AddLeadToGroupRequestSchema = AddLeadToGroupRequestSchema;
const UpdateLeadStatusRequestSchema = zod_1.z.object({
    status: LeadCampaignStatusSchema,
});
exports.UpdateLeadStatusRequestSchema = UpdateLeadStatusRequestSchema;

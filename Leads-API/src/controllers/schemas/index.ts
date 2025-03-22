import { LeadCampaignStatus } from "@prisma/client";
import { z } from "zod";

const LeadStatusSchema = z.enum([
  "New",
  "Contacted",
  "Qualified",
  "Converted",
  "Unresponsive",
  "Disqualified",
  "Archived",
]);

const LeadCampaignStatusSchema = z.enum([
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

export const GetLeadsLequestSchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
  name: z.string().optional(),
  status: LeadStatusSchema.optional(),
  sortBy: z.enum(["name", "status", "createdAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

const CreateLeadRequestSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  status: LeadStatusSchema.optional(),
});

const UpdateLeadRequestSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  status: LeadStatusSchema.optional(),
});

const CreateGroupRequestSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

const UpdateGroupRequestSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

const CreateCampaignRequestSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
});

const UpdateCampaignRequestSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

const GetCampaignLeadsRequestSchema = z.object({
  page: z.string().optional(),
  pageSize: z.string().optional(),
  name: z.string().optional(),
  status: LeadCampaignStatusSchema.optional(),
  sortBy: z.enum(["name", "createdAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

const AddLeadRequestSchema = z.object({
  leadId: z.number(),
  status: LeadCampaignStatusSchema.optional(),
});

const AddLeadToGroupRequestSchema = z.object({
  leadId: z.number(),
});

const UpdateLeadStatusRequestSchema = z.object({
  status: LeadCampaignStatusSchema,
});

export {
  CreateLeadRequestSchema,
  UpdateLeadRequestSchema,
  CreateGroupRequestSchema,
  UpdateGroupRequestSchema,
  CreateCampaignRequestSchema,
  UpdateCampaignRequestSchema,
  GetCampaignLeadsRequestSchema,
  AddLeadRequestSchema,
  UpdateLeadStatusRequestSchema,
  AddLeadToGroupRequestSchema
};

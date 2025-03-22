import { Lead } from "@prisma/client";

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Converted"
  | "Unresponsive"
  | "Disqualified"
  | "Archived";

export interface LeadWhereParams {
  name?: {
    contains?: string;
    equals?: string;
    mode: "default" | "insensitive";
  };

  status?: LeadStatus;
}

export interface FindLeadParams {
  where?: LeadWhereParams;
  sortBy?: "name" | "status" | "createdAt";
  order?: "asc" | "desc";
  limit?: number; //é como se fosse o take do prisma
  offset?: number; //é como se fosse o skip do prisma
}

export interface LeadAttributes {
  name: string;
  email: string;
  phone?: string;
  status?: LeadStatus;
}

export interface LeadsRepository {
  find: (params: FindLeadParams) => Promise<Lead[]>;
  findById: (id: number) => Promise<Lead | null>;
  count: (where: LeadWhereParams) => Promise<number>;
  create: (attributes: LeadAttributes) => Promise<Lead>;
  updateById: (
    id: number,
    attributes: Partial<LeadAttributes>
  ) => Promise<Lead | null>;
  deleteById: (id: number) => Promise<Lead | null>;
}

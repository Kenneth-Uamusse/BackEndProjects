import { Lead } from "@prisma/client";
import {
  FindLeadParams,
  LeadAttributes,
  LeadsRepository,
  LeadWhereParams,
} from "../LeadsRepository";
import { prisma } from "../../database";

export class PrismaLeadsRepository implements LeadsRepository {
  async find(params: FindLeadParams): Promise<Lead[]> {
    return prisma.lead.findMany({
      where: {
        name: {
          contains: params.where?.name?.contains,
          equals: params.where?.name?.equals,
          mode: params.where?.name?.mode,
        },
        status: params.where?.status,
      },
      orderBy: { [params.sortBy ?? "name"]: params.order },
      skip: params.offset,
      take: params.limit,
    });
  }

  async findById(id: number): Promise<Lead | null> {
    return prisma.lead.findUnique({
      where: { id },
      include: { campaigns: true, groups: true },
    });
  }

  async count(where: LeadWhereParams): Promise<number> {
    return prisma.lead.count({
      where: {
        name: {
          contains: where?.name?.contains,
          equals: where?.name?.equals,
          mode: where?.name?.mode,
        },
      },
    });
  }

  async create(attributes: LeadAttributes): Promise<Lead> {
    return prisma.lead.create({ data: attributes });
  }

  async updateById(
    id: number,
    attributes: Partial<LeadAttributes>
  ): Promise<Lead> {
    return prisma.lead.update({ where: { id }, data: attributes });
  }

  async deleteById(id: number): Promise<Lead> {
    return prisma.lead.delete({ where: { id } });
  }
}

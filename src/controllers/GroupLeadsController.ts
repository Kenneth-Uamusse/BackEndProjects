import { NextFunction, query, Request, Response } from "express";
import {
  AddLeadRequestSchema,
  AddLeadToGroupRequestSchema,
  GetLeadsLequestSchema,
} from "./schemas";
import { prisma } from "../database";
import { Prisma } from "@prisma/client";

export class GroupLeadsController {
  getLeads = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupId = +req.params.groupId;
      const query = GetLeadsLequestSchema.parse(req.query);

      const {
        page = "1",
        pageSize = "5",
        name,
        status,
        sortBy = "name",
        order = "asc",
      } = query;

      const pageNumber = +page;
      const pageSizeNumber = +pageSize;

      const where: Prisma.LeadWhereInput = {
        groups: {
          some: { id: groupId },
        }, //retorna leads que estão associados à algum grupo que possui o id:groupId
      };

      if (name) where.name = { contains: name, mode: "insensitive" };
      if (status) where.status = status;

      const leads = await prisma.lead.findMany({
        where,
        orderBy: { [sortBy]: order },
        skip: (pageNumber - 1) * pageSizeNumber,
        take: pageSizeNumber,
        include: {
          groups: true,
        },
      });

      const totalLeads = await prisma.lead.count({ where });

      res.json({
        leads,
        meta: {
          page: pageNumber,
          pageSize: pageSizeNumber,
          totalLeads,
          totalPages: Math.ceil(totalLeads / pageSizeNumber),
        },
      });
    } catch (error) {
      next(error);
    }
  };

  addLead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = AddLeadToGroupRequestSchema.parse(req.body);
      const updatedGroup = await prisma.group.update({
        data: { leads: { connect: { id: body.leadId } } }, // fazer com que o lead(leadId) se conecte ao grupo
        where: {
          id: +req.params.groupId,
        },
      });

      res.status(201).json({ updatedGroup });
    } catch (error) {
      next(error);
    }
  };

  removeLead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await prisma.group.update({
        where: { id: +req.params.groupId },
        data: {
          leads: {
            disconnect: { id: +req.params.leadId },
          }, // fazer com que o lead não esteja mais conectado ao grupo
        },
      });

      res.status(201).json({ message: "Lead removed succesfully!" });
    } catch (error) {
      next(error);
    }
  };
}

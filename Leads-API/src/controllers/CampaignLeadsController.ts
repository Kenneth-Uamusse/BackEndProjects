import { Request, Response, NextFunction } from "express";
import {
  AddLeadRequestSchema,
  GetCampaignLeadsRequestSchema,
  GetLeadsLequestSchema,
  UpdateLeadStatusRequestSchema,
} from "./schemas";
import { Prisma } from "@prisma/client";
import { prisma } from "../database";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { HttpError } from "../errors/HttpError";

export class CampaignLeadsController {
  getLeads = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const campaignId = +req.params.campaignId;
      const query = GetCampaignLeadsRequestSchema.parse(req.query);

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
        campaigns: { some: { campaignId } },
      }; //? Ele retorna leads que pertencem a alguma campanha com o campaignId que foi passado.

      if (name) where.name = { contains: name, mode: "insensitive" };
      if (status) where.campaigns = { some: { status } }; //?  inclui uma condição que verifica se há alguma campanha associada ao lead (some) que tenha o mesmo status especificado.

      const leads = await prisma.lead.findMany({
        where,
        orderBy: { [sortBy]: order },
        skip: (pageNumber - 1) * pageSizeNumber,
        take: pageSizeNumber,
        include: {
          campaigns: {
            select: {
              campaignId: true,
              leadId: true,
              status: true,
            },
          },
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
      const body = AddLeadRequestSchema.parse(req.body);
      await prisma.leadCampaign.create({
        data: {
          campaignId: +req.params.campaignId,
          leadId: body.leadId,
          status: body.status,
        },
      });

      res.status(201).end();
    } catch (error) {
      next(error);
    }
  };

  updateLeadStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const body = UpdateLeadStatusRequestSchema.parse(req.body);
      const updatedLeadCampaign = await prisma.leadCampaign.update({
        data: body,
        where: {
          leadId_campaignId: {
            campaignId: +req.params.campaignId,
            leadId: +req.params.leadId,
          },
        },
      });

      res.status(201).json({ updatedLeadCampaign });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return next(new HttpError(404, "Campaign not found"));
      }
      next(error);
    }
  };

  removeLead = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await prisma.leadCampaign.delete({
        where: {
          leadId_campaignId: {
            campaignId: +req.params.id,
            leadId: +req.params.id,
          },
        },
      });
      
      res.status(201).json({message: 'Lead removed succesfully!!'})
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return next(new HttpError(404, "Campaign not found"));
      }

      next(error);
    }
  };
}

import { Request, Response, NextFunction } from "express";
import { prisma } from "../database";
import { HttpError } from "../errors/HttpError";
import {
  CreateCampaignRequestSchema,
  UpdateCampaignRequestSchema,
} from "./schemas";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class CampaignsController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const campaigns = await prisma.campaign.findMany();
      res.json({ campaigns });
    } catch (error) {
      next(error);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const campaign = await prisma.campaign.findUnique({
        where: { id: +req.params.id },
        include: {
          leads: {
            include: { lead: { select: { name: true, status: true } } },
          },
        },
      });

      if (!campaign) return next(new HttpError(404, "Campaign not found!!"));

      res.json({ campaign });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    const body = CreateCampaignRequestSchema.parse(req.body);
    try {
      const newCampaign = await prisma.campaign.create({ data: body });

      res.status(201).json({ newCampaign });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const body = UpdateCampaignRequestSchema.parse(req.body);
    try {
      const updatedCampaign = await prisma.campaign.update({
        where: { id: +req.params.id },
        data: body,
      });

      res.status(201).json({ updatedCampaign });
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

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await prisma.campaign.delete({ where: { id: +req.params.id } });
      res.status(201).json({ message: "Campaign deleted succesfully!!" });
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

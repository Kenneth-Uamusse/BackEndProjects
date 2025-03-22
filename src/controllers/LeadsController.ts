import { Request, Response, NextFunction } from "express";
import {
  CreateLeadRequestSchema,
  GetLeadsLequestSchema,
  UpdateLeadRequestSchema,
} from "./schemas";
import { HttpError } from "../errors/HttpError";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
  LeadsRepository,
  LeadWhereParams,
} from "../repositories/LeadsRepository";

export class LeadsController {
  private leadsRepository: LeadsRepository;

  constructor(leadsRepository: LeadsRepository) {
    this.leadsRepository = leadsRepository;
  }
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = GetLeadsLequestSchema.parse(req.query);
      const {
        page = "1",
        pageSize = "5",
        name,
        status,
        sortBy = "name",
        order = "asc",
      } = query;

      const limit = +pageSize;
      const offset = (+page - 1) * limit;

      const where: LeadWhereParams = {};

      if (name) where.name = { contains: name, mode: "insensitive" };
      if (status) where.status = status;

      const leads = await this.leadsRepository.find({
        where: where,
        sortBy,
        order,
        limit,
        offset,
      });

      const totalLeads = await this.leadsRepository.count(where);

      res.json({
        data: leads,
        meta: {
          page: +page,
          pageSize: limit,
          totalLeads,
          totalPages: Math.ceil(totalLeads / limit),
        },
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = CreateLeadRequestSchema.parse(req.body);
      const newLead = await this.leadsRepository.create(body);

      res.status(201).json({ newLead });
    } catch (error) {
      next(error);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const lead = await this.leadsRepository.findById(+req.params.id);

      if (!lead) throw new HttpError(404, "Lead not found!");

      res.json({ lead });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const body = UpdateLeadRequestSchema.parse(req.body);
    try {
      const lead = await this.leadsRepository.findById(+req.params.id);

      if (!lead) throw new HttpError(404, "Lead not found!!");

      if (
        lead.status === "New" &&
        body.status !== undefined &&
        body.status !== "Contacted"
      )
        throw new HttpError(
          400,
          "Lead with status 'New' must be 'Contacted' before any other status"
        );

      if (body.status && body.status === "Archived") {
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - lead.updatedAt.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 180)
          throw new HttpError(
            400,
            "Lead can only be 'Archived' after six months of inactivity"
          );
      }

      const updatedLead = await this.leadsRepository.updateById(
        +req.params.id,
        body
      );

      res.status(201).json({ updatedLead });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const lead = await this.leadsRepository.findById(+req.params.id);
      if (!lead) throw new HttpError(404, "Lead not found!!");

      await this.leadsRepository.deleteById(+req.params.id);

      res.status(201).json({ message: "Lead deleted succesfully" });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return next(new HttpError(404, "Lead not found"));
      }
      next(error);
    }
  };
}

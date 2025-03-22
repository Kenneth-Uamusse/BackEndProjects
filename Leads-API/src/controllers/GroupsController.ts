import { Request, NextFunction, Response } from "express";
import { prisma } from "../database";
import { HttpError } from "../errors/HttpError";
import { CreateGroupRequestSchema, UpdateGroupRequestSchema } from "./schemas";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class GroupsController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groups = await prisma.group.findMany();
      res.json(groups);
    } catch (error) {
      next(error);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const group = await prisma.group.findUnique({
        where: { id: +req.params.id },
        include: { leads: true },
      });
      if (!group) throw new HttpError(404, "Group not found!!");

      res.json({ group });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = CreateGroupRequestSchema.parse(req.body);
      const newGroup = await prisma.group.create({ data: body });

      res.status(201).json({ newGroup });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const body = UpdateGroupRequestSchema.parse(req.body);
    try {
      const group = await prisma.group.findUnique({
        where: { id: +req.params.id },
      });
      if (!group) throw new HttpError(404, "Group not found!!");

      const updatedGroup = await prisma.group.update({
        where: { id: +req.params.id },
        data: body,
      }); // ! O uso de duas consultas pode afectar negativamente na performance da minha api

      res
        .status(201)
        .json({ message: "Group Updated succesfully", updatedGroup });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await prisma.group.delete({
        where: { id: +req.params.id },
      });

      res.status(201).json({ message: "Group deleted succesfully!" });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return next(new HttpError(404, "Group not found"));
      } //** esta lógica evita o uso de duas queries para verificar se um group existe ou não melhorando a performance da api
      next(error);
    }
  };
}

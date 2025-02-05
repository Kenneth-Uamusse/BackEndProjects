import { HttpError } from "../errors/HttpError";
import { MovementsModel } from "../models/MovementModel";
import { StoredMovementRequestSchema } from "../schema/requestSchema";
import { Request, Response } from "express";

export class MovementsController {
  //GET /ecoShop/employee/movements
  index = (req: Request, res: Response) => {
    const movements = MovementsModel.getAllMovements();
    if (movements.length === 0) {
      res.json({ message: "No movements yet!!" });
    } else {
      res.json(movements);
    }
  };

  //GET /ecoShop/employee/movements/:id
  show = (req: Request, res: Response) => {
    const { id } = req.params;
    const movement = MovementsModel.getMovementById(+id);
    if (movement === undefined) throw new HttpError(404, "Movement Not Found");

    res.json(movement);
  };

  //POST /ecoShop/employee/movements
  save = (req: Request, res: Response) => {
    const parsedBody = StoredMovementRequestSchema.parse(req.body);

    const newMovement = MovementsModel.createMovement(parsedBody);

    const productId = newMovement?.productId;
    if (!productId) throw new HttpError(404, "Product not found!!");

    res.json(newMovement);
  };

  //PUT /ecoShop/employee/movements/:id
  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const parsedBody = StoredMovementRequestSchema.parse(req.body);

    const updatedMovement = MovementsModel.updateMovement(+id, parsedBody);
    if (!updatedMovement) throw new HttpError(404, "Movement not found!");
    res
      .status(200)
      .json({ message: "Movement updated succesfully", updatedMovement });
  };
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovementsController = void 0;
const MovementModel_1 = require("../models/MovementModel");
const requestSchema_1 = require("../schema/requestSchema");
class MovementsController {
    constructor() {
        //GET /ecoShop/employee/movements
        this.index = (req, res) => {
            const movements = MovementModel_1.MovementsModel.getAllMovements();
            if (movements.length === 0)
                res.json({ message: "No movements yet!!" });
            res.json(movements);
        };
        //GET /ecoShop/employee/movements/:id
        this.show = (req, res) => {
            const { id } = req.params;
            const movement = MovementModel_1.MovementsModel.getMovementById(+id);
            if (movement === undefined) {
                res.status(404).json({ message: "Movement not found" });
                return;
            }
            res.json(movement);
        };
        //POST /ecoShop/employee/movements
        this.save = (req, res) => {
            const parsedBody = requestSchema_1.StoredMovementRequestSchema.parse(req.body);
            const newMovement = MovementModel_1.MovementsModel.createMovement(parsedBody);
            const productId = newMovement === null || newMovement === void 0 ? void 0 : newMovement.productId;
            if (!productId)
                res.status(404).json({ message: "Product not found!!" });
            res.status(201).json(newMovement);
        };
    }
}
exports.MovementsController = MovementsController;

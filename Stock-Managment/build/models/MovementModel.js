"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovementsModel = void 0;
const HttpError_1 = require("../errors/HttpError");
const ProductModel_1 = require("./ProductModel");
class MovementsModel {
    constructor(attributes) {
        this.id = attributes.id;
        this.productId = attributes.productId;
        this.productName = attributes.productName;
        this.type = attributes.type;
        this.quantity = attributes.quantity;
        this.date = attributes.date;
    }
    static getAllMovements() {
        return [...this.movements];
    }
    static getMovementById(id) {
        const movement = this.movements.find((movement) => movement.id === id);
        if (!movement)
            return undefined;
        return movement;
    }
    static createMovement(attributes) {
        const product = ProductModel_1.ProductModel.getProductById(attributes.productId);
        if (!product)
            return undefined;
        if (attributes.type === "outBound" &&
            product.quantity < attributes.quantity)
            throw new HttpError_1.HttpError(400, "Error");
        const newMovement = new MovementsModel({
            id: this.nextId++,
            productId: attributes.productId,
            productName: product.name,
            type: attributes.type,
            quantity: attributes.quantity,
            date: new Date(),
        });
        this.movements.push(newMovement);
        if (attributes.type === "inBound") {
            product.quantity += attributes.quantity;
        }
        else if (attributes.type === "outBound") {
            product.quantity -= attributes.quantity;
        }
        return newMovement;
    }
}
exports.MovementsModel = MovementsModel;
MovementsModel.movements = [];
MovementsModel.nextId = 1;

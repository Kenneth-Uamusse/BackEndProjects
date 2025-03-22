import { MovementsAttributes } from "../entities/movementsInterface";
import { HttpError } from "../errors/HttpError";
import { ProductModel } from "./ProductModel";

export class MovementsModel {
  id: number;
  productId: number;
  productName: string;
  type: "inBound" | "outBound";
  quantity: number;
  date: Date;

  private static movements: MovementsModel[] = [];
  private static nextId: number = 1;

  constructor(attributes: MovementsAttributes) {
    this.id = attributes.id;
    this.productId = attributes.productId;
    this.productName = attributes.productName;
    this.type = attributes.type;
    this.quantity = attributes.quantity;
    this.date = attributes.date;
  }

  static getAllMovements(): MovementsModel[] {
    return [...this.movements];
  }

  static getMovementById(id: number): MovementsModel | undefined {
    const movement = this.movements.find((movement) => movement.id === id);
    if (!movement) return undefined;

    return movement;
  }

  static createMovement(
    attributes: Omit<MovementsAttributes, "id" | "date" | "productName">
  ): MovementsModel | undefined {
    const product = ProductModel.getProductById(attributes.productId);
    if (!product) return undefined;

    if (
      attributes.type === "outBound" &&
      product.quantity < attributes.quantity
    )
      throw new HttpError(400, "Error");

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
    } else if (attributes.type === "outBound") {
      product.quantity -= attributes.quantity;
    }

    return newMovement;
  }

  static updateMovement(
    id: number,
    attributes: Partial<
      Omit<MovementsAttributes, "id" | "productName" | "date">
    >
  ): MovementsModel | undefined {
    const { productId, quantity, type } = attributes;

    const movement = MovementsModel.getMovementById(id);
    if (!movement) return undefined;

    // Busca o produto associado ao movimento atual
    const product = ProductModel.getProductById(movement.productId);
    if (!product) return undefined;

    if (movement.type === "inBound") {
      product.quantity -= movement.quantity;
    } else if (movement.type === "outBound") {
      product.quantity += movement.quantity;
    }

    if (productId !== undefined) {
      movement.productId = productId;
    }
    if (quantity !== undefined) {
      movement.quantity = quantity;
    }
    if (type !== undefined) {
      movement.type = type;
    }

    if (movement.type === "inBound") {
      product.quantity += movement.quantity;
    } else if (movement.type === "outBound") {
      if (product.quantity < movement.quantity) {
        throw new HttpError(400, "Stock is insufficient for this movement.");
      }
      product.quantity -= movement.quantity;
    }

    ProductModel.updateProduct(product.id, { quantity: product.quantity });

    return movement;
  }
}

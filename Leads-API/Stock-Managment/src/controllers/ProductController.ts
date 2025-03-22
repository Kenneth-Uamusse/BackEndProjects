import { Handler } from "express";
import { ProductModel } from "../models/ProductModel";
import {
  StoredProductRequestSchema,
  UpdateProductRequestSchema,
} from "../schema/requestSchema";
import { Request, Response } from "express";
import { HttpError } from "../errors/HttpError";

export class ProductController {
  //GET /ecoShop/admin/products
  index = (req: Request, res: Response) => {
    const products = ProductModel.getAllProducts();
    if (products.length === 0) {
      res.json({ message: "No products yet!!" });
    } else {
      res.json(products);
    }
  };

  //GET /ecoShop/admin/products/:id
  show = (req: Request, res: Response) => {
    const { id } = req.params;
    const product = ProductModel.getProductById(+id);
    if (product === undefined) throw new HttpError(404, "Product not found!!");

    res.json(product);
  };

  //POST /ecoShop/admin/products
  save = (req: Request, res: Response) => {
    const parsedBody = StoredProductRequestSchema.parse(req.body);

    const newProduct = ProductModel.createProduct(parsedBody);
    res.status(201).json(newProduct);
  };

  //UPDATE ecoShop/admin/product/update/:id
  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const parsedBody = UpdateProductRequestSchema.parse(req.body);

    const updatedProduct = ProductModel.updateProduct(+id, parsedBody);
    if (!updatedProduct) throw new HttpError(404, "Product not found!!");

    res
      .status(200)
      .json({ message: "Product updated succesfully", updatedProduct });
  };

  //DELETE /ecoShop/admin/product/delete/:id
  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedProduct = ProductModel.deleteProduct(+id);
    if (!deletedProduct) throw new HttpError(404, "Product not found!!");

    res
      .status(200)
      .json({ message: "Product deleted succesfully", deletedProduct });
  };
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const ProductModel_1 = require("../models/ProductModel");
const requestSchema_1 = require("../schema/requestSchema");
class ProductController {
    constructor() {
        //GET /ecoShop/admin/products
        this.index = (req, res) => {
            const products = ProductModel_1.ProductModel.getAllProducts();
            if (products.length === 0)
                res.json({ message: "No products yet!!" });
            res.json(products);
        };
        //GET /ecoShop/admin/products/:id
        this.show = (req, res) => {
            const { id } = req.params;
            const product = ProductModel_1.ProductModel.getProductById(+id);
            if (product === undefined) {
                res.status(404).json({ message: "Product not found" });
                return;
            }
            res.json(product);
        };
        //POST /ecoShop/admin/products
        this.save = (req, res) => {
            const parsedBody = requestSchema_1.StoredProductRequestSchema.parse(req.body);
            const newProduct = ProductModel_1.ProductModel.createProduct(parsedBody);
            res.status(201).json(newProduct);
        };
        //UPDATE ecoShop/admin/product/update/:id
        this.update = (req, res) => {
            const { id } = req.params;
            const parsedBody = requestSchema_1.UpdateProductRequestSchema.parse(req.body);
            const updatedProduct = ProductModel_1.ProductModel.updateProduct(+id, parsedBody);
            if (!updatedProduct)
                res.status(404).json({ message: "Product not found!!" });
            res
                .status(200)
                .json({ message: "Product updated succesfully", updatedProduct });
        };
        //DELETE /ecoShop/admin/product/delete/:id
        this.delete = (req, res) => {
            const { id } = req.params;
            const deletedProduct = ProductModel_1.ProductModel.deleteProduct(+id);
            if (!deletedProduct)
                res.status(404).json({ message: "Product not found!!" });
            res
                .status(200)
                .json({ message: "Product deleted succesfully", deletedProduct });
        };
    }
}
exports.ProductController = ProductController;

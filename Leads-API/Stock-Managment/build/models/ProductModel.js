"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
class ProductModel {
    constructor(attributes) {
        this.id = attributes.id;
        this.name = attributes.name;
        this.category = attributes.category;
        this.quantity = attributes.quantity;
        this.price = attributes.price;
        this.expirationDate = attributes.expirationDate;
    }
    static getAllProducts() {
        return [...this.products];
    }
    static getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        return product;
    }
    static createProduct(attributes) {
        const { name, category, quantity, price, expirationDate } = attributes;
        const newProduct = new ProductModel({
            id: this.nextId++,
            name,
            category,
            quantity,
            price,
            expirationDate,
        });
        this.products.push(newProduct);
        return newProduct;
    }
    static updateProduct(id, attributes) {
        const { name, category, quantity, price, expirationDate } = attributes;
        const product = this.getProductById(id);
        if (!product)
            return undefined;
        if (name !== undefined)
            product.name = name;
        if (category !== undefined)
            product.category = category;
        if (quantity !== undefined)
            product.quantity = quantity;
        if (price !== undefined)
            product.price = price;
        if (expirationDate !== undefined)
            product.expirationDate = expirationDate;
        return product;
    }
    static deleteProduct(id) {
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex === -1)
            return undefined;
        const deletedProduct = this.products[productIndex];
        this.products = this.products.filter((product) => product.id !== id);
        return deletedProduct;
    }
}
exports.ProductModel = ProductModel;
ProductModel.products = [];
ProductModel.nextId = 1;

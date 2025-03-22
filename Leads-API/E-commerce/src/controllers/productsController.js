const productsModel = require("../models/productsModel");

module.exports = {
  //GET /dashboard/products
  index: (req, res) => {
    const products = productsModel.getAllProducts();
    res.json(products);
  },

  //GET /dashboard/products/:id
  show: (req, res) => {
    const { id } = req.params;
    const product = productsModel.getProductById(id);

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  },

  //POST /dashboard/products/add
  add: (req, res) => {
    const { name, description, price, onStock, category } = req.body;
    const product = productsModel.createProduct(
      name,
      description,
      price,
      onStock,
      category
    );

    if (
      typeof name !== "string" ||
      typeof description !== "string" ||
      typeof price !== "number" ||
      typeof onStock !== "number" ||
      typeof category !== "string"
    ) {
      return res.status(400).json({ message: "Invalid Fields" });
    }

    res.status(200).json(product);
  },

  //PUT /dashboard/products/update/:id
  update: (req, res) => {
    const { id } = req.params;
    const { name, description, price, onStock, category } = req.body;
    const fieldsToUpdate = {};

    if (name) fieldsToUpdate.name = name;
    if (description) fieldsToUpdate.description = description;
    if (price) fieldsToUpdate.price = price;
    if (onStock) fieldsToUpdate.onStock = onStock;
    if (category) fieldsToUpdate.category = category;

    const updatedProduct = productsModel.updateBook(id, fieldsToUpdate);
    res.status(200).json(updatedProduct);
  },

  //DELETE /dashboard/products/delete/:id
  delete: (req, res) => {
    const { id } = req.params;

    const deletedProduct = productsModel.deleteProduct(id);
    res.status(200).json(deletedProduct);
  },
};

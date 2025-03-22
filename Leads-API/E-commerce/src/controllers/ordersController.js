const HttpError = require("../errors/HttpError");
const ordersModel = require("../models/ordersModel");

module.exports = {
  index: (req, res) => {
    const orders = ordersModel.getAllOrders();
    res.json(orders);
  },

  productsList: (req, res) => {
    const products = ordersModel.showAllProducts();
    res.json(products);
  },

  showProduct: (req, res) => {
    const { id } = req.params;

    const product = ordersModel.specificProduct(id);
    if (!product) throw new HttpError(404, "Product not found");

    res.json({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
    });
  },

  order: (req, res) => {
    const user = req.authenticatedUser;

    const { items = [] } = req.body;
    if (!user || typeof user.id !== "string")
      throw new HttpError(400, "Invalid user id!!");

    const order = ordersModel.makeOrder(user, items);

    res.status(200).json({ items: order.items, totalPrice: order.totalPrice });
  },
};

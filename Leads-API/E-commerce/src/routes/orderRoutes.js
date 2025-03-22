const express = require("express");
const ordersController = require("../controllers/ordersController");
const { ensureUserIsAuth, ensureUserIsAdmin } = require("../middlewares/authMiddleware");

const orderRouter = express.Router();

orderRouter.get(
  "/orders",
  ensureUserIsAuth,
  ensureUserIsAdmin,
  ordersController.index
);

orderRouter.get('/orders/products', ensureUserIsAuth, ordersController.productsList)
orderRouter.get('/orders/products/:id', ensureUserIsAuth, ordersController.showProduct)
orderRouter.post("/orders/makeOrder", ensureUserIsAuth, ordersController.order);

module.exports = orderRouter;

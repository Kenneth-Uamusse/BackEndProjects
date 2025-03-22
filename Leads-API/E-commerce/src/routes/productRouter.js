const express = require("express");
const productsController = require("../controllers/productsController");
const {
  ensureUserIsAuth,
  ensureUserIsAdmin,
} = require("../middlewares/authMiddleware");

const productRouter = express.Router();

productRouter.get(
  "/products",
  ensureUserIsAuth,
  ensureUserIsAdmin,
  productsController.index
);
productRouter.get(
  "/products/:id",
  ensureUserIsAuth,
  ensureUserIsAdmin,
  productsController.show
);
productRouter.post(
  "/products/add",
  ensureUserIsAuth,
  ensureUserIsAdmin,
  productsController.add
);
productRouter.put(
  "/products/update/:id",
  ensureUserIsAuth,
  ensureUserIsAdmin,
  productsController.update
);
productRouter.delete(
  "/products/delete/:id",
  ensureUserIsAuth,
  ensureUserIsAdmin,
  productsController.delete
);

module.exports = productRouter;

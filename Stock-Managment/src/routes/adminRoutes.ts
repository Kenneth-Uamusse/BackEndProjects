import express from "express";
import { ProductController } from "../controllers/ProductController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const adminRouter = express.Router();
const productController = new ProductController();
const authMiddleware = new AuthMiddleware();

adminRouter.get(
  "/admin/products",
  authMiddleware.ensureUserIsAuth,
  authMiddleware.ensureUserIsAdmin,
  productController.index
);
adminRouter.get(
  "/admin/products/:id",
  authMiddleware.ensureUserIsAuth,
  authMiddleware.ensureUserIsAdmin,
  productController.show
);
adminRouter.post(
  "/admin/products",
  authMiddleware.ensureUserIsAuth,
  authMiddleware.ensureUserIsAdmin,
  productController.save
);
adminRouter.put(
  "/admin/products/update/:id",
  authMiddleware.ensureUserIsAuth,
  authMiddleware.ensureUserIsAdmin,
  productController.update
);
adminRouter.delete(
  "/admin/products/delete/:id",
  authMiddleware.ensureUserIsAuth,
  authMiddleware.ensureUserIsAdmin,
  productController.delete
);

export default adminRouter;

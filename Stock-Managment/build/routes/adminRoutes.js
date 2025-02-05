"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductController_1 = require("../controllers/ProductController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const adminRouter = express_1.default.Router();
const productController = new ProductController_1.ProductController();
const { ensureUserIsAuth, ensureUserIsAdmin } = new authMiddleware_1.AuthMiddleware();
adminRouter.use(ensureUserIsAuth);
adminRouter.use(ensureUserIsAdmin);
adminRouter.get("/admin/products", productController.index);
adminRouter.get("/admin/products/:id", productController.show);
adminRouter.post("/admin/products", productController.save);
adminRouter.put("/admin/products/update/:id", productController.update);
adminRouter.delete("/admin/products/delete/:id", productController.delete);
exports.default = adminRouter;

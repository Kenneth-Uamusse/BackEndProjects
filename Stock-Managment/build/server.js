"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const movementRoutes_1 = __importDefault(require("./routes/movementRoutes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/ecoShop', authRoutes_1.default);
app.use("/ecoShop", adminRoutes_1.default);
app.use("/ecoShop", movementRoutes_1.default);
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/`);
});

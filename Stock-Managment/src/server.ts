require("dotenv").config();
import express from "express";
import adminRouter from "./routes/adminRoutes";
import movementRouter from "./routes/movementRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import authRouter from "./routes/authRoutes";

const app = express();

app.use(express.json());

app.use('/ecoShop', authRouter)
app.use("/ecoShop", adminRouter);
app.use("/ecoShop", movementRouter);

app.use(errorHandler)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});

require("dotenv").config();
import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import authRouter from "./routes/authRoutes";

const app = express();

app.use(express.json());

app.use('/jobFlow', authRouter)

app.use(errorHandler)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

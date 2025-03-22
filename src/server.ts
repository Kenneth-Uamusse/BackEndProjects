import cors from "cors";
import express from "express";
import { errorHandlerMiddleware } from "./middlewares/erroHandler";
import { router } from "./router";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on PORT http://localhost:${PORT}`)
);

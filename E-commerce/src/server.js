require("dotenv").config();

const express = require("express");
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRouter");
const errorMiddleware = require("./middlewares/errorMiddleware");
const orderRouter = require("./routes/orderRoutes");

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/dashboard", productRouter);
app.use("/e-commerce", orderRouter);

app.use(errorMiddleware);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});

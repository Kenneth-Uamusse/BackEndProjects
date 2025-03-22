import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => res.send({ tittle: "GET all users" }));
userRouter.get("/:id", (req, res) => res.send({ tittle: "GET user details" }));
userRouter.post("/", (req, res) => res.send({ tittle: "GET all users" }));
userRouter.put("/:id", (req, res) => res.send({ tittle: "CREATE new user" }));
userRouter.delete("/:id", (req, res) => res.send({ tittle: "DELETE a user" }));

export default userRouter;

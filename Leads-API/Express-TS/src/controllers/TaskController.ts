import { Handler } from "express";
import { Task } from "../models/Task";
import { z } from "zod";
import { HttpError } from "../errors/HttpError";

//req.body {title, description, status, priority}
const StoredRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["todo", "doing", "done"]),
  priority: z.enum(["low", "medium", "high"]),
}); // **using to validate the body of our request

const UpdateRequestSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["todo", "doing", "done"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
});

export class TaskController {
  //GET /api/tasks
  index: Handler = (req, res) => {
    const tasks = Task.findAll();
    res.json(tasks);
  };

  //POST /api/tasks
  save: Handler = (req, res) => {
    const parsedBody = StoredRequestSchema.parse(req.body); //Parses the request body using the StoredRequestSchema to validate and transform the input data.

    const newTask = Task.create(parsedBody);
    res.status(201).json(newTask);
  };

  //GET /api/tasks/:id
  show: Handler = (req, res) => {
    const { id } = req.params;
    const task = Task.findById(+id);

    if (!task) throw new HttpError(404, "Task not found!!");
    res.json(task);
  };

  //PUT /api/tasks/:id
  update: Handler = (req, res) => {
    const { id } = req.params;
    const parsedBody = UpdateRequestSchema.parse(req.body);
    const updatedTask = Task.update(+id, parsedBody);
    if (!updatedTask) throw new HttpError(404, "Task not found");

    res.json(updatedTask);
  };

  //DELETE /api/tasks/:id
  delete: Handler = (req, res) => {
    const { id } = req.params;
    const deletedTask = Task.delete(+id);
    if (!deletedTask) throw new HttpError(404, "Task not found!!");

    res.json(deletedTask);
  };
}

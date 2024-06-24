import express from "express";
import { addTask, getTasks, deleteTask, updateTask } from "../controller/taskController.js";

const taskRouter = express.Router();

taskRouter.get("/:column_id", getTasks);
taskRouter.post("/:column_id", addTask);
taskRouter.delete("/:id", deleteTask);
taskRouter.put("/:id", updateTask);

export default taskRouter;

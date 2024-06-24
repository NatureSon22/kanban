import express from "express";
import { addTask, getTasks } from "../controller/taskController.js";

const taskRouter = express.Router();

taskRouter.get("/:column_id", getTasks);
taskRouter.post("/:column_id", addTask);

export default taskRouter;

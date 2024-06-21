import express from "express";
import { getTasks } from "../controller/taskController";

const taskRouter = express.Router();

taskRouter.get("/:column_id", getTasks);
taskRouter.post("/:column_id", getTasks);

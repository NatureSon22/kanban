import express from "express";
import {
  createBoard,
  getAllBoards,
  getBoardById,
} from "../controller/boardController.js";

const boardRouter = express.Router();

boardRouter.get("/userId=:userId", getAllBoards);
boardRouter.get("/:id", getBoardById);
boardRouter.post("/", createBoard);
boardRouter.put("/:id", () => {});
boardRouter.delete("/:id", () => {});

export default boardRouter;

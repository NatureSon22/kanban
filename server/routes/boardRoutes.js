import express from "express";
import {
  createBoard,
  deleteBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
} from "../controller/boardController.js";

const boardRouter = express.Router();

boardRouter.get("/userId=:userId", getAllBoards);
boardRouter.get("/:id", getBoardById);
boardRouter.post("/", createBoard);
boardRouter.put("/:id", updateBoard);
boardRouter.delete("/:id", deleteBoard);

export default boardRouter;

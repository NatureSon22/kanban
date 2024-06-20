import express from "express";
import {
  addColumn,
  deleteColumn,
  getAllColumns,
  getColumnById,
  updateColumns,
} from "../controller/columnController.js";

const columnRouter = express.Router();

columnRouter.get("/:board_id", getAllColumns);
columnRouter.get("/:id", getColumnById);
columnRouter.post("/", addColumn);
columnRouter.put("/:id", updateColumns);
columnRouter.delete("/:id", deleteColumn);

export default columnRouter;

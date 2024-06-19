import express from "express";
import { getAllColumns } from "../controller/columnController.js";

const columnRouter = express.Router();

columnRouter.get("/:board_id", getAllColumns);
columnRouter.post("/", () => {});
columnRouter.get("/:id", () => {});
columnRouter.put("/:id", () => {});
columnRouter.delete("/:id", () => {});

export default columnRouter;

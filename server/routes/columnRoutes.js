import express from "express";

const columnRouter = express.Router();

columnRouter.get("/", () => {});
columnRouter.get("/:id", () => {});
columnRouter.post("/", () => {});
columnRouter.put("/:id", () => {});
columnRouter.delete("/:id", () => {});

export default columnRouter;

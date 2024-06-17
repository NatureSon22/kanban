import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import boardRouter from "./routes/boardRoutes.js";
import columnRouter from "./routes/columnRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/board", boardRouter);
app.use("/board/column", columnRouter);

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log("Server running on the port 3000");
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
})();

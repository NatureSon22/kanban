import mongoose, { Schema } from "mongoose";
import MODEL_NAMES from "./modelConstants.js";

const boardSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  columns: [
    {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.COLUMN,
    },
  ],
});

const BoardModel = mongoose.model(MODEL_NAMES.BOARD, boardSchema);

export default BoardModel;

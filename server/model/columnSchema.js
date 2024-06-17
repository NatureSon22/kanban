import mongoose, { Schema } from "mongoose";
import MODEL_NAMES from "./modelConstants.js";

const columnSchema = new mongoose.Schema({
  board_id: {
    type: String,
    ref: MODEL_NAMES.BOARD,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.TASK,
    },
  ],
});

const ColumnModel = mongoose.model(MODEL_NAMES.COLUMN, columnSchema);

export default ColumnModel;

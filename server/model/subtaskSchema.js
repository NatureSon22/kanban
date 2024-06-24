import mongoose, { mongo } from "mongoose";
import MODEL_NAMES from "./modelConstants.js";

const subtaskSchema = new mongoose.Schema({
  task_id: {
    type: String,
    ref: MODEL_NAMES.TASK,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const SubtaskModel = mongoose.model(MODEL_NAMES.SUBTASK, subtaskSchema);

export default SubtaskModel;

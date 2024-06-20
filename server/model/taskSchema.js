import mongoose from "mongoose";
import MODEL_NAMES from "./modelConstants";

const taskSchema = new mongoose.Schema({
  column_id: {
    type: String,
    ref: MODEL_NAMES.COLUMN,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  subtasks: [
    {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAMES.SUBTASK,
    },
  ],
});

const TaskModel = mongoose.model(MODEL_NAMES.TASK, taskSchema);

export default TaskModel;

import TaskModel from "../model/taskSchema.js";
import SubtaskModel from "../model/subtaskSchema.js";
import ColumnModel from "../model/columnSchema.js";

const getTasks = async (req, res) => {
  try {
    const { column_id } = req.params;
    const tasks = await TaskModel.find({ column_id }).populate("subtasks");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTask = async (req, res) => {
  try {
    const { column_id } = req.params;
    const { task, description, subtasks } = req.body;

    const column = await ColumnModel.findById(column_id);
    if (!column) {
      return res.status(404).json({ message: "Column not found" });
    }

    const newTask = new TaskModel({ column_id, task, description });
    await newTask.save();

    const subTasks = await Promise.all(
      subtasks.map(async (subtask) => {
        const newSubtask = new SubtaskModel({
          task_id: newTask._id,
          title: subtask.title,
          completed: subtask.completed || false,
        });

        await newSubtask.save();
        return newSubtask._id;
      })
    );

    if (subtasks.length > 0) newTask.subtasks = subTasks;
    await newTask.save();

    column.tasks.push(newTask._id);
    await column.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the task and delete associated subtasks
    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await SubtaskModel.deleteMany({ task_id: id });

    // Remove task from column
    const column = await ColumnModel.findById(task.column_id);
    if (column) {
      column.tasks.pull(id);
      await column.save();
    }

    await task.remove();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { column_id, description } = req.body;
    const updateTask = await TaskModel.findByIdAndUpdate(
      id,
      { column_id, description },
      { new: true }
    ).populate("subtasks");

    const task = await TaskModel.findById(id);

    if (!task) {
      return res.status(404).json({ message: "[Task] Task not found" });
    }
    
    if (!updateTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updateTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getTasks, addTask, deleteTask, updateTask };
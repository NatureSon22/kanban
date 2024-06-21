import TaskModel from "../model/taskSchema";
import SubtaskModel from "../model/subtaskSchema";

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
    const { title, description, subtasks } = req.body;

    const newTask = new TaskModel({ column_id, title, description });
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

    newTask.subtasks = subTasks;
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getTasks, addTask };

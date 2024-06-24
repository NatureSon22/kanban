import TaskModal from "@/components/ui/modals/TaskModal";
import useColumnTaskContext from "@/states/columnTaskContext";
import useTaskContext from "@/states/taskContext";
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/board/column/task";

const BoardTile = ({ _id, status, tasks: tiletasks }) => {
  const [tileTasks, setTileTasks] = useState([]);
  const { tasks } = useColumnTaskContext();
  const { setTask } = useTaskContext();

  // useEffect(() => {
  //   console.log(tileTasks);
  // }, [tileTasks.length]);

  useEffect(() => {
    const getTask = async () => {
      try {
        const res = await axios.get(`${API_URL}/${_id}`);
        setTileTasks(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    console.log(tasks);
    getTask();
  }, [tasks, _id]);

  const getTaskCompleted = (subtasks) => {
    return subtasks.reduce(
      (acc, subtask) => acc + (subtask.completed ? 1 : 0),
      0,
    );
  };

  const formatStatusTitle = () => {
    return `${status[0].toUpperCase() + status.slice(1)} (${tileTasks.length})`;
  };

  const handleSetTask = (task) => {
    setTask(task);
  };

  return (
    <div className="min-w-[290px]">
      <p className="text-xs font-bold tracking-widest text-primary-gray">
        {formatStatusTitle()}
      </p>

      <div className="mt-5 grid gap-5">
        {tileTasks.map((task) => (
          <TaskModal
            key={task._id}
            subtasks={task.subtasks}
            status={status}
            description={task.description}
          >
            <div
              className="group cursor-pointer space-y-1 rounded-md bg-white px-5 py-6 shadow-custom-200"
              onClick={() => handleSetTask(task)}
            >
              <p className="text-[0.95rem] font-bold text-black group-hover:text-primary-violet">
                {task.task}
              </p>
              <p className="text-[0.8rem] font-bold text-primary-gray">
                {getTaskCompleted(task.subtasks)} of {task.subtasks.length}{" "}
                subtasks
              </p>
            </div>
          </TaskModal>
        ))}
      </div>
    </div>
  );
};

export default BoardTile;

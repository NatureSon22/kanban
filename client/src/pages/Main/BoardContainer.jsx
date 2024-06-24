import BoardTile from "./BoardTile";
import useChosenBoard from "@/states/chosenBoardContext";
import BoardFormModal from "@/components/ui/modals/BoardFormModal";
import { useEffect } from "react";
import TaskModal from "@/components/ui/modals/TaskModal";
import useColumnTaskContext from "@/states/columnTaskContext";

const BoardContainer = () => {
  const { chosenBoard, columns, getTasks } = useChosenBoard();
  const { tasks, setTask } = useColumnTaskContext();

  useEffect(() => {
    if (columns.length > 0) {
      const fetchTasks = async () => {
        const tasks = columns.map((column) => column.tasks);

        tasks.map((task) => {
          setTask(task);
        });
      };

      fetchTasks();
    }
  }, [columns.length]);

  return (
    <div className="flex flex-1 grid-rows-1 gap-8 overflow-scroll bg-mainboard p-7">
      <TaskModal></TaskModal>

      {columns.map((tile) => (
        <BoardTile key={tile._id} {...tile} />
      ))}

      {columns.length > 0 && (
        <BoardFormModal
          id={chosenBoard?._id}
          title={chosenBoard?.title}
          state="ADD COLUMN"
          columns={columns}
        />
      )}
    </div>
  );
};

export default BoardContainer;

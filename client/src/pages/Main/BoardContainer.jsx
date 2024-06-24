import BoardTile from "./BoardTile";
import useChosenBoard from "@/states/chosenBoardContext";
import BoardFormModal from "@/components/ui/modals/BoardFormModal";
import { useEffect } from "react";
import TaskModal from "@/components/ui/modals/TaskModal";

const BoardContainer = () => {
  const { chosenBoard, columns } = useChosenBoard();

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

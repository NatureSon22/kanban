import BoardTile from "./BoardTile";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useChosenBoard from "@/states/chosenBoardContext";
const BoardContainer = () => {
  const { chosenBoard, columns } = useChosenBoard();
  console.log(chosenBoard);
  console.log(columns);

  return (
    <div className="flex flex-1 grid-rows-1 gap-8 overflow-scroll bg-mainboard p-7">
      {columns.map((tile) => (
        <BoardTile key={tile._id} {...tile} />
      ))}
      <div className="mt-9 grid min-w-[290px] cursor-pointer place-items-center rounded-md bg-primary-gray/10">
        <div className="flex items-center gap-3 text-primary-gray">
          <FontAwesomeIcon icon={faAdd} className="font-bold" />
          <p className="text-[1.3rem] font-bold">New Column</p>
        </div>
      </div>
    </div>
  );
};

export default BoardContainer;

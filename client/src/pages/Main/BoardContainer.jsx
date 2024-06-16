import BoardTile from "./BoardTile";
import data from "../../utils/data";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const BoardContainer = () => {
  return (
    <div className="flex flex-1 grid-rows-1 gap-8 overflow-scroll bg-mainboard p-7">
      {data.map((tile) => (
        <BoardTile key={tile.id} {...tile} />
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

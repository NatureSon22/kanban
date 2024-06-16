import CreateBoard from "../../components/ui/modals/CreateBoard";
import { iconBoard } from "@/utils/imports";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const boards = ["Platform Launch", "Marketing Plan", "Roadmap"];

const SideBar = () => {
  const [openBoard, setOpenBoard] = useState(boards[0]);
  const [openSideBar, setOpenSideBar] = useState(true);

  const handleSetBoard = (board) => {
    setOpenBoard(board);
  };

  const handleOpenSideBar = () => {
    setOpenSideBar(!openSideBar);
  };

  const buttonStyle = (board) => {
    return openBoard === board
      ? "bg-primary-violet text-white hover:opacity-80"
      : "bg-white text-primary-gray hover:bg-primary-gray/10";
  };

  return (
    <div
      className={`absolute left-0 top-0 z-10 grid h-full w-full justify-items-center bg-black/75 transition-transform duration-500 mg:flex mg:h-auto mg:w-[20em] mg:justify-stretch ${
        openSideBar
          ? "translate-x-0 mg:relative mg:flex"
          : "absolute -translate-x-full mg:h-full"
      }`}
    >
      <nav className="relative mt-10 flex h-min w-[75%] max-w-[30em] flex-1 flex-col rounded-md bg-white py-7 pr-10 text-primary-gray shadow-custom-100 mg:mt-0 mg:h-full mg:w-full mg:rounded-none mg:shadow-none">
        <p className="ml-8 text-[0.9rem] font-semibold uppercase tracking-[0.4em]">
          all boards (3)
        </p>

        <div className="mt-5 mg:mt-7">
          {boards.map((board) => (
            <button
              key={board}
              className={`flex w-full items-center gap-5 rounded-r-full py-4 pl-8 transition-all duration-200 sm:pl-12 ${buttonStyle(board)}`}
              onClick={() => handleSetBoard(board)}
            >
              <img
                className={board === openBoard ? "brightness-0 invert" : ""}
                src={iconBoard}
              />
              <p className="font-bold">{board}</p>
            </button>
          ))}

          <CreateBoard state={"ADD"}></CreateBoard>
        </div>

        <button
          className={`z-10 mt-auto hidden items-center gap-5 rounded-r-full py-4 pr-20 transition-all duration-500 hover:bg-primary-violet/10 sm:pl-12 mg:flex ${
            !openSideBar
              ? "absolute bottom-12 right-0 translate-x-full bg-primary-violet pl-0 pr-5 text-white shadow-md sm:pl-5"
              : "pl-0"
          }`}
          onClick={handleOpenSideBar}
        >
          <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
          {openSideBar && <p className="font-bold">Hide SideBar</p>}
        </button>
      </nav>
    </div>
  );
};

export default SideBar;

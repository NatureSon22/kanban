import {
  iconAddTask,
  iconArrowDown,
  logoLigth,
  verticalEllipsis,
} from "@/utils/imports";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import DeleteBoard from "./modals/DeleteBoard";
import BoardFormModal from "./modals/BoardFormModal";
import useChosenBoard from "@/states/chosenBoardContext";
import { useState } from "react";
import TaskFormModal from "./modals/TaskFormModal";

const NavBar = ({ setOpenSidBar, openSideBar }) => {
  const { chosenBoard, columns } = useChosenBoard();
  const [openPopover, setOpenPopover] = useState(false);

  const handleSetOpenSidBar = () => {
    setOpenSidBar((prev) => !prev);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  return (
    <nav className="flex items-center justify-between p-5 shadow-sm sm:px-10 sm:py-6">
      <div className="flex items-center sm:w-min">
        <img className="w-[2.3em]" src={logoLigth} alt="logo" />
        <h1 className="hidden text-[1.5rem] font-bold text-primary-violet sm:block">
          KanBan
        </h1>
      </div>

      <SignedIn>
        {chosenBoard && (
          <div className="mr-auto flex cursor-pointer items-center gap-3 md:gap-4">
            <p className="text-xl font-bold sm:ml-[5em] mg:ml-[9.5em]">
              {chosenBoard.title}
            </p>
            <img
              className={`transition-transform duration-200 mg:hidden ${openSideBar ? "-rotate-180" : ""}`}
              src={iconArrowDown}
              alt="icon arrow down"
              onClick={handleSetOpenSidBar}
            />
          </div>
        )}
        <div className="flex items-center gap-5">
          <UserButton />
          <TaskFormModal state={"ADD"} ></TaskFormModal>
          <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger>
              <img src={verticalEllipsis} alt="verticalEllipsis" />
            </PopoverTrigger>
            <PopoverContent className="mr-5 mt-5 grid w-max gap-2 pl-5 pr-8 text-left shadow-lg md:mr-10 md:mt-7">
              <BoardFormModal
                id={chosenBoard?._id}
                title={chosenBoard?.title}
                state="EDIT"
                columns={columns}
                handleClosePopover={handleClosePopover}
              />
              <DeleteBoard
                handleClosePopover={handleClosePopover}
                id={chosenBoard?._id}
              />
            </PopoverContent>
          </Popover>
        </div>
      </SignedIn>
    </nav>
  );
};

export default NavBar;

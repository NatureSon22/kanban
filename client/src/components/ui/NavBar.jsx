import {
  iconAddTask,
  iconArrowDown,
  iconShowSideBar,
  logoLigth,
  verticalEllipsis,
} from "@/utils/imports";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SignedIn, UserButton } from "@clerk/clerk-react";

const NavBar = ({
  BoardTitle = "Platform Launch",
  setOpenSidBar,
  openSideBar,
}) => {
  const handleSetOpenSidBar = () => {
    setOpenSidBar((prev) => !prev);
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
        {BoardTitle && (
          <div className="mr-auto flex cursor-pointer items-center gap-3 md:gap-4">
            <p className="text-xl font-bold sm:ml-[5em] mg:ml-[9.5em]">
              {BoardTitle}
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
          <UserButton></UserButton>

          <button className="absolute bottom-12 right-10 z-10 flex cursor-pointer items-center gap-4 rounded-full bg-primary-violet px-7 py-3 text-white shadow-xl transition-all duration-200 hover:opacity-50">
            <img src={iconAddTask} alt="icon add task" />
            <p className="hidden font-bold md:block">Add New Task</p>
          </button>
          <Popover>
            <PopoverTrigger>
              <img src={verticalEllipsis} alt="verticalEllipsis" />
            </PopoverTrigger>
            <PopoverContent className="mr-5 mt-5 grid w-max gap-2 pl-5 pr-8 text-left shadow-lg md:mr-10 md:mt-7">
              <button className="text-left text-primary-gray">
                Edit Board
              </button>
              <button className="text-red-500">Delete Board</button>
            </PopoverContent>
          </Popover>
        </div>
      </SignedIn>
    </nav>
  );
};

export default NavBar;

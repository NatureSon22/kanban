import NavBar from "@/components/ui/NavBar";
import { SignedOut, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import BoardContainer from "./BoardContainer";
import useBoardContext from "@/states/boardContext";
import useChosenBoard from "@/states/chosenBoardContext";

const RootBoard = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openBoard, setOpenBoard] = useState(null);
  const { getAllBoards, boards } = useBoardContext();
  const { setChosenBoard, getAllColumns } = useChosenBoard();
  const { user } = useUser();

  useEffect(() => {
    const handleGetAllBoards = async () => {
      if (user?.id) {
        await getAllBoards(user.id);
      }
    };

    handleGetAllBoards();
  }, [user, getAllBoards]);

  useEffect(() => {
    if (boards.length > 0) {
      const board = boards[0];
      setChosenBoard(board);
      setOpenBoard(board);
      getAllColumns(board._id);
    }
  }, [boards.length]);

  useEffect(() => {
    if (window.innerWidth >= 900) setOpenSideBar(true);
    const handleSideBar = () => setOpenSideBar(window.innerWidth >= 900);
    window.addEventListener("resize", handleSideBar);

    return () => {
      window.removeEventListener("resize", handleSideBar);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col font-jakarta">
      <NavBar setOpenSideBar={setOpenSideBar} openSideBar={openSideBar} />

      <div className="relative flex flex-1 justify-stretch">
        {openSideBar && openBoard && <SideBar board={openBoard} />}
        <BoardContainer />
      </div>

      <SignedOut>
        <Navigate to="/auth" />
      </SignedOut>
    </div>
  );
};

export default RootBoard;

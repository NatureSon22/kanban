import NavBar from "@/components/ui/NavBar";
import { SignedOut } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import BoardContainer from "./BoardContainer";

const RootBoard = () => {
  const [openSideBar, setOpenSidBar] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 900) setOpenSidBar(true);
    const handleSideBar = () => setOpenSidBar(window.innerWidth >= 900);
    window.addEventListener("resize", handleSideBar);

    () => {
      return window.removeEventListener("resize", handleSideBar);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col font-jakarta">
      <NavBar setOpenSidBar={setOpenSidBar} openSideBar={openSideBar}></NavBar>

      <div className="relative flex flex-1 justify-stretch">
        {openSideBar && <SideBar></SideBar>}
        <BoardContainer></BoardContainer>
      </div>

      <SignedOut>
        <Navigate to="/auth"></Navigate>
      </SignedOut>
    </div>
  );
};

export default RootBoard;

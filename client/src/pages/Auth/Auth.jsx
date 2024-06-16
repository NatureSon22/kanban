import NavBar from "@/components/ui/NavBar";
import { SignIn, SignUp, SignedIn } from "@clerk/clerk-react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const Auth = () => {
  const [authMode, setAuthMode] = useState("signup");

  const handleSetAuthMode = (mode) => {
    setAuthMode(mode);
  };

  const handleStyle = (mode) => {
    return authMode == mode
      ? "bg-primary-violet text-white"
      : "bg-white text-primary-violet";
  };

  return (
    <div className="flex min-h-screen flex-col font-jakarta">
      <NavBar></NavBar>

      <div className="grid w-full items-start justify-items-center gap-10 pb-20 pt-10 sm:pt-20">
        <div className="flex w-[80%] max-w-[25em] justify-between gap-5">
          <button
            className={`flex-1 rounded-lg border border-primary-violet py-3 font-semibold sm:py-4 ${handleStyle("signup")}`}
            onClick={() => handleSetAuthMode("signup")}
          >
            Sign Up
          </button>
          <button
            className={`flex-1 rounded-lg border border-primary-violet py-3 font-semibold sm:py-4 ${handleStyle("signin")}`}
            onClick={() => handleSetAuthMode("signin")}
          >
            Sign In
          </button>
        </div>

        {authMode === "signup" ? <SignUp></SignUp> : <SignIn></SignIn>}
      </div>

      <SignedIn>
        <Navigate to="/"></Navigate>
      </SignedIn>
    </div>
  );
};

export default Auth;

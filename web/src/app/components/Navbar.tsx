'use client';
import React, { useEffect } from "react";
import Cookies from "universal-cookie";

interface NavProps {
  currPage: string;
}

const Navbar: React.FC<NavProps> = ({ currPage }) => {

  useEffect(() => {

    const Cookie = new Cookies();
    const payload = Cookie.get("payload");
    if (!payload) {
      window.location.href = "/";
    } else {
      const token: string = Cookie.get("token");
    }
  }, []);

  const handleSignOut = () => {
    const cookies = new Cookies();
    cookies.remove("token", { path: "/" });
    window.location.href = "/";
  };

  return (
    <div className="fixed w-full bg-blue1 h-[4.5rem] p-4 flex items-center justify-between">
      <button onClick={() => (window.location.href = "/dashboard")} className={(currPage === "dashboard" ? "text-blue2 hover:text-black1 " : "text-white ") + "font-bold hhover:bg-pink1 ml-4  py-2 rounded-sm"}>
        <img src="/logo.png" alt="logo" className="w-52"></img>
      </button>
      {/* <button onClick={() => (window.location.href = "/dashboard")} className= {(currPage ==="Transcript" ? "text-blue2 hover:text-black1 " : "text-white ")  + "font-bold hover:bg-pink1 pt-2 px-6 rounded-sm"}>Transcript</button> */}
      <button onClick={handleSignOut} className="text-white font-bold bg-red1 px-6 rounded-sm flex items-center gap-x-8 text-xl">
        Sign Out
        <img src="/profile.png" alt="profile icon">
        </img>
      </button>
    </div>
  );
};

export default Navbar;
'use client';
import Navbar from "./components/Navbar";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full min-h-screen items-center justify-between font- text-sm p-24 bg-gradient-to-b from-black1 to-blue1">
        <div>
          <div className="font-bold text-white text-xl text-center pt-24 pb-12">
            OccupEye<br/>An eye for your visitors.
          </div>
          <div className="flex flex-col items-center mx-auto">
            <button onClick={() => (window.location.href = "/login")}  className="my-2 bg-gradient-to-br from-pink1 to-purple1 border-2 border- text-white1 text-md rounded-lg block w-60 p-2.5  hover:text-white drop-shadow-lg hover:drop-shadow-md hover:"
            // onClick={generateKey} 
            >
              Log In
            </button>
            <button onClick={() => (window.location.href = "/signup")}  className="my-2 bg-gradient-to-br from-purple1 to-yellow1 border-2 border- text-white1 text-md rounded-lg block w-60 p-2.5  hover:text-white drop-shadow-lg hover:drop-shadow-md hover:"
            // onClick={generateKey} 
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

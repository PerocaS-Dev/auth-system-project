import React from "react";
import { useNavigate } from "react-router-dom";
import helloRobot from "../assets/hello-robot.mp4";

const Welcome = () => {
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate("/signup");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="w-full h-full grid grid-cols-2 items-center ">
      <div className="h-full bg-brand-lighter_orange flex justify-center items-center flex-col">
        <h1 className="flex justify-center text-7xl text-green-700">Welcome</h1>
        <button
          className="border-2 border-green-700 rounded-md w-72 h-10 text-lg text-green-700 font-bold mt-10"
          onClick={goToLogin}
        >
          Log In
        </button>
        <button
          className="border-2 border-green-700 rounded-md w-72 h-10 text-lg text-green-700 font-bold mt-10"
          onClick={goToSignUp}
        >
          Sign Up
        </button>
      </div>
      <div className="h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-svw h-svh object-cover"
        >
          <source src={helloRobot} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Welcome;

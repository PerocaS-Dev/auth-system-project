import React, { useState } from "react";
import { useNavigate, useLocation, redirect } from "react-router-dom";
import userLogin from "../hooks/userLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = userLogin("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login button clicked");
    const success = await login(email, password);
    console.log("Login result:", success);
    if (success) navigate("/home");
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  const goToForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="w-full h-full bg-brand-lighter_orange flex justify-center items-center py-3">
      <div className="w-1/2 h-full border bg-brand-gray_green rounded-md my-10 flex items-center justify-center flex-col py-2 ">
        <h1 className="text-3xl text-brand-lighter_orange mb-10 font-bold ">
          Login
        </h1>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <form
          onSubmit={handleLogin}
          className="flex w-full flex-col items-center gap-5"
        >
          {/* Email */}
          <div className="relative w-3/6">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              className="peer w-full h-12 rounded-md border-2 border-brand-lighter_orange bg-transparent px-3 pt-5 pb-2 text-sm text-brand-lighter_orange placeholder-transparent focus:border-white focus:outline-none"
            />
            <label
              className="absolute left-3 top-1 text-brand-lighter_orange font-bold text-md transition-all 
                         peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-brand-lighter_orange 
                         peer-focus:top-1 peer-focus:text-sm peer-focus:text-brand-lighter_orange"
            >
              Email
            </label>
          </div>

          {/* PASSWORD */}

          <div className="relative w-3/6">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              className="peer w-full h-12 rounded-md border-2 border-brand-lighter_orange bg-transparent px-3 pt-5 pb-2 text-sm text-brand-lighter_orange placeholder-transparent focus:border-white focus:outline-none"
            />
            <label
              className="absolute left-3 top-1 text-brand-lighter_orange font-bold text-md transition-all 
                         peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-brand-lighter_orange 
                         peer-focus:top-1 peer-focus:text-sm peer-focus:text-brand-lighter_orange"
            >
              Password
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="peer w-1/2 h-12 rounded-md border-2 bg-brand-lighter_orange text-brand-gray_green font-bold flex items-center justify-center cursor-pointer"
          >
            Login
          </button>

          <div>
            <p
              onClick={goToForgotPassword}
              className="text-brand-lighter_orange cursor-pointer hover:underline"
            >
              Forgot Password
            </p>
          </div>

          <div>
            <p className="text-brand-lighter_orange">
              Don't have an account?{" "}
              <strong
                className="cursor-pointer hover:underline"
                onClick={goToSignup}
              >
                Sign Up
              </strong>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

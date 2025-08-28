import React, { useState } from "react";
import { useNavigate, useLocation, redirect } from "react-router-dom";
import userSignup from "../hooks/userSignup";

const SignUp = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const { signup, error, isLoading } = userSignup("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("SignUp button clicked");
    const success = await signup(
      firstname,
      lastname,
      username,
      email,
      password,
      confirmPassword,
      role
    );
    console.log("Signup result:", success);
    if (success) navigate("/home");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="w-full h-full bg-brand-lighter_orange flex justify-center items-center py-3">
      <div className="w-1/2 h-full border bg-brand-gray_green rounded-md my-10 flex items-center flex-col py-2 ">
        <h1 className="text-3xl text-brand-lighter_orange mb-5 font-bold ">
          Sign Up
        </h1>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <form
          onSubmit={handleSignUp}
          className="flex w-full flex-col items-center gap-5"
        >
          {/* Username */}
          <div className="relative w-3/6">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=" "
              className="peer w-full h-12 rounded-md border-2 border-brand-lighter_orange bg-transparent px-3 pt-5 pb-2 text-sm text-brand-lighter_orange placeholder-transparent focus:border-white focus:outline-none"
            />
            <label
              htmlFor="username"
              className="absolute left-3 top-1 text-brand-lighter_orange font-bold text-md transition-all 
                         peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-brand-lighter_orange 
                         peer-focus:top-1 peer-focus:text-sm peer-focus:text-brand-lighter_orange"
            >
              Username
            </label>
          </div>

          {/* FIRSTNAME */}
          <div className="relative w-3/6">
            <input
              type="text"
              id="firstName"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder=" "
              className="peer w-full h-12 rounded-md border-2 border-brand-lighter_orange bg-transparent px-3 pt-5 pb-2 text-sm text-brand-lighter_orange placeholder-transparent focus:border-white focus:outline-none"
            />
            <label
              className="absolute left-3 top-1 text-brand-lighter_orange font-bold text-md transition-all 
                         peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-brand-lighter_orange 
                         peer-focus:top-1 peer-focus:text-sm peer-focus:text-brand-lighter_orange"
            >
              First name
            </label>
          </div>

          {/* LASTNAME */}
          <div className="relative w-3/6">
            <input
              type="text"
              id="lastName"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder=" "
              className="peer w-full h-12 rounded-md border-2 border-brand-lighter_orange bg-transparent px-3 pt-5 pb-2 text-sm text-brand-lighter_orange placeholder-transparent focus:border-white focus:outline-none"
            />
            <label
              className="absolute left-3 top-1 text-brand-lighter_orange font-bold text-md transition-all 
                         peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-brand-lighter_orange 
                         peer-focus:top-1 peer-focus:text-sm peer-focus:text-brand-lighter_orange"
            >
              Last name
            </label>
          </div>

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

          {/* CONFIRM PASSWORD */}
          <div className="relative w-3/6">
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder=" "
              className="peer w-full h-12 rounded-md border-2 border-brand-lighter_orange bg-transparent px-3 pt-5 pb-2 text-sm text-brand-lighter_orange placeholder-transparent focus:border-white focus:outline-none"
            />
            <label
              className="absolute left-3 top-1 text-brand-lighter_orange font-bold text-md transition-all 
                         peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-brand-lighter_orange 
                         peer-focus:top-1 peer-focus:text-sm peer-focus:text-brand-lighter_orange"
            >
              Confirm Password
            </label>
          </div>

          {/* ROLE */}
          <div className="relative w-3/6">
            <input
              type="text"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder=" "
              className="peer w-full h-12 rounded-md border-2 border-brand-lighter_orange bg-transparent px-3 pt-5 pb-2 text-sm text-brand-lighter_orange placeholder-transparent focus:border-white focus:outline-none"
            />
            <label
              className="absolute left-3 top-1 text-brand-lighter_orange font-bold text-md transition-all 
                         peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-brand-lighter_orange 
                         peer-focus:top-1 peer-focus:text-sm peer-focus:text-brand-lighter_orange"
            >
              Role
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="peer w-1/2 h-12 rounded-md border-2 bg-brand-lighter_orange text-brand-gray_green font-bold flex items-center justify-center cursor-pointer"
          >
            Sign Up
          </button>

          <div>
            <p className="text-brand-lighter_orange">
              Already have an account?{" "}
              <strong
                className="cursor-pointer hover:underline"
                onClick={goToLogin}
              >
                Login
              </strong>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

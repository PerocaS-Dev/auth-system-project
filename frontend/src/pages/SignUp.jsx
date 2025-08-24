import React from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="w-full h-full bg-brand-lighter_orange flex justify-center items-center py-5">
      <div className="w-1/2 h-full border bg-brand-gray_green rounded-md my-10 flex items-center flex-col py-8">
        <h1 className="text-3xl text-brand-lighter_orange mb-5 font-bold ">
          Sign Up
        </h1>
        <form className="flex w-full flex-col items-center gap-5">
          {/* Username */}
          <div className="relative w-3/6">
            <input
              type="text"
              id="username"
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

          {/* Email */}
          <div className="relative w-3/6">
            <input
              type="text"
              id="firstName"
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

          <div className="relative w-3/6">
            <input
              type="text"
              id="lastName"
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

          <div className="relative w-3/6">
            <input
              type="password"
              id="password"
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

          {/* Email */}
          <div className="relative w-3/6">
            <input
              type="password"
              id="confirmPassword"
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

          <button className="peer w-1/2 h-12 rounded-md border-2 bg-brand-lighter_orange text-brand-gray_green font-bold flex items-center justify-center">
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

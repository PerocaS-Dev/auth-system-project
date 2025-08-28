import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import userPasswordReset from "../hooks/userPasswordReset";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { reset, error, isLoading } = userPasswordReset("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token"); // 👈 extract from URL

  console.log("Token from URL:", token);

  const handleReset = async (e) => {
    e.preventDefault();
    const success = await reset(token, newPassword, confirmPassword);
    if (success) {
      setIsSaved(true);
    }
  };

  const backToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="w-full h-full bg-brand-lighter_orange flex justify-center items-center py-3">
      <div className="w-1/2 h-full border bg-brand-gray_green rounded-md my-10 flex items-center justify-center flex-col py-5 ">
        <h1 className="text-3xl text-brand-lighter_orange mb-5 font-bold ">
          Password Reset
        </h1>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {!isSaved ? (
          <div className="flex w-full flex-col items-center gap-5">
            {/* Password */}
            <div className="relative w-3/6">
              <input
                type="password"
                name="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="peer w-full h-12 rounded-md border-2 border-brand-lighter_orange bg-transparent px-3 pt-5 pb-2 text-sm text-brand-lighter_orange placeholder-transparent focus:border-white focus:outline-none"
              />
              <label className="absolute left-3 top-1 text-brand-lighter_orange font-bold text-md transition-all">
                Enter new password
              </label>
            </div>

            {/* Confirm password */}
            <div className="relative w-3/6">
              <input
                type="password"
                name="confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="peer w-full h-12 rounded-md border-2 border-brand-lighter_orange bg-transparent px-3 pt-5 pb-2 text-sm text-brand-lighter_orange placeholder-transparent focus:border-white focus:outline-none"
              />
              <label className="absolute left-3 top-1 text-brand-lighter_orange font-bold text-md transition-all">
                Confirm new password
              </label>
            </div>

            <button
              disabled={isLoading}
              onClick={handleReset}
              className={` w-1/2 h-12 py-2 rounded bg-brand-light_orange text-brand-gray_green cursor-pointer"`}
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex w-full flex-col items-center jusstify-center">
            <p className="text-xl text-brand-gray_green text-center">
              Password reset successful.
            </p>
            <button
              onClick={backToLogin}
              className="w-1/2 h-12 border rounded-md bg-brand-light_orange text-brand-gray_green font-bold"
            >
              Back to login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usePasswordReset } from "../hooks/userPasswordReset"; // Fixed import

const PasswordReset = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSaved, setIsSaved] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { reset, error, isLoading } = usePasswordReset();

  // Extract token from URL
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (!token) {
      alert("Invalid reset link. Please request a new password reset.");
      navigate("/forgot-password");
    }
  }, [token, navigate]);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const success = await reset(token, newPassword, confirmPassword);
    if (success) {
      setIsSaved(true);
    }
  };

  const backToLogin = () => {
    navigate("/login");
  };

  if (!token) {
    return (
      <div className="w-full h-full bg-brand-lighter_orange flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-500 text-xl">Invalid reset link</p>
          <button onClick={() => navigate("/forgot-password")} className="mt-4">
            Request New Link
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-brand-lighter_orange flex justify-center items-center py-3">
      <div className="w-1/2 h-full border bg-brand-gray_green rounded-md my-10 flex items-center justify-center flex-col py-5 ">
        <h1 className="text-3xl text-brand-lighter_orange mb-5 font-bold">
          Reset Your Password
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {!isSaved ? (
          <form
            onSubmit={handleReset}
            className="flex w-full flex-col items-center gap-5"
          >
            <div className="relative w-3/6">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="peer w-full h-12 rounded-md border-2 border-brand-lighter_orange bg-transparent px-3 pt-5 pb-2 text-sm text-brand-lighter_orange placeholder-transparent focus:border-white focus:outline-none"
                placeholder=" "
                required
                minLength={6}
              />
              <label className="absolute left-3 top-1 text-brand-lighter_orange font-bold text-md">
                New Password
              </label>
            </div>

            <div className="relative w-3/6">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="peer w-full h-12 rounded-md border-2 border-brand-lighter_orange bg-transparent px-3 pt-5 pb-2 text-sm text-brand-lighter_orange placeholder-transparent focus:border-white focus:outline-none"
                placeholder=" "
                required
              />
              <label className="absolute left-3 top-1 text-brand-lighter_orange font-bold text-md">
                Confirm Password
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-1/2 h-12 py-2 rounded bg-brand-light_orange text-brand-gray_green disabled:opacity-50"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-xl text-brand-gray_green text-center mb-4">
              Password reset successful!
            </p>
            <button
              onClick={backToLogin}
              className="w-48 h-12 border rounded-md bg-brand-light_orange text-brand-gray_green font-bold"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;

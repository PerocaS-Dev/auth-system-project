import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [isSent, setIsSent] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const sendEmail = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const json = await response.json();

      if (response.ok) {
        setIsSent(true);
        // Show the token in console for testing (remove in production)
        console.log("Reset token sent to:", email);
      } else {
        setError(json.error || "Failed to send reset email");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail();
  };

  return (
    <div className="w-full h-full bg-brand-light_orange flex justify-center items-center py-5">
      <div className="w-1/3 h-full border-2 rounded-lg border-brand-gray_green flex items-center justify-center px-5 flex-col ">
        <h1 className="text-3xl mb-5 font-bold mb-10 text-3xl text-brand-gray_green">
          Forgot Password?
        </h1>
        {!isSent ? (
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-center gap-5"
          >
            <p className="text-xl text-brand-gray_green text-center">
              Please enter your email address to receive the password reset
              link.
            </p>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-brand-gray_green rounded-md bg-brand-light_orange px-5 w-2/3 h-12"
              placeholder="Enter your email"
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="bg-brand-gray_green text-brand-light_orange font-bold border rounded-md w-1/2 h-12 disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send Email"}
            </button>
          </form>
        ) : (
          <div className="flex w-full flex-col items-center justify-center text-center">
            <p className="text-xl text-brand-gray_green mb-4">
              A password reset link has been sent to <strong>{email}</strong>
            </p>
            <p className="text-lg text-brand-gray_green mb-6">
              Please check your email and click the link to reset your password.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-brand-gray_green text-brand-light_orange font-bold border rounded-md w-1/2 h-12"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

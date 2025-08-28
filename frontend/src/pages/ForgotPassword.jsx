import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, redirect } from "react-router-dom";

const ForgotPassword = () => {
  const [isSent, setIsSent] = useState(false);

  const sendEmail = () => {
    //verify email and then send the email.
    setIsSent(true);
  };

  return (
    <div className="w-full h-full bg-brand-light_orange flex justify-center items-center py-5">
      <div className="w-1/3 h-full border-2 rounded-lg border-brand-gray_green flex items-center justify-center px-5 flex-col ">
        <h1 className="text-3xlmb-5 font-bold mb-10 text-3xl text-brand-gray_green">
          Forgot Password?
        </h1>
        {!isSent ? (
          <div className="flex w-full flex-col items-center gap-5">
            <p className="text-xl text-brand-gray_green text-center">
              Please enter your email address to receive the password reset
              link.
            </p>
            <input
              type="email"
              className="border-2 border-brand-gray_green rounded-md bg-brand-light_orange px-5 w-2/3 h-12"
            />
            <button
              onClick={sendEmail}
              className="bg-brand-gray_green text-brand-light_orange font-bold border rounded-md w-1/2 h-12"
            >
              Send Email
            </button>
          </div>
        ) : (
          <div className="flex w-full flex-col items-center jusstify-center">
            <p className="text-xl text-brand-gray_green text-center">
              A password reset link has been sent to you via email. Please click
              on the link to reset your password.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

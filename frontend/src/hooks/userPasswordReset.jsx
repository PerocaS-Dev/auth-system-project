import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

export const userPasswordReset = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const reset = async (token, newPassword, confirmPassword) => {
    setIsLoading(true);
    setError(null);

    console.log("Sending reset request to:", import.meta.env.VITE_API_BASE_URL);
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/user/reset-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token, // required by backend
          newPassword, // backend expects this name
          confirmPassword, // backend expects this name
        }),
      }
    );

    console.log("Raw response:", response);

    try {
      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
        console.log("Response JSON:", json);
        return false;
      }
      if (response.ok) {
        const { user, accessToken, refreshToken } = json;
        //save the user to local storage
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, accessToken, refreshToken })
        );

        //update the auth context
        // dispatch({
        //   type: "LOGIN",
        //   payload: {
        //     user,
        //     accessToken,
        //     refreshToken,
        //   },
        // });

        setIsLoading(false);
        return true;
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
      return false;
    }
  };

  return { reset, isLoading, error };
};

export default userPasswordReset;

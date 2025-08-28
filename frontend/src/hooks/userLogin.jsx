import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

export const userLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    // console.log(
    //   "Sending signup request to:",
    //   import.meta.env.VITE_API_BASE_URL
    // );
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/user/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    //console.log("Raw response:", response);

    try {
      const json = await response.json();
      //console.log("Login JSON response:", json);

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
        console.log("Response JSON:", json);
        return false;
      }
      if (response.ok) {
        const { accessToken, refreshToken, ...user } = json;
        //save the user to local storage
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, accessToken, refreshToken })
        );

        //update the auth context
        dispatch({
          type: "LOGIN",
          payload: {
            user,
            accessToken,
            refreshToken,
          },
        });

        setIsLoading(false);
        return true;
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
      return false;
    }
  };

  return { login, isLoading, error };
};

export default userLogin;

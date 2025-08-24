import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

export const userSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (
    firstname,
    surname,
    username,
    email,
    password,
    confirmPassword,
    role = "guest"
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch();
  };
};

export default userSignup;

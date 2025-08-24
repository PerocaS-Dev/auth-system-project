import React from "react";
import { AuthContextProvider } from "./AuthContext";

const Providers = ({ children }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};

export default Providers;

import { useAuthContext } from "../context/AuthContext";

export const userLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
  };
  return { logout };
};

export default userLogout;

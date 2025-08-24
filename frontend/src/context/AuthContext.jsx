import React, { createContext, useReducer, useContext, useEffect } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // Add proper null checks
      if (!action.payload || !action.payload.user) {
        return state;
      }
      return {
        isLoggedIn: true,
        user: {
          _id: action.payload.user?._id,
          email: action.payload.user?.email,
          isAdmin: action.payload.user?.role === "admin",
        },
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case "LOGOUT":
      return {
        isLoggedIn: false,
        user: null,
        accessToken: null,
        refreshToken: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoggedIn: false,
    user: null,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed?.accessToken && parsed?.refreshToken) {
          dispatch({
            type: "LOGIN",
            payload: {
              user: parsed,
              accessToken: user.accessToken,
              refreshToken: user.refreshToken,
            },
          });
        }
      } catch (err) {
        console.error("Failed to parse stored user:", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Persist to localStorage when state changes
  useEffect(() => {
    if (state.isLoggedIn) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...state.user,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
        })
      );
    } else {
      localStorage.removeItem("user");
    }
  }, [state]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

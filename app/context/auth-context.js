"use client";

import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [adminAuthState, setAdminAuthState] = useState({
    token: localStorage.getItem("token") || "",
    id: localStorage.getItem("id") || "",
  });

  useEffect(() => {
    localStorage.setItem("token", adminAuthState.token);
    localStorage.setItem("id", adminAuthState.id);
  }, [adminAuthState.token]);

  const setAdminAuthInfo = (data) => {
    setAdminAuthState({
      token: data.token,
      id: data.admin.id,
    });
  };

  const isAdminAuthenticated = () => {
    if (adminAuthState.token) {
      return true;
    } else {
      return false;
    }
  };

  const removeAdminAuth = () => {
    setAdminAuthState({ token: "", id: "" });
    localStorage.removeItem("token"); 
    localStorage.removeItem("id"); 
  };

  return (
    <Provider
      value={{
        adminAuthState,
        setAdminAuthInfo,
        removeAdminAuth,
        isAdminAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };

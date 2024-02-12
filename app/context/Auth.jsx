"use client";

import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);
const { Provider } = AuthContext;

const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

const AuthProvider = ({ children }) => {
  const [adminAuthState, setAdminAuthState] = useState({
    token: "",
    admin: {},
  });

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const admin = JSON.parse(localStorage.getItem("admin"));
    setAdminAuthState({ token, admin });
  }, []);

  const setAdminAuthInfo = (data) => {
    const token = localStorage.setItem("admin_token", data.token);
    const admin = localStorage.setItem("admin", JSON.stringify(data.admin));
    setAdminAuthState({ token, admin });
  };

  const isAdminAuthenticated = () => {
    return !!adminAuthState.token;
  };

  return (
    <Provider
      value={{
        adminAuthState,
        setAdminAuthInfo,
        isAdminAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthProvider, useAuth };

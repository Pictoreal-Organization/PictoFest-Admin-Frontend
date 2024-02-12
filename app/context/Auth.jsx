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
    id: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    // const user = JSON.parse(localStorage.getItem("user"));
    setAdminAuthState({ token, id });
  }, []);

  const setAdminAuthInfo = (data) => {
    const token = localStorage.setItem("token", data.token);
    const id = localStorage.setItem("id", data.token);
    // const user = localStorage.setItem("user", JSON.stringify(data.user));
    setAdminAuthState({ token, id });
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
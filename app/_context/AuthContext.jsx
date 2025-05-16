"use client";

import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const sessionToken = sessionStorage.getItem("token");
    if (storedToken || sessionToken) {
      setToken(storedToken || sessionToken);
    }
  }, []);

  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;

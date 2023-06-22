"use client";

import useLogoutUser from "@/hooks/useLogoutUser";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { logout } = useLogoutUser();

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setIsAdmin(user.role === "admin");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    logout();
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAdmin,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

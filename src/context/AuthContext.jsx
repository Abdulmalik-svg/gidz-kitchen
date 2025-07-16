import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("auth") === "true";
  });

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("auth", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// This hook is what you import in other components
export const useAuth = () => useContext(AuthContext);

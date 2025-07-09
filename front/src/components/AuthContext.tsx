// AuthContext.tsx
import React, { createContext, useContext, useState, type ReactNode } from "react";
import { Deconnection, UserIsLogged } from "../api/Axios";

// 1. Définis le type du contexte
type AuthContextType = {
  isLogged: boolean;
  login: () => void;
  logout: () => void;
};

// 2. Crée une valeur par défaut (dummy)
const defaultAuthContext: AuthContextType = {
  isLogged: false,
  login: () => {},
  logout: () => {},
};

// 3. Passe la valeur par défaut à createContext
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLogged, setIsLogged] = useState(UserIsLogged());

  const login = () => setIsLogged(UserIsLogged());
  const logout = () => {
    Deconnection();
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

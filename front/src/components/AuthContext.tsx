// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Deconnection, GetApi, UserIsLogged } from "../api/Axios";
import type { User } from "../api/User";
import { EndpointRoute } from "../api/Endpoint";

// 1. Définis le type du contexte
type AuthContextType = {
  isLogged: boolean;
  login: () => void;
  logout: () => void;
  me: User | null;
  refreshMe: () => Promise<void>;
};

// 2. Crée une valeur par défaut (dummy)
const defaultAuthContext: AuthContextType = {
  isLogged: false,
  login: () => {},
  logout: () => {},
  me: null,
  refreshMe: async () => {},
};

// 3. Passe la valeur par défaut à createContext
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLogged, setIsLogged] = useState(UserIsLogged());
  const [me, setMe] = useState<User | null>(null);

  const refreshMe = async () => {
    try {
      const res = await GetApi(EndpointRoute.me);
      setMe(res.data ?? null);
    } catch {
      setMe(null);
    }
  };

  useEffect(() => {
    if (isLogged) {
      refreshMe();
      const interval = setInterval(refreshMe, 60000);
      return () => clearInterval(interval);
    } else {
      setMe(null);
    }
  }, [isLogged]);

  const login = () => setIsLogged(UserIsLogged());
  const logout = () => {
    Deconnection();
    setIsLogged(false);
  };


  return (
    <AuthContext.Provider value={{ isLogged, login, logout, me, refreshMe }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Deconnection, GetApi, UserIsLogged } from "../api/Axios";
import type { User } from "../api/User";
import { EndpointRoute } from "../api/Endpoint";

// 1. Définis le type du contexte
type AuthContextType = {
  isLogged: boolean;
  login: () => Promise<void>;
  logout: () => void;
  me: User | null;
  refreshMe: () => Promise<void>;
};

// 2. Crée une valeur par défaut (dummy)
const defaultAuthContext: AuthContextType = {
  isLogged: false,
  login: async () => {},
  logout: () => {},
  me: null,
  refreshMe: async () => {},
};

// 3. Passe la valeur par défaut à createContext
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

function getStoredUser(): User | null {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // On considère qu'un user a un _id (adapte selon ton modèle)
    if (parsed && typeof parsed === "object" && parsed._id) return parsed;
    return null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLogged, setIsLogged] = useState(UserIsLogged());
  const [me, setMe] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "{}") || {}
);


  const refreshMe = async () => {
    try {
      const res = await GetApi(EndpointRoute.me);
      if (res && typeof res === "object" && res._id) {
        if (!me || JSON.stringify(res) !== JSON.stringify(me)) {
          localStorage.setItem("user", JSON.stringify(res));
          setMe(res);
        }
      } else {
        localStorage.removeItem("user");
        setMe(null);
      }
    } catch {
      localStorage.removeItem("user");
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

  const login = async () => {
    await refreshMe();
    setIsLogged(UserIsLogged());
  };
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

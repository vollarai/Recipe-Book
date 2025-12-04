import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../models/user";
import type { UserContextType } from "../models/userContextType";
import { useMock } from "../utils/config";
import { mockUser } from "../mocks/mockUser";

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [tokenState, setTokenState] = useState<string | null>(() => {
    if (useMock) {
      return "DEMO_TOKEN";
    }
    return localStorage.getItem("token");
  });

  const [userState, setUserState] = useState<User | null>(() => {
    if (useMock) {
      return mockUser;
    }

    const raw = localStorage.getItem("user");
    if (!raw) return null;

    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  });

  const setUser = (newUser: User | null) => {
    if (useMock) {
      setUserState(mockUser);
      return;
    }

    setUserState(newUser);
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
  };

  const setToken = (newToken: string | null) => {
    if (useMock) {
      setTokenState("DEMO_TOKEN");
      return;
    }

    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

  const logout = () => {
    if (useMock) {
      return;
    }

    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ user: userState, setUser, token: tokenState, setToken, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside <UserProvider>");
  return ctx;
};

import { createContext } from "react";

export interface AuthContext {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContext | null>(null);

import {createContext} from "react";

export interface AuthContext {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContext | null>(null);
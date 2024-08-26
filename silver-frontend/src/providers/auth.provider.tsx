import {PropsWithChildren, useState} from "react";
import {AuthContext} from "../context/auth.context.tsx";

export function AuthProvider(props: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function login(username: string, password: string) {
    console.log('Logging in with', username, password);
    setIsAuthenticated(true);
  }

  function logout() {
    setIsAuthenticated(false);
  }

  return <AuthContext.Provider value={{
    isAuthenticated,
    login,
    logout,
  }}>
    {props.children}
  </AuthContext.Provider>
}
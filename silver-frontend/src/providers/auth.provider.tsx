import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context.tsx";
import { useSessionStorage } from "../hooks/use-session-storage.tsx";
import { router } from "../libs/router.tsx";
import { client } from "../libs/apollo.client.tsx";
import { encryptTokenService } from "../services/token/encrypt-token.service.ts";

export function AuthProvider(props: PropsWithChildren) {
  const [token, setToken] = useSessionStorage<{
    encryptedData: string;
    iv: string;
  } | null>("token", null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  async function login(token: string) {
    console.log(token);
    const encryptedToken = await encryptTokenService(token);
    setToken(encryptedToken);
    setIsAuthenticated(true);
    await router.invalidate();
    await router.navigate({
      to: "/",
    });
  }

  async function logout() {
    setToken(null);
    setIsAuthenticated(false);
    await client.resetStore();
    await router.invalidate();
    await router.navigate({
      to: "/",
    });
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

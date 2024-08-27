import { useAuth } from "../hooks/use-auth.tsx";
import { router } from "../libs/router.tsx";
import { RouterProvider as TRouterProvider } from "@tanstack/react-router";

export function RouterProvider() {
  const auth = useAuth();
  return <TRouterProvider router={router} context={{ auth }} />;
}

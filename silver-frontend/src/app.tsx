import {createRouter, RouterProvider} from "@tanstack/react-router";
import {AuthProvider} from "./providers/auth.provider.tsx";
import {routeTree} from "./routeTree.gen.ts";
import {useAuth} from "./hooks/use-auth.tsx";

const router = createRouter({
  routeTree, context: {
    auth: undefined!,
  }
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function InnerApp() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}

export function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  )
}
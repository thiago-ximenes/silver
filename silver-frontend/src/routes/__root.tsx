import {createRootRouteWithContext, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/router-devtools'
import {AuthContext} from "../context/auth.context.tsx";

interface MyRouterContext {
  auth: AuthContext
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet/>
      <TanStackRouterDevtools initialIsOpen={false}/>
    </>
  ),
})

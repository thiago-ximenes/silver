import { createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen.ts";

export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

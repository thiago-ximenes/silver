import { createFileRoute } from "@tanstack/react-router";
import { RootLayout } from "../layouts/root.layout.tsx";

export const Route = createFileRoute("/_layout")({
  component: RootLayout,
});

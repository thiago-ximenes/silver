import { createLazyFileRoute } from "@tanstack/react-router";
import { LoginPage } from "../../../pages/guest/login.page.tsx";

export const Route = createLazyFileRoute("/_layout/_guest/login")({
  component: LoginPage,
});

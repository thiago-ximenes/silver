import { createLazyFileRoute } from "@tanstack/react-router";
import { RegisterPage } from "../../../pages/guest/register.page.tsx";

export const Route = createLazyFileRoute("/_layout/_guest/register")({
  component: RegisterPage,
});

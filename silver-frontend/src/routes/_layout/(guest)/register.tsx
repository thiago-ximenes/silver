import { createFileRoute } from "@tanstack/react-router";
import { RegisterPage } from "../../../pages/register.page.tsx";

export const Route = createFileRoute("/_layout/(guest)/register")({
  component: RegisterPage,
});

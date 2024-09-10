import { createLazyFileRoute } from "@tanstack/react-router";
import { NewProjectPage } from "../../../../pages/auth/project/new-project.page.tsx";

export const Route = createLazyFileRoute("/_layout/_auth/project/")({
  component: NewProjectPage,
});

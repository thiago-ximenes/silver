import { createLazyFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "../../../../pages/auth/dashboard.page.tsx";

export const Route = createLazyFileRoute("/_layout/_auth/dashboard/")({
  component: DashboardPage,
});

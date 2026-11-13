import { createFileRoute } from "@tanstack/react-router";
import { DashboardView } from "@/components/bloodlink/dashboard-view";

interface DashboardSearchParams {
  tab?: "overview" | "requests" | "history" | "profile";
}

export const Route = createFileRoute("/dashboard")({
  validateSearch: (search: Record<string, unknown>): DashboardSearchParams => {
    return {
      tab: typeof search.tab === "string" ? (search.tab as DashboardSearchParams["tab"]) : undefined,
    };
  },
  component: DashboardRouteComponent,
});

function DashboardRouteComponent() {
  return <DashboardView />;
}


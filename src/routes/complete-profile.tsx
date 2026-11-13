import { createFileRoute } from "@tanstack/react-router";
import { ProfileForm } from "@/components/bloodlink/profile-form";

export const Route = createFileRoute("/complete-profile")({
  component: CompleteProfileRouteComponent,
});

function CompleteProfileRouteComponent() {
  return <ProfileForm mode="complete" />;
}


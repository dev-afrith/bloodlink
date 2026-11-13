import { createFileRoute } from "@tanstack/react-router";
import { ProfileForm } from "@/components/bloodlink/profile-form";

export const Route = createFileRoute("/edit-profile")({
  component: EditProfileRouteComponent,
});

function EditProfileRouteComponent() {
  return <ProfileForm mode="edit" />;
}


import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/bloodlink/auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign In & Healthcare Portal – BloodLink" },
      {
        name: "description",
        content:
          "Sign in to BloodLink healthcare portal to coordinate voluntary blood donation matching, clinical requirements, and hospital directory services.",
      },
      { property: "og:title", content: "Sign In – BloodLink" },
    ],
  }),
  component: AuthPage,
});


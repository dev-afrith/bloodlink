import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/components/bloodlink/home";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BloodLink – Every Drop Connects a Life" },
      {
        name: "description",
        content:
          "BloodLink is a premier healthcare technology platform connecting voluntary blood donors, blood banks, and urgent patient requests across communities in real-time.",
      },
      { property: "og:title", content: "BloodLink – Every Drop Connects a Life" },
      {
        property: "og:description",
        content:
          "Connecting voluntary blood donors, hospitals, and communities in real-time. Fast, secure, and community-driven.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "BloodLink" },
      { property: "og:image", content: "/og-image.svg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "BloodLink – Every Drop Connects a Life" },
      { name: "twitter:image", content: "/og-image.svg" },
    ],
  }),
  component: Home,
});

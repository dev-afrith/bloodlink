import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/components/bloodlink/home";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BloodLink — Every Drop Connects a Life" },
      {
        name: "description",
        content:
          "Discover a kinder way to connect through voluntary blood donation. Explore BloodLink’s community-first demonstration.",
      },
      { property: "og:title", content: "BloodLink — Every Drop Connects a Life" },
      {
        property: "og:description",
        content:
          "One drop can make a world of difference. A voluntary blood donation community prototype.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

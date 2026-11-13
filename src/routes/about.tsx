import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/bloodlink/info";
import { PageIntro } from "@/components/bloodlink/shared";
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | BloodLink – Every Drop Connects a Life" },
      {
        name: "description",
        content:
          "BloodLink is a mission-driven digital health platform bringing speed, accessibility, and transparency to voluntary blood donation.",
      },
      { property: "og:title", content: "About Us | BloodLink – Every Drop Connects a Life" },
      {
        property: "og:description",
        content:
          "BloodLink is a mission-driven digital health platform bringing speed, accessibility, and transparency to voluntary blood donation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  return (
    <>
      <AboutPage />
    </>
  );
}

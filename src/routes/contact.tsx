import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/bloodlink/info";
export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | BloodLink – Every Drop Connects a Life" },
      {
        name: "description",
        content:
          "Connect with the BloodLink healthcare community and explore partnership opportunities.",
      },
      { property: "og:title", content: "Contact Us | BloodLink – Every Drop Connects a Life" },
      {
        property: "og:description",
        content:
          "Connect with the BloodLink healthcare community and explore partnership opportunities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  return <InfoPage kind="contact" />;
}

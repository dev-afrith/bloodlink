import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/bloodlink/info";
export const Route = createFileRoute("/donation-guide")({
  head: () => ({
    meta: [
      { title: "Donation Guide | BloodLink – Every Drop Connects a Life" },
      {
        name: "description",
        content:
          "Comprehensive preparation guidelines, safety protocols, and aftercare advice for voluntary blood donation.",
      },
      { property: "og:title", content: "Donation Guide | BloodLink – Every Drop Connects a Life" },
      {
        property: "og:description",
        content:
          "Comprehensive preparation guidelines, safety protocols, and aftercare advice for voluntary blood donation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  return <InfoPage kind="donation-guide" />;
}

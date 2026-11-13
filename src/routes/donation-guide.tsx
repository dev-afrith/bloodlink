import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/bloodlink/info";
export const Route = createFileRoute("/donation-guide")({
  head: () => ({
    meta: [
      { title: "Donation Guide | BloodLink" },
      { name: "description", content: "Donation Guide for the BloodLink donation demonstration." },
      { property: "og:title", content: "Donation Guide | BloodLink" },
      {
        property: "og:description",
        content: "Donation Guide for the BloodLink donation demonstration.",
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

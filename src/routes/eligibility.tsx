import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/bloodlink/info";
export const Route = createFileRoute("/eligibility")({
  head: () => ({
    meta: [
      { title: "Donation Eligibility | BloodLink" },
      {
        name: "description",
        content: "Donation Eligibility for the BloodLink donation demonstration.",
      },
      { property: "og:title", content: "Donation Eligibility | BloodLink" },
      {
        property: "og:description",
        content: "Donation Eligibility for the BloodLink donation demonstration.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  return <InfoPage kind="eligibility" />;
}

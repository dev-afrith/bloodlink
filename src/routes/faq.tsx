import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/bloodlink/info";
export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | BloodLink" },
      {
        name: "description",
        content: "Frequently Asked Questions for the BloodLink donation demonstration.",
      },
      { property: "og:title", content: "Frequently Asked Questions | BloodLink" },
      {
        property: "og:description",
        content: "Frequently Asked Questions for the BloodLink donation demonstration.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  return <InfoPage kind="faq" />;
}

import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/bloodlink/info";
export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact BloodLink | BloodLink" },
      {
        name: "description",
        content: "Contact BloodLink for the BloodLink donation demonstration.",
      },
      { property: "og:title", content: "Contact BloodLink | BloodLink" },
      {
        property: "og:description",
        content: "Contact BloodLink for the BloodLink donation demonstration.",
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

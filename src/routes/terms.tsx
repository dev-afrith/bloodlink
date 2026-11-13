import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/bloodlink/info";
export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions | BloodLink" },
      {
        name: "description",
        content: "Terms and Conditions for the BloodLink donation demonstration.",
      },
      { property: "og:title", content: "Terms and Conditions | BloodLink" },
      {
        property: "og:description",
        content: "Terms and Conditions for the BloodLink donation demonstration.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  return <InfoPage kind="terms" />;
}

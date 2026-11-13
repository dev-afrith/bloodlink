import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/bloodlink/info";
export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | BloodLink" },
      { name: "description", content: "Privacy Policy for the BloodLink donation demonstration." },
      { property: "og:title", content: "Privacy Policy | BloodLink" },
      {
        property: "og:description",
        content: "Privacy Policy for the BloodLink donation demonstration.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  return <InfoPage kind="privacy" />;
}

import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/bloodlink/info";
export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | BloodLink – Every Drop Connects a Life" },
      {
        name: "description",
        content:
          "Terms of service, community guidelines, and platform terms governing BloodLink.",
      },
      { property: "og:title", content: "Terms & Conditions | BloodLink – Every Drop Connects a Life" },
      {
        property: "og:description",
        content:
          "Terms of service, community guidelines, and platform terms governing BloodLink.",
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

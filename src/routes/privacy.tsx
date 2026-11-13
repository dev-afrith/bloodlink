import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/bloodlink/info";
export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | BloodLink – Every Drop Connects a Life" },
      {
        name: "description",
        content:
          "BloodLink’s privacy commitments, data handling practices, and donor confidentiality standards.",
      },
      { property: "og:title", content: "Privacy Policy | BloodLink – Every Drop Connects a Life" },
      {
        property: "og:description",
        content:
          "BloodLink’s privacy commitments, data handling practices, and donor confidentiality standards.",
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

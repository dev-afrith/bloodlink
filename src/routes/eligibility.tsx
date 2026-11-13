import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/bloodlink/info";
export const Route = createFileRoute("/eligibility")({
  head: () => ({
    meta: [
      { title: "Donation Eligibility Criteria | BloodLink – Every Drop Connects a Life" },
      {
        name: "description",
        content:
          "Find out if you can donate blood: health parameters, donation intervals, and medical criteria.",
      },
      { property: "og:title", content: "Donation Eligibility Criteria | BloodLink – Every Drop Connects a Life" },
      {
        property: "og:description",
        content:
          "Find out if you can donate blood: health parameters, donation intervals, and medical criteria.",
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

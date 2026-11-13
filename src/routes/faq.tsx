import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/bloodlink/info";
export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | BloodLink – Every Drop Connects a Life" },
      {
        name: "description",
        content:
          "Answers to frequent questions on donor safety, blood testing, confidentiality, and platform workflows.",
      },
      { property: "og:title", content: "Frequently Asked Questions | BloodLink – Every Drop Connects a Life" },
      {
        property: "og:description",
        content:
          "Answers to frequent questions on donor safety, blood testing, confidentiality, and platform workflows.",
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

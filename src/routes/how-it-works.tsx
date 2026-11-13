import { createFileRoute } from "@tanstack/react-router";
import { HowPage } from "@/components/bloodlink/info";
import { PageIntro } from "@/components/bloodlink/shared";
export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How BloodLink Works | BloodLink" },
      {
        name: "description",
        content: "Discover, connect and coordinate through healthcare providers.",
      },
      { property: "og:title", content: "How BloodLink Works | BloodLink" },
      {
        property: "og:description",
        content: "Discover, connect and coordinate through healthcare providers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  return (
    <>
      <HowPage />
    </>
  );
}

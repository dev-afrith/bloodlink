import { createFileRoute } from "@tanstack/react-router";
import { HowPage } from "@/components/bloodlink/info";
import { PageIntro } from "@/components/bloodlink/shared";
export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works | BloodLink – Every Drop Connects a Life" },
      {
        name: "description",
        content:
          "Discover how BloodLink connects voluntary blood donors with hospitals, blood banks, and recipients in three simple steps.",
      },
      { property: "og:title", content: "How It Works | BloodLink – Every Drop Connects a Life" },
      {
        property: "og:description",
        content:
          "Discover how BloodLink connects voluntary blood donors with hospitals, blood banks, and recipients in three simple steps.",
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

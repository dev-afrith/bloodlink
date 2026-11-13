import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/bloodlink/info";
import { PageIntro } from "@/components/bloodlink/shared";
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About BloodLink | BloodLink" },
      { name: "description", content: "The community-first purpose behind BloodLink." },
      { property: "og:title", content: "About BloodLink | BloodLink" },
      { property: "og:description", content: "The community-first purpose behind BloodLink." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  return (
    <>
      <AboutPage />
    </>
  );
}

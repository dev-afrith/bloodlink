import { createFileRoute } from "@tanstack/react-router";
import { Requests } from "@/components/bloodlink/discovery";
import { PageIntro } from "@/components/bloodlink/shared";
export const Route = createFileRoute("/requests")({
  head: () => ({
    meta: [
      { title: "Emergency Blood Requests | BloodLink – Every Drop Connects a Life" },
      {
        name: "description",
        content:
          "Monitor urgent and planned blood requirements across hospitals and healthcare facilities.",
      },
      { property: "og:title", content: "Emergency Blood Requests | BloodLink – Every Drop Connects a Life" },
      {
        property: "og:description",
        content:
          "Monitor urgent and planned blood requirements across hospitals and healthcare facilities.",
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
      <PageIntro
        eyebrow="DEMONSTRATION SCENARIOS"
        title="Emergency Blood Requests"
        description="Explore demonstration blood component requirements showing how healthcare facilities broadcast urgent patient needs."
      />
      <section className="section">
        <div className="container">
          <Requests />
        </div>
      </section>
    </>
  );
}

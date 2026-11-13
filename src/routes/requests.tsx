import { createFileRoute } from "@tanstack/react-router";
import { Requests } from "@/components/bloodlink/discovery";
import { PageIntro } from "@/components/bloodlink/shared";
export const Route = createFileRoute("/requests")({
  head: () => ({
    meta: [
      { title: "Sample Blood Requests | BloodLink" },
      {
        name: "description",
        content: "Explore illustrative blood requirements, not live emergencies.",
      },
      { property: "og:title", content: "Sample Blood Requests | BloodLink" },
      {
        property: "og:description",
        content: "Explore illustrative blood requirements, not live emergencies.",
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
        eyebrow="EVERY DROP CONNECTS A LIFE"
        title="Sample Blood Requests"
        description="Explore illustrative blood requirements, not live emergencies."
      />
      <section className="section">
        <div className="container">
          <Requests />
        </div>
      </section>
    </>
  );
}

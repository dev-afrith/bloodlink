import { createFileRoute } from "@tanstack/react-router";
import { BankDirectory } from "@/components/bloodlink/discovery";
import { PageIntro } from "@/components/bloodlink/shared";
export const Route = createFileRoute("/blood-banks")({
  head: () => ({
    meta: [
      { title: "Blood Bank Directory | BloodLink" },
      { name: "description", content: "Explore fictional blood bank listings in Indian cities." },
      { property: "og:title", content: "Blood Bank Directory | BloodLink" },
      {
        property: "og:description",
        content: "Explore fictional blood bank listings in Indian cities.",
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
        title="Blood Bank Directory"
        description="Explore fictional blood bank listings in Indian cities."
      />
      <section className="section">
        <div className="container">
          <BankDirectory />
        </div>
      </section>
    </>
  );
}

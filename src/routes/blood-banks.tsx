import { createFileRoute } from "@tanstack/react-router";
import { BankDirectory } from "@/components/bloodlink/discovery";
import { PageIntro } from "@/components/bloodlink/shared";
export const Route = createFileRoute("/blood-banks")({
  head: () => ({
    meta: [
      { title: "Blood Bank Directory | BloodLink – Every Drop Connects a Life" },
      {
        name: "description",
        content:
          "Directory of verified blood banks, component testing laboratories, and donation centers across India.",
      },
      { property: "og:title", content: "Blood Bank Directory | BloodLink – Every Drop Connects a Life" },
      {
        property: "og:description",
        content:
          "Directory of verified blood banks, component testing laboratories, and donation centers across India.",
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
        eyebrow="FACILITY DIRECTORY"
        title="Blood Bank Directory"
        description="Explore demonstration blood bank listings, component separation capabilities, and clinical storage centers."
      />
      <section className="section">
        <div className="container">
          <BankDirectory />
        </div>
      </section>
    </>
  );
}

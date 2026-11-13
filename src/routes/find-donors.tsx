import { createFileRoute } from "@tanstack/react-router";
import { DonorSearch } from "@/components/bloodlink/discovery";
import { PageIntro } from "@/components/bloodlink/shared";
import { z } from "zod";
export const Route = createFileRoute("/find-donors")({
  validateSearch: z.object({ group: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Find Donors | BloodLink – Every Drop Connects a Life" },
      {
        name: "description",
        content:
          "Search verified voluntary blood donors across India by blood group, state, and city in real-time.",
      },
      { property: "og:title", content: "Find Donors | BloodLink – Every Drop Connects a Life" },
      {
        property: "og:description",
        content:
          "Search verified voluntary blood donors across India by blood group, state, and city in real-time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  const { group } = Route.useSearch();
  return (
    <>
      <PageIntro
        eyebrow="SAMPLE DONOR REGISTRY"
        title="Find Blood Donors"
        description="Filter demonstration voluntary donor profiles by blood group, state, and city. All profiles are illustrative simulation records."
      />
      <section className="section">
        <div className="container">
          <DonorSearch key={group} initialGroup={group ?? ""} />
        </div>
      </section>
    </>
  );
}

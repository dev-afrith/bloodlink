import { createFileRoute } from "@tanstack/react-router";
import { DonorSearch } from "@/components/bloodlink/discovery";
import { PageIntro } from "@/components/bloodlink/shared";
import { z } from "zod";
export const Route = createFileRoute("/find-donors")({
  validateSearch: z.object({ group: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Find Blood Donors | BloodLink" },
      {
        name: "description",
        content: "Search fictional donor profiles by blood group and location.",
      },
      { property: "og:title", content: "Find Blood Donors | BloodLink" },
      {
        property: "og:description",
        content: "Search fictional donor profiles by blood group and location.",
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
        eyebrow="EVERY DROP CONNECTS A LIFE"
        title="Find Blood Donors"
        description="Search fictional donor profiles by blood group and location."
      />
      <section className="section">
        <div className="container">
          <DonorSearch key={group} initialGroup={group ?? ""} />
        </div>
      </section>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { RequestBloodForm } from "@/components/bloodlink/request-blood-form";
import { PageIntro, FinalCTA } from "@/components/bloodlink/shared";

export const Route = createFileRoute("/request-blood")({
  head: () => ({
    meta: [
      { title: "Request Blood | BloodLink – Every Drop Connects a Life" },
      {
        name: "description",
        content:
          "Tell us what you need. Find the right blood donation support. Submit patient blood requirements for immediate or planned clinical transfusion across hospitals in India.",
      },
      { property: "og:title", content: "Request Blood | BloodLink – Every Drop Connects a Life" },
      {
        property: "og:description",
        content:
          "Tell us what you need. Find the right blood donation support. Submit patient blood requirements for immediate or planned clinical transfusion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RequestBloodPage,
});

function RequestBloodPage() {
  return (
    <>
      <PageIntro
        eyebrow="CLINICAL REQUIREMENT INTAKE"
        title="Request Blood"
        description="Tell us what you need. Find the right blood donation support."
      />

      <section className="section bg-slate-50/50 py-10 md:py-16">
        <div className="container max-w-6xl">
          <RequestBloodForm />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}


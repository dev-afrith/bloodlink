import { createFileRoute } from "@tanstack/react-router";
import { RegistrationForm } from "@/components/bloodlink/registration";
import { PageIntro } from "@/components/bloodlink/shared";
export const Route = createFileRoute("/become-a-donor")({
  head: () => ({
    meta: [
      { title: "Become a Voluntary Donor | BloodLink" },
      { name: "description", content: "Try a temporary demonstration donor registration." },
      { property: "og:title", content: "Become a Voluntary Donor | BloodLink" },
      { property: "og:description", content: "Try a temporary demonstration donor registration." },
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
        title="Become a Voluntary Donor"
        description="Try a temporary demonstration donor registration."
      />
      <section className="section">
        <div className="container">
          <RegistrationForm />
        </div>
      </section>
    </>
  );
}

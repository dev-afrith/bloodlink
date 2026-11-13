import { createFileRoute } from "@tanstack/react-router";
import { RegistrationForm } from "@/components/bloodlink/registration";
import { PageIntro } from "@/components/bloodlink/shared";
export const Route = createFileRoute("/become-a-donor")({
  head: () => ({
    meta: [
      { title: "Become a Donor | BloodLink – Every Drop Connects a Life" },
      {
        name: "description",
        content:
          "Join BloodLink’s voluntary blood donor network. Connect with hospitals and patients in need with a single voluntary registration.",
      },
      { property: "og:title", content: "Become a Donor | BloodLink – Every Drop Connects a Life" },
      {
        property: "og:description",
        content:
          "Join BloodLink’s voluntary blood donor network. Connect with hospitals and patients in need with a single voluntary registration.",
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
        eyebrow="VOLUNTARY DONOR REGISTRATION"
        title="Become a Voluntary Donor"
        description="Join our voluntary donor community. Register to support local hospitals and patients in clinical need."
      />
      <section className="section">
        <div className="container">
          <RegistrationForm />
        </div>
      </section>
    </>
  );
}

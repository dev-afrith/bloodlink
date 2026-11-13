import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageIntro, FinalCTA, DemoNotice } from "./shared";
import { HowSteps, Awareness } from "./home";
import campaign from "@/assets/donor-campaign.jpg";
export function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="OUR PURPOSE"
        title="More than a drop. A human connection."
        description="BloodLink is a digital bridge connecting people through the gift of voluntary blood donation."
      />
      <section className="section">
        <div className="container about-layout">
          <img
            src={campaign}
            alt="A smiling voluntary donation community member"
            width={1024}
            height={1024}
            loading="lazy"
          />
          <div>
            <span className="eyebrow">EVERY DROP CONNECTS A LIFE.</span>
            <h2>
              Built on kindness.
              <br />
              Connected by purpose.
            </h2>
            <p>
              We believe discovering blood donation information should feel accessible,
              compassionate and clear. BloodLink brings donor discovery, blood bank information and
              donation awareness into one thoughtful experience.
            </p>
            <p>
              This hackathon prototype explores how technology can support voluntary donation. It
              does not operate a real medical service, verify donors or coordinate emergencies.
            </p>
            <Button asChild>
              <Link to="/become-a-donor">Explore Donor Registration</Link>
            </Button>
            <DemoNotice />
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
export function HowPage() {
  return (
    <>
      <PageIntro
        eyebrow="HOW BLOODLINK WORKS"
        title="Three steps. One meaningful connection."
        description="Discover information, understand the next steps, and coordinate through appropriate healthcare providers."
      />
      <section className="section section-white">
        <div className="container">
          <HowSteps />
          <DemoNotice>
            BloodLink is a demonstration. All clinical decisions, compatibility testing and real
            donation coordination belong to qualified healthcare providers.
          </DemoNotice>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
const faq = [
  [
    "Is BloodLink a real emergency service?",
    "No. This is a hackathon demonstration, not an emergency service. Contact local emergency services and your treating hospital for urgent medical needs.",
  ],
  [
    "Are these donors and blood banks real?",
    "No. All donor profiles, requests, blood bank organisations and testimonials are fictional. Availability, dates, ratings and statistics are illustrative.",
  ],
  [
    "What happens when I register?",
    "Your demonstration submission is held temporarily while the registration page is open. No account is created and no email or SMS is sent. Please use fictional details.",
  ],
  [
    "Who decides whether I can donate blood?",
    "Qualified medical personnel at an authorised donation facility assess eligibility according to your health and applicable local guidelines. BloodLink cannot certify eligibility.",
  ],
  [
    "Can I contact a sample donor?",
    "No. The prototype intentionally contains no real contact information. Real donation arrangements must be coordinated with appropriate healthcare providers.",
  ],
];
export const infoContent: Record<
  string,
  {
    eyebrow: string;
    title: string;
    description: string;
    sections: { title: string; text: string }[];
  }
> = {
  contact: {
    eyebrow: "LET’S KEEP HOPE CONNECTED",
    title: "Contact BloodLink",
    description: "A community-first concept, built with care.",
    sections: [
      {
        title: "About this demonstration",
        text: "BloodLink is a hackathon website prototype. A support inbox, phone line and social media accounts are not connected. No real contact details are displayed.",
      },
      {
        title: "Need blood or urgent medical help?",
        text: "Please contact your treating hospital, an authorised blood bank or local emergency services. Do not wait for a response from this demonstration website.",
      },
      {
        title: "Explore the community",
        text: "You can explore fictional donor profiles, try the directory, or complete a demonstration registration using fictional details.",
      },
    ],
  },
  privacy: {
    eyebrow: "YOUR TRUST MATTERS",
    title: "Privacy, with care.",
    description: "A clear explanation of how this demonstration handles information.",
    sections: [
      {
        title: "Temporary demonstration submissions",
        text: "Registration details remain in temporary page state only and disappear when you leave or reload the page. No donor database, account or external contact message is created. Please use fictional details rather than real personal information.",
      },
      {
        title: "No real donor information",
        text: "All donor profiles, requests and directory records are fictional demonstration data. There are no real donor contact details.",
      },
      {
        title: "Website resources",
        text: "The website loads fonts from Google Fonts and images included with this project. Hosting may provide its own service telemetry. This notice describes this prototype and is not a final policy for a medical service.",
      },
    ],
  },
  terms: {
    eyebrow: "CLEAR EXPECTATIONS",
    title: "Terms of this demonstration.",
    description:
      "BloodLink is a product concept, not a functioning healthcare or emergency service.",
    sections: [
      {
        title: "Demonstration use only",
        text: "The website exists for a hackathon design demonstration. All records, availability, requests, organisations, testimonials and statistics are illustrative and must not be relied on for real care.",
      },
      {
        title: "No clinical advice or verification",
        text: "BloodLink does not assess eligibility, verify medical information, guarantee availability, offer blood products or coordinate transfusions. Qualified healthcare providers determine eligibility, compatibility and treatment.",
      },
      {
        title: "Responsible use",
        text: "Use fictional details when trying the registration form. For actual healthcare needs, consult your treating hospital or an authorised donation facility. For emergencies, contact local emergency services.",
      },
    ],
  },
  "donation-guide": {
    eyebrow: "KNOWLEDGE SAVES LIVES TOO",
    title: "A thoughtful guide to giving.",
    description: "General donation awareness, with medical decisions left to the professionals.",
    sections: [
      {
        title: "Before your visit",
        text: "Contact an authorised donation centre about its local requirements. Follow its guidance on food, hydration, identification and any medication questions. Do not stop prescribed medication without medical advice.",
      },
      {
        title: "At the donation centre",
        text: "A typical visit includes registration, a confidential health review and a brief medical assessment. Trained staff use sterile, single-use donation equipment. Ask questions and tell staff if you feel unwell.",
      },
      {
        title: "After donating",
        text: "Rest, take refreshments and follow the centre’s aftercare instructions. Tell staff immediately if you feel faint or unwell. Ask your donation centre about the safe interval before a future donation.",
      },
      {
        title: "Recognised guidance",
        text: "This is general awareness based on WHO guidance on safe voluntary blood donation, not personalised medical advice. Local policies and qualified medical staff determine the appropriate process for you.",
      },
    ],
  },
  eligibility: {
    eyebrow: "SAFE DONATION STARTS WITH CARE",
    title: "Could you be a blood donor?",
    description: "Only qualified medical personnel can decide your eligibility.",
    sections: [
      {
        title: "An individual assessment",
        text: "Donation centres assess your general health, age, weight, haemoglobin, medication, medical history and the interval since your last donation. Requirements depend on local rules and the type of donation.",
      },
      {
        title: "When to ask for guidance",
        text: "Discuss illness, medication, pregnancy, recent travel, procedures and previous donation reactions confidentially with medical staff. Do not self-certify eligibility based on an online checklist.",
      },
      {
        title: "Every willing person matters",
        text: "If you cannot donate today, you can still support awareness and encourage eligible voluntary donors. BloodLink’s demonstration registration does not provide medical clearance.",
      },
    ],
  },
};
export function InfoPage({ kind }: { kind: string }) {
  if (kind === "faq")
    return (
      <>
        <PageIntro
          eyebrow="A LITTLE CLARITY"
          title="Your questions, answered."
          description="The things worth knowing before exploring BloodLink."
        />
        <section className="section">
          <div className="container prose-content">
            {faq.map(([q, a]) => (
              <details className="faq-item" key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
      </>
    );
  const page = infoContent[kind];
  if (!page) return null;
  return (
    <>
      <PageIntro eyebrow={page.eyebrow} title={page.title} description={page.description} />
      <section className="section">
        <div className="container prose-content">
          {page.sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </section>
          ))}
          {kind === "donation-guide" && <Awareness />}
          {kind === "contact" && (
            <div className="button-row">
              <Button asChild>
                <Link to="/find-donors">Explore Donors</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/faq">Read FAQs</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

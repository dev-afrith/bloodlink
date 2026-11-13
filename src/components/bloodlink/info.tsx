import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageIntro, FinalCTA, DemoNotice } from "./shared";
import { HowSteps, Awareness } from "./home";
import campaign from "@/assets/donor-campaign.jpg";

export function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="OUR PURPOSE & MISSION"
        title="More than a drop. A human connection."
        description="BloodLink is an advanced healthcare technology platform connecting people through the life-saving gift of voluntary blood donation."
      />
      <section className="section bg-white">
        <div className="container about-layout">
          <img
            src={campaign}
            alt="A smiling voluntary donation community member"
            width={1024}
            height={1024}
            loading="lazy"
            className="rounded-2xl shadow-md border border-slate-200"
          />
          <div className="space-y-4">
            <span className="eyebrow">EVERY DROP CONNECTS A LIFE.</span>
            <h2 className="text-3xl font-display font-extrabold text-slate-900 leading-tight">
              Built on kindness.
              <br />
              Connected by purpose.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We believe discovering blood donation information should feel accessible,
              compassionate, and immediate. BloodLink unifies voluntary donor discovery, accredited blood bank networks, and community emergency requests into one seamless digital experience.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our platform adheres to World Health Organization (WHO) voluntary blood donation standards and promotes voluntary, unpaid donation as the safest and most sustainable foundation for healthcare.
            </p>
            <div className="pt-2">
              <Button asChild className="bg-[#C8102E] hover:bg-[#8F1027] text-white font-semibold">
                <Link to="/become-a-donor">Explore Voluntary Donor Registration</Link>
              </Button>
            </div>
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
          <div className="mt-8">
            <DemoNotice>
              BloodLink provides voluntary donor discovery and awareness. All clinical compatibility testing and transfusion coordination are carried out by licensed healthcare providers.
            </DemoNotice>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

const faq = [
  [
    "How does BloodLink help blood donors and recipients?",
    "BloodLink connects voluntary blood donors with accredited blood banks and urgent hospital requests, simplifying the search for compatible blood components in real time.",
  ],
  [
    "Is BloodLink an emergency ambulance or clinical dispatch service?",
    "No. BloodLink is a voluntary discovery and coordination platform. In acute life-threatening emergencies, immediately dial 108 / 112 or visit your nearest hospital emergency room.",
  ],
  [
    "Who is eligible to donate blood in India?",
    "Generally, healthy adults aged 18–65, weighing at least 45 kg with normal hemoglobin (≥12.5 g/dL) and pulse/blood pressure within acceptable ranges. A medical officer at the donation center performs confidential eligibility screening.",
  ],
  [
    "How frequently can voluntary donors donate blood?",
    "Healthy males can typically donate whole blood every 3 months (90 days), and females every 4 months (120 days). Platelet donors (apheresis) can donate more frequently under clinical supervision.",
  ],
  [
    "Are donor contact details kept private?",
    "Yes. BloodLink prioritizes donor privacy and patient safety. Direct contact details are safeguarded and donation arrangements are facilitated through licensed healthcare facilities.",
  ],
  [
    "Does BloodLink charge any fee for donor registration or search?",
    "No. BloodLink is 100% free and voluntary. Voluntary unpaid donation is the ethical and safety standard mandated by WHO and the National Blood Transfusion Council (NBTC).",
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
    description: "Connect with our platform team, healthcare partners, and community advocates.",
    sections: [
      {
        title: "Platform Support & Partnership Inquiries",
        text: "BloodLink works with hospitals, colleges, corporate CSR teams, and non-profit blood bank societies to encourage voluntary blood donation drives across India.",
      },
      {
        title: "Urgent Medical Assistance Notice",
        text: "If you have an urgent medical emergency, please directly reach out to your attending hospital or call emergency dispatch (108 / 112). Do not delay emergency care awaiting a digital reply.",
      },
      {
        title: "Voluntary Community Network",
        text: "Explore our voluntary donor search, review live sample requests, or complete a voluntary donor registration.",
      },
    ],
  },
  privacy: {
    eyebrow: "DATA ETHICS & PRIVACY",
    title: "Privacy and Confidentiality.",
    description: "Transparent standards for safeguarding healthcare discovery data.",
    sections: [
      {
        title: "Protection of Personal Information",
        text: "We collect donor information solely to facilitate voluntary donation matches. Personal data is never monetized, sold, or shared with third-party advertisers.",
      },
      {
        title: "Confidential Clinical Communications",
        text: "Health screening and eligibility inquiries remain confidential between donors and medical staff at accredited transfusion facilities.",
      },
      {
        title: "Secure Infrastructure",
        text: "The platform runs on modern secure infrastructure with encrypted transmission. Demonstration data is ephemeral and does not expose real medical records.",
      },
    ],
  },
  terms: {
    eyebrow: "PLATFORM TERMS",
    title: "Terms & Community Guidelines.",
    description:
      "Standards of ethical participation and responsible voluntary blood donation.",
    sections: [
      {
        title: "Voluntary & Ethical Principle",
        text: "BloodLink is strictly dedicated to voluntary, uncompensated blood donation. Any commercial transaction or paid donor solicitation is prohibited by law.",
      },
      {
        title: "Medical Disclaimer",
        text: "Information on BloodLink is educational and supportive. It does not replace professional clinical assessment, transfusion cross-matching, or emergency care by qualified doctors.",
      },
      {
        title: "User Responsibility",
        text: "Donors and community members must provide truthful information regarding their health history and follow all instructions given by medical teams at collection centers.",
      },
    ],
  },
  "donation-guide": {
    eyebrow: "SAFE DONATION PROTOCOL",
    title: "A Thoughtful Guide to Giving.",
    description: "Preparation steps, safety protocols, and aftercare advice for voluntary donors.",
    sections: [
      {
        title: "Before Your Donation",
        text: "Get adequate sleep (at least 6-8 hours), drink plenty of fluids (water or fruit juice), and eat a healthy meal within 2-3 hours before donating. Avoid fatty foods and alcohol for 24 hours.",
      },
      {
        title: "At the Collection Center",
        text: "You will complete a quick health check covering temperature, pulse, blood pressure, and hemoglobin. Donation takes only 8–10 minutes using single-use sterile needles.",
      },
      {
        title: "Aftercare & Recovery",
        text: "Rest for 10-15 minutes after donation and enjoy complimentary refreshments. Keep the bandage on for a few hours, drink plenty of fluids, and avoid heavy lifting for the rest of the day.",
      },
      {
        title: "Recognized Clinical Standards",
        text: "All guidance conforms to World Health Organization (WHO) and National Blood Transfusion Council (NBTC) safety frameworks.",
      },
    ],
  },
  eligibility: {
    eyebrow: "DONOR HEALTH CRITERIA",
    title: "Who Can Donate Blood?",
    description: "Key parameters that determine voluntary donation safety.",
    sections: [
      {
        title: "General Eligibility Parameters",
        text: "Age between 18 and 65 years, weight at least 45 kg, hemoglobin level of 12.5 g/dL or higher, normal blood pressure and pulse, and general wellness on the day of donation.",
      },
      {
        title: "Temporary Deferral Conditions",
        text: "Recent minor illness, fever, dental extraction, antibiotic therapy, recent tattooing (within 6 months), or travel to certain endemic regions may require temporary deferral.",
      },
      {
        title: "Individual Medical Review",
        text: "A qualified doctor at the donation center will review your health profile to ensure donation is completely safe for both you and the recipient.",
      },
    ],
  },
};

export function InfoPage({ kind }: { kind: string }) {
  if (kind === "faq")
    return (
      <>
        <PageIntro
          eyebrow="FREQUENTLY ASKED QUESTIONS"
          title="Your questions, answered."
          description="Clear facts about voluntary blood donation, safety, and how BloodLink works."
        />
        <section className="section bg-white">
          <div className="container prose-content max-w-3xl">
            {faq.map(([q, a]) => (
              <details className="faq-item group bg-slate-50 border border-slate-200 rounded-xl p-5 mb-4 cursor-pointer" key={q}>
                <summary className="font-bold text-slate-900 text-base list-none flex justify-between items-center">
                  <span>{q}</span>
                  <span className="text-[#C8102E] font-bold text-lg group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm text-slate-600 mt-3 pt-3 border-t border-slate-200 leading-relaxed">{a}</p>
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
      <section className="section bg-white">
        <div className="container prose-content max-w-3xl space-y-8">
          {page.sections.map((s) => (
            <section key={s.title} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              <h2 className="text-xl font-bold font-display text-slate-900 mb-2">{s.title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{s.text}</p>
            </section>
          ))}
          {kind === "donation-guide" && <Awareness />}
          {kind === "contact" && (
            <div className="button-row pt-4 flex gap-3">
              <Button asChild className="bg-[#C8102E] hover:bg-[#8F1027] text-white">
                <Link to="/find-donors">Explore Donors</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/faq">Read Common FAQs</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

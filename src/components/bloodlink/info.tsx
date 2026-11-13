import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageIntro, FinalCTA, DemoNotice } from "./shared";
import { HowSteps, Awareness } from "./home";
import { DonationProcessInfographic, DonationImpactChart } from "./charts";
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
            className="rounded-2xl shadow-xl border border-slate-200/80 object-cover"
          />
          <div className="space-y-5">
            <span className="eyebrow text-[#C8102E] font-bold tracking-widest">
              <span className="bg-[#C8102E]" />
              EVERY DROP CONNECTS A LIFE
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-950 leading-[1.18] tracking-tight">
              Built on kindness.
              <br />
              <span className="text-[#C8102E]">Connected by purpose.</span>
            </h2>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              We believe discovering blood donation information should feel accessible,
              compassionate, and immediate. BloodLink unifies voluntary donor discovery, accredited blood bank networks, and community emergency requests into one seamless digital experience.
            </p>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              Our platform adheres to World Health Organization (WHO) voluntary blood donation standards and promotes voluntary, unpaid donation as the safest and most sustainable foundation for healthcare.
            </p>
            <div className="pt-2">
              <Button asChild className="bg-gradient-to-r from-[#C8102E] to-[#8F1027] hover:from-[#A60D25] hover:to-[#730D20] text-white font-semibold rounded-xl h-11 px-5 shadow-md">
                <Link to="/become-a-donor">Explore Voluntary Donor Registration</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Page Impact Metrics Chart */}
      <section className="section bg-slate-50 border-t border-slate-200/80">
        <div className="container max-w-4xl">
          <DonationImpactChart />
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

          <div className="mt-16">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="eyebrow text-[#C8102E] font-bold tracking-widest justify-center">
                <span className="bg-[#C8102E]" />
                DONATION DAY JOURNEY
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-extrabold text-slate-950 mt-2">
                What to Expect at the Donation Center
              </h2>
              <p className="text-xs md:text-sm text-slate-600 mt-2">
                Every voluntary donation takes less than 45 minutes from arrival to refreshment.
              </p>
            </div>
            <DonationProcessInfographic />
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
        text: "The platform runs on modern secure infrastructure with encrypted transmission. All participant records are safeguarded and comply with healthcare data privacy practices.",
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
    description: "Detailed parameters that determine voluntary donation safety. Eligibility criteria protect both the generous donor and the vulnerable recipient.",
    sections: [
      {
        title: "1. General Age & Weight Requirements",
        text: "Donors must generally be between 18 and 65 years of age. First-time donors are typically accepted up to age 60. Donors must weigh at least 45 kg (50 kg for apheresis or 450 mL whole blood collection) to ensure fluid balance is safely maintained.",
      },
      {
        title: "2. Haemoglobin & Vital Signs Screening",
        text: "On donation day, a rapid drop of blood is tested for haemoglobin concentration, which must be at least 12.5 g/dL (both for males and females). Pulse must be regular between 50–100 bpm, and blood pressure must fall within safe physiological parameters (systolic 100–140 mmHg, diastolic 60–90 mmHg).",
      },
      {
        title: "3. General Health & Wellness",
        text: "You must feel in good health, well-rested, and free from active infection or unexplained acute symptoms. Donors should have eaten a balanced meal within 2 to 3 hours and hydrated adequately before visiting the clinical center.",
      },
      {
        title: "4. Temporary Reasons to Postpone (Deferral)",
        text: "Donation is temporarily postponed for recent colds, fever, or antibiotic treatments (defer until 7–14 days post-recovery); dental extractions or minor oral surgeries (defer 72 hours); recent body piercing or tattooing (defer 6 months); pregnancy and lactation (defer until 6–12 months postpartum); and recent international travel to specific malaria-endemic regions.",
      },
      {
        title: "5. Conditions Requiring Medical Assessment",
        text: "Certain medical conditions—such as managed hypertension, well-controlled thyroid conditions, or past surgical procedures—require evaluation by the on-site donation medical officer. Certain chronic conditions (e.g., active cardiac disease, severe asthma, chronic kidney disease, or blood-borne infections) represent permanent deferrals for donor safety.",
      },
      {
        title: "6. Pre-Donation Preparation",
        text: "Get a full night of restful sleep (7–8 hours). Drink 500 mL of water or oral fluids before arriving. Eat a healthy, low-fat meal 2–3 hours beforehand. Avoid alcohol consumption for at least 24 hours and refrain from smoking for at least 2 hours prior to donation.",
      },
      {
        title: "7. After-Donation Care & Recovery",
        text: "Rest in the observation lounge for 10–15 minutes post-donation while enjoying complimentary refreshments. Keep the bandage on your venepuncture site for 4 hours. Stay well-hydrated throughout the day and avoid strenuous physical exertion or heavy lifting for the rest of the day.",
      },
      {
        title: "8. Location & Policy Disclaimer",
        text: "Important: Clinical eligibility guidelines vary by country, state, donation type (whole blood vs. platelets), and individual blood center protocols. The final decision on donor suitability rests solely with the qualified medical staff at the collection center.",
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

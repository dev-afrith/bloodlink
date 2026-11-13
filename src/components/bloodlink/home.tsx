import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  Search,
  Siren,
  Droplet,
  ShieldCheck,
  Users,
  HandHeart,
  CheckCircle2,
  Building2,
  BookOpen,
  Star,
  Link2,
  Activity,
  AlertCircle,
  MapPin,
  Clock,
  ChevronRight,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/donation-refined.jpg";
import { bloodGroups, education, stories, locations } from "@/data/demo";
import { Reveal, SectionHeading, FinalCTA, TrustItem, itemReveal } from "./shared";
import { DonorSearch, Requests } from "./discovery";
import { RegistrationForm } from "./registration";

const groupMeta: Record<string, { role: string; count: string }> = {
  "O-": { role: "Universal Red Cell", count: "32 Sample Donors" },
  "O+": { role: "High Emergency Need", count: "140 Sample Donors" },
  "A+": { role: "High Community Demand", count: "98 Sample Donors" },
  "A-": { role: "Rare & Critical", count: "22 Sample Donors" },
  "B+": { role: "High Community Need", count: "115 Sample Donors" },
  "B-": { role: "Rare & Critical", count: "18 Sample Donors" },
  "AB+": { role: "Universal Plasma", count: "48 Sample Donors" },
  "AB-": { role: "Rarest Blood Type", count: "12 Sample Donors" },
};

export function HowSteps() {
  return (
    <div className="how-grid">
      {[
        {
          number: "01",
          title: "Discover",
          icon: Search,
          text: "Search sample voluntary donors and accredited blood banks by blood group and city in demonstration workflows.",
        },
        {
          number: "02",
          title: "Connect",
          icon: Link2,
          text: "Review medically accurate ABO/Rh compatibility rules and hospital coordination instructions with confidence.",
        },
        {
          number: "03",
          title: "Save Lives",
          icon: Heart,
          text: "In the real world, safe voluntary donation at certified medical centers can save up to 3 lives per donation.",
        },
      ].map((s) => (
        <div className="step group" key={s.number}>
          <div className="step-number group-hover:text-[#C8102E] transition-colors">{s.number}</div>
          <h3 className="font-display font-bold text-slate-900">
            <s.icon className="text-[#C8102E]" />
            {s.title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">{s.text}</p>
        </div>
      ))}
    </div>
  );
}

export function Awareness() {
  const icons = [ShieldCheck, Droplet, Heart, BookOpen];
  return (
    <>
      <div className="awareness-grid">
        {education.map((e, i) => {
          const Icon = icons[i] || BookOpen;
          return (
            <details className="awareness-item group cursor-pointer" key={e.title}>
              <summary className="select-none">
                <Icon className="text-[#C8102E] transition-transform group-hover:scale-110" />
                <h3 className="font-display font-bold text-slate-900 text-base">{e.title}</h3>
                <span className="text-xs font-semibold text-[#C8102E] flex items-center gap-1 mt-2">
                  Read Clinical Guidelines <ArrowUpRight size={14} />
                </span>
              </summary>
              <p className="text-xs text-slate-600 leading-relaxed pt-1 pb-4 px-5 border-t border-slate-100">
                {e.text}
              </p>
            </details>
          );
        })}
      </div>
      <p className="demo-notice mt-4">
        General awareness aligned with World Health Organization (WHO) voluntary blood donation standards. Clinical eligibility is determined solely by qualified medical staff at certified donation centers.
      </p>
    </>
  );
}

function Count({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setCount(value);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 1400, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reduced]);

  return <span ref={ref}>{count.toLocaleString("en-IN")}+</span>;
}

export function Home() {
  const [quickGroup, setQuickGroup] = useState("");
  const [quickCity, setQuickCity] = useState("");
  const navigate = useNavigate();

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      to: "/find-donors",
      search: { group: quickGroup || undefined },
    });
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero relative overflow-hidden bg-gradient-to-b from-[#FFF1F2]/40 via-white to-slate-50">
        <img
          className="hero-photo"
          src={hero}
          width={1920}
          height={1080}
          alt="A caring healthcare nurse assisting a voluntary blood donor in a modern clinic"
          fetchPriority="high"
        />

        <div className="container hero-content">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-rose-200 shadow-sm text-xs font-bold text-[#8F1027] mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8102E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8102E]"></span>
              </span>
              <span>Voluntary Blood Donation Discovery · Demonstration Prototype</span>
            </div>

            <motion.h1 variants={itemReveal} className="text-4xl md:text-6xl font-extrabold text-slate-950 font-display tracking-tight leading-[1.12]">
              Every Drop <br />
              <span className="text-[#C8102E]">Connects a Life.</span>
            </motion.h1>

            <p className="hero-copy text-base md:text-lg text-slate-600 mt-4 max-w-xl leading-relaxed">
              A community-first platform connecting voluntary blood donors, blood bank directories, and hospital requirements. Explore demonstration donor matching, eligibility guidance, and clinical compatibility.
            </p>

            {/* Quick Hero Search Widget */}
            <form
              onSubmit={handleHeroSearch}
              className="mt-6 p-2 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-xl max-w-lg flex flex-col sm:flex-row gap-2 items-center"
            >
              <div className="flex-1 w-full pl-3 pr-2 py-1 flex items-center gap-2 border-b sm:border-b-0 sm:border-r border-slate-200">
                <Droplet className="text-[#C8102E] shrink-0 animate-blood-pulse" size={18} />
                <select
                  aria-label="Select Blood Group"
                  value={quickGroup}
                  onChange={(e) => setQuickGroup(e.target.value)}
                  className="w-full text-xs md:text-sm font-semibold bg-transparent focus:outline-none text-slate-800"
                >
                  <option value="">Any Blood Group</option>
                  {bloodGroups.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1 w-full pl-3 pr-2 py-1 flex items-center gap-2">
                <MapPin className="text-[#C8102E] shrink-0" size={18} />
                <select
                  aria-label="Select City"
                  value={quickCity}
                  onChange={(e) => setQuickCity(e.target.value)}
                  className="w-full text-xs md:text-sm font-semibold bg-transparent focus:outline-none text-slate-800"
                >
                  <option value="">All Major Cities</option>
                  {Object.values(locations).flat().map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <Button
                type="submit"
                size="default"
                className="w-full sm:w-auto bg-[#C8102E] hover:bg-[#8F1027] text-white font-semibold rounded-xl px-5 h-11 shadow-sm hover:shadow-md transition-all"
              >
                <Search size={16} />
                Filter Donors
              </Button>
            </form>

            <motion.div className="button-row mt-4" variants={itemReveal}>
              <Button asChild size="lg" className="bg-[#C8102E] hover:bg-[#8F1027] text-white font-semibold shadow-md rounded-xl">
                <Link to="/find-donors">
                  <Search size={16} />
                  Explore Sample Donors <ArrowRight size={16} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-slate-300 text-slate-800 hover:border-[#C8102E] hover:text-[#C8102E] bg-white/90 font-semibold rounded-xl">
                <Link to="/become-a-donor">
                  <Heart size={16} className="text-[#C8102E]" />
                  Try Registration Demo
                </Link>
              </Button>
            </motion.div>

            <div className="hero-trust mt-5 flex flex-wrap gap-4 text-xs text-slate-600 font-medium">
              <TrustItem>Voluntary &amp; Unpaid Principle</TrustItem>
              <TrustItem>WHO Guideline Aligned</TrustItem>
              <TrustItem>Fictional Demonstration Data</TrustItem>
            </div>

            <div className="hero-proof mt-6 flex items-center gap-3">
              <div className="mini-avatars flex -space-x-2">
                <span className="w-8 h-8 rounded-full bg-rose-100 border-2 border-white flex items-center justify-center text-xs font-bold text-[#8F1027]">AR</span>
                <span className="w-8 h-8 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center text-xs font-bold text-amber-800">PM</span>
                <span className="w-8 h-8 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-xs font-bold text-indigo-800">SK</span>
                <span className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-xs font-bold text-emerald-800">RD</span>
              </div>
              <p className="text-xs text-slate-600">
                <strong className="text-slate-900 block font-semibold">12,500+ Illustrative Donors</strong>
                Demonstration network model highlighting community-based voluntary donation.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Floating illustrative highlight pill on hero image */}
        <div className="photo-label hidden md:flex animate-float-subtle">
          <span>
            <Heart size={20} className="fill-[#C8102E]" />
          </span>
          <div>
            <strong>Fictional Demonstration Profile</strong>
            <small>Illustrative donor scenario for platform preview</small>
          </div>
          <CheckCircle2 size={22} className="check-icon text-emerald-500" />
        </div>
      </section>

      {/* VALUES BAR */}
      <div className="values-bar bg-white border-y border-slate-200">
        <div className="container py-3">
          <span className="text-slate-700 font-medium">
            <ShieldCheck className="text-emerald-600" />
            Voluntary &amp; Unpaid (WHO Principles)
          </span>
          <span className="text-slate-700 font-medium">
            <Users className="text-[#C8102E]" />
            Community Healthcare Discovery
          </span>
          <span className="text-slate-700 font-medium">
            <Droplet className="text-[#C8102E] animate-blood-pulse" />
            All 8 Blood Groups Supported
          </span>
          <span className="text-slate-700 font-medium">
            <HandHeart className="text-rose-600" />
            Every Connection Saves Lives
          </span>
        </div>
      </div>

      {/* QUICK LAUNCH CARDS */}
      <section className="section bg-slate-50/50">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="PLATFORM EXPLORATION"
              title="Where would you like to start?"
              description="Explore sample donor discovery, examine illustrative blood requirements, or test voluntary registration."
            />
            <div className="quick-grid">
              {[
                {
                  title: "Find Blood Donors",
                  text: "Discover sample voluntary donors filtered by blood group, state, and neighbourhood.",
                  icon: Search,
                  to: "/find-donors" as const,
                  cta: "Filter Sample Donors",
                  badge: "Sample Registry",
                },
                {
                  title: "Urgent Blood Requests",
                  text: "Explore demonstration blood requirements illustrating how healthcare centers broadcast urgent needs.",
                  icon: Siren,
                  to: "/requests" as const,
                  cta: "View Sample Requests",
                  badge: "Demonstration Scenarios",
                },
                {
                  title: "Register as a Donor",
                  text: "Test our streamlined registration form. Submissions are stored temporarily in browser state.",
                  icon: Heart,
                  to: "/become-a-donor" as const,
                  cta: "Try Demonstration Form",
                  badge: "Demonstration Form",
                },
              ].map((a) => (
                <motion.article className="quick-card relative group" key={a.title} variants={itemReveal}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="quick-icon">
                      <a.icon size={22} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8102E] bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">
                      {a.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900">{a.title}</h3>
                  <p className="text-slate-600">{a.text}</p>
                  <Button variant="link" asChild className="text-[#C8102E] hover:text-[#8F1027] font-semibold text-xs mt-3 p-0 h-auto">
                    <Link to={a.to}>
                      {a.cta}
                      <ArrowUpRight size={14} className="ml-1" />
                    </Link>
                  </Button>
                </motion.article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* BLOOD GROUPS MATRIX */}
      <section className="section blood-section bg-white">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="CLINICAL COMPATIBILITY"
              title="Every Blood Group Matters."
              description="Accurate ABO/Rh clinical compatibility guidance based on transfusion medicine standards. Select any blood group to filter sample donors."
            />
            <div className="group-grid">
              {bloodGroups.map((g) => (
                <Link
                  className="group-card group"
                  key={g}
                  to="/find-donors"
                  search={{ group: g }}
                >
                  <span className="group-drop group-hover:bg-[#C8102E] group-hover:text-white transition-colors">
                    <Droplet className="group-hover:fill-white animate-blood-pulse" />
                  </span>
                  <strong className="text-slate-900 group-hover:text-[#C8102E] transition-colors">{g}</strong>
                  <span className="text-[10px] font-semibold text-[#8F1027] block mt-1 leading-tight">
                    {groupMeta[g]?.role || "Voluntary Need"}
                  </span>
                  <small className="text-[10px] text-slate-500 mt-2 font-medium">
                    {groupMeta[g]?.count || "Sample Donors"}
                  </small>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FIND DONORS PREVIEW */}
      <section className="section section-white border-t border-slate-100">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="SAMPLE DONOR PROFILES"
              title="Find the Right Donor. When It Matters Most."
              description="Search illustrative voluntary donor profiles by blood group and location. All profiles are fictional demonstrations."
            >
              <Button asChild variant="outline" className="border-slate-300 text-slate-700 hover:text-[#C8102E] hover:border-[#C8102E]">
                <Link to="/find-donors">
                  View Full Donor Directory <ArrowUpRight size={15} />
                </Link>
              </Button>
            </SectionHeading>
            <DonorSearch compact />
          </Reveal>
        </div>
      </section>

      {/* EMERGENCY REQUESTS PREVIEW */}
      <section className="section section-soft bg-gradient-to-b from-[#FFF1F2]/60 to-white">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="DEMONSTRATION SCENARIOS"
              title="Sample Hospital Blood Requirements."
              description="Illustrative blood component requirements showing how healthcare facilities broadcast urgent needs. These are demonstration scenarios, not live emergencies."
            >
              <Button asChild className="bg-[#C8102E] hover:bg-[#8F1027] text-white">
                <Link to="/requests">
                  <Siren size={15} className="mr-1 animate-pulse" />
                  All Sample Requests <ArrowUpRight size={15} />
                </Link>
              </Button>
            </SectionHeading>
            <Requests compact />
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section section-white">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="TRANSPARENT WORKFLOW"
              title="Three Steps. A Life Saved."
              description="The path from willingness to giving hope is simple, safe, and medically certified."
            />
            <HowSteps />
          </Reveal>
        </div>
      </section>

      {/* REGISTRATION FORM */}
      <section className="section bg-slate-50">
        <div className="container">
          <Reveal>
            <RegistrationForm />
          </Reveal>
        </div>
      </section>

      {/* BLOOD BANK DIRECTORY HIGHLIGHT */}
      <section className="section section-white border-t border-slate-100">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="FACILITY DIRECTORY"
              title="Connecting You to Blood Bank Information."
              description="Explore demonstration blood bank listings, component separation capabilities, and community storage centers."
            >
              <Button asChild variant="outline" className="border-slate-300 text-slate-700 hover:text-[#C8102E]">
                <Link to="/blood-banks">
                  <Building2 size={15} />
                  Explore Facility Directory <ArrowRight size={15} />
                </Link>
              </Button>
            </SectionHeading>
            <div className="how-grid">
              {[
                {
                  title: "Whole Blood Transfusions",
                  desc: "Standard voluntary whole blood collection stored under strictly controlled cold-chain conditions for surgical emergencies.",
                  icon: Droplet,
                },
                {
                  title: "Aphaeresis & Platelets",
                  desc: "Automated separation of platelets and plasma essential for oncology, dengue treatment, and trauma patients.",
                  icon: Building2,
                },
                {
                  title: "Community Donation Drives",
                  desc: "Coordinated voluntary donation drives in colleges, corporate hubs, and residential societies.",
                  icon: Users,
                },
              ].map((c) => (
                <div className="step bg-white p-6 rounded-xl border border-slate-200 shadow-sm" key={c.title}>
                  <div className="quick-icon mb-4">
                    <c.icon size={22} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">{c.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CLINICAL AWARENESS */}
      <section className="section bg-slate-50">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="CLINICAL KNOWLEDGE"
              title="Knowledge Saves Lives Too."
              description="Evidence-based guidelines answering eligibility, donation day safety, and medical facts."
            />
            <Awareness />
          </Reveal>
        </div>
      </section>

      {/* IMPACT METRICS */}
      <section className="impact bg-[#0F172A] text-white py-16 border-y border-slate-800">
        <div className="container">
          <div>
            <span className="eyebrow !text-rose-400">
              <span className="!bg-rose-400" />
              ILLUSTRATIVE METRICS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display text-white mt-2">
              Community Impact Model.
            </h2>
            <p className="impact-note text-slate-400 text-xs mt-3">
              Illustrative prototype statistics demonstrating platform reach metrics, not verified clinical outcomes.
            </p>
          </div>
          <div className="impact-grid">
            {[
              { value: 12500, label: "Sample Registered Donors" },
              { value: 8200, label: "Simulated Donations" },
              { value: 150, label: "Demonstration Facilities" },
              { value: 25000, label: "Simulated Community Reach" },
            ].map((s) => (
              <div key={s.label} className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/60">
                <div className="impact-number text-[#C8102E] font-display font-extrabold text-3xl mb-1">
                  <Count value={s.value} />
                </div>
                <p className="text-xs font-semibold text-slate-300">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-white">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="DEMONSTRATION STORIES"
              title="Every Donor Has a Story."
              description="Fictional donor experiences demonstrating the profound ripple effect of voluntary blood donation."
            />
            <div className="story-grid">
              {stories.map((s, i) => (
                <article className="story bg-slate-50/70 p-6 rounded-2xl border border-slate-200 shadow-sm relative" key={s.name}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="stars flex gap-1 text-amber-500" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }, (_, j) => (
                        <Star key={j} size={15} className="fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded">
                      Fictional Account
                    </span>
                  </div>
                  <blockquote className="text-slate-700 text-sm leading-relaxed mb-5 italic">
                    “{s.quote}”
                  </blockquote>
                  <div className="story-person flex items-center gap-3 border-t border-slate-200/80 pt-3">
                    <span className={`avatar avatar-${i} w-10 h-10 text-xs font-bold`}>
                      {s.name.slice(0, 1)}
                    </span>
                    <div>
                      <strong className="text-slate-900 text-sm block font-semibold">{s.name}</strong>
                      <p className="text-xs text-slate-500">{s.city} · Fictional donor story for demonstration</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="demo-notice mt-4">
              Fictional donor stories and illustrative ratings, created strictly for this demonstration prototype.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <FinalCTA />
    </>
  );
}

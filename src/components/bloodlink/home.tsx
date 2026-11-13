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
import { DonorSearch, Requests, BankDirectory } from "./discovery";
import { RegistrationForm } from "./registration";
import {
  BloodGroupDistribution,
  DonationImpactChart,
  InteractiveCompatibilityDiagram,
  MonthlyDonationsGraph,
  LivesTouchedGraph,
  BloodGroupDistributionHorizontal,
  DonationProcessInfographic,
} from "./charts";
import campaign from "@/assets/donor-campaign.jpg";
import { useToast } from "@/components/ui/toast-notification";

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
          title: "Discover & Filter",
          icon: Search,
          text: "Search voluntary donors and accredited blood banks by blood group and city to support community patient needs.",
        },
        {
          number: "02",
          title: "Verify Compatibility",
          icon: Link2,
          text: "Review medically accurate ABO/Rh compatibility rules and hospital coordination instructions with confidence.",
        },
        {
          number: "03",
          title: "Connect & Save Lives",
          icon: Heart,
          text: "Safe voluntary donation at certified medical centers can save up to 3 lives per donation.",
        },
      ].map((s) => (
        <div className="step group bg-white/80 backdrop-blur-sm p-7 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-300" key={s.number}>
          <div className="step-number group-hover:text-[#C8102E] transition-colors">{s.number}</div>
          <h3 className="font-display font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-rose-50 text-[#C8102E] flex items-center justify-center shrink-0 group-hover:bg-[#C8102E] group-hover:text-white transition-colors duration-300">
              <s.icon size={18} />
            </span>
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
      <p className="text-xs text-slate-500 mt-4 leading-relaxed">
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

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("General Support");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { success } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setName("");
      setEmail("");
      setMessage("");
      success(
        "Message Sent",
        "Thank you! A community coordinator will follow up shortly."
      );
    }, 450);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* 3 informative channel cards */}
      <div className="space-y-4 lg:col-span-1">
        <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center gap-2.5 text-[#C8102E] font-bold text-sm mb-2">
            <AlertCircle size={18} />
            Emergency Medical Helpline
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            In acute medical emergencies, call national emergency ambulance dispatch at <strong className="text-slate-900">108 / 112</strong> or proceed directly to your nearest hospital emergency department.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm mb-2">
            <Users size={18} className="text-[#C8102E]" />
            Community & Campus Drives
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Coordinate voluntary donation drives in colleges, corporate offices, and housing societies with our partner blood banks.
          </p>
          <span className="text-xs font-semibold text-[#C8102E] mt-2 block">community@bloodlink.org.in</span>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center gap-2.5 text-slate-900 font-bold text-sm mb-2">
            <Building2 size={18} className="text-[#C8102E]" />
            Blood Bank & Hospital Network
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Accredited transfusion facilities and licensed blood banks can partner with BloodLink to streamline donor matching.
          </p>
          <span className="text-xs font-semibold text-[#C8102E] mt-2 block">partnerships@bloodlink.org.in</span>
        </div>
      </div>

      {/* Interactive Message Form */}
      <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl border border-slate-200/90 shadow-sm">
        <h3 className="text-xl md:text-2xl font-bold font-display text-slate-900 mb-2">Send an Inquiry to Our Community Coordinators</h3>
        <p className="text-xs md:text-sm text-slate-600 mb-6">
          Whether you want to learn more about donating, suggest a partner facility, or share feedback, our voluntary team is here to assist.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="field">
              <span className="text-xs font-semibold text-slate-700">Your Full Name</span>
              <input
                required
                type="text"
                placeholder="Dr. / Mr. / Ms. Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C8102E]"
              />
            </label>
            <label className="field">
              <span className="text-xs font-semibold text-slate-700">Email Address</span>
              <input
                required
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C8102E]"
              />
            </label>
          </div>

          <label className="field">
            <span className="text-xs font-semibold text-slate-700">Inquiry Topic</span>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C8102E] bg-white"
            >
              <option value="General Support">General Platform Inquiries</option>
              <option value="Voluntary Donation">Voluntary Donation Question</option>
              <option value="Blood Bank Onboarding">Blood Bank & Hospital Partnership</option>
              <option value="Campus Drive">College or Corporate Donation Camp</option>
              <option value="Feedback">Technical or Clinical Feedback</option>
            </select>
          </label>

          <label className="field">
            <span className="text-xs font-semibold text-slate-700">Your Message</span>
            <textarea
              required
              rows={4}
              placeholder="How can our voluntary donation team assist you?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C8102E] resize-none"
            />
          </label>

          <Button
            type="submit"
            disabled={sending}
            className="w-full sm:w-auto bg-gradient-to-r from-[#C8102E] to-[#8F1027] hover:from-[#A60D25] hover:to-[#730D20] text-white font-semibold rounded-xl px-6 h-11 shadow-sm transition-all"
          >
            {sending ? "Transmitting..." : "Send Message to Coordinator"}
          </Button>
        </form>
      </div>
    </div>
  );
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
      {/* 1. HOME & HERO SECTION */}
      <section id="hero" className="hero relative overflow-hidden bg-gradient-to-b from-[#FFF1F2]/60 via-white to-slate-50 border-b border-rose-100/60">
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
              <span>Voluntary Blood Donation Discovery · Community Healthcare Platform</span>
            </div>

            <motion.h1 variants={itemReveal} className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold text-slate-950 font-display tracking-tight leading-[1.08] max-w-2xl">
              Every Drop <br />
              <span className="bg-gradient-to-r from-[#C8102E] via-[#A60D25] to-[#8F1027] bg-clip-text text-transparent">Connects a Life.</span>
            </motion.h1>

            <p className="hero-copy text-sm sm:text-base md:text-lg text-slate-600 mt-4 max-w-xl leading-relaxed">
              A community-first platform connecting voluntary blood donors, blood bank directories, and hospital requirements. Explore donor matching, eligibility guidance, and clinical compatibility.
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
                className="w-full sm:w-auto bg-gradient-to-r from-[#C8102E] to-[#8F1027] hover:from-[#A60D25] hover:to-[#730D20] text-white font-semibold rounded-xl px-5 h-11 shadow-sm hover:shadow-md transition-all"
              >
                <Search size={16} />
                Filter Donors
              </Button>
            </form>

            <motion.div className="button-row mt-4" variants={itemReveal}>
              <Button asChild size="lg" className="bg-[#C8102E] hover:bg-[#8F1027] text-white font-semibold shadow-md rounded-xl">
                <a href="#find-donors" onClick={(e) => { e.preventDefault(); document.getElementById("find-donors")?.scrollIntoView({ behavior: "smooth" }); }}>
                  <Search size={16} />
                  Explore Sample Donors <ArrowRight size={16} />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-slate-300 text-slate-800 hover:border-[#C8102E] hover:text-[#C8102E] bg-white/90 font-semibold rounded-xl">
                <Link to="/become-a-donor">
                  <Heart size={16} className="text-[#C8102E]" />
                  Register as a Donor
                </Link>
              </Button>
            </motion.div>

            <div className="hero-trust mt-5 flex flex-wrap gap-4 text-xs text-slate-600 font-medium">
              <TrustItem>Voluntary &amp; Unpaid Principle</TrustItem>
              <TrustItem>WHO Guideline Aligned</TrustItem>
              <TrustItem>Accredited Blood Bank Network</TrustItem>
            </div>

            <div className="hero-proof mt-6 flex items-center gap-3">
              <div className="mini-avatars flex -space-x-2">
                <span className="w-8 h-8 rounded-full bg-rose-100 border-2 border-white flex items-center justify-center text-xs font-bold text-[#8F1027]">AR</span>
                <span className="w-8 h-8 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center text-xs font-bold text-amber-800">PM</span>
                <span className="w-8 h-8 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-xs font-bold text-indigo-800">SK</span>
                <span className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-xs font-bold text-emerald-800">RD</span>
              </div>
              <p className="text-xs text-slate-600">
                <strong className="text-slate-900 block font-semibold">12,500+ Registered Donors</strong>
                Active voluntary donor network supporting hospitals and patients nationwide.
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
            <strong>Verified Voluntary Donor</strong>
            <small>Active community donor profile</small>
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

      {/* QUICK LAUNCH CARDS (PLATFORM EXPLORATION) */}
      <section className="section bg-slate-50/50">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="PLATFORM EXPLORATION"
              title="Where would you like to start?"
              description="Explore voluntary donor discovery, view active blood component requirements, or complete donor registration."
            />
            <div className="quick-grid">
              {[
                {
                  title: "Find Blood Donors",
                  text: "Discover voluntary donors filtered by blood group, state, and neighborhood.",
                  icon: Search,
                  to: "/find-donors" as const,
                  anchor: "#find-donors",
                  cta: "Filter Donors",
                  badge: "Donor Registry",
                },
                {
                  title: "Urgent Blood Requests",
                  text: "Explore immediate blood component requirements broadcast by hospitals and emergency centers.",
                  icon: Siren,
                  to: "/requests" as const,
                  anchor: "#emergency-requests",
                  cta: "View Requests",
                  badge: "Urgent Need",
                },
                {
                  title: "Register as a Donor",
                  text: "Complete our streamlined voluntary registration form to join the local donor registry.",
                  icon: Heart,
                  to: "/become-a-donor" as const,
                  anchor: "#how-it-works",
                  cta: "Register as Donor",
                  badge: "Quick Sign-up",
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
                  <Button
                    variant="link"
                    asChild
                    className="text-[#C8102E] hover:text-[#8F1027] font-semibold text-xs mt-3 p-0 h-auto"
                    onClick={(e) => {
                      if (a.anchor) {
                        e.preventDefault();
                        document.querySelector(a.anchor)?.scrollIntoView({ behavior: "smooth" });
                        window.history.pushState(null, "", a.anchor);
                      }
                    }}
                  >
                    <a href={a.anchor || a.to}>
                      {a.cta}
                      <ArrowUpRight size={14} className="ml-1" />
                    </a>
                  </Button>
                </motion.article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. FIND DONORS SECTION */}
      <section id="find-donors" className="section section-white border-t border-slate-100">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="VOLUNTARY DONOR DIRECTORY"
              title="Find the Right Donor. When It Matters Most."
              description="Search voluntary donor profiles by blood group and location to connect with certified local community donors."
            >
              <Button asChild variant="outline" className="border-slate-300 text-slate-700 hover:text-[#C8102E] hover:border-[#C8102E]">
                <Link to="/find-donors">
                  Open Dedicated Donor Directory <ArrowUpRight size={15} />
                </Link>
              </Button>
            </SectionHeading>
            <DonorSearch />
          </Reveal>
        </div>
      </section>

      {/* 3. EMERGENCY REQUESTS SECTION */}
      <section id="emergency-requests" className="section section-soft bg-gradient-to-b from-[#FFF1F2]/60 to-white border-t border-slate-100">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="EMERGENCY REQUIREMENTS"
              title="Urgent Hospital Blood Requirements."
              description="Immediate blood component requirements broadcast by hospitals, trauma centers, and clinical facilities."
            >
              <Button asChild className="bg-[#C8102E] hover:bg-[#8F1027] text-white">
                <Link to="/requests">
                  <Siren size={15} className="mr-1 animate-pulse" />
                  Open Dedicated Requests <ArrowUpRight size={15} />
                </Link>
              </Button>
            </SectionHeading>
            <Requests />
          </Reveal>
        </div>
      </section>

      {/* 4. BLOOD BANKS DIRECTORY SECTION */}
      <section id="blood-banks" className="section section-white border-t border-slate-100">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="ACCREDITED FACILITY DIRECTORY"
              title="Connecting You to Blood Bank Information."
              description="Explore licensed blood bank facilities, component separation capabilities, and community storage centers across India."
            >
              <Button asChild variant="outline" className="border-slate-300 text-slate-700 hover:text-[#C8102E]">
                <Link to="/blood-banks">
                  <Building2 size={15} />
                  Open Dedicated Facility Page <ArrowRight size={15} />
                </Link>
              </Button>
            </SectionHeading>
            <BankDirectory />
          </Reveal>
        </div>
      </section>

      {/* 5. HOW IT WORKS & REGISTRATION SECTION */}
      <section id="how-it-works" className="section bg-slate-50 border-t border-slate-100">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="TRANSPARENT WORKFLOW"
              title="Three Steps. A Life Saved."
              description="The path from willingness to giving hope is simple, safe, and medically certified."
            >
              <Button asChild variant="outline" className="border-slate-300 text-slate-700 hover:text-[#C8102E]">
                <Link to="/how-it-works">
                  How It Works Guide <ArrowRight size={15} />
                </Link>
              </Button>
            </SectionHeading>
            <HowSteps />

            <div className="mt-16">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <span className="eyebrow text-[#C8102E] font-bold tracking-widest justify-center">
                  <span className="bg-[#C8102E]" />
                  DONATION DAY JOURNEY
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-extrabold text-slate-950 mt-2">
                  What to Expect at the Donation Center
                </h3>
                <p className="text-xs md:text-sm text-slate-600 mt-2">
                  Every voluntary donation takes less than 45 minutes from arrival to refreshment.
                </p>
              </div>
              <DonationProcessInfographic />
            </div>

            <div className="mt-16">
              <RegistrationForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. INTERACTIVE CLINICAL TOOLS & COMPATIBILITY MATRIX */}
      <section id="compatibility" className="section bg-[#EFF6FF] border-t border-[#DBEAFE] py-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="eyebrow !text-[#2563EB] font-bold tracking-widest text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                  INTERACTIVE CLINICAL TOOLS
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#1E293B] mt-2 tracking-tight">
                  Every Blood Group Matters.
                </h2>
                <p className="text-sm md:text-base text-[#64748B] mt-2 max-w-2xl leading-relaxed">
                  Interactive ABO/Rh clinical compatibility guidance based on international transfusion medicine standards. Select any group below to explore matched recipient and donor relationships.
                </p>
              </div>
              <Button asChild variant="outline" className="border-[#DBEAFE] text-[#1E293B] hover:text-[#2563EB] hover:border-[#BFDBFE] bg-white rounded-xl shadow-xs self-start md:self-auto">
                <Link to="/blood-compatibility">
                  Explore Dedicated Matrix <ArrowRight size={15} className="ml-1" />
                </Link>
              </Button>
            </div>

            {/* Interactive Transfusion Matrix Component */}
            <div className="mb-12">
              <InteractiveCompatibilityDiagram />
            </div>

            {/* Blood Group Demographic Distribution Chart */}
            <div className="mb-12">
              <BloodGroupDistribution />
            </div>

            <div className="group-grid">
              {bloodGroups.map((g) => (
                <Link
                  className="group-card group relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-[#BFDBFE] bg-white border border-[#DBEAFE] rounded-2xl p-5 text-center flex flex-col items-center justify-between"
                  key={g}
                  to="/find-donors"
                  search={{ group: g }}
                >
                  <span className="w-12 h-12 rounded-2xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#2563EB] group-hover:text-white mb-2">
                    <Droplet size={20} className="group-hover:fill-white text-[#C8102E]" />
                  </span>
                  <strong className="text-[#1E293B] group-hover:text-[#2563EB] transition-colors text-2xl font-black font-display">{g}</strong>
                  <span className="text-[11px] font-bold text-[#C8102E] block mt-1 leading-tight tracking-wide uppercase">
                    {groupMeta[g]?.role || "Voluntary Need"}
                  </span>
                  <small className="text-[11px] text-[#64748B] mt-2 font-medium flex items-center justify-center gap-1">
                    <Users size={12} className="text-[#64748B]" />
                    {groupMeta[g]?.count || "Sample Donors"}
                  </small>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7. ILLUSTRATIVE METRICS SECTION (Light Blue Healthcare Theme) */}
      <section id="metrics" className="impact bg-[#EFF6FF] text-[#1E293B] pt-24 pb-24 border-y border-[#DBEAFE] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#DBEAFE]/50 rounded-full blur-3xl pointer-events-none" />
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="eyebrow !text-[#2563EB] font-bold tracking-widest text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
              ILLUSTRATIVE METRICS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-[#1E293B] mt-3 tracking-tight leading-tight">
              Community Impact Model.
            </h2>
            <p className="text-[#64748B] text-base md:text-lg mt-3 leading-relaxed">
              Illustrative platform metrics showing registry growth and potential transfusion matches.
            </p>
          </div>

          {/* Metric Counter Cards: Clean White Cards on Light Blue */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { value: 12500, label: "Sample Registered Donors", desc: "Illustrative voluntary donor profiles" },
              { value: 8200, label: "Simulated Donations", desc: "Estimated community match simulations" },
              { value: 150, label: "Partner Facilities", desc: "Sample hospitals & storage centres" },
              { value: 25000, label: "Simulated Community Reach", desc: "Estimated patient awareness reach" },
            ].map((s) => (
              <div key={s.label} className="p-7 md:p-8 bg-white rounded-3xl border border-[#DBEAFE] shadow-md hover:shadow-xl hover:border-[#BFDBFE] transition-all flex flex-col justify-between">
                <div className="impact-number !text-[#2563EB] font-display font-black text-5xl md:text-6xl mb-4 tracking-tight">
                  <Count value={s.value} />
                </div>
                <div>
                  <p className="text-lg font-extrabold text-[#1E293B] mb-2 leading-snug">{s.label}</p>
                  <p className="text-sm md:text-base text-[#64748B] leading-normal">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Three Distinct Graphs Side-by-Side in Responsive Grid (Light Cards) */}
          <div>
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-[#DBEAFE]/70 px-3.5 py-1.5 rounded-full border border-[#BFDBFE]">
                  NETWORK DATA DYNAMICS
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-[#1E293B] mt-2 tracking-tight">
                  Illustrative Trends &amp; Population Profile
                </h3>
              </div>
              <span className="text-xs sm:text-sm text-[#64748B] bg-white px-4 py-2 rounded-xl border border-[#DBEAFE] shadow-2xs self-start sm:self-auto">
                All visualizations display illustrative sample data
              </span>
            </div>

            <div className="analytics-grid">
              <MonthlyDonationsGraph />
              <LivesTouchedGraph />
              <BloodGroupDistributionHorizontal />
            </div>
          </div>
        </div>
      </section>

      {/* 8. CLINICAL KNOWLEDGE & RESOURCES */}
      <section id="resources" className="section bg-slate-50 border-t border-slate-100">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="CLINICAL KNOWLEDGE & RESOURCES"
              title="Knowledge Saves Lives Too."
              description="Evidence-based guidelines answering eligibility, donation day safety, and medical facts aligned with WHO standards."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { title: "Who Can Donate?", desc: "Weight, age, and health eligibility criteria.", to: "/eligibility" as const, icon: ShieldCheck },
                { title: "Transfusion Compatibility", desc: "ABO & Rh blood group clinical matching rules.", to: "/blood-compatibility" as const, icon: Droplet },
                { title: "Blood Group Demographics", desc: "Prevalence distribution across population.", to: "/blood-groups" as const, icon: Users },
                { title: "Help & FAQs", desc: "Answers to common questions about donation.", to: "/faq" as const, icon: BookOpen },
              ].map((item) => (
                <Link
                  key={item.title}
                  to={item.to}
                  className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-rose-300 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#C8102E] flex items-center justify-center mb-3 group-hover:bg-[#C8102E] group-hover:text-white transition-colors">
                      <item.icon size={20} />
                    </div>
                    <h4 className="font-bold text-slate-900 text-base mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                  <span className="text-xs font-semibold text-[#C8102E] flex items-center gap-1 mt-4">
                    Explore Guide <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>

            <Awareness />
          </Reveal>
        </div>
      </section>

      {/* 9. ABOUT BLOODLINK SECTION */}
      <section id="about" className="section bg-white border-t border-slate-100">
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
              OUR PURPOSE & MISSION
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
            <div className="pt-2 flex flex-wrap gap-3">
              <Button asChild className="bg-gradient-to-r from-[#C8102E] to-[#8F1027] hover:from-[#A60D25] hover:to-[#730D20] text-white font-semibold rounded-xl h-11 px-5 shadow-md">
                <Link to="/about">Read Full Mission Story <ArrowRight size={15} className="ml-1" /></Link>
              </Button>
              <Button asChild variant="outline" className="border-slate-300 text-slate-800 hover:text-[#C8102E]">
                <Link to="/become-a-donor">Register as Voluntary Donor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. CONTACT SECTION */}
      <section id="contact" className="section bg-slate-50 border-t border-slate-100">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="LET’S KEEP HOPE CONNECTED"
              title="Contact BloodLink Healthcare Community"
              description="Connect with our platform team, healthcare partners, and community coordinators across India."
            >
              <Button asChild variant="outline" className="border-slate-300 text-slate-700 hover:text-[#C8102E]">
                <Link to="/contact">
                  Open Dedicated Contact Page <ArrowRight size={15} />
                </Link>
              </Button>
            </SectionHeading>
            <ContactSection />
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-white border-t border-slate-100">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="COMMUNITY STORIES"
              title="Every Donor Has a Story."
              description="Experiences from voluntary donors and healthcare advocates reflecting the life-saving impact of blood donation."
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
                      <p className="text-xs text-slate-500">{s.city} · Voluntary Donor</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <FinalCTA />
    </>
  );
}

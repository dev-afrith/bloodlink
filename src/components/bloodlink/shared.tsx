import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Droplet,
  Heart,
  Menu,
  X,
  ShieldCheck,
  Check,
  Instagram,
  Linkedin,
  Facebook,
  PhoneCall,
  Activity,
  AlertCircle,
  Building2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function Logo() {
  return (
    <Link to="/" className="brand group" aria-label="BloodLink home">
      <span className="brand-symbol">
        <svg viewBox="0 0 32 38" className="w-8 h-9 drop-shadow-sm transition-transform group-hover:scale-105" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="blLogoGrad" x1="4" y1="2" x2="28" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C8102E" />
              <stop offset="100%" stopColor="#8F1027" />
            </linearGradient>
          </defs>
          <path d="M16 2C13.8 8.5 4 19 4 25.5C4 32.4 9.4 38 16 38C22.6 38 28 32.4 28 25.5C28 19 18.2 8.5 16 2Z" fill="url(#blLogoGrad)"/>
          <path d="M16 30C12 25.5 9 19 13.5 17C17 15.5 19 22 22.5 21C24.5 20.5 25.5 25 21 28C18.5 29.5 17 30 16 30Z" fill="#FFFFFF" fillOpacity="0.88"/>
        </svg>
      </span>
      <span className="flex flex-col">
        <span className="brand-title">
          Blood<span className="text-[#C8102E]">Link</span>
        </span>
        <small className="brand-tagline">EVERY DROP CONNECTS A LIFE</small>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  const links = [
    { to: "/" as const, label: "Home" },
    { to: "/find-donors" as const, label: "Find Donors" },
    { to: "/requests" as const, label: "Emergency Requests", urgent: true },
    { to: "/blood-banks" as const, label: "Blood Banks" },
    { to: "/how-it-works" as const, label: "How It Works" },
    { to: "/about" as const, label: "About Us" },
  ];

  return (
    <>
      {/* Top demonstration & medical emergency notice ticker */}
      <div className="bg-[#8F1027] text-white text-[11.5px] font-medium py-1.5 px-4 text-center hidden md:flex items-center justify-center gap-2.5">
        <span className="inline-flex items-center justify-center bg-[#C8102E] text-white px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase">
          Demonstration Platform
        </span>
        <span>Voluntary blood donation discovery prototype. All donor profiles and hospital requests are illustrative simulations.</span>
        <span className="text-rose-200">For medical emergencies, dial <strong>108 / 112</strong> immediately.</span>
      </div>

      <header className="site-header">
        <div className="container nav-inner">
          <Logo />
          
          <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={path === l.to ? "nav-link active" : "nav-link"}
                aria-current={path === l.to ? "page" : undefined}
              >
                {l.urgent && (
                  <span className="relative flex h-2 w-2 mr-1.5 inline-block">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8102E] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8102E]"></span>
                  </span>
                )}
                {l.label}
              </Link>
            ))}
            <Button
              variant="ghost"
              className="mobile-login"
              onClick={() => {
                setOpen(false);
                setLogin(true);
              }}
            >
              Sign In
            </Button>
          </nav>

          <div className="nav-actions">
            <Button variant="ghost" className="desktop-login font-semibold text-slate-700 hover:text-[#C8102E]" onClick={() => setLogin(true)}>
              Sign In
            </Button>
            <Button asChild className="bg-[#C8102E] hover:bg-[#8F1027] text-white shadow-md hover:shadow-lg transition-all rounded-lg font-semibold">
              <Link to="/become-a-donor">
                <Heart size={16} className="fill-current text-white animate-pulse" />
                Become a Donor
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="menu-button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </Button>
          </div>
        </div>
      </header>

      <Dialog open={login} onOpenChange={setLogin}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="text-xl font-bold font-display text-slate-900">
            Sign In to BloodLink
          </DialogTitle>
          <DialogDescription className="text-slate-600 text-sm">
            BloodLink is a demonstration prototype for voluntary blood donation discovery. Account login is currently simulated for healthcare administrators and donors.
          </DialogDescription>
          <div className="my-3 p-3.5 bg-[#FFF1F2] border border-rose-200 rounded-lg text-xs text-[#8F1027]">
            <strong className="block mb-1 font-semibold">Prototype Note:</strong>
            You can test all interactive capabilities — including live donor filters, emergency request inquiries, and donor registrations — without logging in.
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <Button asChild className="bg-[#C8102E] hover:bg-[#8F1027] text-white" onClick={() => setLogin(false)}>
              <Link to="/become-a-donor">
                Try Voluntary Donor Registration <ArrowRight size={15} />
              </Link>
            </Button>
            <Button variant="outline" onClick={() => setLogin(false)}>
              Continue Exploring Website
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="space-y-4">
          <Logo />
          <p className="text-slate-300 text-sm font-medium">
            Every Drop Connects a Life.
          </p>
          <p className="footer-description text-slate-400 text-xs leading-relaxed">
            BloodLink is a digital healthcare platform bridging voluntary blood donors, accredited blood banks, and urgent hospital needs across Indian cities.
          </p>
          <div className="socials pt-2">
            {[
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Facebook, label: "Facebook" },
              { icon: Instagram, label: "Instagram" },
            ].map(({ icon: Icon, label }) => (
              <Button
                key={label}
                variant="outline"
                size="icon"
                asChild
                className="bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-[#C8102E] hover:border-[#C8102E] transition-all"
                aria-label={`${label} contact information`}
              >
                <Link to="/contact">
                  <Icon size={16} />
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h4>Platform Navigation</h4>
          <Link to="/find-donors">Find Blood Donors</Link>
          <Link to="/requests">Emergency Requests</Link>
          <Link to="/blood-banks">Blood Bank Directory</Link>
          <Link to="/become-a-donor">Register as Donor</Link>
          <Link to="/about">About BloodLink</Link>
          <Link to="/contact">Contact Support</Link>
        </div>

        <div>
          <h4>Clinical Guidance</h4>
          <Link to="/donation-guide">Donation Preparation Guide</Link>
          <Link to="/eligibility">Eligibility Guidelines</Link>
          <Link to="/how-it-works">How Donation Works</Link>
          <Link to="/faq">Frequently Asked Questions</Link>
          <Link to="/privacy">Privacy & Confidentiality</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>

        <div>
          <h4>Urgent Healthcare Notice</h4>
          <div className="p-3.5 bg-slate-800/60 border border-slate-700/80 rounded-xl space-y-2 mb-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 text-rose-400 font-semibold">
              <AlertCircle size={14} /> Immediate Emergency?
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              For acute medical emergencies, call <strong>108 / 112</strong> or your local hospital emergency room immediately.
            </p>
          </div>
          <Button asChild className="w-full bg-[#C8102E] hover:bg-[#8F1027] text-white font-semibold shadow-md">
            <Link to="/become-a-donor">
              Become a Voluntary Donor <ArrowUpRight size={16} />
            </Link>
          </Button>
          <div className="footer-note mt-3 text-slate-400 text-xs flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-emerald-400" /> WHO Voluntary Protocol Aligned
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 BloodLink. Every Drop Connects a Life. All rights reserved.</span>
        <span>Accredited Healthcare & Voluntary Donor Discovery Platform</span>
      </div>
    </footer>
  );
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], staggerChildren: reduced ? 0 : 0.06 }
        }
      }}
      viewport={{ once: true, amount: 0.08 }}
    >
      {children}
    </motion.div>
  );
}

export const itemReveal = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } }
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">
          <span />
          {eyebrow}
        </span>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {children}
    </div>
  );
}

export function DemoNotice({ children }: { children?: ReactNode }) {
  return (
    <div className="demo-notice p-3.5 bg-rose-50/70 border border-rose-200/80 rounded-xl my-4 text-xs text-[#8F1027] flex items-start gap-2.5 leading-relaxed">
      <ShieldCheck size={18} className="text-[#C8102E] shrink-0 mt-0.5" />
      <span>
        {children ||
          "Demonstration Notice: All donor profiles, blood requests, hospital listings, and testimonials are fictional examples created for this demonstration prototype. BloodLink does not provide direct medical care, blood dispatch, or emergency coordination. In an emergency, always contact 108 / 112 or your nearest hospital directly."}
      </span>
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-intro">
      <div className="container">
        <span className="eyebrow">
          <span />
          {eyebrow}
        </span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container relative z-10">
        <div className="max-w-2xl">
          <span className="eyebrow !text-rose-200">
            <span />
            A SMALL ACT · AN EXTRAORDINARY CONNECTION
          </span>
          <h2>
            Be the Link Between
            <br />
            Life and Hope.
          </h2>
          <p>
            Your decision to become a voluntary blood donor takes less than 15 minutes,
            yet gives up to three patients a second chance at life. Join thousands of compassionate community members today.
          </p>
          <div className="button-row">
            <Button asChild variant="light" size="lg" className="shadow-lg hover:shadow-xl font-semibold transition-all">
              <Link to="/become-a-donor">
                <Heart className="text-[#C8102E] fill-[#C8102E]" size={16} />
                Become a Donor <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="crimsonOutline" size="lg" className="border-white/30 text-white hover:bg-white/10 font-semibold">
              <Link to="/find-donors">
                Explore Donors Near You <ArrowUpRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
        <div className="cta-art hidden md:block" aria-hidden="true">
          <Droplet className="w-full h-full text-white/15 stroke-[0.8]" />
          <Heart className="cta-heart text-white/30 fill-white/20 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

export function TrustItem({ children }: { children: ReactNode }) {
  return (
    <span className="trust-item">
      <Check size={14} className="text-emerald-600" />
      {children}
    </span>
  );
}

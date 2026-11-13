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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function Logo() {
  return (
    <Link to="/" className="brand" aria-label="BloodLink home">
      <span className="brand-symbol">
        <Droplet />
        <span className="logo-link">∞</span>
      </span>
      <span>
        Blood<span className="text-primary">Link</span>
        <small>EVERY DROP. A CONNECTION.</small>
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
    { to: "/blood-banks" as const, label: "Blood Banks" },
    { to: "/how-it-works" as const, label: "How It Works" },
    { to: "/about" as const, label: "About Us" },
  ];
  return (
    <>
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
              >
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
              Login
            </Button>
          </nav>
          <div className="nav-actions">
            <Button variant="ghost" className="desktop-login" onClick={() => setLogin(true)}>
              Login
            </Button>
            <Button asChild>
              <Link to="/become-a-donor">
                <Heart size={15} />
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
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </header>
      <Dialog open={login} onOpenChange={setLogin}>
        <DialogContent>
          <DialogTitle>A community without barriers.</DialogTitle>
          <DialogDescription>
            BloodLink is a demonstration prototype. Account sign-in is not connected, and no real
            donor account is created.
          </DialogDescription>
          <Button asChild onClick={() => setLogin(false)}>
            <Link to="/become-a-donor">
              Try donor registration <ArrowRight />
            </Link>
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p>Every Drop Connects a Life.</p>
          <p className="footer-description">
            Bringing people together.
            <br />
            Keeping hope connected.
          </p>
          <div className="socials">
            {[
              { icon: Instagram, label: "Instagram" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Facebook, label: "Facebook" },
            ].map(({ icon: Icon, label }) => (
              <Button
                key={label}
                variant="outline"
                size="icon"
                asChild
                aria-label={`${label} contact information`}
              >
                <Link to="/contact">
                  <Icon />
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div>
          <h4>Explore BloodLink</h4>
          <Link to="/find-donors">Find Donors</Link>
          <Link to="/blood-banks">Blood Banks</Link>
          <Link to="/requests">Blood Requests</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h4>Helpful Resources</h4>
          <Link to="/donation-guide">Donation Guide</Link>
          <Link to="/eligibility">Eligibility Information</Link>
          <Link to="/faq">Frequently Asked Questions</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>
        <div>
          <h4>A little act. A lasting impact.</h4>
          <p>One donation. A meaningful connection.</p>
          <Button asChild variant="outline">
            <Link to="/become-a-donor">
              Become a Donor <ArrowUpRight />
            </Link>
          </Button>
          <div className="footer-note">
            <ShieldCheck size={17} /> Built around voluntary donation.
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 BloodLink. Every Drop Connects a Life.</span>
        <span>Demonstration prototype · Not an emergency service</span>
      </div>
    </footer>
  );
}
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55 }}
    >
      {children}
    </motion.div>
  );
}
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
    <div className="demo-notice">
      <ShieldCheck size={17} />
      <span>
        {children ||
          "Demonstration data only. These are fictional profiles, not live donor availability or real healthcare services."}
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
      <div className="container">
        <div>
          <span className="eyebrow">A SMALL ACT. AN EXTRAORDINARY CONNECTION.</span>
          <h2>
            Be the Link Between
            <br />
            Life and Hope.
          </h2>
          <p>
            Your decision to become a voluntary blood donor could make
            <br className="desktop-break" /> a meaningful difference in someone’s life.
          </p>
          <div className="button-row">
            <Button asChild variant="light" size="lg">
              <Link to="/become-a-donor">
                Become a Donor <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="crimsonOutline" size="lg">
              <Link to="/find-donors">
                Explore BloodLink <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
        <div className="cta-art" aria-hidden="true">
          <Droplet />
          <Heart className="cta-heart" />
        </div>
      </div>
    </section>
  );
}
export function TrustItem({ children }: { children: ReactNode }) {
  return (
    <span className="trust-item">
      <Check size={13} />
      {children}
    </span>
  );
}

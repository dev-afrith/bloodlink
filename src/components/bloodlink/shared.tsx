import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useRef, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
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
  ChevronDown,
  Layers,
  BookOpen,
  Sparkles,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ResourcesDropdown } from "./resources-menu";
import { useAuth } from "@/context/auth-context";

export function Logo() {
  return (
    <Link to="/" className="brand group" aria-label="BloodLink home">
      <span className="brand-symbol">
        <svg viewBox="0 0 32 38" className="w-8 h-9 drop-shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" xmlns="http://www.w3.org/2000/svg">
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
        <span className="brand-title tracking-tight">
          Blood<span className="text-[#C8102E]">Link</span>
        </span>
        <small className="brand-tagline tracking-[0.18em]">EVERY DROP CONNECTS A LIFE</small>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mounted, setMounted] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { user, isAuthenticated, logout, getDisplayName, getAvatarText } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menus on path transition
  useEffect(() => {
    setResourcesOpen(false);
    setOpen(false);
  }, [path]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Handle URL hash on initial load or route transition to homepage
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (path === "/") {
      const hash = window.location.hash?.replace("#", "");
      if (hash) {
        const timer = setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            setActiveSection(hash);
          }
        }, 120);
        return () => clearTimeout(timer);
      }
    }
  }, [path]);

  // Active section scroll tracking when on homepage
  useEffect(() => {
    if (typeof window === "undefined" || path !== "/") return;

    const sectionIds = [
      "hero",
      "find-donors",
      "emergency-requests",
      "blood-banks",
      "how-it-works",
      "compatibility",
      "metrics",
      "resources",
      "about",
      "contact",
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [path]);

  const handleNavScroll = (e: React.MouseEvent, targetId: string, fallbackUrl: string) => {
    setOpen(false);
    setResourcesOpen(false);
    if (path === "/") {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", targetId === "hero" ? "/" : `/#${targetId}`);
        setActiveSection(targetId);
      }
    }
  };

  const isResourceActive = [
    "/eligibility",
    "/blood-compatibility",
    "/blood-groups",
    "/donation-guide",
    "/faq",
    "/privacy",
    "/terms",
  ].includes(path);

  return (
    <>
      {/* Slim emergency helpline bar */}
      <div className="bg-[#0F172A] text-white text-[11px] font-medium py-1 px-4 text-center hidden md:flex items-center justify-center gap-4 border-b border-slate-800/60">
        <span className="text-slate-300 flex items-center gap-1.5">
          <PhoneCall size={11} className="text-rose-400" />
          Medical Emergency Helpline: <strong className="text-white">108 / 112</strong>
        </span>
        <span className="text-slate-500">|</span>
        <span className="text-slate-400">Voluntary blood donation discovery platform</span>
      </div>

      <header className="site-header relative bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_1px_3px_rgba(15,23,42,0.03)]">
        <div className="container nav-inner flex items-center justify-between h-[80px] px-4 md:px-8 max-w-[1360px] mx-auto">
          {/* LEFT: BloodLink Logo & Tagline */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* CENTRE NAVIGATION (DESKTOP)
              1. Home
              2. Find Donors
              3. Emergency Requests (Special highlighted button)
              4. Resources ↓ */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main navigation">
            {/* 1. Home */}
            <Link
              to="/"
              onClick={(e) => handleNavScroll(e, "hero", "/")}
              className={`text-[15px] font-semibold transition-colors duration-150 py-1 ${
                path === "/" && activeSection === "hero"
                  ? "text-[#C8102E] font-bold"
                  : "text-[#0F172A] hover:text-[#C8102E]"
              }`}
            >
              Home
            </Link>

            {/* 2. Find Donors */}
            <Link
              to={path === "/" ? undefined : "/#find-donors"}
              onClick={(e) => handleNavScroll(e, "find-donors", "/#find-donors")}
              className={`text-[15px] font-semibold transition-colors duration-150 py-1 ${
                (path === "/" && activeSection === "find-donors") || path === "/find-donors"
                  ? "text-[#C8102E] font-bold"
                  : "text-[#0F172A] hover:text-[#C8102E]"
              }`}
            >
              Find Donors
            </Link>

            {/* 3. Request Blood – DISTINCTIVE CRIMSON ACTION BUTTON */}
            <Button
              asChild
              className="bg-[#C8102E] hover:bg-[#A60D25] active:bg-[#8F1027] text-white font-semibold text-[14px] px-3.5 py-2 rounded-xl shadow-sm hover:shadow-md hover:shadow-rose-900/20 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] focus-visible:ring-offset-2"
            >
              <Link to="/request-blood">
                <Droplet size={15} className="fill-white text-white shrink-0" />
                <span>Request Blood</span>
              </Link>
            </Button>

            {/* 4. Emergency Requests */}
            <Button
              asChild
              variant="outline"
              className="border-slate-300 hover:border-slate-400 text-slate-800 hover:text-slate-900 font-semibold text-[14px] px-3.5 py-2 rounded-xl shadow-xs hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-1.5 bg-white"
            >
              <Link
                to={path === "/" ? undefined : "/#emergency-requests"}
                onClick={(e) => handleNavScroll(e, "emergency-requests", "/#emergency-requests")}
              >
                <AlertCircle size={15} className="text-[#C8102E] shrink-0" />
                <span>Emergency Requests</span>
              </Link>
            </Button>

            {/* 4. Resources Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className={`text-[15px] font-semibold inline-flex items-center gap-1.5 py-1 transition-colors duration-150 cursor-pointer ${
                  resourcesOpen || isResourceActive
                    ? "text-[#C8102E] font-bold"
                    : "text-[#0F172A] hover:text-[#C8102E]"
                }`}
                aria-expanded={resourcesOpen}
                aria-haspopup="true"
              >
                <span>Resources</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    resourcesOpen ? "rotate-180 text-[#C8102E]" : "text-slate-500"
                  }`}
                />
              </button>

              {/* Desktop Resources Dropdown Panel */}
              <ResourcesDropdown
                isOpen={resourcesOpen}
                onClose={() => setResourcesOpen(false)}
                isHome={path === "/"}
                onSectionClick={(id) => {
                  setResourcesOpen(false);
                  const el = document.getElementById(id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState(null, "", `/#${id}`);
                    setActiveSection(id);
                  }
                }}
              />
            </div>
          </nav>

          {/* RIGHT SIDE (DESKTOP)
              Sign In (if guest) OR User Dropdown Avatar (if authenticated)
              Become a Donor – primary crimson CTA */}
          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated ? (
              <Button
                asChild
                variant="ghost"
                className="font-semibold text-[15px] text-slate-700 hover:text-[#C8102E] hover:bg-rose-50/60 transition-colors px-3.5 py-2 rounded-xl"
              >
                <Link to="/auth">Sign In</Link>
              </Button>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200/90 hover:border-rose-200 hover:bg-rose-50/50 bg-white transition-all text-left shadow-2xs cursor-pointer"
                  aria-expanded={userDropdownOpen}
                  aria-haspopup="true"
                >
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C8102E] to-[#8F1027] text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                    {getAvatarText()}
                  </span>
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[110px]">
                      {getDisplayName()}
                    </p>
                    <span className="text-[10px] font-semibold text-[#C8102E] block">
                      {user?.role}
                    </span>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`text-slate-400 transition-transform duration-200 ${
                      userDropdownOpen ? "rotate-180 text-[#C8102E]" : ""
                    }`}
                  />
                </button>

                {/* User Dropdown Panel */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{getDisplayName()}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-rose-50 border border-rose-100 text-[#C8102E] font-bold text-[10px] rounded-md">
                        {user?.role}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-[#C8102E] transition-colors"
                      >
                        <LayoutDashboard size={15} className="text-slate-400" />
                        <span>My Dashboard</span>
                      </Link>
                      <Link
                        to="/edit-profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-[#C8102E] transition-colors"
                      >
                        <User size={15} className="text-slate-400" />
                        <span>Edit Profile</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left"
                      >
                        <LogOut size={15} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <Button
              asChild
              className="bg-gradient-to-r from-[#C8102E] to-[#8F1027] hover:from-[#A60D25] hover:to-[#730D20] text-white shadow-md hover:shadow-rose-900/20 hover:-translate-y-0.5 transition-all rounded-xl font-semibold px-4.5 py-2 text-[15px] flex items-center gap-2"
            >
              <Link to="/become-a-donor">
                <Heart size={15} className="fill-current text-white animate-pulse" />
                <span>Become a Donor</span>
              </Link>
            </Button>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              className="flex items-center justify-center w-11 h-11 rounded-xl text-slate-800 hover:text-[#C8102E] hover:bg-slate-100 active:bg-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E]"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE SLIDE-IN NAVIGATION DRAWER (Rendered via Portal to body to avoid header backdrop-filter containment) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                {/* Darkened Backdrop */}
                <motion.div
                  key="mobile-nav-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setOpen(false)}
                  className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-[9998] md:hidden cursor-pointer"
                  aria-hidden="true"
                />

                {/* Drawer Container */}
                <motion.div
                  key="mobile-nav-drawer"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 280 }}
                  className="fixed top-0 right-0 bottom-0 w-[320px] max-w-[85vw] h-[100dvh] bg-white z-[9999] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto md:hidden"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Mobile Navigation"
                >
                  <div className="space-y-6">
                    {/* Drawer Header with Logo & Close Button */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <Logo />
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        aria-label="Close menu"
                      >
                        <X size={22} />
                      </button>
                    </div>

                    {/* Main Navigation Options */}
                    <div className="space-y-2">
                      {/* 1. Home */}
                      <Link
                        to="/"
                        onClick={(e) => {
                          setOpen(false);
                          if (path === "/") {
                            e.preventDefault();
                            document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
                            window.history.pushState(null, "", "/");
                            setActiveSection("hero");
                          }
                        }}
                        className={`flex items-center gap-2.5 text-base font-bold py-2.5 px-3 rounded-xl transition-colors ${
                          path === "/" && activeSection === "hero"
                            ? "text-[#C8102E] bg-rose-50"
                            : "text-slate-900 hover:text-[#C8102E] hover:bg-slate-50"
                        }`}
                      >
                        <span>Home</span>
                      </Link>

                      {/* 2. Find Donors */}
                      <Link
                        to={path === "/" ? undefined : "/#find-donors"}
                        onClick={(e) => {
                          setOpen(false);
                          if (path === "/") {
                            e.preventDefault();
                            document.getElementById("find-donors")?.scrollIntoView({ behavior: "smooth" });
                            window.history.pushState(null, "", "/#find-donors");
                            setActiveSection("find-donors");
                          }
                        }}
                        className={`flex items-center gap-2.5 text-base font-bold py-2.5 px-3 rounded-xl transition-colors ${
                          (path === "/" && activeSection === "find-donors") || path === "/find-donors"
                            ? "text-[#C8102E] bg-rose-50"
                            : "text-slate-900 hover:text-[#C8102E] hover:bg-slate-50"
                        }`}
                      >
                        <span>Find Donors</span>
                      </Link>

                      {/* 3. Request Blood – Prominent Crimson Button */}
                      <div className="pt-1.5 pb-1">
                        <Button
                          asChild
                          className="w-full bg-[#C8102E] hover:bg-[#A60D25] active:bg-[#8F1027] text-white font-bold text-sm sm:text-base py-3 h-auto rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
                        >
                          <Link to="/request-blood" onClick={() => setOpen(false)}>
                            <Droplet size={17} className="fill-white text-white shrink-0" />
                            <span>Request Blood</span>
                          </Link>
                        </Button>
                      </div>

                      {/* 4. Emergency Requests */}
                      <div className="pb-1">
                        <Button
                          asChild
                          variant="outline"
                          className="w-full border-slate-300 hover:border-[#C8102E] text-slate-800 hover:text-[#C8102E] font-bold text-sm sm:text-base py-2.5 h-auto rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all"
                        >
                          <Link
                            to={path === "/" ? undefined : "/#emergency-requests"}
                            onClick={(e) => {
                              setOpen(false);
                              if (path === "/") {
                                e.preventDefault();
                                document.getElementById("emergency-requests")?.scrollIntoView({ behavior: "smooth" });
                                window.history.pushState(null, "", "/#emergency-requests");
                                setActiveSection("emergency-requests");
                              }
                            }}
                          >
                            <AlertCircle size={17} className="text-[#C8102E] shrink-0" />
                            <span>Emergency Requests</span>
                          </Link>
                        </Button>
                      </div>
                    </div>

                    {/* 4. Resources Accordion */}
                    <div className="border-t border-slate-100 pt-3">
                      <button
                        type="button"
                        onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                        className="w-full flex items-center justify-between text-left py-2.5 px-3 rounded-xl hover:bg-slate-50 font-bold text-slate-900 hover:text-[#C8102E] transition-colors"
                      >
                        <span className="text-xs uppercase tracking-wider text-slate-500 font-extrabold flex items-center gap-2">
                          <BookOpen size={16} className="text-[#C8102E]" />
                          Resources
                        </span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${
                            mobileResourcesOpen ? "rotate-180 text-[#C8102E]" : "text-slate-400"
                          }`}
                        />
                      </button>

                      {mobileResourcesOpen && (
                        <div className="pl-3 pt-2 space-y-4 text-xs">
                          {/* Group 1: Donation Information */}
                          <div>
                            <span className="font-extrabold text-[10px] uppercase tracking-wider text-[#C8102E] block mb-1.5">
                              Donation Information
                            </span>
                            <div className="space-y-1.5 pl-2 border-l border-rose-100 text-slate-700 font-medium">
                              <Link to="/eligibility" onClick={() => setOpen(false)} className="block py-1 hover:text-[#C8102E]">
                                Who Can Donate?
                              </Link>
                              <Link to="/blood-groups" onClick={() => setOpen(false)} className="block py-1 hover:text-[#C8102E]">
                                Blood Groups
                              </Link>
                              <Link to="/blood-compatibility" onClick={() => setOpen(false)} className="block py-1 hover:text-[#C8102E]">
                                Blood Compatibility
                              </Link>
                              <Link to="/donation-guide" onClick={() => setOpen(false)} className="block py-1 hover:text-[#C8102E]">
                                Donation Guide
                              </Link>
                              <Link to="/eligibility" onClick={() => setOpen(false)} className="block py-1 hover:text-[#C8102E]">
                                Eligibility Criteria
                              </Link>
                            </div>
                          </div>

                          {/* Group 2: Explore BloodLink */}
                          <div>
                            <span className="font-extrabold text-[10px] uppercase tracking-wider text-[#C8102E] block mb-1.5">
                              Explore BloodLink
                            </span>
                            <div className="space-y-1.5 pl-2 border-l border-rose-100 text-slate-700 font-medium">
                              <Link
                                to={path === "/" ? undefined : "/#blood-banks"}
                                onClick={(e) => {
                                  setOpen(false);
                                  if (path === "/") {
                                    e.preventDefault();
                                    document.getElementById("blood-banks")?.scrollIntoView({ behavior: "smooth" });
                                  }
                                }}
                                className="block py-1 hover:text-[#C8102E]"
                              >
                                Blood Banks
                              </Link>
                              <Link
                                to={path === "/" ? undefined : "/#how-it-works"}
                                onClick={(e) => {
                                  setOpen(false);
                                  if (path === "/") {
                                    e.preventDefault();
                                    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                                  }
                                }}
                                className="block py-1 hover:text-[#C8102E]"
                              >
                                How It Works
                              </Link>
                              <Link
                                to={path === "/" ? undefined : "/#about"}
                                onClick={(e) => {
                                  setOpen(false);
                                  if (path === "/") {
                                    e.preventDefault();
                                    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                                  }
                                }}
                                className="block py-1 hover:text-[#C8102E]"
                              >
                                About Us
                              </Link>
                              <Link
                                to={path === "/" ? undefined : "/#contact"}
                                onClick={(e) => {
                                  setOpen(false);
                                  if (path === "/") {
                                    e.preventDefault();
                                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                                  }
                                }}
                                className="block py-1 hover:text-[#C8102E]"
                              >
                                Contact Us
                              </Link>
                            </div>
                          </div>

                          {/* Group 3: Help & Support */}
                          <div>
                            <span className="font-extrabold text-[10px] uppercase tracking-wider text-[#C8102E] block mb-1.5">
                              Help &amp; Support
                            </span>
                            <div className="space-y-1.5 pl-2 border-l border-rose-100 text-slate-700 font-medium">
                              <Link to="/faq" onClick={() => setOpen(false)} className="block py-1 hover:text-[#C8102E]">
                                Frequently Asked Questions
                              </Link>
                              <Link to="/privacy" onClick={() => setOpen(false)} className="block py-1 hover:text-[#C8102E]">
                                Privacy Policy
                              </Link>
                              <Link to="/terms" onClick={() => setOpen(false)} className="block py-1 hover:text-[#C8102E]">
                                Terms &amp; Conditions
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Drawer Bottom Actions: User Profile / Sign Out (if logged in) OR Sign In (if guest), plus Become a Donor */}
                  <div className="pt-6 border-t border-slate-100 space-y-2.5">
                    {!isAuthenticated ? (
                      <Button
                        asChild
                        variant="outline"
                        className="w-full font-semibold border-slate-300 hover:border-[#C8102E] text-slate-800 hover:text-[#C8102E] h-11 rounded-xl text-sm transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        <Link to="/auth">Sign In</Link>
                      </Button>
                    ) : (
                      <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C8102E] to-[#8F1027] text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
                            {getAvatarText()}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">{getDisplayName()}</p>
                            <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                            <span className="inline-block mt-0.5 px-2 py-0.5 bg-rose-100 text-[#C8102E] font-bold text-[10px] rounded-full">
                              {user?.role}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/60">
                          <Button
                            asChild
                            variant="outline"
                            className="h-9 text-xs font-semibold rounded-lg bg-white"
                            onClick={() => setOpen(false)}
                          >
                            <Link to="/dashboard">Dashboard</Link>
                          </Button>
                          <Button
                            asChild
                            variant="outline"
                            className="h-9 text-xs font-semibold rounded-lg bg-white text-slate-700"
                            onClick={() => setOpen(false)}
                          >
                            <Link to="/edit-profile">Profile</Link>
                          </Button>
                        </div>

                        <div className="pt-1">
                          <Button
                            variant="ghost"
                            className="w-full h-8 text-xs font-semibold rounded-lg text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                            onClick={() => {
                              setOpen(false);
                              logout();
                            }}
                          >
                            <LogOut size={13} className="mr-1" /> Sign Out
                          </Button>
                        </div>
                      </div>
                    )}
                    <Button
                      asChild
                      className="w-full bg-[#C8102E] hover:bg-[#8F1027] text-white font-semibold shadow-md h-11 rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
                      onClick={() => setOpen(false)}
                    >
                      <Link to="/become-a-donor">
                        <Heart size={15} className="fill-current text-white" />
                        <span>Become a Donor</span>
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer relative overflow-hidden">
      {/* Decorative top accent gradient */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8102E] to-transparent opacity-80" />

      <div className="container footer-grid pt-12 pb-8">
        <div className="space-y-4">
          <Logo />
          <p className="text-white font-medium text-sm">
            Every Drop Connects a Life.
          </p>
          <p className="footer-description text-slate-400 text-xs leading-relaxed max-w-sm">
            BloodLink is a premier digital healthcare technology platform bridging voluntary blood donors, accredited blood bank networks, and hospital clinical requirements across India.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/40 text-[11px] font-medium text-emerald-300">
              <ShieldCheck size={13} className="text-emerald-400" /> WHO Voluntary Guideline Aligned
            </span>
          </div>
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
                className="bg-slate-800/80 border-slate-700/80 text-slate-300 hover:text-white hover:bg-[#C8102E] hover:border-[#C8102E] transition-all rounded-lg h-9 w-9"
                aria-label={`${label} contact information`}
              >
                <Link to="/contact">
                  <Icon size={15} />
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h4>Platform Navigation</h4>
          <Link to="/request-blood">Request Blood</Link>
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
          <Link to="/blood-compatibility">Blood Compatibility</Link>
          <Link to="/blood-groups">Blood Groups Demographics</Link>
          <Link to="/how-it-works">How Donation Works</Link>
          <Link to="/faq">Frequently Asked Questions</Link>
          <Link to="/privacy">Privacy & Confidentiality</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>

        <div>
          <h4>Urgent Healthcare Notice</h4>
          <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-800/90 border border-rose-900/40 rounded-xl space-y-2 mb-4 text-xs text-slate-300 shadow-sm">
            <div className="flex items-center gap-1.5 text-rose-400 font-semibold text-xs">
              <AlertCircle size={15} /> Acute Emergency?
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              For acute medical emergencies, call national emergency dispatch at <strong>108 / 112</strong> or visit your nearest hospital trauma center immediately.
            </p>
          </div>
          <Button asChild className="w-full bg-gradient-to-r from-[#C8102E] to-[#8F1027] hover:from-[#A60D25] hover:to-[#730D20] text-white font-semibold shadow-md rounded-xl h-11 text-xs">
            <Link to="/become-a-donor">
              Become a Voluntary Donor <ArrowUpRight size={15} className="ml-1" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="container footer-bottom border-t border-slate-800/80 py-6 text-xs text-slate-400 flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="flex items-center gap-1">
          © 2026 BloodLink · Every Drop Connects a Life. All rights reserved.
        </span>
        <span className="text-slate-500 text-[11px]">
          Every Drop Connects a Life · Award-Winning Healthcare Architecture
        </span>
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
  if (!children) return null;
  return (
    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl my-4 text-xs text-slate-600 flex items-start gap-2.5 leading-relaxed">
      <ShieldCheck size={16} className="text-[#C8102E] shrink-0 mt-0.5" />
      <span>{children}</span>
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
    <section className="page-intro relative overflow-hidden bg-gradient-to-b from-[#FFF1F2]/80 via-white to-slate-50 border-b border-rose-100/80 py-16 md:py-20">
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="container relative z-10">
        <span className="eyebrow text-[#C8102E] font-bold tracking-widest">
          <span className="bg-[#C8102E]" />
          {eyebrow}
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold font-display text-slate-950 mt-3 mb-4 tracking-tight leading-[1.15]">
          {title}
        </h1>
        <p className="text-slate-600 text-sm md:text-base max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="final-cta relative overflow-hidden bg-gradient-to-br from-[#8F1027] via-[#C8102E] to-[#7A0D22] text-white py-20">
      <div className="container relative z-10">
        <div className="max-w-2xl">
          <span className="eyebrow !text-rose-200 font-bold tracking-widest">
            <span className="!bg-rose-200" />
            A SMALL ACT · AN EXTRAORDINARY CONNECTION
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display leading-[1.15] mt-4 mb-5 text-white tracking-tight">
            Be the Link Between
            <br />
            <span className="text-rose-100">Life and Hope.</span>
          </h2>
          <p className="text-rose-100 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
            Your decision to become a voluntary blood donor takes less than 15 minutes,
            yet gives up to three patients a second chance at life. Join thousands of compassionate community members today.
          </p>
          <div className="button-row flex flex-wrap gap-4 items-center">
            <Button asChild size="lg" className="bg-white text-[#C8102E] hover:bg-rose-50 shadow-xl hover:shadow-2xl font-bold transition-all rounded-xl h-14 px-8 text-base">
              <Link to="/become-a-donor">
                <Heart className="text-[#C8102E] fill-[#C8102E] mr-1" size={19} />
                Become a Voluntary Donor <ArrowRight size={18} className="ml-1" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-[#101827] text-white hover:bg-[#1E293B] border-2 border-white/80 hover:border-white shadow-xl hover:shadow-2xl font-bold transition-all rounded-xl h-14 px-8 text-base">
              <Link to="/find-donors">
                Explore Donors Near You <ArrowUpRight size={18} className="ml-1 text-rose-300" />
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

/**
 * Reusable BackToHome navigation button.
 * Displayed on all dedicated internal pages directly beneath the main navbar.
 * Hidden on the homepage.
 */
export function BackToHome({ className = "" }: { className?: string }) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  // Do not render on the homepage
  if (path === "/") {
    return null;
  }

  return (
    <div className={`w-full bg-slate-50/80 border-b border-slate-200/70 py-2.5 transition-colors ${className}`}>
      <div className="container max-w-[1360px] mx-auto px-4 md:px-8 flex items-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#C8102E] hover:text-[#8F1027] group py-1 px-2.5 -ml-2.5 rounded-lg hover:bg-rose-100/60 transition-all duration-200"
          aria-label="Back to Home"
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-200 group-hover:-translate-x-1 shrink-0 text-[#C8102E]"
          />
          <span className="tracking-tight text-[13.5px]">Back to Home</span>
        </Link>
      </div>
    </div>
  );
}

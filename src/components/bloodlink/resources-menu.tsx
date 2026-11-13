import { useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Droplet,
  Users,
  Building2,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  PhoneCall,
  Activity,
  Layers,
  Sparkles,
  FileText,
} from "lucide-react";

export interface ResourcesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  isHome: boolean;
  onSectionClick: (id: string) => void;
}

export function ResourcesDropdown({
  isOpen,
  onClose,
  isHome,
  onSectionClick,
}: ResourcesDropdownProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const donationInfoLinks = [
    {
      title: "Who Can Donate?",
      desc: "Check health, age, and weight requirements",
      to: "/eligibility" as const,
      icon: Users,
    },
    {
      title: "Blood Groups",
      desc: "Explore 8 ABO/Rh types & distribution",
      to: "/blood-groups" as const,
      icon: Layers,
    },
    {
      title: "Blood Compatibility",
      desc: "Interactive clinical transfusion matching",
      to: "/blood-compatibility" as const,
      icon: Droplet,
    },
    {
      title: "Donation Guide",
      desc: "Preparation, safety & donation day facts",
      to: "/donation-guide" as const,
      icon: BookOpen,
    },
    {
      title: "Eligibility",
      desc: "Comprehensive WHO clinical deferral criteria",
      to: "/eligibility" as const,
      icon: Activity,
    },
  ];

  const exploreLinks = [
    {
      title: "Request Blood",
      desc: "Submit emergency or planned patient requirement",
      to: "/request-blood" as const,
      id: "request-blood",
      icon: Droplet,
    },
    {
      title: "Blood Banks",
      desc: "Accredited facilities and component centers",
      to: "/blood-banks" as const,
      id: "blood-banks",
      icon: Building2,
    },
    {
      title: "How It Works",
      desc: "Transparent 3-step voluntary workflow",
      to: "/how-it-works" as const,
      id: "how-it-works",
      icon: Sparkles,
    },
    {
      title: "About Us",
      desc: "Our purpose, clinical values, and mission",
      to: "/about" as const,
      id: "about",
      icon: Heart,
    },
    {
      title: "Contact Us",
      desc: "Reach community coordinators & support",
      to: "/contact" as const,
      id: "contact",
      icon: PhoneCall,
    },
  ];

  const helpLinks = [
    {
      title: "Frequently Asked Questions",
      desc: "Clear answers to common donor inquiries",
      to: "/faq" as const,
      icon: HelpCircle,
    },
    {
      title: "Privacy Policy",
      desc: "Data ethics & patient confidentiality",
      to: "/privacy" as const,
      icon: ShieldCheck,
    },
    {
      title: "Terms & Conditions",
      desc: "Voluntary platform standards & usage terms",
      to: "/terms" as const,
      icon: FileText,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: 8, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.99 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[840px] max-w-[calc(100vw-32px)] bg-white rounded-2xl border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.12),0_0_1px_rgba(15,23,42,0.06)] p-6 z-50 overflow-hidden"
          role="menu"
          aria-label="Resources Dropdown Menu"
        >
          {/* Subtle crimson accent line at the top of the card */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#C8102E] to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
            {/* GROUP 1: DONATION INFORMATION */}
            <div className="space-y-3">
              <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#C8102E]">
                  DONATION INFORMATION
                </span>
              </div>
              <div className="space-y-1">
                {donationInfoLinks.map((item) => (
                  <Link
                    key={item.title}
                    to={item.to}
                    onClick={onClose}
                    className="flex items-start gap-3 p-2 rounded-xl hover:bg-rose-50/50 hover:border-rose-100 border border-transparent transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#C8102E] flex items-center justify-center shrink-0 group-hover:bg-[#C8102E] group-hover:text-white transition-colors mt-0.5">
                      <item.icon size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#C8102E] transition-colors leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* GROUP 2: EXPLORE BLOODLINK */}
            <div className="space-y-3">
              <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#C8102E]">
                  EXPLORE BLOODLINK
                </span>
              </div>
              <div className="space-y-1">
                {exploreLinks.map((item) => (
                  <Link
                    key={item.title}
                    to={isHome ? undefined : (item.id ? `/#${item.id}` : item.to)}
                    onClick={(e) => {
                      if (isHome && item.id) {
                        e.preventDefault();
                        onSectionClick(item.id);
                      } else {
                        onClose();
                      }
                    }}
                    className="flex items-start gap-3 p-2 rounded-xl hover:bg-rose-50/50 hover:border-rose-100 border border-transparent transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:bg-[#C8102E] group-hover:text-white transition-colors mt-0.5">
                      <item.icon size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#C8102E] transition-colors leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* GROUP 3: HELP & SUPPORT */}
            <div className="space-y-3">
              <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#C8102E]">
                  HELP &amp; SUPPORT
                </span>
              </div>
              <div className="space-y-1">
                {helpLinks.map((item) => (
                  <Link
                    key={item.title}
                    to={item.to}
                    onClick={onClose}
                    className="flex items-start gap-3 p-2 rounded-xl hover:bg-rose-50/50 hover:border-rose-100 border border-transparent transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:bg-[#C8102E] group-hover:text-white transition-colors mt-0.5">
                      <item.icon size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#C8102E] transition-colors leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM QUICK FOOTER STRIP */}
          <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 bg-slate-50/70 -mx-6 -mb-6 p-4 px-6 rounded-b-2xl">
            <span className="flex items-center gap-1.5 font-medium">
              <PhoneCall size={13} className="text-[#C8102E]" />
              Emergency Helpline: <strong className="text-slate-900">108 / 112</strong>
            </span>
            <Link
              to="/donation-guide"
              onClick={onClose}
              className="font-bold text-[#C8102E] hover:text-[#8F1027] flex items-center gap-1 transition-colors"
            >
              <span>View All Clinical Resources</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Retain alias for backwards compatibility if needed
export const ResourcesMegaMenu = ResourcesDropdown;

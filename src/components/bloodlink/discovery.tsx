import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Search,
  MapPin,
  Droplet,
  ShieldCheck,
  Clock,
  Building2,
  LoaderCircle,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  PhoneCall,
  Calendar,
  Heart,
  Share2,
  Info,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast-notification";
import {
  bloodGroups,
  locations,
  filterDonors,
  requests,
  banks,
  type Filters,
  type Donor,
} from "@/data/demo";
import { DemoNotice } from "./shared";

const compatibility: Record<string, { donateTo: string; receiveFrom: string; clinicalRole: string }> = {
  "O-": {
    donateTo: "All Blood Groups (Universal Red Cell Donor: O-, O+, A-, A+, B-, B+, AB-, AB+)",
    receiveFrom: "O- only",
    clinicalRole: "Critical emergency red cell donor; essential when transfusion cannot wait for type-testing.",
  },
  "O+": {
    donateTo: "O+, A+, B+, AB+ (All positive blood groups)",
    receiveFrom: "O+, O-",
    clinicalRole: "Most prevalent blood type in the population; foundational for routine surgical and trauma care.",
  },
  "A-": {
    donateTo: "A-, A+, AB-, AB+",
    receiveFrom: "A-, O-",
    clinicalRole: "Targeted Rh-negative donor vital for scheduled surgeries and avoiding Rh sensitization.",
  },
  "A+": {
    donateTo: "A+, AB+",
    receiveFrom: "A+, A-, O+, O-",
    clinicalRole: "High community requirement for platelet and whole blood support in acute clinical therapy.",
  },
  "B-": {
    donateTo: "B-, B+, AB-, AB+",
    receiveFrom: "B-, O-",
    clinicalRole: "Rare Rh-negative profile; essential for maintaining safe cross-matched clinical reserves.",
  },
  "B+": {
    donateTo: "B+, AB+",
    receiveFrom: "B+, B-, O+, O-",
    clinicalRole: "One of the most demanded blood groups in India with continuous daily hospital transfusion requirements.",
  },
  "AB-": {
    donateTo: "AB-, AB+",
    receiveFrom: "AB-, A-, B-, O-",
    clinicalRole: "Rarest blood group; indispensable for matching specific Rh-negative patients.",
  },
  "AB+": {
    donateTo: "AB+ only (Universal Plasma Donor to all blood groups)",
    receiveFrom: "Universal Red Cell Recipient (Can receive red cells from all 8 blood groups)",
    clinicalRole: "Universal recipient for red cells; AB plasma is universally compatible for burns and trauma.",
  },
};

export function GroupSelect({
  value,
  onChange,
  label = "Blood Group",
}: {
  value: string;
  onChange: (v: string) => void;
  label?: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <select aria-label={label} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">All Blood Groups</option>
        {bloodGroups.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
    </label>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(max-width: 767px)");
    const check = () => setIsMobile(mql.matches);
    check();
    mql.addEventListener("change", check);
    return () => mql.removeEventListener("change", check);
  }, []);

  return isMobile;
}

export function DonorSearch({
  initialGroup = "",
  compact = false,
}: {
  initialGroup?: string;
  compact?: boolean;
}) {
  const [filters, setFilters] = useState<Filters>({ group: initialGroup });
  const [applied, setApplied] = useState<Filters>({ group: initialGroup });
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Donor | null>(null);
  const [showAllMobile, setShowAllMobile] = useState(false);
  const isMobile = useIsMobile();
  const { success, info } = useToast();

  const results = filterDonors(applied);

  // Reset mobile expanded state when filters change
  useEffect(() => {
    setShowAllMobile(false);
  }, [applied]);

  const visibleDonors = compact
    ? results.slice(0, 3)
    : isMobile && !showAllMobile
    ? results.slice(0, 4)
    : results;

  const update = (key: keyof Filters, value: string) =>
    setFilters((f) => ({ ...f, [key]: value, ...(key === "state" ? { city: "" } : {}) }));

  function search() {
    setLoading(true);
    setTimeout(() => {
      setApplied({ ...filters });
      setLoading(false);
    }, 350);
  }

  return (
    <div>
      <form
        className="search-panel"
        onSubmit={(e) => {
          e.preventDefault();
          search();
        }}
      >
        <GroupSelect value={filters.group || ""} onChange={(v) => update("group", v)} />
        <label className="field">
          <span>State</span>
          <select aria-label="State" value={filters.state || ""} onChange={(e) => update("state", e.target.value)}>
            <option value="">All States</option>
            {Object.keys(locations).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>City</span>
          <select aria-label="City" value={filters.city || ""} onChange={(e) => update("city", e.target.value)}>
            <option value="">All Cities</option>
            {(filters.state ? locations[filters.state] : Object.values(locations).flat())?.map(
              (c) => (
                <option key={c} value={c}>{c}</option>
              ),
            )}
          </select>
        </label>
        <label className="field">
          <span>Area / Landmark</span>
          <input
            aria-label="Neighbourhood"
            placeholder="e.g. Adyar, Indiranagar, Bandra"
            value={filters.location || ""}
            onChange={(e) => update("location", e.target.value)}
          />
        </label>
        <Button type="submit" disabled={loading} size="lg" className="bg-[#C8102E] hover:bg-[#8F1027] text-white font-semibold shadow-sm hover:shadow-md transition-all">
          {loading ? <LoaderCircle className="animate-spin" /> : <Search />} Search Donors
        </Button>
      </form>

      <div className="result-toolbar">
        <span className="text-slate-700">
          <strong>{results.length}</strong> available voluntary donors
        </span>
        <div className="flex items-center gap-2">
          <select
            aria-label="Availability filter"
            className="border-slate-300 rounded-md text-xs py-1.5 px-3 bg-white"
            value={filters.availability || ""}
            onChange={(e) => {
              update("availability", e.target.value);
              setApplied((a) => ({ ...a, availability: e.target.value }));
            }}
          >
            <option value="">All Statuses</option>
            <option value="available">Open to Donate</option>
            <option value="unavailable">Unavailable / Deferred</option>
          </select>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-600 hover:text-[#C8102E]"
            onClick={() => {
              setFilters({});
              setApplied({});
            }}
          >
            <RotateCcw size={14} />
            Reset
          </Button>
        </div>
      </div>

      <div id="donor-search-results" className="donor-grid" aria-live="polite">
        {loading ? (
          <div className="empty-state col-span-full py-16 text-center text-slate-500">
            <LoaderCircle className="animate-spin mx-auto mb-3 text-[#C8102E]" size={32} />
            <p className="font-semibold text-slate-700">Filtering donor database…</p>
            <p className="text-xs text-slate-500">Applying selected search parameters</p>
          </div>
        ) : results.length === 0 ? (
          <div className="empty-state col-span-full py-14 text-center bg-white border border-slate-200 rounded-xl p-8">
            <Search className="mx-auto text-slate-400 mb-3" size={36} />
            <h3 className="font-bold text-slate-900 text-lg mb-1">No Matching Donors Found</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto mb-5">
              Try selecting a different blood group, clear your location query, or reset the filters to view all available donor profiles.
            </p>
            <Button
              variant="outline"
              className="border-slate-300 hover:border-[#C8102E] text-slate-700 hover:text-[#C8102E]"
              onClick={() => {
                setFilters({});
                setApplied({});
              }}
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          visibleDonors.map((d) => (
            <article className="donor-card group hover:-translate-y-1.5 transition-all duration-300 hover:shadow-xl hover:border-rose-300 relative overflow-hidden" key={d.id}>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C8102E]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="donor-top">
                <div className="flex items-center gap-3">
                  <span className={`avatar avatar-${d.id % 3} ring-2 ring-white shadow-sm font-bold text-slate-800`}>
                    {d.name
                      .split(" ")
                      .map((s) => s[0])
                      .join("")}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-[#C8102E] transition-colors">{d.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin size={13} className="text-[#C8102E]" />
                      {d.area}, {d.city}
                    </p>
                  </div>
                </div>
                <span className="blood-badge shadow-sm font-black text-sm">
                  <Droplet size={13} className="fill-current text-[#C8102E]" />
                  {d.group}
                </span>
              </div>

              <div className="donor-date text-xs text-slate-500 py-2 flex items-center justify-between border-y border-slate-100 my-3 bg-slate-50/50 px-2 rounded-lg">
                <span className="flex items-center gap-1.5">
                  <Clock size={13} className="text-slate-400" />
                  Simulated Last Donation:
                </span>
                <span className="font-semibold text-slate-700">{d.lastDonation}</span>
              </div>

              <div className="donor-bottom flex items-center justify-between pt-1">
                <span className={d.available ? "status success" : "status neutral"}>
                  <i />
                  {d.available ? "Open to Donate" : "Deferred"}
                </span>
                <Button
                  variant="link"
                  className="text-[#C8102E] hover:text-[#8F1027] font-semibold text-xs p-0 h-auto"
                  onClick={() => setProfile(d)}
                >
                  View Profile <ArrowRight size={14} className="ml-0.5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Mobile Show More / Show Less Toggle Button (shown when more than 4 matching donors on mobile) */}
      {!compact && results.length > 4 && (
        <div className="flex md:hidden justify-center mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (showAllMobile) {
                setShowAllMobile(false);
                const el = document.getElementById("donor-search-results");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              } else {
                setShowAllMobile(true);
              }
            }}
            className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-xl border-slate-300 hover:border-[#C8102E] text-slate-800 hover:text-[#C8102E] font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition-all bg-white"
          >
            <span>
              {showAllMobile
                ? "Show Less"
                : `Show More Donors (${results.length - 4} more)`}
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                showAllMobile ? "rotate-180 text-[#C8102E]" : ""
              }`}
            />
          </Button>
        </div>
      )}

      <Dialog
        open={!!profile}
        onOpenChange={(o) => {
          if (!o) setProfile(null);
        }}
      >
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0 rounded-2xl border-rose-200">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#8F1027] via-[#C8102E] to-[#A60D25] text-white p-6 sm:p-8 rounded-t-2xl relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black bg-white text-[#C8102E] shadow-lg ring-4 ring-white/20`}>
                  {profile?.name
                    .split(" ")
                    .map((s) => s[0])
                    .join("")}
                </span>
                <div>
                  <DialogTitle className="text-2xl font-black font-display text-white tracking-tight">
                    {profile?.name}
                  </DialogTitle>
                  <DialogDescription className="text-rose-100 text-sm mt-0.5">
                    Voluntary Blood Donor · Sample Profile #{profile?.id}
                  </DialogDescription>
                </div>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end gap-2">
                <span className="bg-white text-[#C8102E] font-black text-xl px-4 py-1.5 rounded-xl shadow-md flex items-center gap-1.5">
                  <Droplet size={18} className="fill-[#C8102E]" /> {profile?.group}
                </span>
                <span className="text-[11px] font-semibold text-rose-200 bg-black/20 px-2.5 py-0.5 rounded-md backdrop-blur-xs">
                  {profile?.available ? "● Open to Donate" : "○ Temporary Deferral"}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6 text-sm text-slate-700">
            {/* Key Vitals & Demographics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                <span className="text-xs text-slate-500 font-medium block">City & Area</span>
                <strong className="text-slate-900 text-sm block mt-0.5">{profile?.area}, {profile?.city}</strong>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                <span className="text-xs text-slate-500 font-medium block">State</span>
                <strong className="text-slate-900 text-sm block mt-0.5">{profile?.state}</strong>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                <span className="text-xs text-slate-500 font-medium block">Last Donation</span>
                <strong className="text-slate-900 text-sm block mt-0.5">{profile?.lastDonation}</strong>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                <span className="text-xs text-slate-500 font-medium block">Verification</span>
                <strong className="text-emerald-700 text-sm block mt-0.5 flex items-center gap-1">
                  <ShieldCheck size={14} className="text-emerald-600" /> ID Verified
                </strong>
              </div>
            </div>

            {/* Medical Compatibility Detailed Box */}
            {profile && compatibility[profile.group] && (
              <div className="p-5 bg-gradient-to-br from-rose-50/70 to-white border border-rose-200/80 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-[#8F1027] font-bold text-sm">
                  <Heart size={16} className="text-[#C8102E] fill-[#C8102E]" />
                  <span>Transfusion Compatibility (ABO / Rh Clinical Standards)</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 text-xs pt-1">
                  <div className="bg-white p-3.5 rounded-xl border border-rose-100 shadow-2xs">
                    <span className="text-slate-500 font-semibold block mb-1">Compatible Recipients (Give To):</span>
                    <p className="font-bold text-slate-900">{compatibility[profile.group].donateTo}</p>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-rose-100 shadow-2xs">
                    <span className="text-slate-500 font-semibold block mb-1">Compatible Donors (Receive From):</span>
                    <p className="font-bold text-slate-900">{compatibility[profile.group].receiveFrom}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 bg-white/60 p-2.5 rounded-lg border border-rose-100 italic leading-relaxed">
                  <strong>Clinical Significance:</strong> {compatibility[profile.group].clinicalRole}
                </p>
              </div>
            )}

            {/* Illustrative Donation History Timeline */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-slate-900 text-sm flex items-center justify-between">
                <span>Illustrative Donation Journey (Sample History)</span>
                <span className="text-[11px] font-normal text-slate-500">Sample simulation data</span>
              </h4>
              <div className="space-y-2 border-l-2 border-rose-200 pl-4 ml-2">
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#C8102E]" />
                  <p className="text-xs font-bold text-slate-900">{profile?.lastDonation} · Whole Blood Donation</p>
                  <p className="text-xs text-slate-500">Voluntary camp at {profile?.area} Community Center (Simulated)</p>
                </div>
                <div className="relative pt-2">
                  <div className="absolute -left-[21px] top-3 w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <p className="text-xs font-bold text-slate-700">6 Months Prior · Health Screening & Eligibility Check</p>
                  <p className="text-xs text-slate-500">Standard confidential haemoglobin and vitals clearance</p>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                className="flex-1 bg-gradient-to-r from-[#C8102E] to-[#8F1027] hover:from-[#A60D25] hover:to-[#730D20] text-white font-bold h-12 rounded-xl shadow-md"
                onClick={() => {
                  success(
                    "Inquiry Recorded Successfully",
                    `Your message regarding ${profile?.name} (${profile?.group}) has been shared with the community coordinator.`
                  );
                  setProfile(null);
                }}
              >
                <Heart size={16} className="fill-current mr-2" />
                Contact Donor Coordinator
              </Button>
              <Button
                variant="outline"
                className="border-slate-300 hover:border-slate-400 font-semibold h-12 rounded-xl px-6"
                onClick={() => setProfile(null)}
              >
                Close Profile
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function Requests({ compact = false }: { compact?: boolean }) {
  const [group, setGroup] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState("");
  const [detail, setDetail] = useState<(typeof requests)[number] | null>(null);
  const { info } = useToast();

  const results = requests.filter(
    (r) => (!group || r.group === group) && (!urgencyFilter || r.urgency === urgencyFilter),
  );

  return (
    <>
      {/* Need Blood? Submit a Request Banner */}
      <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-rose-50 via-white to-rose-50/60 border border-rose-200/80 rounded-2xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#C8102E] text-white flex items-center justify-center shrink-0 shadow-sm">
            <Droplet size={18} className="fill-white text-white" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">Need Blood? Submit a Request</h4>
            <p className="text-xs text-slate-600">Register an official clinical requirement to coordinate with voluntary donors and blood banks.</p>
          </div>
        </div>
        <Button asChild className="bg-[#C8102E] hover:bg-[#8F1027] text-white font-semibold rounded-xl text-xs sm:text-sm px-4 py-2 shrink-0 shadow-sm">
          <Link to="/request-blood">
            <span>Request Blood Now</span>
            <ArrowRight size={14} className="ml-1" />
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="filter-chips mb-0">
          <Button
            variant={group === "" ? "default" : "outline"}
            size="sm"
            className={group === "" ? "bg-[#C8102E] text-white font-semibold" : "border-slate-300 text-slate-700"}
            onClick={() => setGroup("")}
          >
            All Groups
          </Button>
          {bloodGroups.map((g) => (
            <Button
              key={g}
              variant={group === g ? "default" : "outline"}
              aria-pressed={group === g}
              size="sm"
              className={group === g ? "bg-[#C8102E] text-white font-semibold" : "border-slate-300 text-slate-700"}
              onClick={() => setGroup(g)}
            >
              {g}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Filter Urgency:</span>
          <select
            className="border-slate-300 rounded-md text-xs py-1.5 px-3 bg-white"
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
          >
            <option value="">All Scenarios</option>
            <option value="Urgent">Urgent Scenarios</option>
            <option value="Priority">Priority Scenarios</option>
            <option value="Planned">Planned Scenarios</option>
          </select>
        </div>
      </div>

      <div className="request-grid">
        {(compact ? results.slice(0, 3) : results).map((r) => (
          <article className="request-card group hover:-translate-y-1.5 transition-all duration-300 hover:shadow-xl hover:border-rose-300 relative overflow-hidden" key={r.id}>
            <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${r.urgency === "Urgent" ? "bg-[#C8102E]" : r.urgency === "Priority" ? "bg-amber-500" : "bg-blue-500"}`} />
            <div className="request-top flex items-center justify-between">
              <span className="request-group text-2xl font-black text-[#C8102E] flex items-center gap-1.5">
                {r.group}
                <Droplet size={18} className="fill-[#C8102E]" />
              </span>
              <span
                className={`status ${
                  r.urgency === "Urgent"
                    ? "urgent bg-rose-100 text-[#C8102E] font-bold"
                    : r.urgency === "Priority"
                      ? "warning bg-amber-100 text-amber-800 font-semibold"
                      : "neutral bg-slate-100 text-slate-700 font-medium"
                }`}
              >
                {r.urgency === "Urgent" && <span className="animate-ping w-1.5 h-1.5 rounded-full bg-[#C8102E] inline-block mr-1" />}
                {r.urgency} · Scenario
              </span>
            </div>

            <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-[#C8102E] transition-colors">{r.hospital} <span className="text-xs font-normal text-slate-500">(Illustrative)</span></h3>
            <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
              <MapPin size={13} className="text-[#C8102E]" />
              {r.city} <span className="font-semibold text-slate-700">· {r.units} units required</span>
            </p>

            {/* Requirement progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 mb-3 overflow-hidden shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  r.urgency === "Urgent" ? "bg-gradient-to-r from-[#C8102E] to-rose-500" : r.urgency === "Priority" ? "bg-gradient-to-r from-amber-500 to-amber-400" : "bg-gradient-to-r from-blue-600 to-blue-400"
                }`}
                style={{ width: `${Math.min(100, (r.units / 4) * 100)}%` }}
              />
            </div>

            <div className="request-meta text-xs text-slate-500 flex justify-between border-t border-slate-100 pt-3">
              <span className="font-medium text-slate-700">{r.category}</span>
              <span className="font-mono text-slate-400 font-semibold">{r.id}</span>
            </div>

            <div className="request-footer flex items-center justify-between mt-3 pt-2">
              <small className="text-xs text-slate-400">Scenario date: {r.date}</small>
              <Button
                variant="link"
                className="text-[#C8102E] hover:text-[#8F1027] font-semibold text-xs p-0 h-auto"
                onClick={() => setDetail(r)}
              >
                Inspect Scenario <ArrowRight size={14} className="ml-0.5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </article>
        ))}
      </div>

      {results.length === 0 && (
        <div className="empty-state py-12 text-center bg-white border border-slate-200 rounded-xl p-8">
          <AlertTriangle className="mx-auto text-amber-500 mb-2" size={32} />
          <h3 className="font-bold text-slate-900 text-base">No Matching Sample Requests</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            There are currently no urgent requests matching your filter selection.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setGroup("");
              setUrgencyFilter("");
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}

      <Dialog
        open={!!detail}
        onOpenChange={(o) => {
          if (!o) setDetail(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <DialogTitle className="text-lg font-bold text-slate-900">
                Hospital Requirement: #{detail?.id}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                {detail?.hospital} · {detail?.city}
              </DialogDescription>
            </div>
            <span className="blood-badge text-sm px-2.5 py-1">
              <Droplet size={14} className="fill-current" /> {detail?.group}
            </span>
          </div>

          <div className="space-y-3 py-2 text-sm text-slate-700">
            <div className="p-3.5 bg-rose-50/70 border border-rose-100 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Blood Requirement:</span>
                <strong className="text-base text-[#C8102E] font-bold">{detail?.units} Units ({detail?.group})</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Urgency Classification:</span>
                <span className="font-bold text-slate-900">{detail?.urgency}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Clinical Purpose:</span>
                <span className="font-medium text-slate-800">{detail?.category}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Request Date:</span>
                <span className="text-slate-600">{detail?.date}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1.5 text-slate-600">
              <strong className="text-slate-900 block font-semibold">Transfusion &amp; Safety Protocol:</strong>
              <p>1. Transfusion requests are coordinated directly with licensed hospital blood services.</p>
              <p>2. Donors undergo physical assessment and confidential medical screening on-site.</p>
              <p>3. Patient cross-matching is strictly conducted prior to any component release.</p>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              className="w-full bg-[#C8102E] hover:bg-[#8F1027] text-white font-semibold"
              onClick={() => {
                info(
                  "Requirement Coordinated",
                  `Logged for ${detail?.hospital} (${detail?.group}).`
                );
                setDetail(null);
              }}
            >
              Coordinate Component Support
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function BankDirectory() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [service, setService] = useState("");
  const [detail, setDetail] = useState<(typeof banks)[number] | null>(null);
  const { info } = useToast();

  const results = banks.filter(
    (b) =>
      (!city || b.city === city) &&
      (!service || b.services.includes(service)) &&
      `${b.name} ${b.city} ${b.organisation}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <div className="bank-search grid grid-cols-1 md:grid-cols-4 gap-3 bg-white p-5 rounded-xl border border-slate-200 shadow-sm mb-6 items-end">
        <label className="field">
          <span>Search Blood Bank</span>
          <input
            placeholder="Search by name, organization or keyword"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label className="field">
          <span>Filter by City</span>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">All Cities</option>
            {Object.values(locations)
              .flat()
              .map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
          </select>
        </label>
        <label className="field">
          <span>Component Services</span>
          <select value={service} onChange={(e) => setService(e.target.value)}>
            <option value="">All Services</option>
            {["Whole blood", "Platelets", "Plasma"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
        <Button
          variant="outline"
          className="h-[43px] border-slate-300 text-slate-700 hover:text-[#C8102E] flex items-center justify-center gap-1.5"
          onClick={() => {
            setQuery("");
            setCity("");
            setService("");
          }}
        >
          <RotateCcw size={15} />
          Clear Filters
        </Button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="result-count text-xs text-slate-600 font-medium">
          Showing <strong>{results.length}</strong> accredited blood bank facilities
        </p>
      </div>

      <div className="bank-grid">
        {results.map((b) => (
          <article className="bank-card group hover:-translate-y-1.5 transition-all duration-300 hover:shadow-xl hover:border-rose-300 relative overflow-hidden" key={b.id}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="bank-icon group-hover:scale-110 transition-transform duration-300">
                <Building2 size={20} />
              </div>
              <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200 shadow-xs">
                Accredited Facility
              </span>
            </div>

            <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-[#C8102E] transition-colors">{b.name}</h3>
            <p className="text-xs font-semibold text-slate-700 mb-2">{b.organisation}</p>
            <p className="text-xs text-slate-500 flex items-start gap-1.5 mb-4 leading-relaxed">
              <MapPin size={14} className="text-[#C8102E] shrink-0 mt-0.5" />
              {b.address}
            </p>

            <div className="service-tags flex flex-wrap gap-1.5 mb-4">
              {b.services.map((s) => (
                <span
                  key={s}
                  className="text-[11px] font-semibold bg-rose-50/80 text-[#8F1027] border border-rose-100 px-2.5 py-1 rounded-md"
                >
                  {s}
                </span>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full border-slate-200 group-hover:border-[#C8102E] group-hover:bg-rose-50/50 group-hover:text-[#C8102E] text-xs font-semibold rounded-xl h-10 transition-all"
              onClick={() => setDetail(b)}
            >
              View Facility Details <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </article>
        ))}
      </div>

      {results.length === 0 && (
        <div className="empty-state py-12 text-center bg-white border border-slate-200 rounded-xl p-8">
          <Building2 className="mx-auto text-slate-400 mb-2" size={34} />
          <h3 className="font-bold text-slate-900 text-base">No Matching Facilities Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            Try broadening your city or service search query.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setQuery("");
              setCity("");
              setService("");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      <Dialog
        open={!!detail}
        onOpenChange={(o) => {
          if (!o) setDetail(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <div className="border-b border-slate-100 pb-3">
            <DialogTitle className="text-lg font-bold text-slate-900">
              {detail?.name}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              {detail?.organisation} · {detail?.city}
            </DialogDescription>
          </div>

          <div className="space-y-3 py-2 text-xs text-slate-700">
            <div className="p-3 bg-slate-50 rounded-lg space-y-1.5">
              <div>
                <span className="text-slate-500 block">Facility Address:</span>
                <strong className="text-slate-900">{detail?.address}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Available Services:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {detail?.services.map((s) => (
                    <span key={s} className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[11px] font-semibold text-[#8F1027]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-slate-500 block">Operating Focus:</span>
                <strong className="text-slate-800">Whole Blood Collection &amp; Component Separation</strong>
              </div>
            </div>

            <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-lg text-emerald-900 space-y-1">
              <strong className="block font-semibold">General Donor Advice:</strong>
              <p>Walk-in voluntary donors are welcomed with valid photo identification and standard confidential medical screening.</p>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              className="w-full bg-[#C8102E] hover:bg-[#8F1027] text-white"
              onClick={() => {
                info(
                  "Facility Details",
                  `Viewing details for ${detail?.name}.`
                );
                setDetail(null);
              }}
            >
              Close Details
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

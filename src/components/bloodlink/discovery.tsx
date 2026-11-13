import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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

  const results = filterDonors(applied);

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
          <strong>{results.length}</strong> matching sample donors{" "}
          <span className="muted font-normal">· Fictional demonstration records</span>
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
            <option value="">All Statuses (Demo)</option>
            <option value="available">Open to Donation (Simulated)</option>
            <option value="unavailable">Unavailable / Deferred (Simulated)</option>
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

      <div className="donor-grid" aria-live="polite">
        {loading ? (
          <div className="empty-state col-span-full py-16 text-center text-slate-500">
            <LoaderCircle className="animate-spin mx-auto mb-3 text-[#C8102E]" size={32} />
            <p className="font-semibold text-slate-700">Filtering sample donor database…</p>
            <p className="text-xs text-slate-500">Applying demonstration search parameters</p>
          </div>
        ) : results.length === 0 ? (
          <div className="empty-state col-span-full py-14 text-center bg-white border border-slate-200 rounded-xl p-8">
            <Search className="mx-auto text-slate-400 mb-3" size={36} />
            <h3 className="font-bold text-slate-900 text-lg mb-1">No Matching Sample Donors Found</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto mb-5">
              Try selecting a different blood group, clear your location query, or reset the filters to view all demonstration donor profiles.
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
          (compact ? results.slice(0, 3) : results).map((d) => (
            <article className="donor-card" key={d.id}>
              <div className="donor-top">
                <div className="flex items-center gap-3">
                  <span className={`avatar avatar-${d.id % 3}`}>
                    {d.name
                      .split(" ")
                      .map((s) => s[0])
                      .join("")}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900">{d.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin size={13} className="text-[#C8102E]" />
                      {d.area}, {d.city}
                    </p>
                  </div>
                </div>
                <span className="blood-badge">
                  <Droplet size={13} className="fill-current animate-blood-pulse" />
                  {d.group}
                </span>
              </div>

              <div className="donor-date text-xs text-slate-500 py-1.5 flex items-center justify-between border-y border-slate-100 my-3">
                <span className="flex items-center gap-1.5">
                  <Clock size={13} className="text-slate-400" />
                  Simulated Last Donation:
                </span>
                <span className="font-semibold text-slate-700">{d.lastDonation}</span>
              </div>

              <div className="donor-bottom flex items-center justify-between pt-1">
                <span className={d.available ? "status success" : "status neutral"}>
                  <i />
                  {d.available ? "Open to Donate (Demo)" : "Deferred (Demo)"}
                </span>
                <Button
                  variant="link"
                  className="text-[#C8102E] hover:text-[#8F1027] font-semibold text-xs p-0 h-auto"
                  onClick={() => setProfile(d)}
                >
                  View Profile <ArrowRight size={14} />
                </Button>
              </div>
            </article>
          ))
        )}
      </div>

      <DemoNotice />

      <Dialog
        open={!!profile}
        onOpenChange={(o) => {
          if (!o) setProfile(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <span className={`avatar avatar-${profile ? profile.id % 3 : 0} w-11 h-11 text-sm`}>
                {profile?.name
                  .split(" ")
                  .map((s) => s[0])
                  .join("")}
              </span>
              <div>
                <DialogTitle className="text-lg font-bold text-slate-900">
                  {profile?.name}
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500">
                  Fictional Demonstration Profile · Record #{profile?.id}
                </DialogDescription>
              </div>
            </div>
            <span className="blood-badge text-sm px-2.5 py-1">
              <Droplet size={14} className="fill-current" /> {profile?.group}
            </span>
          </div>

          <div className="space-y-3 py-2 text-sm text-slate-700">
            {/* Medical Transparency Box */}
            <div className="p-3 bg-amber-50/80 border border-amber-200/90 rounded-xl text-xs text-amber-950 space-y-1">
              <strong className="block font-semibold flex items-center gap-1">
                <Info size={14} className="text-amber-700" /> Fictional Demonstration Record:
              </strong>
              <p>
                This profile is an illustrative demonstration example. BloodLink does not represent live donor availability, nor does it perform clinical eligibility verification. Real donation coordination occurs strictly through certified healthcare centers.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg text-xs">
              <div>
                <span className="text-slate-500 block">Demonstration Area</span>
                <strong className="text-slate-800">{profile?.area}, {profile?.city}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">State</span>
                <strong className="text-slate-800">{profile?.state}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Simulated Status</span>
                <span className={profile?.available ? "text-emerald-700 font-bold" : "text-slate-600 font-medium"}>
                  {profile?.available ? "● Available (Simulated)" : "○ Temporary Deferral (Simulated)"}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Illustrative Last Donation</span>
                <strong className="text-slate-800">{profile?.lastDonation}</strong>
              </div>
            </div>

            {profile && compatibility[profile.group] && (
              <div className="p-3 bg-rose-50/60 border border-rose-100 rounded-lg text-xs space-y-1.5">
                <span className="font-semibold text-[#8F1027] block flex items-center gap-1.5">
                  <Heart size={13} className="text-[#C8102E] fill-[#C8102E]" /> Medical Compatibility Profile (ABO/Rh Standards):
                </span>
                <p className="text-slate-700">
                  <strong>Can Donate Red Cells To:</strong> {compatibility[profile.group].donateTo}
                </p>
                <p className="text-slate-700">
                  <strong>Can Receive Red Cells From:</strong> {compatibility[profile.group].receiveFrom}
                </p>
                <p className="text-slate-500 italic pt-1 border-t border-rose-100/80">
                  {compatibility[profile.group].clinicalRole}
                </p>
              </div>
            )}

            <div className="text-xs text-slate-500 space-y-1">
              <p className="flex items-center gap-1.5 text-slate-600 font-medium">
                <ShieldCheck size={14} className="text-emerald-600" />
                Hospital Transfusion Protocol:
              </p>
              <p>
                All voluntary donations require mandatory cross-matching, hemoglobin testing, and pre-donation screening conducted confidentially by qualified medical personnel.
              </p>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              className="w-full bg-[#C8102E] hover:bg-[#8F1027] text-white"
              onClick={() => setProfile(null)}
            >
              Close Profile Details
            </Button>
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

  const results = requests.filter(
    (r) => (!group || r.group === group) && (!urgencyFilter || r.urgency === urgencyFilter),
  );

  return (
    <>
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
          <article className="request-card group" key={r.id}>
            <div className="request-top flex items-center justify-between">
              <span className="request-group text-2xl font-black text-[#C8102E] flex items-center gap-1.5">
                {r.group}
                <Droplet size={18} className="fill-[#C8102E] animate-blood-pulse" />
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

            <h3 className="font-bold text-slate-900 text-base mb-1">{r.hospital} <span className="text-xs font-normal text-slate-500">(Illustrative)</span></h3>
            <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
              <MapPin size={13} className="text-[#C8102E]" />
              {r.city} <span className="font-semibold text-slate-700">· {r.units} units required</span>
            </p>

            {/* Requirement progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 mb-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  r.urgency === "Urgent" ? "bg-[#C8102E]" : r.urgency === "Priority" ? "bg-amber-500" : "bg-blue-600"
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
                Inspect Scenario <ArrowRight size={14} />
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
            There are currently no open demonstration scenarios matching your filter selection.
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

      <DemoNotice>
        Demonstration hospital scenarios only. For an actual clinical emergency, immediately contact emergency services (108 / 112) and the treating hospital.
      </DemoNotice>

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
                Demonstration Scenario: {detail?.id}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                {detail?.hospital} (Illustrative Hospital) · {detail?.city}
              </DialogDescription>
            </div>
            <span className="blood-badge text-sm px-2.5 py-1">
              <Droplet size={14} className="fill-current" /> {detail?.group}
            </span>
          </div>

          <div className="space-y-3 py-2 text-sm text-slate-700">
            {/* Medical Transparency Box */}
            <div className="p-3 bg-amber-50/80 border border-amber-200/90 rounded-xl text-xs text-amber-950 space-y-1">
              <strong className="block font-semibold flex items-center gap-1">
                <Info size={14} className="text-amber-700" /> Demonstration Scenario Only:
              </strong>
              <p>
                This request is an illustrative scenario showing platform functionality. BloodLink does not coordinate real clinical dispatch or hold emergency blood inventory.
              </p>
            </div>

            <div className="p-3.5 bg-rose-50/70 border border-rose-100 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Simulated Requirement:</span>
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
                <span className="text-slate-600">Illustrative Date:</span>
                <span className="text-slate-600">{detail?.date}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1.5 text-slate-600">
              <strong className="text-slate-900 block font-semibold">Standard Clinical Protocol:</strong>
              <p>1. Transfusion requests must be fulfilled through licensed blood transfusion services.</p>
              <p>2. Donors must be physically examined and assessed for donation suitability on-site.</p>
              <p>3. Patient compatibility cross-matching is strictly conducted before any blood release.</p>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              className="w-full bg-[#C8102E] hover:bg-[#8F1027] text-white font-semibold"
              onClick={() => setDetail(null)}
            >
              Acknowledge & Close
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
          Showing <strong>{results.length}</strong> demonstration blood bank listings
        </p>
        <span className="text-[11px] text-slate-400">Illustrative listings · For demonstration purposes</span>
      </div>

      <div className="bank-grid">
        {results.map((b) => (
          <article className="bank-card" key={b.id}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="bank-icon">
                <Building2 size={20} />
              </div>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Demonstration Listing
              </span>
            </div>

            <h3 className="font-bold text-slate-900 text-base mb-1">{b.name}</h3>
            <p className="text-xs font-semibold text-slate-700 mb-2">{b.organisation} <span className="font-normal text-slate-400">(Illustrative)</span></p>
            <p className="text-xs text-slate-500 flex items-start gap-1.5 mb-4 leading-relaxed">
              <MapPin size={14} className="text-[#C8102E] shrink-0 mt-0.5" />
              {b.address}
            </p>

            <div className="service-tags flex flex-wrap gap-1.5 mb-4">
              {b.services.map((s) => (
                <span
                  key={s}
                  className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md"
                >
                  {s}
                </span>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full border-slate-200 hover:border-[#C8102E] hover:text-[#C8102E] text-xs font-semibold"
              onClick={() => setDetail(b)}
            >
              View Facility Details <ArrowRight size={14} />
            </Button>
          </article>
        ))}
      </div>

      {results.length === 0 && (
        <div className="empty-state py-12 text-center bg-white border border-slate-200 rounded-xl p-8">
          <Building2 className="mx-auto text-slate-400 mb-2" size={34} />
          <h3 className="font-bold text-slate-900 text-base">No Matching Demonstration Facilities</h3>
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

      <DemoNotice>
        Demonstration listings. For verified, government-licensed blood banks, refer to the official national portal (e-RaktKosh) or your healthcare provider.
      </DemoNotice>

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
              {detail?.organisation} (Demonstration Listing) · {detail?.city}
            </DialogDescription>
          </div>

          <div className="space-y-3 py-2 text-xs text-slate-700">
            {/* Medical Transparency Box */}
            <div className="p-3 bg-amber-50/80 border border-amber-200/90 rounded-xl text-xs text-amber-950 space-y-1">
              <strong className="block font-semibold flex items-center gap-1">
                <Info size={14} className="text-amber-700" /> Demonstration Listing:
              </strong>
              <p>
                This facility and address are illustrative demonstration data. No actual medical partnership or verified inventory availability is certified by this prototype.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg space-y-1.5">
              <div>
                <span className="text-slate-500 block">Demonstration Address:</span>
                <strong className="text-slate-900">{detail?.address}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Demonstration Services:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {detail?.services.map((s) => (
                    <span key={s} className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[11px] font-semibold text-[#8F1027]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-slate-500 block">Illustrative Operating Model:</span>
                <strong className="text-slate-800">Whole Blood Collection &amp; Separation Prototype</strong>
              </div>
            </div>

            <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-lg text-emerald-900 space-y-1">
              <strong className="block font-semibold">General Donor Advice:</strong>
              <p>At real accredited facilities, walk-in voluntary donors are warmly welcomed with valid photo identification and standard confidential medical screening.</p>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              className="w-full bg-[#C8102E] hover:bg-[#8F1027] text-white"
              onClick={() => setDetail(null)}
            >
              Close Details
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

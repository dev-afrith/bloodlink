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
import { DemoNotice, SectionHeading } from "./shared";

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
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">All blood groups</option>
        {bloodGroups.map((g) => (
          <option key={g}>{g}</option>
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
    }, 450);
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
          <select value={filters.state || ""} onChange={(e) => update("state", e.target.value)}>
            <option value="">All states</option>
            {Object.keys(locations).map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>City</span>
          <select value={filters.city || ""} onChange={(e) => update("city", e.target.value)}>
            <option value="">All cities</option>
            {(filters.state ? locations[filters.state] : Object.values(locations).flat())?.map(
              (c) => (
                <option key={c}>{c}</option>
              ),
            )}
          </select>
        </label>
        <label className="field">
          <span>Neighbourhood</span>
          <input
            placeholder="Area or location"
            value={filters.location || ""}
            onChange={(e) => update("location", e.target.value)}
          />
        </label>
        <Button type="submit" disabled={loading} size="lg">
          {loading ? <LoaderCircle className="animate-spin" /> : <Search />}Search Donors
        </Button>
      </form>
      <div className="result-toolbar">
        <span>
          <strong>{results.length}</strong> potential donors{" "}
          <span className="muted">· Sample profiles</span>
        </span>
        <div>
          <select
            aria-label="Availability filter"
            value={filters.availability || ""}
            onChange={(e) => {
              update("availability", e.target.value);
              setApplied((a) => ({ ...a, availability: e.target.value }));
            }}
          >
            <option value="">All demo statuses</option>
            <option value="available">Open to donation (demo)</option>
            <option value="unavailable">Not available (demo)</option>
          </select>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setFilters({});
              setApplied({});
            }}
          >
            <RotateCcw />
            Clear filters
          </Button>
        </div>
      </div>
      <div className="donor-grid" aria-live="polite">
        {loading ? (
          <div className="empty-state">
            <LoaderCircle className="animate-spin" />
            Finding sample matches…
          </div>
        ) : results.length === 0 ? (
          <div className="empty-state">
            <Search />
            <h3>No matching sample donors</h3>
            <p>Try another blood group or clear your location filters.</p>
            <Button
              variant="outline"
              onClick={() => {
                setFilters({});
                setApplied({});
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          (compact ? results.slice(0, 3) : results).map((d) => (
            <article className="donor-card" key={d.id}>
              <div className="donor-top">
                <span className={`avatar avatar-${d.id % 3}`}>
                  {d.name
                    .split(" ")
                    .map((s) => s[0])
                    .join("")}
                </span>
                <span className="blood-badge">
                  <Droplet size={13} />
                  {d.group}
                </span>
              </div>
              <h3>{d.name}</h3>
              <p>
                <MapPin size={14} />
                {d.area}, {d.city}
              </p>
              <div className="donor-date">
                <Clock size={13} />
                Last donation · {d.lastDonation}
              </div>
              <div className="donor-bottom">
                <span className={d.available ? "status success" : "status neutral"}>
                  <i />
                  {d.available ? "Open to donation" : "Not available"} <small>(demo)</small>
                </span>
                <Button variant="link" onClick={() => setProfile(d)}>
                  View Profile <ArrowRight />
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
        <DialogContent>
          <DialogTitle>
            {profile?.name} · {profile?.group}
          </DialogTitle>
          <DialogDescription>Fictional demonstration donor profile</DialogDescription>
          <div className="profile-details">
            <p>
              <MapPin />
              {profile?.area}, {profile?.city}, {profile?.state}
            </p>
            <p>
              <Clock />
              Illustrative last donation: {profile?.lastDonation}
            </p>
            <p>
              <ShieldCheck />
              Medical eligibility has not been assessed.
            </p>
          </div>
          <DemoNotice>
            There are no real contact details. A future connection must be coordinated through
            qualified healthcare providers.
          </DemoNotice>
          <Button onClick={() => setProfile(null)}>Close Profile</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export function Requests({ compact = false }: { compact?: boolean }) {
  const [group, setGroup] = useState("");
  const [detail, setDetail] = useState<(typeof requests)[number] | null>(null);
  const results = requests.filter((r) => !group || r.group === group);
  return (
    <>
      <div className="filter-chips">
        <Button
          variant={group === "" ? "default" : "outline"}
          size="sm"
          onClick={() => setGroup("")}
        >
          All Groups
        </Button>
        {bloodGroups.map((g) => (
          <Button
            key={g}
            variant={group === g ? "default" : "outline"}
            size="sm"
            onClick={() => setGroup(g)}
          >
            {g}
          </Button>
        ))}
        <span className="sample-label">SAMPLE REQUESTS</span>
      </div>
      <div className="request-grid">
        {(compact ? results.slice(0, 3) : results).map((r) => (
          <article className="request-card" key={r.id}>
            <div className="request-top">
              <span className="request-group">
                {r.group}
                <Droplet size={17} />
              </span>
              <span
                className={`status ${r.urgency === "Urgent" ? "urgent" : r.urgency === "Priority" ? "warning" : "neutral"}`}
              >
                {r.urgency} · Sample
              </span>
            </div>
            <h3>{r.hospital}</h3>
            <p>
              <MapPin size={14} />
              {r.city} <span>· {r.units} units needed</span>
            </p>
            <div className="request-meta">
              <span>{r.category}</span>
              <span>{r.id}</span>
            </div>
            <div className="request-footer">
              <small>{r.date}</small>
              <Button variant="link" onClick={() => setDetail(r)}>
                View Details <ArrowRight />
              </Button>
            </div>
          </article>
        ))}
      </div>
      {results.length === 0 && (
        <div className="empty-state">No sample requests for this blood group.</div>
      )}
      <DemoNotice>
        Illustrative requests only — not live emergencies. For an emergency, contact your local
        emergency services and treating hospital.
      </DemoNotice>
      <Dialog
        open={!!detail}
        onOpenChange={(o) => {
          if (!o) setDetail(null);
        }}
      >
        <DialogContent>
          <DialogTitle>Sample request {detail?.id}</DialogTitle>
          <DialogDescription>
            {detail?.hospital} · {detail?.city}
          </DialogDescription>
          <p>
            {detail?.units} units of {detail?.group} · {detail?.category}
          </p>
          <p>Scenario date: {detail?.date}. Status: demonstration only.</p>
          <DemoNotice>
            This hospital and request are fictional. BloodLink does not coordinate emergency care or
            provide blood.
          </DemoNotice>
          <Button onClick={() => setDetail(null)}>Close Details</Button>
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
      `${b.name} ${b.city}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="bank-search">
        <label className="field">
          <span>Blood bank or city</span>
          <input
            placeholder="Search sample blood banks"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label className="field">
          <span>City</span>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">All cities</option>
            {Object.values(locations)
              .flat()
              .map((c) => (
                <option key={c}>{c}</option>
              ))}
          </select>
        </label>
        <label className="field">
          <span>Services</span>
          <select value={service} onChange={(e) => setService(e.target.value)}>
            <option value="">All services</option>
            {["Whole blood", "Platelets", "Plasma"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <Button
          variant="outline"
          onClick={() => {
            setQuery("");
            setCity("");
            setService("");
          }}
        >
          <RotateCcw />
          Clear filters
        </Button>
      </div>
      <p className="result-count">{results.length} demonstration listings</p>
      <div className="bank-grid">
        {results.map((b) => (
          <article className="bank-card" key={b.id}>
            <div className="bank-icon">
              <Building2 />
            </div>
            <span className="sample-label">DEMONSTRATION LISTING</span>
            <h3>{b.name}</h3>
            <p>{b.organisation}</p>
            <p>
              <MapPin size={15} />
              {b.address}
            </p>
            <div className="service-tags">
              {b.services.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <Button variant="outline" onClick={() => setDetail(b)}>
              View Details <ArrowUpRightIcon />
            </Button>
          </article>
        ))}
      </div>
      {results.length === 0 && (
        <div className="empty-state">No sample listings match your search.</div>
      )}
      <DemoNotice>
        Fictional organisations, addresses and services. Listings are not verified or authorised
        blood banks.
      </DemoNotice>
      <Dialog
        open={!!detail}
        onOpenChange={(o) => {
          if (!o) setDetail(null);
        }}
      >
        <DialogContent>
          <DialogTitle>{detail?.name}</DialogTitle>
          <DialogDescription>Fictional blood bank listing · {detail?.city}</DialogDescription>
          <p>{detail?.organisation}</p>
          <p>{detail?.address}</p>
          <p>Illustrative services: {detail?.services.join(", ")}</p>
          <p>Contact: not provided for demonstration listings.</p>
          <DemoNotice>
            For real services, consult your treating hospital or an official authorised blood bank
            directory.
          </DemoNotice>
          <Button onClick={() => setDetail(null)}>Close Details</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
function ArrowUpRightIcon() {
  return <ArrowRight />;
}

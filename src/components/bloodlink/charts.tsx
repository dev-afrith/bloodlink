import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Cell,
} from "recharts";
import { Droplet, Heart, CheckCircle2, ArrowRight, Activity, TrendingUp, Sparkles, Users } from "lucide-react";
import { bloodGroups } from "@/data/demo";

// ────────────────────────────────────────────────────────────
// HEALTHCARE PALETTE CONSTANTS
// Section Background: #EFF6FF
// Card Background:    #FFFFFF
// Card Header / Tint: #DBEAFE
// Primary Blue:       #2563EB
// Secondary Blue:     #38BDF8
// Light Blue Accent:  #BFDBFE
// Main Text:          #1E293B
// Secondary Text:     #64748B
// Borders:            #DBEAFE
// Crimson Highlight:  #C8102E
// ────────────────────────────────────────────────────────────

// Distribution of illustrative sample donors across 8 blood groups (clinical blue + crimson accents)
export const bloodGroupDistributionData = [
  { group: "A+", donors: 98, percentage: "22%", tag: "High Community Demand", color: "#2563EB" },
  { group: "A-", donors: 22, percentage: "5%", tag: "Rare & Critical", color: "#C8102E" },
  { group: "B+", donors: 115, percentage: "26%", tag: "High Community Need", color: "#3B82F6" },
  { group: "B-", donors: 18, percentage: "4%", tag: "Rare & Critical", color: "#E11D48" },
  { group: "AB+", donors: 48, percentage: "11%", tag: "Universal Plasma", color: "#0284C7" },
  { group: "AB-", donors: 12, percentage: "3%", tag: "Rarest Blood Type", color: "#9333EA" },
  { group: "O+", donors: 140, percentage: "31%", tag: "Highest Emergency Need", color: "#0D9488" },
  { group: "O-", donors: 32, percentage: "7%", tag: "Universal Red Cell", color: "#C8102E" },
];

// Simulated monthly donation volume & lives impacted
export const donationImpactTrends = [
  { month: "Jan", donations: 420, livesSaved: 1260 },
  { month: "Feb", donations: 560, livesSaved: 1680 },
  { month: "Mar", donations: 610, livesSaved: 1830 },
  { month: "Apr", donations: 750, livesSaved: 2250 },
  { month: "May", donations: 890, livesSaved: 2670 },
  { month: "Jun", donations: 1040, livesSaved: 3120 },
];

// ────────────────────────────────────────────────────────────
// GRAPH 1: Monthly Donations (Light Blue Healthcare Theme)
// ────────────────────────────────────────────────────────────
export function MonthlyDonationsGraph() {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DBEAFE] shadow-md hover:shadow-xl hover:border-[#BFDBFE] transition-all flex flex-col justify-between overflow-hidden">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-3.5 py-1.5 rounded-full border border-[#BFDBFE] shadow-2xs">
            MONTHLY VOLUME
          </span>
          <span className="text-xs font-semibold text-[#64748B] bg-[#EFF6FF] px-2.5 py-1 rounded-lg border border-[#DBEAFE]">
            Illustrative Trend
          </span>
        </div>
        <h3 className="text-2xl sm:text-[28px] font-black font-display text-[#1E293B] tracking-tight leading-tight">
          Monthly Donations
        </h3>
        <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-xl">
          Illustrative monthly voluntary blood collection volume across participating donation drives.
        </p>
      </div>

      <div className="h-72 w-full my-6 min-h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={donationImpactTrends} margin={{ top: 20, right: 15, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="monthlyDonationGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity={1} />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity={0.85} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#1E293B", fontWeight: 700, fontSize: 14 }}
              axisLine={{ stroke: "#CBD5E1" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#64748B", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white text-[#1E293B] p-3.5 rounded-xl shadow-xl border border-[#DBEAFE] text-sm">
                      <p className="font-bold text-[#1E293B] text-base">{label} (Illustrative)</p>
                      <p className="text-[#2563EB] font-bold mt-1">Donations: {payload[0]?.value} Units</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="donations" fill="url(#monthlyDonationGrad)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="pt-4 border-t border-[#DBEAFE] flex items-center justify-between text-xs sm:text-sm text-[#64748B]">
        <span>Peak Sample Month: <strong className="text-[#2563EB] font-bold">1,040 Units</strong></span>
        <span>Simulated clinical trend</span>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// GRAPH 2: Lives Touched (Light Blue Healthcare Theme)
// ────────────────────────────────────────────────────────────
export function LivesTouchedGraph() {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DBEAFE] shadow-md hover:shadow-xl hover:border-[#BFDBFE] transition-all flex flex-col justify-between overflow-hidden">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#0284C7] bg-[#EFF6FF] px-3.5 py-1.5 rounded-full border border-[#BFDBFE] shadow-2xs">
            CLINICAL MULTIPLIER
          </span>
          <span className="text-xs font-semibold text-[#64748B] bg-[#EFF6FF] px-2.5 py-1 rounded-lg border border-[#DBEAFE]">
            3x Impact Model
          </span>
        </div>
        <h3 className="text-2xl sm:text-[28px] font-black font-display text-[#1E293B] tracking-tight leading-tight">
          Lives Touched
        </h3>
        <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-xl">
          An illustrative impact model showing how blood components may support multiple patients.
        </p>
      </div>

      <div className="h-72 w-full my-6 min-h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={donationImpactTrends} margin={{ top: 20, right: 15, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="livesImpactGradLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#1E293B", fontWeight: 700, fontSize: 14 }}
              axisLine={{ stroke: "#CBD5E1" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#64748B", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white text-[#1E293B] p-3.5 rounded-xl shadow-xl border border-[#DBEAFE] text-sm">
                      <p className="font-bold text-[#1E293B] text-base">{label} (Illustrative)</p>
                      <p className="text-[#0284C7] font-bold mt-1">Lives Touched: {payload[0]?.value}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="livesSaved"
              stroke="#0284C7"
              strokeWidth={3.5}
              fillOpacity={1}
              fill="url(#livesImpactGradLight)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="pt-4 border-t border-[#DBEAFE] flex items-center justify-between text-xs sm:text-sm text-[#64748B]">
        <span>Estimated Model Reach: <strong className="text-[#0284C7] font-bold">3,120 Lives</strong></span>
        <span>Illustrative clinical model</span>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// GRAPH 3: Blood Group Distribution Horizontal (Light Blue Healthcare Theme)
// ────────────────────────────────────────────────────────────
export function BloodGroupDistributionHorizontal() {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DBEAFE] shadow-md hover:shadow-xl hover:border-[#BFDBFE] transition-all flex flex-col justify-between overflow-hidden">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#C8102E] bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-200 shadow-2xs">
            ABO/Rh DYNAMICS
          </span>
          <span className="text-xs font-semibold text-[#64748B] bg-[#EFF6FF] px-2.5 py-1 rounded-lg border border-[#DBEAFE]">
            8 Blood Types
          </span>
        </div>
        <h3 className="text-2xl sm:text-[28px] font-black font-display text-[#1E293B] tracking-tight leading-tight">
          Blood Group Distribution
        </h3>
        <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-xl">
          Illustrative distribution of sample donor registrations across ABO and Rh categories.
        </p>
      </div>

      <div className="h-72 w-full my-6 min-h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={bloodGroupDistributionData}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
            <XAxis
              type="number"
              tick={{ fill: "#64748B", fontSize: 13 }}
              axisLine={{ stroke: "#CBD5E1" }}
              tickLine={false}
            />
            <YAxis
              dataKey="group"
              type="category"
              tick={{ fill: "#1E293B", fontWeight: 800, fontSize: 15 }}
              axisLine={{ stroke: "#CBD5E1" }}
              tickLine={false}
              width={46}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white text-[#1E293B] p-3.5 rounded-xl shadow-xl border border-[#DBEAFE] text-sm">
                      <p className="font-extrabold text-base flex items-center gap-1.5 text-[#C8102E]">
                        <Droplet size={15} className="fill-[#C8102E] text-[#C8102E]" /> Blood Group {data.group}
                      </p>
                      <p className="text-[#1E293B] mt-1">
                        Sample Donors: <strong className="text-[#2563EB]">{data.donors}</strong> ({data.percentage})
                      </p>
                      <p className="text-[#64748B] text-xs mt-0.5">{data.tag}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="donors" radius={[0, 6, 6, 0]}>
              {bloodGroupDistributionData.map((entry) => (
                <Cell key={entry.group} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="pt-4 border-t border-[#DBEAFE] flex items-center justify-between text-xs sm:text-sm text-[#64748B]">
        <span>
          Highest Need: <strong className="text-[#0D9488] font-bold">O+ (140 Donors)</strong>
        </span>
        <span>
          Universal Red Cell: <strong className="text-[#C8102E] font-bold">O- (32 Donors)</strong>
        </span>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// CLINICAL TOOL: Blood Group Demographic Distribution Chart
// ────────────────────────────────────────────────────────────
export function BloodGroupDistribution() {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#DBEAFE] shadow-md hover:shadow-lg transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-3 py-1 rounded-full border border-[#BFDBFE]">
            POPULATION CLINICAL DYNAMICS
          </span>
          <h3 className="text-2xl md:text-[26px] font-bold font-display text-[#1E293B] mt-2">
            Sample Donor Registry Distribution
          </h3>
          <p className="text-sm md:text-base text-[#64748B] mt-1">
            Illustrative distribution across the 8 ABO/Rh blood groups in our sample clinical dataset
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#1E293B] bg-[#EFF6FF] px-3.5 py-2 rounded-xl border border-[#DBEAFE]">
          <Droplet size={14} className="text-[#C8102E] fill-[#C8102E]" />
          <span>Total: 485 Sample Donors</span>
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bloodGroupDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey="group"
              tick={{ fill: "#1E293B", fontWeight: 700, fontSize: 15 }}
              axisLine={{ stroke: "#CBD5E1" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#64748B", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white text-[#1E293B] p-3 rounded-xl shadow-xl border border-[#DBEAFE] text-xs">
                      <p className="font-extrabold text-sm flex items-center gap-1.5 text-[#C8102E]">
                        <Droplet size={14} className="fill-[#C8102E] text-[#C8102E]" /> Blood Group {data.group}
                      </p>
                      <p className="text-[#1E293B] mt-1">
                        Sample Donors: <strong className="text-[#2563EB]">{data.donors}</strong> ({data.percentage})
                      </p>
                      <p className="text-[#64748B] text-[11px] mt-0.5">{data.tag}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="donors" fill="#2563EB" radius={[8, 8, 0, 0]}>
              {bloodGroupDistributionData.map((entry) => (
                <Cell key={entry.group} fill={entry.group.includes("-") ? "#C8102E" : "#2563EB"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-6 pt-5 border-t border-[#DBEAFE]">
        <div className="p-3.5 bg-[#EFF6FF] rounded-xl border border-[#DBEAFE]">
          <span className="text-[11px] text-[#64748B] font-medium block">Most Prevalent</span>
          <strong className="block text-[#1E293B] text-base font-bold mt-0.5">O+ (31%)</strong>
        </div>
        <div className="p-3.5 bg-[#EFF6FF] rounded-xl border border-[#DBEAFE]">
          <span className="text-[11px] text-[#64748B] font-medium block">Rarest Group</span>
          <strong className="block text-[#1E293B] text-base font-bold mt-0.5">AB- (3%)</strong>
        </div>
        <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-100">
          <span className="text-[11px] text-rose-700 font-medium block">Universal Red Cells</span>
          <strong className="block text-[#C8102E] text-base font-bold mt-0.5">O- (7%)</strong>
        </div>
        <div className="p-3.5 bg-[#EFF6FF] rounded-xl border border-[#DBEAFE]">
          <span className="text-[11px] text-[#2563EB] font-medium block">Universal Plasma</span>
          <strong className="block text-[#0284C7] text-base font-bold mt-0.5">AB+ (11%)</strong>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// CLINICAL TOOL: Interactive ABO/Rh Transfusion Matrix
// ────────────────────────────────────────────────────────────
export function InteractiveCompatibilityDiagram() {
  const [selectedGroup, setSelectedGroup] = useState<string>("O-");

  const compatibilityMap: Record<string, { canGiveTo: string[]; canReceiveFrom: string[]; notes: string }> = {
    "O-": {
      canGiveTo: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
      canReceiveFrom: ["O-"],
      notes: "Universal red cell donor. Crucial in acute emergency trauma when urgent typing cannot wait.",
    },
    "O+": {
      canGiveTo: ["O+", "A+", "B+", "AB+"],
      canReceiveFrom: ["O+", "O-"],
      notes: "Can donate red cells to all Rh-positive groups. The most frequently transfused blood type across hospitals.",
    },
    "A-": {
      canGiveTo: ["A-", "A+", "AB-", "AB+"],
      canReceiveFrom: ["A-", "O-"],
      notes: "Can provide red cells to all A and AB blood types regardless of recipient Rh status.",
    },
    "A+": {
      canGiveTo: ["A+", "AB+"],
      canReceiveFrom: ["A+", "A-", "O+", "O-"],
      notes: "High prevalence blood group. Critical for scheduled clinical surgeries and oncology support.",
    },
    "B-": {
      canGiveTo: ["B-", "B+", "AB-", "AB+"],
      canReceiveFrom: ["B-", "O-"],
      notes: "Can donate red cells to all B and AB recipients. Essential emergency clinical reserve.",
    },
    "B+": {
      canGiveTo: ["B+", "AB+"],
      canReceiveFrom: ["B+", "B-", "O+", "O-"],
      notes: "One of the most frequent types in regional registries; high ongoing medical demand.",
    },
    "AB-": {
      canGiveTo: ["AB-", "AB+"],
      canReceiveFrom: ["AB-", "A-", "B-", "O-"],
      notes: "Rarest blood group in population. Can receive only from other Rh-negative compatible donors.",
    },
    "AB+": {
      canGiveTo: ["AB+"],
      canReceiveFrom: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
      notes: "Universal red cell recipient. AB+ patients can safely receive red blood cells from any blood group.",
    },
  };

  const current = compatibilityMap[selectedGroup] || compatibilityMap["O-"];

  return (
    <div className="bg-white text-[#1E293B] rounded-3xl p-6 md:p-8 shadow-lg border border-[#DBEAFE] hover:border-[#BFDBFE] transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB] bg-[#EFF6FF] px-3 py-1 rounded-full border border-[#BFDBFE]">
            INTERACTIVE CLINICAL TOOL
          </span>
          <h3 className="text-2xl md:text-3xl font-extrabold font-display text-[#1E293B] mt-2 tracking-tight">
            ABO/Rh Transfusion Matrix
          </h3>
          <p className="text-xs md:text-sm text-[#64748B] mt-1 leading-relaxed">
            Select any blood group below to view medically verified compatible donors and recipients with clinical precision.
          </p>
        </div>
      </div>

      {/* Blood group selector pills */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 mb-6">
        {bloodGroups.map((g) => {
          const isSelected = selectedGroup === g;
          return (
            <button
              key={g}
              type="button"
              onClick={() => setSelectedGroup(g)}
              className={`py-3 px-2 rounded-xl text-center font-extrabold text-sm sm:text-base transition-all duration-200 border cursor-pointer ${
                isSelected
                  ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-blue-500/20 scale-105"
                  : "bg-[#EFF6FF] text-[#1E293B] border-[#DBEAFE] hover:bg-[#DBEAFE] hover:border-[#BFDBFE]"
              }`}
            >
              {g}
            </button>
          );
        })}
      </div>

      {/* Selected Group Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Can Give To */}
        <div className="bg-[#EFF6FF] p-5 sm:p-6 rounded-2xl border border-[#DBEAFE] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#C8102E] uppercase tracking-wider flex items-center gap-1.5">
              <Droplet size={14} className="fill-[#C8102E] text-[#C8102E]" />
              {selectedGroup} Can Donate Red Cells To:
            </span>
            <span className="text-xs font-bold bg-white text-[#C8102E] px-2.5 py-0.5 rounded-lg border border-rose-200 shadow-2xs">
              {current.canGiveTo.length} of 8 Groups
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {bloodGroups.map((g) => {
              const compatible = current.canGiveTo.includes(g);
              return (
                <span
                  key={g}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all ${
                    compatible
                      ? "bg-white text-[#C8102E] border-rose-200 shadow-xs font-extrabold"
                      : "bg-slate-100/70 text-slate-400 border-slate-200 opacity-40 line-through"
                  }`}
                >
                  <Droplet size={11} className={compatible ? "fill-[#C8102E] text-[#C8102E]" : "text-slate-400"} />
                  {g}
                </span>
              );
            })}
          </div>
        </div>

        {/* Can Receive From */}
        <div className="bg-[#EFF6FF] p-5 sm:p-6 rounded-2xl border border-[#DBEAFE] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider flex items-center gap-1.5">
              <Heart size={14} className="fill-[#2563EB] text-[#2563EB]" />
              {selectedGroup} Can Receive Red Cells From:
            </span>
            <span className="text-xs font-bold bg-white text-[#2563EB] px-2.5 py-0.5 rounded-lg border border-[#BFDBFE] shadow-2xs">
              {current.canReceiveFrom.length} of 8 Groups
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {bloodGroups.map((g) => {
              const compatible = current.canReceiveFrom.includes(g);
              return (
                <span
                  key={g}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all ${
                    compatible
                      ? "bg-white text-[#2563EB] border-[#BFDBFE] shadow-xs font-extrabold"
                      : "bg-slate-100/70 text-slate-400 border-slate-200 opacity-40 line-through"
                  }`}
                >
                  <Heart size={11} className={compatible ? "fill-[#2563EB] text-[#2563EB]" : "text-slate-400"} />
                  {g}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-[#EFF6FF] rounded-xl border border-[#DBEAFE] text-xs text-[#1E293B] leading-relaxed flex items-start gap-2">
        <Sparkles size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#2563EB] font-bold">Clinical Note ({selectedGroup}):</strong>{" "}
          <span className="text-[#64748B]">{current.notes}</span>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// CLINICAL TOOL: Donation Impact Trajectory Chart
// ────────────────────────────────────────────────────────────
export function DonationImpactChart() {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#DBEAFE] shadow-md hover:shadow-lg transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-3 py-1 rounded-full border border-[#BFDBFE]">
            SIMULATED IMPACT TRAJECTORY
          </span>
          <h3 className="text-2xl md:text-[26px] font-bold font-display text-[#1E293B] mt-2">
            Monthly Donation &amp; Lives Touched
          </h3>
          <p className="text-sm md:text-base text-[#64748B] mt-1">
            Modeled clinical projections demonstrating potential lives saved (approx. 3 lives per whole blood unit)
          </p>
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={donationImpactTrends} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="impactGradientLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="livesGradientLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#1E293B", fontWeight: 700, fontSize: 14 }}
              axisLine={{ stroke: "#CBD5E1" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#64748B", fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white text-[#1E293B] p-3.5 rounded-xl shadow-xl border border-[#DBEAFE] text-xs space-y-1">
                      <p className="font-extrabold text-sm text-[#1E293B]">{label} (Illustrative)</p>
                      <p className="text-[#2563EB] font-bold">Donations: {payload[0]?.value} Units</p>
                      <p className="text-[#0284C7] font-bold">Lives Saved: {payload[1]?.value}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="donations"
              stroke="#2563EB"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#impactGradientLight)"
            />
            <Area
              type="monotone"
              dataKey="livesSaved"
              stroke="#0284C7"
              strokeWidth={2.5}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#livesGradientLight)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#64748B] pt-4 border-t border-[#DBEAFE] gap-2">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#2563EB]" /> Simulated Monthly Donations
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#38BDF8]" /> Modeled Lives Saved (3x Multiplier)
        </span>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// CLINICAL TOOL: Visual Step-by-Step Infographic
// ────────────────────────────────────────────────────────────
export function DonationProcessInfographic() {
  const steps = [
    {
      num: "01",
      title: "Confidential Registration",
      duration: "5-10 mins",
      desc: "Complete voluntary donor questionnaire covering recent health history, travel, and lifestyle suitability.",
    },
    {
      num: "02",
      title: "Clinical Screening",
      duration: "5 mins",
      desc: "Qualified medical staff tests haemoglobin (≥12.5 g/dL), pulse, blood pressure, and core vitals.",
    },
    {
      num: "03",
      title: "Safe Blood Donation",
      duration: "8-12 mins",
      desc: "Relax in an ergonomic clinical chair while sterile, single-use equipment collects ~350-450 mL of whole blood.",
    },
    {
      num: "04",
      title: "Rest & Refreshment",
      duration: "10-15 mins",
      desc: "Enjoy fruit juice and light snacks while resting. The body replaces fluid volume within 24-48 hours.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {steps.map((st) => (
        <div
          key={st.num}
          className="bg-white rounded-2xl p-6 border border-[#DBEAFE] shadow-sm relative group hover:shadow-md hover:border-[#BFDBFE] transition-all"
        >
          <span className="font-display font-extrabold text-3xl text-[#BFDBFE] group-hover:text-[#2563EB] transition-colors block mb-2">
            {st.num}
          </span>
          <span className="text-[11px] font-bold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-0.5 rounded-full inline-block mb-3 border border-[#DBEAFE]">
            {st.duration}
          </span>
          <h4 className="font-bold font-display text-[#1E293B] text-base mb-2">
            {st.title}
          </h4>
          <p className="text-xs text-[#64748B] leading-relaxed">
            {st.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

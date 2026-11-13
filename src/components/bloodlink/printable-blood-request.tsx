import { Droplet, ShieldCheck, CheckCircle2, User, Building2, Phone, Calendar, Clock, AlertTriangle } from "lucide-react";
import type { SubmittedBloodRequest } from "@/context/blood-request-context";

/**
 * PrintableBloodRequestReport
 * Dedicated printable report component for BloodLink Blood Request Confirmation & Tracking.
 * Fits cleanly onto a single A4 page with 100% white background, crimson headings,
 * and light blue (#EFF6FF) detail panels.
 */
export function PrintableBloodRequestReport({
  request,
  printDate,
}: {
  request: SubmittedBloodRequest;
  printDate: string;
}) {
  const isFulfilled = request.status === "Fulfilled";
  const isBankCoord = request.status === "Blood Bank Coordination";
  const isReview = request.status === "Under Review";

  return (
    <div
      id="printable-blood-request-report"
      className="blood-request-print hidden print:block bg-white text-[#1E293B] font-sans box-border w-full max-w-[210mm] mx-auto p-8"
      style={{ minHeight: "auto" }}
    >
      {/* ── 1. Brand Header ── */}
      <div className="flex items-center justify-between border-b-2 border-[#C8102E] pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#C8102E] text-white flex items-center justify-center font-bold shadow-xs">
            <Droplet size={24} className="fill-white" />
          </div>
          <div>
            <span className="font-extrabold text-2xl tracking-tight text-[#1E293B] font-display">
              Blood<span className="text-[#C8102E]">Link</span>
            </span>
            <p className="text-[11px] text-[#64748B] font-medium tracking-wide">
              Every Drop Connects a Life · Digital Healthcare Network
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-rose-50 text-[#C8102E] border border-rose-200">
            Official Clinical Intake
          </span>
          <p className="text-[11px] text-[#64748B] mt-1 font-medium">Printed: {printDate}</p>
        </div>
      </div>

      {/* ── 2. Report Title & Reference ── */}
      <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-2xl p-4 mb-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2563EB]">
            INTAKE RECORD CONFIRMATION
          </span>
          <h1 className="text-xl font-black font-display text-[#1E293B] tracking-tight mt-0.5">
            BLOOD REQUEST CONFIRMATION
          </h1>
          <p className="text-xs text-[#64748B]">
            Patient transfusion requirement logged in BloodLink active clinical registry.
          </p>
        </div>

        <div className="text-right">
          <span className="text-[11px] text-[#64748B] block font-semibold">Reference ID</span>
          <span className="font-mono font-black text-xl text-[#C8102E]">
            {request.referenceId}
          </span>
        </div>
      </div>

      {/* ── 3. Request Information Bar ── */}
      <div className="grid grid-cols-3 gap-3 mb-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
        <div>
          <span className="text-[#64748B] block text-[10px] uppercase font-bold">Reference ID</span>
          <span className="font-mono font-bold text-sm text-[#1E293B]">{request.referenceId}</span>
        </div>
        <div>
          <span className="text-[#64748B] block text-[10px] uppercase font-bold">Submission Date &amp; Time</span>
          <span className="font-bold text-sm text-[#1E293B]">{request.submittedAt}</span>
        </div>
        <div>
          <span className="text-[#64748B] block text-[10px] uppercase font-bold">Current Request Status</span>
          <span className="font-extrabold text-sm text-[#2563EB]">{request.status}</span>
        </div>
      </div>

      {/* ── 4. Main Two-Column Clinical Grid ── */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Left Column: Blood Requirement */}
        <div className="border border-[#DBEAFE] rounded-2xl p-4 bg-[#EFF6FF] space-y-2.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#C8102E] flex items-center gap-1.5 border-b border-[#DBEAFE] pb-1.5">
            <Droplet size={14} className="fill-[#C8102E]" /> 3. Blood Requirement
          </h2>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white p-2.5 rounded-xl border border-[#DBEAFE]">
              <span className="text-[10px] text-[#64748B] block font-semibold">Blood Group</span>
              <span className="text-2xl font-black text-[#C8102E] leading-tight">{request.bloodGroup}</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-[#DBEAFE]">
              <span className="text-[10px] text-[#64748B] block font-semibold">Units Required</span>
              <span className="text-xl font-black text-[#1E293B] leading-tight">{request.units} Unit(s)</span>
            </div>
          </div>

          <div className="bg-white p-2.5 rounded-xl border border-[#DBEAFE] text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-[#64748B]">Component:</span>
              <strong className="text-[#1E293B]">{request.bloodComponent}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Urgency Level:</span>
              <strong className={request.urgency === "Critical" ? "text-[#C8102E]" : "text-amber-700"}>
                {request.urgency}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Required Date/Time:</span>
              <strong className="text-[#1E293B]">{request.requiredDate} {request.requiredTime ? `at ${request.requiredTime}` : ""}</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Patient Details */}
        <div className="border border-[#DBEAFE] rounded-2xl p-4 bg-[#EFF6FF] space-y-2.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#C8102E] flex items-center gap-1.5 border-b border-[#DBEAFE] pb-1.5">
            <User size={14} /> 2. Patient Details
          </h2>

          <div className="bg-white p-2.5 rounded-xl border border-[#DBEAFE] text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-[#64748B]">Patient Name:</span>
              <strong className="text-[#1E293B]">{request.patientName || "Confidential"}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Age &amp; Gender:</span>
              <strong className="text-[#1E293B]">{request.patientAge} yrs · {request.patientGender || "N/A"}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Contact Number:</span>
              <strong className="text-[#1E293B]">{request.contactNumber || "N/A"}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Attendant Name:</span>
              <strong className="text-[#1E293B]">{request.attendantName || "N/A"}</strong>
            </div>
          </div>

          <div className="bg-white p-2.5 rounded-xl border border-[#DBEAFE] text-xs space-y-1">
            <span className="text-[10px] text-[#64748B] block font-semibold">Consent &amp; Authorization:</span>
            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
              Verified &amp; Authorized by Clinical Attendant
            </span>
          </div>
        </div>
      </div>

      {/* ── 5. Hospital Details ── */}
      <div className="border border-slate-200 rounded-2xl p-4 mb-4 bg-slate-50 space-y-2 text-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#C8102E] flex items-center gap-1.5 border-b border-slate-200 pb-1.5">
          <Building2 size={14} /> 4. Hospital Details
        </h2>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <span className="text-[#64748B] block text-[10px] uppercase font-bold">Hospital Name</span>
            <strong className="text-sm text-[#1E293B] block">{request.hospitalName}</strong>
            <span className="text-[#64748B] text-xs block mt-0.5">
              Department / Ward: <strong className="text-[#1E293B]">{request.ward || "General Inpatient / Emergency"}</strong>
            </span>
          </div>

          <div>
            <span className="text-[#64748B] block text-[10px] uppercase font-bold">Address &amp; Contact</span>
            <span className="text-[#1E293B] text-xs block font-medium">
              {request.hospitalAddress ? `${request.hospitalAddress}, ` : ""}{request.city}, {request.state}
            </span>
            <span className="text-[#64748B] text-xs block mt-0.5">
              Hospital Contact Number: <strong className="text-[#1E293B]">{request.hospitalContact}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* ── 6. Coordination Status Pipeline (Actual Status Only) ── */}
      <div className="border border-slate-200 rounded-2xl p-4 mb-4 bg-white space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#1E293B] flex items-center justify-between border-b border-slate-100 pb-1.5">
          <span>5. Coordination Status Pipeline</span>
          <span className="text-[11px] font-extrabold text-[#2563EB]">Current: {request.status}</span>
        </h2>

        <div className="grid grid-cols-4 gap-2 pt-1 text-center text-xs">
          <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold">
            <span className="block text-[10px] text-emerald-700">Step 1</span>
            Submitted ✓
          </div>
          <div className={`p-2 rounded-xl border font-bold ${
            isReview || isBankCoord || isFulfilled
              ? "bg-emerald-50 border-emerald-200 text-emerald-950"
              : "bg-slate-50 border-slate-200 text-slate-400"
          }`}>
            <span className="block text-[10px] text-slate-500">Step 2</span>
            Under Review {isReview ? "(Active)" : isBankCoord || isFulfilled ? "✓" : "○"}
          </div>
          <div className={`p-2 rounded-xl border font-bold ${
            isBankCoord || isFulfilled
              ? "bg-emerald-50 border-emerald-200 text-emerald-950"
              : "bg-slate-50 border-slate-200 text-slate-400"
          }`}>
            <span className="block text-[10px] text-slate-500">Step 3</span>
            Blood Bank Coord {isBankCoord ? "(Active)" : isFulfilled ? "✓" : "○"}
          </div>
          <div className={`p-2 rounded-xl border font-bold ${
            isFulfilled
              ? "bg-emerald-50 border-emerald-200 text-emerald-950"
              : "bg-slate-50 border-slate-200 text-slate-400"
          }`}>
            <span className="block text-[10px] text-slate-500">Step 4</span>
            Fulfilled / Closed {isFulfilled ? "✓" : "○"}
          </div>
        </div>
      </div>

      {/* ── 7. Additional Notes (Only if present) ── */}
      {request.additionalNotes && (
        <div className="border border-slate-200 rounded-xl p-3 mb-4 bg-slate-50 text-xs">
          <span className="text-[#64748B] block text-[10px] font-bold uppercase mb-0.5">
            Additional Clinical / Attendant Notes
          </span>
          <p className="text-[#1E293B] leading-relaxed">{request.additionalNotes}</p>
        </div>
      )}

      {/* ── 8. Medical Coordination Disclaimer & Footer ── */}
      <div className="border-t border-slate-200 pt-3 mt-4 text-[10px] text-[#64748B] space-y-1">
        <p className="leading-relaxed">
          <strong className="text-slate-700">Medical Coordination Disclaimer:</strong> BloodLink is a voluntary discovery and clinical communication facilitator. Blood cross-matching, testing, component separation, and transfusion administration remain under the sole medical discretion and regulatory custody of accredited blood banks and treating hospitals.
        </p>
        <div className="flex items-center justify-between pt-1">
          <span className="flex items-center gap-1 text-emerald-700 font-semibold">
            <ShieldCheck size={13} className="text-emerald-600" />
            Verified Digital Healthcare Record · WHO Voluntary Unpaid Donation Principles
          </span>
          <span className="font-mono text-slate-400">bloodlink.org · Ref: {request.referenceId}</span>
        </div>
      </div>
    </div>
  );
}

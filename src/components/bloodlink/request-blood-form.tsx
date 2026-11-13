import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "@tanstack/react-router";
import {
  Droplet,
  Heart,
  AlertCircle,
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  PhoneCall,
  User,
  ShieldCheck,
  FileText,
  Search,
  ArrowRight,
  Copy,
  Printer,
  Sparkles,
  Info,
  Check,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-notification";
import { bloodGroups, locations } from "@/data/demo";
import { useBloodRequests, type SubmittedBloodRequest } from "@/context/blood-request-context";

export type { SubmittedBloodRequest };

// Blood Components enum
export const bloodComponents = [
  "Whole Blood",
  "Packed Red Blood Cells (PRBC)",
  "Platelets (RDP / SDP)",
  "Fresh Frozen Plasma (FFP)",
] as const;

// Urgency levels
export const urgencyLevels = [
  {
    id: "Critical",
    label: "Critical",
    detail: "Immediate / within 2 hrs",
    description: "Emergency surgery, severe trauma, or acute hemorrhage.",
    color: "border-rose-500 bg-rose-50/70 text-rose-900",
    badge: "bg-[#C8102E] text-white",
  },
  {
    id: "Urgent",
    label: "Urgent",
    detail: "Within 6–12 hrs",
    description: "Scheduled procedure or monitored transfusion need.",
    color: "border-amber-500 bg-amber-50/70 text-amber-900",
    badge: "bg-amber-600 text-white",
  },
  {
    id: "Planned",
    label: "Planned",
    detail: "Within 24–48 hrs",
    description: "Elective clinical surgery or routine component support.",
    color: "border-sky-500 bg-sky-50/70 text-sky-900",
    badge: "bg-sky-600 text-white",
  },
] as const;

// Validation Schema
export const bloodRequestSchema = z
  .object({
    // Section A: Patient Information
    patientName: z.string().trim().min(2, "Please enter patient's full name."),
    patientAge: z
      .string()
      .min(1, "Please enter patient age.")
      .refine((v) => {
        const n = parseInt(v, 10);
        return !isNaN(n) && n >= 1 && n <= 120;
      }, "Age must be between 1 and 120."),
    patientGender: z.enum(["Male", "Female", "Other", "Prefer not to say", ""]).optional(),
    contactNumber: z
      .string()
      .trim()
      .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number."),
    attendantName: z.string().trim().min(2, "Please enter attendant / primary contact person name."),

    // Section B: Blood Requirement
    bloodGroup: z.enum(bloodGroups, {
      errorMap: () => ({ message: "Please select a required blood group." }),
    }),
    units: z
      .string()
      .min(1, "Specify units required.")
      .refine((v) => {
        const n = parseInt(v, 10);
        return !isNaN(n) && n >= 1 && n <= 20;
      }, "Units must be between 1 and 20."),
    bloodComponent: z.enum(bloodComponents, {
      errorMap: () => ({ message: "Please choose required blood component." }),
    }),
    urgency: z.enum(["Critical", "Urgent", "Planned"], {
      errorMap: () => ({ message: "Please select urgency level." }),
    }),
    requiredDate: z.string().min(1, "Please select required date."),
    requiredTime: z.string().min(1, "Please select required time."),

    // Section C: Hospital Information
    hospitalName: z.string().trim().min(3, "Please enter hospital or medical center name."),
    hospitalAddress: z.string().trim().min(5, "Please enter hospital address or locality."),
    state: z.string().min(1, "Please select state."),
    city: z.string().min(1, "Please select city."),
    hospitalContact: z
      .string()
      .trim()
      .min(6, "Please enter hospital contact or desk telephone number."),
    ward: z.string().trim().optional(),

    // Section D: Additional Information
    additionalNotes: z.string().trim().optional(),
    consent: z.boolean().refine((v) => v === true, {
      message: "You must authorize BloodLink to coordinate this requirement.",
    }),
    confirmation: z.boolean().refine((v) => v === true, {
      message: "Please confirm that all submitted details are genuine.",
    }),
  })
  .refine(
    (v) => {
      if (!v.state || !v.city) return true;
      return locations[v.state]?.includes(v.city);
    },
    {
      message: "Please choose a city within the selected state.",
      path: ["city"],
    }
  );

export type BloodRequestInput = z.infer<typeof bloodRequestSchema>;

export function RequestBloodForm() {
  const {
    requests,
    submitRequest,
    findRequest,
    latestSubmittedRequest,
    setLatestSubmittedRequest,
    clearLatestSubmitted,
    activeTab,
    setActiveTab,
    trackQuery,
    setTrackQuery,
    trackedRecord,
    setTrackedRecord,
  } = useBloodRequests();

  const submittedRequest = latestSubmittedRequest;

  const [trackError, setTrackError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const { success, info } = useToast();

  const todayStr = new Date().toISOString().split("T")[0];

  // Auto-switch to track tab or search if query params indicate
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("tab") === "track") {
        setActiveTab("track");
      }
      const ref = params.get("ref");
      if (ref) {
        setTrackQuery(ref);
        const match = findRequest(ref);
        if (match) setTrackedRecord(match);
      }
    }
  }, [findRequest, setActiveTab, setTrackQuery, setTrackedRecord]);

  // If on track tab and trackQuery is present but trackedRecord is empty, attempt lookup
  useEffect(() => {
    if (activeTab === "track" && trackQuery && !trackedRecord) {
      const match = findRequest(trackQuery);
      if (match) {
        setTrackedRecord(match);
      }
    }
  }, [activeTab, trackQuery, trackedRecord, findRequest, setTrackedRecord]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BloodRequestInput>({
    resolver: zodResolver(bloodRequestSchema),
    defaultValues: {
      patientGender: "Male",
      bloodGroup: "O+",
      units: "2",
      bloodComponent: "Packed Red Blood Cells (PRBC)",
      urgency: "Urgent",
      requiredDate: todayStr,
      requiredTime: "12:00",
      state: "Tamil Nadu",
      city: "Chennai",
      consent: false,
      confirmation: false,
    },
  });

  const selectedState = watch("state");
  const selectedGroup = watch("bloodGroup");
  const selectedUrgency = watch("urgency");
  const selectedComponent = watch("bloodComponent");

  const onSubmit = (data: BloodRequestInput) => {
    setBusy(true);
    setTimeout(() => {
      // Store in shared in-memory React application state
      const newRecord = submitRequest(data);
      setBusy(false);
      success("Blood Request Submitted", `Requirement recorded under reference ${newRecord.referenceId}.`);
    }, 450);
  };

  const handleCopy = (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackError("");
    const cleaned = trackQuery.trim().toUpperCase();

    if (!cleaned) {
      setTrackError("Please enter a valid request reference ID.");
      return;
    }

    // Search centralized shared in-memory storage
    const match = findRequest(cleaned);
    if (match) {
      setTrackedRecord(match);
    } else {
      setTrackedRecord(null);
      setTrackError("Reference ID not found. Please check and try again.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Tab Switcher */}
      <div className="flex items-center justify-center">
        <div className="bg-slate-200/80 p-1 rounded-2xl flex items-center gap-1 shadow-inner max-w-md w-full">
          <button
            type="button"
            onClick={() => {
              setActiveTab("form");
              setTrackedRecord(null);
            }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "form"
                ? "bg-white text-slate-900 shadow-md"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
            }`}
          >
            <Droplet
              size={16}
              className={activeTab === "form" ? "fill-[#C8102E] text-[#C8102E]" : "text-slate-400"}
            />
            <span>New Blood Request</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("track")}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "track"
                ? "bg-white text-slate-900 shadow-md"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
            }`}
          >
            <Activity
              size={16}
              className={activeTab === "track" ? "text-[#C8102E]" : "text-slate-400"}
            />
            <span>Track Request Status</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: SUCCESSFUL SUBMISSION SUMMARY */}
      {activeTab === "form" && submittedRequest ? (
        <div className="bg-white border border-slate-200/90 rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#8F1027] via-[#C8102E] to-[#A60D25] text-white p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-2 backdrop-blur-xs">
                  <CheckCircle2 size={14} className="text-emerald-300" />
                  Submission Received
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
                  Blood Requirement Summary
                </h2>
                <p className="text-rose-100 text-xs sm:text-sm mt-1">
                  Reference: <strong className="text-white font-mono">{submittedRequest.referenceId}</strong> · Logged {submittedRequest.submittedAt}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={() => handleCopy(submittedRequest.referenceId)}
                  className="bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-semibold rounded-xl h-9"
                >
                  {copied ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />}
                  <span>{copied ? "Copied" : "Copy Reference ID"}</span>
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined") window.print();
                  }}
                  className="bg-white text-[#C8102E] hover:bg-rose-50 text-xs font-bold rounded-xl h-9 shadow-sm"
                >
                  <Printer size={14} />
                  <span>Print</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Status Progress Flow */}
          <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50">
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 mb-4">
              Current Coordination Pipeline
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { stage: "Submitted", state: "done", desc: "Requirement logged" },
                { stage: "Under Review", state: "current", desc: "Clinical screening" },
                { stage: "Blood Bank Coordination", state: "pending", desc: "Reserve matching" },
                { stage: "Fulfilled / Closed", state: "pending", desc: "Transfusion release" },
              ].map((step, idx) => (
                <div
                  key={step.stage}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    step.state === "done"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                      : step.state === "current"
                      ? "bg-rose-50 border-rose-300 text-rose-950 shadow-sm ring-2 ring-rose-200"
                      : "bg-white border-slate-200/80 text-slate-400 opacity-70"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span>{idx + 1}. {step.stage}</span>
                    {step.state === "done" && <CheckCircle2 size={14} className="text-emerald-600" />}
                    {step.state === "current" && (
                      <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-ping" />
                    )}
                  </div>
                  <p className="text-[11px] leading-tight text-slate-500">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Details Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Patient Information */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#C8102E] flex items-center gap-1.5">
                <User size={14} /> Patient Details
              </h4>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Name:</span>
                  <strong className="text-slate-900">{submittedRequest.patientName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Age / Gender:</span>
                  <span className="font-semibold text-slate-800">
                    {submittedRequest.patientAge} yrs · {submittedRequest.patientGender || "Not specified"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact:</span>
                  <strong className="text-slate-900">{submittedRequest.contactNumber}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Attendant:</span>
                  <span className="font-semibold text-slate-800">{submittedRequest.attendantName}</span>
                </div>
              </div>
            </div>

            {/* Column 2: Blood Requirement */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#C8102E] flex items-center gap-1.5">
                <Droplet size={14} /> Requirement Vitals
              </h4>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs text-slate-700">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Group Required:</span>
                  <span className="px-2.5 py-0.5 rounded-lg font-black text-sm bg-[#C8102E] text-white">
                    {submittedRequest.bloodGroup}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Units Needed:</span>
                  <strong className="text-slate-900 font-bold">{submittedRequest.units} Unit(s)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Component:</span>
                  <span className="font-semibold text-slate-800">{submittedRequest.bloodComponent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Urgency:</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                      submittedRequest.urgency === "Critical"
                        ? "bg-rose-100 text-rose-800"
                        : submittedRequest.urgency === "Urgent"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-sky-100 text-sky-800"
                    }`}
                  >
                    {submittedRequest.urgency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Required By:</span>
                  <span className="font-semibold text-slate-800">
                    {submittedRequest.requiredDate} at {submittedRequest.requiredTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Column 3: Hospital Facility */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#C8102E] flex items-center gap-1.5">
                <Building2 size={14} /> Hospital Destination
              </h4>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs text-slate-700">
                <div>
                  <span className="text-slate-500 block">Facility Name:</span>
                  <strong className="text-slate-900 block font-bold text-sm">
                    {submittedRequest.hospitalName}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Address &amp; Area:</span>
                  <span className="text-slate-700 block">
                    {submittedRequest.hospitalAddress}, {submittedRequest.city}, {submittedRequest.state}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Facility Phone:</span>
                  <span className="font-semibold text-slate-900">{submittedRequest.hospitalContact}</span>
                </div>
                {submittedRequest.ward && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Department / Ward:</span>
                    <span className="font-semibold text-slate-800">{submittedRequest.ward}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Notes if provided */}
          {submittedRequest.additionalNotes && (
            <div className="px-6 sm:px-8 pb-6">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700">
                <span className="font-bold text-slate-900 block mb-1">Clinical Notes &amp; Instructions:</span>
                <p className="leading-relaxed text-slate-600">{submittedRequest.additionalNotes}</p>
              </div>
            </div>
          )}

          {/* Honest Status Notice */}
          <div className="px-6 sm:px-8 pb-6">
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
              <Info size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Operational Coordination Notice:</strong> Your blood requirement reference{" "}
                <span className="font-mono font-bold">#{submittedRequest.referenceId}</span> is stored in temporary session state. BloodLink assists in voluntary donor discovery; final patient cross-matching and component release remain strictly under the licensed authority of the destination hospital blood transfusion service.
              </div>
            </div>
          </div>

          {/* Next Steps / Related Actions */}
          <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild className="bg-[#C8102E] hover:bg-[#8F1027] text-white font-semibold rounded-xl text-xs sm:text-sm">
                <Link to="/find-donors">
                  <Search size={14} className="mr-1.5" />
                  Find {submittedRequest.bloodGroup} Voluntary Donors
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-slate-300 text-slate-800 rounded-xl text-xs sm:text-sm">
                <Link to="/blood-compatibility">
                  <Droplet size={14} className="mr-1.5 text-[#C8102E]" />
                  Check Compatibility Matrix
                </Link>
              </Button>
            </div>

            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                clearLatestSubmitted();
                reset();
              }}
              className="text-slate-600 hover:text-[#C8102E] text-xs font-bold cursor-pointer"
            >
              Submit Another Request
            </Button>
          </div>
        </div>
      ) : activeTab === "form" ? (
        /* VIEW 2: INTAKE REQUEST FORM */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form (8 Columns) */}
          <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg">
            <div className="border-b border-slate-100 pb-6 mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#C8102E] text-xs font-bold mb-2 border border-rose-100">
                <Droplet size={14} className="fill-[#C8102E]" /> Clinical Transfusion Intake
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
                Submit a Blood Requirement
              </h2>
              <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                Provide accurate clinical details to broadcast an immediate or planned transfusion requirement to voluntary donors and coordinating blood banks.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10" noValidate>
              {/* SECTION A: PATIENT INFORMATION */}
              <section className="space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-lg bg-rose-100 text-[#C8102E] font-black text-xs flex items-center justify-center">
                    A
                  </span>
                  <h3 className="font-bold text-slate-900 text-base">Patient Information</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Patient Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">
                      Patient Full Name <span className="text-[#C8102E]">*</span>
                    </label>
                    <input
                      {...register("patientName")}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full h-11 px-3.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                        errors.patientName
                          ? "border-rose-400 focus:ring-rose-200 bg-rose-50/20"
                          : "border-slate-300 focus:border-[#C8102E] focus:ring-rose-100"
                      }`}
                    />
                    {errors.patientName && (
                      <p className="text-[11px] text-rose-600 font-semibold">{errors.patientName.message}</p>
                    )}
                  </div>

                  {/* Patient Age & Gender */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 block">
                        Age <span className="text-[#C8102E]">*</span>
                      </label>
                      <input
                        {...register("patientAge")}
                        type="number"
                        placeholder="e.g. 35"
                        min="1"
                        max="120"
                        className={`w-full h-11 px-3 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                          errors.patientAge
                            ? "border-rose-400 focus:ring-rose-200 bg-rose-50/20"
                            : "border-slate-300 focus:border-[#C8102E] focus:ring-rose-100"
                        }`}
                      />
                      {errors.patientAge && (
                        <p className="text-[11px] text-rose-600 font-semibold">{errors.patientAge.message}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 block">Gender</label>
                      <select
                        {...register("patientGender")}
                        className="w-full h-11 px-3 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:border-[#C8102E] focus:ring-2 focus:ring-rose-100 focus:outline-none"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">
                      Contact Mobile Number <span className="text-[#C8102E]">*</span>
                    </label>
                    <input
                      {...register("contactNumber")}
                      type="tel"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className={`w-full h-11 px-3.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                        errors.contactNumber
                          ? "border-rose-400 focus:ring-rose-200 bg-rose-50/20"
                          : "border-slate-300 focus:border-[#C8102E] focus:ring-rose-100"
                      }`}
                    />
                    {errors.contactNumber && (
                      <p className="text-[11px] text-rose-600 font-semibold">{errors.contactNumber.message}</p>
                    )}
                  </div>

                  {/* Attendant / Primary Contact Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">
                      Attendant / Primary Contact <span className="text-[#C8102E]">*</span>
                    </label>
                    <input
                      {...register("attendantName")}
                      placeholder="e.g. Sunita Sharma (Spouse / Guardian)"
                      className={`w-full h-11 px-3.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                        errors.attendantName
                          ? "border-rose-400 focus:ring-rose-200 bg-rose-50/20"
                          : "border-slate-300 focus:border-[#C8102E] focus:ring-rose-100"
                      }`}
                    />
                    {errors.attendantName && (
                      <p className="text-[11px] text-rose-600 font-semibold">{errors.attendantName.message}</p>
                    )}
                  </div>
                </div>
              </section>

              {/* SECTION B: BLOOD REQUIREMENT */}
              <section className="space-y-5">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-lg bg-rose-100 text-[#C8102E] font-black text-xs flex items-center justify-center">
                    B
                  </span>
                  <h3 className="font-bold text-slate-900 text-base">Blood Requirement</h3>
                </div>

                {/* Blood Group Selection Grid */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 block">
                    Required Blood Group <span className="text-[#C8102E]">*</span>
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {bloodGroups.map((g) => {
                      const isSelected = selectedGroup === g;
                      return (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setValue("bloodGroup", g as any, { shouldValidate: true })}
                          className={`h-11 rounded-xl font-black text-sm flex items-center justify-center transition-all ${
                            isSelected
                              ? "bg-[#C8102E] text-white shadow-md ring-2 ring-rose-400 scale-[1.02]"
                              : "bg-slate-50 border border-slate-300 text-slate-800 hover:border-[#C8102E] hover:text-[#C8102E]"
                          }`}
                        >
                          {g}
                        </button>
                      );
                    })}
                  </div>
                  {errors.bloodGroup && (
                    <p className="text-[11px] text-rose-600 font-semibold">{errors.bloodGroup.message}</p>
                  )}
                </div>

                {/* Units & Component */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Units Required */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">
                      Number of Units Required <span className="text-[#C8102E]">*</span>
                    </label>
                    <select
                      {...register("units")}
                      className="w-full h-11 px-3.5 text-sm rounded-xl border border-slate-300 bg-white focus:border-[#C8102E] focus:ring-2 focus:ring-rose-100 focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                        <option key={num} value={String(num)}>
                          {num} Unit{num > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                    {errors.units && (
                      <p className="text-[11px] text-rose-600 font-semibold">{errors.units.message}</p>
                    )}
                  </div>

                  {/* Component Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">
                      Blood Component <span className="text-[#C8102E]">*</span>
                    </label>
                    <select
                      {...register("bloodComponent")}
                      className="w-full h-11 px-3.5 text-sm rounded-xl border border-slate-300 bg-white focus:border-[#C8102E] focus:ring-2 focus:ring-rose-100 focus:outline-none"
                    >
                      {bloodComponents.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    {errors.bloodComponent && (
                      <p className="text-[11px] text-rose-600 font-semibold">{errors.bloodComponent.message}</p>
                    )}
                  </div>
                </div>

                {/* Urgency Classification Cards */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 block">
                    Urgency Classification <span className="text-[#C8102E]">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {urgencyLevels.map((lvl) => {
                      const isSelected = selectedUrgency === lvl.id;
                      return (
                        <div
                          key={lvl.id}
                          onClick={() => setValue("urgency", lvl.id, { shouldValidate: true })}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                            isSelected
                              ? `${lvl.color} shadow-sm ring-2 ring-[#C8102E]`
                              : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100/50"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-extrabold text-sm">{lvl.label}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${lvl.badge}`}>
                              {lvl.detail}
                            </span>
                          </div>
                          <p className="text-[11px] opacity-85 leading-tight">{lvl.description}</p>
                        </div>
                      );
                    })}
                  </div>
                  {errors.urgency && (
                    <p className="text-[11px] text-rose-600 font-semibold">{errors.urgency.message}</p>
                  )}
                </div>

                {/* Required Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">
                      Required By Date <span className="text-[#C8102E]">*</span>
                    </label>
                    <input
                      {...register("requiredDate")}
                      type="date"
                      min={todayStr}
                      className="w-full h-11 px-3.5 text-sm rounded-xl border border-slate-300 bg-white focus:border-[#C8102E] focus:ring-2 focus:ring-rose-100 focus:outline-none"
                    />
                    {errors.requiredDate && (
                      <p className="text-[11px] text-rose-600 font-semibold">{errors.requiredDate.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">
                      Required By Time <span className="text-[#C8102E]">*</span>
                    </label>
                    <input
                      {...register("requiredTime")}
                      type="time"
                      className="w-full h-11 px-3.5 text-sm rounded-xl border border-slate-300 bg-white focus:border-[#C8102E] focus:ring-2 focus:ring-rose-100 focus:outline-none"
                    />
                    {errors.requiredTime && (
                      <p className="text-[11px] text-rose-600 font-semibold">{errors.requiredTime.message}</p>
                    )}
                  </div>
                </div>
              </section>

              {/* SECTION C: HOSPITAL INFORMATION */}
              <section className="space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-lg bg-rose-100 text-[#C8102E] font-black text-xs flex items-center justify-center">
                    C
                  </span>
                  <h3 className="font-bold text-slate-900 text-base">Hospital Information</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Hospital Name */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">
                      Hospital / Medical Center Name <span className="text-[#C8102E]">*</span>
                    </label>
                    <input
                      {...register("hospitalName")}
                      placeholder="e.g. Apollo Hospital, Fortis Memorial, or AIIMS"
                      className={`w-full h-11 px-3.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                        errors.hospitalName
                          ? "border-rose-400 focus:ring-rose-200 bg-rose-50/20"
                          : "border-slate-300 focus:border-[#C8102E] focus:ring-rose-100"
                      }`}
                    />
                    {errors.hospitalName && (
                      <p className="text-[11px] text-rose-600 font-semibold">{errors.hospitalName.message}</p>
                    )}
                  </div>

                  {/* Hospital Address */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">
                      Hospital Address / Locality <span className="text-[#C8102E]">*</span>
                    </label>
                    <input
                      {...register("hospitalAddress")}
                      placeholder="e.g. 21 Greams Road, Thousand Lights"
                      className={`w-full h-11 px-3.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                        errors.hospitalAddress
                          ? "border-rose-400 focus:ring-rose-200 bg-rose-50/20"
                          : "border-slate-300 focus:border-[#C8102E] focus:ring-rose-100"
                      }`}
                    />
                    {errors.hospitalAddress && (
                      <p className="text-[11px] text-rose-600 font-semibold">{errors.hospitalAddress.message}</p>
                    )}
                  </div>

                  {/* State */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">
                      State <span className="text-[#C8102E]">*</span>
                    </label>
                    <select
                      {...register("state")}
                      className="w-full h-11 px-3.5 text-sm rounded-xl border border-slate-300 bg-white focus:border-[#C8102E] focus:ring-2 focus:ring-rose-100 focus:outline-none"
                    >
                      {Object.keys(locations).map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="text-[11px] text-rose-600 font-semibold">{errors.state.message}</p>
                    )}
                  </div>

                  {/* City */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">
                      City <span className="text-[#C8102E]">*</span>
                    </label>
                    <select
                      {...register("city")}
                      className="w-full h-11 px-3.5 text-sm rounded-xl border border-slate-300 bg-white focus:border-[#C8102E] focus:ring-2 focus:ring-rose-100 focus:outline-none"
                    >
                      {(selectedState ? locations[selectedState] : Object.values(locations).flat())?.map(
                        (c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        )
                      )}
                    </select>
                    {errors.city && (
                      <p className="text-[11px] text-rose-600 font-semibold">{errors.city.message}</p>
                    )}
                  </div>

                  {/* Hospital Contact Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">
                      Hospital Contact / Desk Telephone <span className="text-[#C8102E]">*</span>
                    </label>
                    <input
                      {...register("hospitalContact")}
                      placeholder="e.g. 044-28290200 or 9840001122"
                      className={`w-full h-11 px-3.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                        errors.hospitalContact
                          ? "border-rose-400 focus:ring-rose-200 bg-rose-50/20"
                          : "border-slate-300 focus:border-[#C8102E] focus:ring-rose-100"
                      }`}
                    />
                    {errors.hospitalContact && (
                      <p className="text-[11px] text-rose-600 font-semibold">{errors.hospitalContact.message}</p>
                    )}
                  </div>

                  {/* Department / Ward */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">
                      Department or Ward <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      {...register("ward")}
                      placeholder="e.g. ICU Bed 4, Emergency OT, Oncology"
                      className="w-full h-11 px-3.5 text-sm rounded-xl border border-slate-300 bg-white focus:border-[#C8102E] focus:ring-2 focus:ring-rose-100 focus:outline-none"
                    />
                  </div>
                </div>
              </section>

              {/* SECTION D: ADDITIONAL INFORMATION & CONSENTS */}
              <section className="space-y-4">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <span className="w-6 h-6 rounded-lg bg-rose-100 text-[#C8102E] font-black text-xs flex items-center justify-center">
                    D
                  </span>
                  <h3 className="font-bold text-slate-900 text-base">Additional Information &amp; Consents</h3>
                </div>

                {/* Additional Clinical Notes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 block">
                    Special Clinical Requirements / Notes <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    {...register("additionalNotes")}
                    rows={3}
                    placeholder="Specify cross-match status, doctor recommendations, transfusion requisition details, or gate pass requirements..."
                    className="w-full p-3.5 text-sm rounded-xl border border-slate-300 bg-white focus:border-[#C8102E] focus:ring-2 focus:ring-rose-100 focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Checkbox 1: Consent */}
                <div className="space-y-1">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      {...register("consent")}
                      className="mt-1 h-4 w-4 rounded text-[#C8102E] focus:ring-[#C8102E] border-slate-300"
                    />
                    <span className="text-xs text-slate-700 leading-snug">
                      I authorize BloodLink to broadcast this blood requirement to voluntary donors and regional accredited blood banks. <span className="text-[#C8102E]">*</span>
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-[11px] text-rose-600 font-semibold pl-7">{errors.consent.message}</p>
                  )}
                </div>

                {/* Checkbox 2: Confirmation */}
                <div className="space-y-1">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      {...register("confirmation")}
                      className="mt-1 h-4 w-4 rounded text-[#C8102E] focus:ring-[#C8102E] border-slate-300"
                    />
                    <span className="text-xs text-slate-700 leading-snug">
                      I confirm that all submitted patient, hospital, and transfusion requirement details are accurate and genuine. <span className="text-[#C8102E]">*</span>
                    </span>
                  </label>
                  {errors.confirmation && (
                    <p className="text-[11px] text-rose-600 font-semibold pl-7">{errors.confirmation.message}</p>
                  )}
                </div>
              </section>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-100">
                <Button
                  type="submit"
                  disabled={busy}
                  className="w-full sm:w-auto min-w-[240px] h-12 bg-gradient-to-r from-[#C8102E] to-[#8F1027] hover:from-[#A60D25] hover:to-[#730D20] text-white font-bold text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Droplet size={18} className="fill-current text-white" />
                  <span>{busy ? "Validating & Submitting…" : "Submit Blood Request"}</span>
                </Button>
                <p className="text-[11px] text-slate-500 mt-2">
                  No automated blood dispensing occurs. All transfusion releases are coordinated with hospital clinical authorities.
                </p>
              </div>
            </form>
          </div>

          {/* Context Sidebar (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Immediate Emergency Callout */}
            <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-lg space-y-4 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                <AlertCircle size={22} />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Critical Emergency?</h3>
                <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                  If this is a life-threatening trauma requiring immediate un-crossmatched blood, dial national helplines immediately.
                </p>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl flex items-center justify-between text-xs border border-slate-700">
                <span className="text-slate-400">Ambulance &amp; Emergency:</span>
                <strong className="text-white font-bold text-sm">108 / 112</strong>
              </div>
            </div>

            {/* Transfusion Protocol Advice */}
            <div className="p-6 bg-white border border-slate-200/90 rounded-3xl shadow-xs space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-600" />
                Clinical Verification Standard
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every blood request broadcast through BloodLink is verified against destination facility admissions. Blood is never transported without verified cold-chain logistics.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Compatibility Guide:</span>
                <Link to="/blood-compatibility" className="font-bold text-[#C8102E] hover:underline">
                  View Matrix →
                </Link>
              </div>
            </div>

            {/* Quick Track Existing Box */}
            <div className="p-6 bg-rose-50/60 border border-rose-100 rounded-3xl shadow-xs space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Activity size={16} className="text-[#C8102E]" />
                Track Existing Request
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Already submitted a blood requirement? Check review status, donor availability, and coordination stages.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setActiveTab("track");
                  if (latestSubmittedRequest) {
                    setTrackQuery(latestSubmittedRequest.referenceId);
                    setTrackedRecord(latestSubmittedRequest);
                  }
                }}
                className="w-full border-rose-200 text-[#C8102E] hover:bg-rose-100/60 font-semibold text-xs h-10 rounded-xl"
              >
                Track by Reference ID
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* VIEW 3: REQUEST TRACKING SECTION */
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg text-center space-y-6">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#C8102E] flex items-center justify-center mx-auto mb-3">
                <Activity size={24} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
                Track Blood Requirement Status
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-md mx-auto leading-relaxed">
                Enter your unique request reference ID to view real-time coordination and clinical review status.
              </p>
            </div>

            <form onSubmit={handleTrackSearch} className="w-full max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 items-stretch">
              <input
                type="text"
                value={trackQuery}
                onChange={(e) => setTrackQuery(e.target.value)}
                placeholder="Enter your Reference ID (e.g. REQ-2026-1234)"
                className="w-full sm:flex-1 h-[54px] px-5 rounded-2xl bg-white border border-[#CBD5E1] text-[16px] text-[#1E293B] placeholder:text-[#94A3B8] font-mono focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 shadow-2xs"
              />
              <Button
                type="submit"
                className="w-full sm:w-auto h-[54px] px-7 bg-[#C8102E] hover:bg-[#8F1027] text-white font-bold rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 text-sm sm:text-base flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <Search size={18} className="shrink-0" />
                <span>Track Request</span>
              </Button>
            </form>

            {trackError && (
              <p className="text-xs text-rose-600 font-semibold">{trackError}</p>
            )}
          </div>

          {/* Tracked Record Card */}
          {trackedRecord && (
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-md space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                <div>
                  <span className="text-xs text-slate-500 font-medium">Tracking Reference:</span>
                  <h3 className="text-xl font-bold font-mono text-slate-900">{trackedRecord.referenceId}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      trackedRecord.status === "Fulfilled"
                        ? "bg-emerald-100 text-emerald-800"
                        : trackedRecord.status === "Blood Bank Coordination"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    ● {trackedRecord.status}
                  </span>
                </div>
              </div>

              {/* Progress Flow */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {[
                  { stage: "Submitted", isDone: true },
                  {
                    stage: "Under Review",
                    isDone: trackedRecord.status !== "Submitted",
                  },
                  {
                    stage: "Blood Bank Coordination",
                    isDone:
                      trackedRecord.status === "Blood Bank Coordination" ||
                      trackedRecord.status === "Fulfilled",
                  },
                  { stage: "Fulfilled / Closed", isDone: trackedRecord.status === "Fulfilled" },
                ].map((s, idx) => (
                  <div
                    key={s.stage}
                    className={`p-3 rounded-xl border text-xs ${
                      s.isDone
                        ? "bg-emerald-50/70 border-emerald-200 text-emerald-950 font-semibold"
                        : "bg-slate-50 border-slate-200 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span>{idx + 1}. {s.stage}</span>
                      {s.isDone && <CheckCircle2 size={13} className="text-emerald-600" />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Patient & Facility Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div>
                  <span className="text-slate-500 block">Patient:</span>
                  <strong className="text-slate-900 text-sm">
                    {trackedRecord.patientName} ({trackedRecord.patientAge}y)
                  </strong>
                  <span className="block text-slate-600 mt-1">
                    Requirement: <strong className="text-[#C8102E] font-black">{trackedRecord.bloodGroup}</strong> · {trackedRecord.units} Units of {trackedRecord.bloodComponent}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Hospital Facility:</span>
                  <strong className="text-slate-900 text-sm">{trackedRecord.hospitalName}</strong>
                  <span className="block text-slate-600 mt-1">
                    {trackedRecord.city}, {trackedRecord.state} ({trackedRecord.ward || "General Ward"})
                  </span>
                </div>
              </div>

              {/* Honest Tracking Notice */}
              <div className="p-3.5 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-900 leading-relaxed">
                <strong>Status Update:</strong> Your requirement is undergoing clinical screening. Regional volunteer outreach is in progress. BloodLink does not guarantee automated fulfillment; hospital blood services manage cold-chain logistics and cross-matching.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


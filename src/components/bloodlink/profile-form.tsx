import React, { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Heart,
  Droplet,
  Building2,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Briefcase,
  FileText,
  Weight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth, type BloodGroup, type DonorProfile, type HospitalStaffProfile } from "@/context/auth-context";
import { useToast } from "@/components/ui/toast-notification";
import { bloodGroups, locations } from "@/data/demo";

// ────────────────────────────────────────────────────────────
// DONOR VALIDATION SCHEMA
// ────────────────────────────────────────────────────────────
export const donorProfileSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters."),
  phone: z.string().trim().regex(/^[0-9+ -]{10,14}$/, "Please enter a valid phone number (10-14 digits)."),
  dateOfBirth: z.string().min(1, "Please enter your date of birth."),
  gender: z.enum(["Male", "Female", "Other", "Prefer not to say"], {
    errorMap: () => ({ message: "Please select your gender." }),
  }),
  state: z.string().min(1, "Please choose your state."),
  city: z.string().min(1, "Please choose your city."),
  bloodGroup: z.enum(bloodGroups as unknown as [BloodGroup, ...BloodGroup[]], {
    errorMap: () => ({ message: "Please select your blood group." }),
  }),
  weight: z.string().trim().optional(),
  lastDonationDate: z.string().optional(),
  availability: z.enum(["Available", "Unavailable", "On Call"], {
    errorMap: () => ({ message: "Please select availability status." }),
  }),
  medicalNotes: z.string().trim().optional(),
});

type DonorProfileInput = z.infer<typeof donorProfileSchema>;

// ────────────────────────────────────────────────────────────
// HOSPITAL STAFF VALIDATION SCHEMA
// ────────────────────────────────────────────────────────────
export const hospitalStaffProfileSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters."),
  phone: z.string().trim().regex(/^[0-9+ -]{10,14}$/, "Please enter a valid phone number (10-14 digits)."),
  designation: z.string().trim().min(2, "Please enter your staff designation/title."),
  department: z.string().trim().min(2, "Please enter your department name."),
  hospitalName: z.string().trim().min(3, "Please enter full hospital/institution name."),
  hospitalAddress: z.string().trim().min(5, "Please enter the hospital address."),
  state: z.string().min(1, "Please choose the state."),
  city: z.string().min(1, "Please choose the city."),
  hospitalContact: z.string().trim().regex(/^[0-9+ -]{8,15}$/, "Please enter hospital direct/emergency contact number."),
});

type HospitalStaffProfileInput = z.infer<typeof hospitalStaffProfileSchema>;

// ────────────────────────────────────────────────────────────
// COMPONENT: ProfileForm
// mode: "complete" (mandatory first-time setup) | "edit" (update existing profile)
// ────────────────────────────────────────────────────────────
export function ProfileForm({ mode = "complete" }: { mode?: "complete" | "edit" }) {
  const navigate = useNavigate();
  const { user, isAuthenticated, saveDonorProfile, saveHospitalStaffProfile, logout } = useAuth();
  const { success, info } = useToast();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-lg space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-[#C8102E] flex items-center justify-center mx-auto">
            <User size={28} />
          </div>
          <h2 className="text-2xl font-black font-display text-slate-900 tracking-tight">Sign In Required</h2>
          <p className="text-xs text-slate-600">Please sign in to complete or view your profile information.</p>
          <Button asChild className="bg-[#C8102E] hover:bg-[#8F1027] text-white font-bold h-11 rounded-xl">
            <Link to="/auth">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 via-white to-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header Banner */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-rose-100 text-[#C8102E] border border-rose-200">
                  {user.role} Account
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {mode === "complete" ? "Mandatory Setup" : "Update Profile"}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 tracking-tight">
                {mode === "complete" ? "Complete Your Profile" : "Edit Profile Details"}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                {mode === "complete"
                  ? "Welcome to BloodLink! Please provide your genuine information before accessing the portal dashboard."
                  : "Update your genuine personal, contact, and role information. Changes reflect across BloodLink immediately."}
              </p>
            </div>

            {mode === "edit" ? (
              <Button
                asChild
                variant="outline"
                className="shrink-0 text-xs font-bold border-slate-300 text-slate-700 hover:border-[#C8102E] rounded-xl"
              >
                <Link to="/dashboard">Back to Dashboard</Link>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="shrink-0 text-xs font-semibold text-slate-500 hover:text-rose-600 rounded-xl"
              >
                Cancel / Sign Out
              </Button>
            )}
          </div>
        </div>

        {/* Form Body: Role Switch */}
        {user.role === "Donor" ? (
          <DonorFormSection userEmail={user.email} existing={user.donorProfile} mode={mode} />
        ) : (
          <HospitalStaffFormSection userEmail={user.email} existing={user.hospitalStaffProfile} mode={mode} />
        )}

      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// DONOR FORM SECTION
// ────────────────────────────────────────────────────────────
function DonorFormSection({
  userEmail,
  existing,
  mode,
}: {
  userEmail: string;
  existing?: DonorProfile;
  mode: "complete" | "edit";
}) {
  const navigate = useNavigate();
  const { saveDonorProfile } = useAuth();
  const { success } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DonorProfileInput>({
    resolver: zodResolver(donorProfileSchema),
    defaultValues: {
      fullName: existing?.fullName || "",
      phone: existing?.phone || "",
      dateOfBirth: existing?.dateOfBirth || "",
      gender: existing?.gender || "Male",
      state: existing?.state || "Tamil Nadu",
      city: existing?.city || "Chennai",
      bloodGroup: existing?.bloodGroup || "O+",
      weight: existing?.weight || "",
      lastDonationDate: existing?.lastDonationDate || "",
      availability: existing?.availability || "Available",
      medicalNotes: existing?.medicalNotes || "",
    },
  });

  const selectedState = watch("state");

  const onSubmit = (data: DonorProfileInput) => {
    saveDonorProfile({
      fullName: data.fullName.trim(),
      phone: data.phone.trim(),
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      state: data.state,
      city: data.city,
      bloodGroup: data.bloodGroup,
      weight: data.weight?.trim() || undefined,
      lastDonationDate: data.lastDonationDate || undefined,
      availability: data.availability,
      medicalNotes: data.medicalNotes?.trim() || undefined,
    });

    success(
      mode === "complete" ? "Profile Saved" : "Profile Updated",
      `Donor profile for ${data.fullName.trim()} has been saved successfully.`
    );

    navigate({ to: "/dashboard" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      {/* SECTION 1: Personal Information */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <User size={18} className="text-[#C8102E]" />
          <h2 className="text-lg font-bold text-slate-900 font-display">Personal Information</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Full Name <span className="text-[#C8102E]">*</span>
            </label>
            <input
              type="text"
              {...register("fullName")}
              placeholder="e.g. Rahul Sharma"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            />
            {errors.fullName && <p className="text-xs text-rose-600 mt-1">{errors.fullName.message}</p>}
          </div>

          {/* Email Address (Pre-filled & Read-only) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Email Address <span className="text-slate-400 font-normal">(Read-only)</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 text-slate-400" size={16} />
              <input
                type="email"
                value={userEmail}
                readOnly
                disabled
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 cursor-not-allowed select-none"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Bound to your active session credentials.</p>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Phone Number <span className="text-[#C8102E]">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3 text-slate-400" size={16} />
              <input
                type="tel"
                {...register("phone")}
                placeholder="e.g. +91 98765 43210"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
              />
            </div>
            {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone.message}</p>}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Date of Birth <span className="text-[#C8102E]">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-3 text-slate-400" size={16} />
              <input
                type="date"
                {...register("dateOfBirth")}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
              />
            </div>
            {errors.dateOfBirth && <p className="text-xs text-rose-600 mt-1">{errors.dateOfBirth.message}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Gender <span className="text-[#C8102E]">*</span>
            </label>
            <select
              {...register("gender")}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            {errors.gender && <p className="text-xs text-rose-600 mt-1">{errors.gender.message}</p>}
          </div>

          {/* State */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              State <span className="text-[#C8102E]">*</span>
            </label>
            <select
              {...register("state")}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            >
              {Object.keys(locations).map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
            {errors.state && <p className="text-xs text-rose-600 mt-1">{errors.state.message}</p>}
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              City <span className="text-[#C8102E]">*</span>
            </label>
            <select
              {...register("city")}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            >
              {(locations[selectedState] || ["Chennai"]).map((ct) => (
                <option key={ct} value={ct}>
                  {ct}
                </option>
              ))}
            </select>
            {errors.city && <p className="text-xs text-rose-600 mt-1">{errors.city.message}</p>}
          </div>
        </div>
      </div>

      {/* SECTION 2: Donation Information */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Droplet size={18} className="text-[#C8102E]" />
          <h2 className="text-lg font-bold text-slate-900 font-display">Donation Information</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Blood Group */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Blood Group <span className="text-[#C8102E]">*</span>
            </label>
            <select
              {...register("bloodGroup")}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            >
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
            {errors.bloodGroup && <p className="text-xs text-rose-600 mt-1">{errors.bloodGroup.message}</p>}
          </div>

          {/* Availability to Donate */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Availability to Donate <span className="text-[#C8102E]">*</span>
            </label>
            <select
              {...register("availability")}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            >
              <option value="Available">Available to Donate</option>
              <option value="Unavailable">Temporarily Unavailable</option>
              <option value="On Call">Emergency On-Call Only</option>
            </select>
            {errors.availability && <p className="text-xs text-rose-600 mt-1">{errors.availability.message}</p>}
          </div>

          {/* Weight (optional) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Body Weight (kg) <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              {...register("weight")}
              placeholder="e.g. 68"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            />
            <p className="text-[11px] text-slate-400 mt-1">WHO recommends weight &gt; 45–50 kg for whole blood donation.</p>
          </div>

          {/* Last Blood Donation Date (optional) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Last Blood Donation Date <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="date"
              {...register("lastDonationDate")}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            />
            <p className="text-[11px] text-slate-400 mt-1">Leave blank if this will be your first donation.</p>
          </div>

          {/* Medical or Eligibility Information (optional) */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Medical / Eligibility Notes <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <textarea
              {...register("medicalNotes")}
              rows={3}
              placeholder="Any relevant health details, dietary preferences, or donation center preferences..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
        {mode === "edit" ? (
          <Button
            type="button"
            variant="outline"
            asChild
            className="w-full sm:w-auto h-12 px-6 rounded-xl border-slate-300 text-slate-700 font-bold"
          >
            <Link to="/dashboard">Cancel</Link>
          </Button>
        ) : null}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto h-12 px-8 rounded-xl bg-gradient-to-r from-[#C8102E] to-[#8F1027] hover:from-[#A60D25] hover:to-[#730D20] text-white font-bold shadow-md text-sm"
        >
          {mode === "complete" ? "Save Profile & Open Dashboard" : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

// ────────────────────────────────────────────────────────────
// HOSPITAL STAFF FORM SECTION
// ────────────────────────────────────────────────────────────
function HospitalStaffFormSection({
  userEmail,
  existing,
  mode,
}: {
  userEmail: string;
  existing?: HospitalStaffProfile;
  mode: "complete" | "edit";
}) {
  const navigate = useNavigate();
  const { saveHospitalStaffProfile } = useAuth();
  const { success } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<HospitalStaffProfileInput>({
    resolver: zodResolver(hospitalStaffProfileSchema),
    defaultValues: {
      fullName: existing?.fullName || "",
      phone: existing?.phone || "",
      designation: existing?.designation || "",
      department: existing?.department || "Blood Transfusion Services",
      hospitalName: existing?.hospitalName || "",
      hospitalAddress: existing?.hospitalAddress || "",
      state: existing?.state || "Tamil Nadu",
      city: existing?.city || "Chennai",
      hospitalContact: existing?.hospitalContact || "",
    },
  });

  const selectedState = watch("state");

  const onSubmit = (data: HospitalStaffProfileInput) => {
    saveHospitalStaffProfile({
      fullName: data.fullName.trim(),
      phone: data.phone.trim(),
      designation: data.designation.trim(),
      department: data.department.trim(),
      hospitalName: data.hospitalName.trim(),
      hospitalAddress: data.hospitalAddress.trim(),
      state: data.state,
      city: data.city,
      hospitalContact: data.hospitalContact.trim(),
    });

    success(
      mode === "complete" ? "Profile Saved" : "Profile Updated",
      `Hospital staff profile for ${data.fullName.trim()} has been saved successfully.`
    );

    navigate({ to: "/dashboard" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      {/* SECTION 1: Staff Information */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <User size={18} className="text-[#C8102E]" />
          <h2 className="text-lg font-bold text-slate-900 font-display">Staff Information</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Full Name <span className="text-[#C8102E]">*</span>
            </label>
            <input
              type="text"
              {...register("fullName")}
              placeholder="e.g. Dr. Priya Nair"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            />
            {errors.fullName && <p className="text-xs text-rose-600 mt-1">{errors.fullName.message}</p>}
          </div>

          {/* Email Address (Pre-filled & Read-only) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Email Address <span className="text-slate-400 font-normal">(Read-only)</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 text-slate-400" size={16} />
              <input
                type="email"
                value={userEmail}
                readOnly
                disabled
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 cursor-not-allowed select-none"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Bound to your active session credentials.</p>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Phone Number <span className="text-[#C8102E]">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3 text-slate-400" size={16} />
              <input
                type="tel"
                {...register("phone")}
                placeholder="e.g. +91 98401 23456"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
              />
            </div>
            {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone.message}</p>}
          </div>

          {/* Designation */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Designation / Title <span className="text-[#C8102E]">*</span>
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3.5 top-3 text-slate-400" size={16} />
              <input
                type="text"
                {...register("designation")}
                placeholder="e.g. Transfusion Medical Officer / Coordinator"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
              />
            </div>
            {errors.designation && <p className="text-xs text-rose-600 mt-1">{errors.designation.message}</p>}
          </div>

          {/* Department */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Department <span className="text-[#C8102E]">*</span>
            </label>
            <input
              type="text"
              {...register("department")}
              placeholder="e.g. Blood Transfusion Services / ICU"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            />
            {errors.department && <p className="text-xs text-rose-600 mt-1">{errors.department.message}</p>}
          </div>
        </div>
      </div>

      {/* SECTION 2: Hospital Information */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Building2 size={18} className="text-[#C8102E]" />
          <h2 className="text-lg font-bold text-slate-900 font-display">Hospital Information</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Hospital Name */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Hospital / Institution Name <span className="text-[#C8102E]">*</span>
            </label>
            <input
              type="text"
              {...register("hospitalName")}
              placeholder="e.g. Apollo Speciality Hospital"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            />
            {errors.hospitalName && <p className="text-xs text-rose-600 mt-1">{errors.hospitalName.message}</p>}
          </div>

          {/* Hospital Address */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Hospital Address <span className="text-[#C8102E]">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3 text-slate-400" size={16} />
              <input
                type="text"
                {...register("hospitalAddress")}
                placeholder="e.g. 21 Greams Lane, Thousand Lights"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
              />
            </div>
            {errors.hospitalAddress && <p className="text-xs text-rose-600 mt-1">{errors.hospitalAddress.message}</p>}
          </div>

          {/* State */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              State <span className="text-[#C8102E]">*</span>
            </label>
            <select
              {...register("state")}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            >
              {Object.keys(locations).map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
            {errors.state && <p className="text-xs text-rose-600 mt-1">{errors.state.message}</p>}
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              City <span className="text-[#C8102E]">*</span>
            </label>
            <select
              {...register("city")}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            >
              {(locations[selectedState] || ["Chennai"]).map((ct) => (
                <option key={ct} value={ct}>
                  {ct}
                </option>
              ))}
            </select>
            {errors.city && <p className="text-xs text-rose-600 mt-1">{errors.city.message}</p>}
          </div>

          {/* Hospital Contact Number */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Hospital Desk / Emergency Contact <span className="text-[#C8102E]">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3 text-slate-400" size={16} />
              <input
                type="tel"
                {...register("hospitalContact")}
                placeholder="e.g. 044-28290200"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
              />
            </div>
            {errors.hospitalContact && <p className="text-xs text-rose-600 mt-1">{errors.hospitalContact.message}</p>}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
        {mode === "edit" ? (
          <Button
            type="button"
            variant="outline"
            asChild
            className="w-full sm:w-auto h-12 px-6 rounded-xl border-slate-300 text-slate-700 font-bold"
          >
            <Link to="/dashboard">Cancel</Link>
          </Button>
        ) : null}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto h-12 px-8 rounded-xl bg-gradient-to-r from-[#C8102E] to-[#8F1027] hover:from-[#A60D25] hover:to-[#730D20] text-white font-bold shadow-md text-sm"
        >
          {mode === "complete" ? "Save Profile & Open Dashboard" : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}


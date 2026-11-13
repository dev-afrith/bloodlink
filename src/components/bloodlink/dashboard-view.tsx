import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  User,
  Heart,
  Droplet,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Activity,
  AlertTriangle,
  ArrowRight,
  FileText,
  Search,
  ExternalLink,
  ChevronRight,
  LogOut,
  Sparkles,
  Edit,
  UserCheck,
  AlertCircle,
  Inbox,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useBloodRequests } from "@/context/blood-request-context";
import { BackToHome } from "./shared";

export function DashboardView() {
  const { user, isAuthenticated, logout, getDisplayName, getAvatarText } = useAuth();
  const { requests } = useBloodRequests();

  // 1. Unauthenticated State
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-slate-50/70">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/90 p-8 text-center shadow-lg space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-[#C8102E] flex items-center justify-center mx-auto shadow-inner">
            <User size={30} />
          </div>
          <div>
            <h2 className="text-2xl font-black font-display text-slate-900 tracking-tight">
              Sign In Required
            </h2>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Please sign in to access your customized role-based dashboard, view your genuine profile details, or manage requirements.
            </p>
          </div>
          <div className="pt-2">
            <Button
              asChild
              className="w-full bg-[#C8102E] hover:bg-[#8F1027] text-white font-bold h-11 rounded-xl shadow-md text-sm"
            >
              <Link to="/auth">Sign In to BloodLink</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Profile Incomplete State (Prompt mandatory profile setup)
  if (!user.profileCompleted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-slate-50/70">
        <div className="max-w-md w-full bg-white rounded-3xl border border-amber-200 p-8 text-center shadow-lg space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <UserCheck size={32} />
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              Action Required
            </span>
            <h2 className="text-2xl font-black font-display text-slate-900 tracking-tight mt-3">
              Complete Your Profile
            </h2>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              No genuine profile details exist for this session yet. BloodLink requires your real information before activating your dashboard.
            </p>
          </div>
          <div className="pt-2 space-y-2">
            <Button
              asChild
              className="w-full bg-[#C8102E] hover:bg-[#8F1027] text-white font-bold h-11 rounded-xl shadow-md text-sm"
            >
              <Link to="/complete-profile">
                Complete Profile Now <ArrowRight size={15} className="ml-1.5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={logout}
              className="w-full h-11 rounded-xl text-xs font-semibold text-slate-600"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const isHospitalStaff = user.role === "Hospital Staff";
  const donorProfile = user.donorProfile;
  const staffProfile = user.hospitalStaffProfile;
  const displayName = getDisplayName();
  const avatarText = getAvatarText();

  // Genuine submitted blood requests:
  // For hospital staff: filter by requests matching their hospital/city or submitted during this session.
  // For donor: match their genuine blood group if available.
  const allRequests = Object.values(requests);

  // Maximum 3 records displayed initially with "View All" if more exist
  const [showAllRequests, setShowAllRequests] = useState(false);
  const [showAllOpportunities, setShowAllOpportunities] = useState(false);

  // Hospital staff requests: genuine submitted requirements
  const staffRequests = isHospitalStaff
    ? allRequests.filter(
        (r) =>
          !staffProfile?.hospitalName ||
          r.hospitalName.toLowerCase().includes(staffProfile.hospitalName.toLowerCase()) ||
          r.city.toLowerCase() === (staffProfile.city || "").toLowerCase()
      )
    : [];
  const displayedStaffRequests = showAllRequests ? staffRequests : staffRequests.slice(0, 3);

  // Donor opportunities: genuine requests matching donor's exact blood group
  const donorOpportunities = !isHospitalStaff && donorProfile?.bloodGroup
    ? allRequests.filter((r) => r.bloodGroup === donorProfile.bloodGroup)
    : [];
  const displayedDonorOpportunities = showAllOpportunities ? donorOpportunities : donorOpportunities.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between">
          <BackToHome label="Back to Homepage" />
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="text-xs font-bold text-slate-700 hover:text-[#C8102E] hover:border-rose-300 border-slate-200 rounded-xl"
            >
              <Link to="/edit-profile">
                <Edit size={13} className="mr-1.5" /> Edit Profile
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200 rounded-xl"
            >
              <LogOut size={13} className="mr-1.5" /> Sign Out
            </Button>
          </div>
        </div>

        {/* User Hero Banner */}
        <div className="bg-gradient-to-br from-[#8F1027] via-[#C8102E] to-[#6E0B1D] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4 sm:gap-6">
              <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center font-extrabold text-2xl sm:text-3xl border border-white/25 shadow-lg shrink-0">
                {avatarText}
              </span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-white/20 border border-white/30 text-rose-100">
                    {user.role} Portal
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-300">
                    <ShieldCheck size={14} /> Genuine User Profile
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
                  {displayName}
                </h1>
                <p className="text-xs sm:text-sm text-rose-100/90 mt-1 flex items-center gap-2 flex-wrap">
                  <Mail size={13} className="shrink-0" />
                  <span>{user.email}</span>
                  {isHospitalStaff && staffProfile?.hospitalName && (
                    <>
                      <span>·</span>
                      <Building2 size={13} className="shrink-0" />
                      <span>{staffProfile.hospitalName} ({staffProfile.city})</span>
                    </>
                  )}
                  {!isHospitalStaff && donorProfile?.city && (
                    <>
                      <span>·</span>
                      <MapPin size={13} className="shrink-0" />
                      <span>{donorProfile.city}, {donorProfile.state}</span>
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
              {isHospitalStaff ? (
                <Button
                  asChild
                  className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm h-11 px-5 rounded-xl shadow-md"
                >
                  <Link to="/request-blood">
                    <Droplet size={15} className="text-[#C8102E] mr-1.5" />
                    Submit Blood Request
                  </Link>
                </Button>
              ) : (
                <Button
                  asChild
                  className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm h-11 px-5 rounded-xl shadow-md"
                >
                  <Link to="/request-blood" search={{ tab: "track" }}>
                    <Search size={15} className="text-[#C8102E] mr-1.5" />
                    Track Blood Requirement
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────────
            ROLE-BASED DASHBOARD CONTENT
            ──────────────────────────────────────────────────────────── */}
        {isHospitalStaff ? (
          /* ========================================================
             HOSPITAL STAFF DASHBOARD (Genuine Data Only)
             ======================================================== */
          <div className="space-y-8">
            
            {/* Quick Profile Overview Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Staff Officer</span>
                <p className="text-base font-bold text-slate-900 truncate">{staffProfile?.fullName || displayName}</p>
                <p className="text-xs text-slate-500 truncate">{staffProfile?.designation || "Transfusion Officer"}</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Hospital Unit</span>
                <p className="text-base font-bold text-slate-900 truncate">{staffProfile?.hospitalName || "Not specified"}</p>
                <p className="text-xs text-slate-500 truncate">{staffProfile?.department || "Blood Bank Department"}</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Active Requirements</span>
                <p className="text-3xl font-extrabold text-[#C8102E]">{staffRequests.length}</p>
                <p className="text-xs text-slate-500">Genuine requests recorded</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Official Contact</span>
                <p className="text-sm font-bold text-slate-900 truncate">{staffProfile?.phone || "Not set"}</p>
                <p className="text-xs text-slate-500 truncate">Desk: {staffProfile?.hospitalContact || "N/A"}</p>
              </div>
            </div>

            {/* Hospital Blood Requests Pipeline (Genuine Only) */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold font-display text-slate-900">Hospital Blood Requests</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live session requirements recorded for clinical review and blood bank dispatch.
                  </p>
                </div>
                <Button asChild size="sm" className="bg-[#C8102E] hover:bg-[#8F1027] text-white font-bold rounded-xl text-xs">
                  <Link to="/request-blood">
                    <Droplet size={13} className="mr-1" /> Create a Blood Request
                  </Link>
                </Button>
              </div>

              {staffRequests.length === 0 ? (
                /* Clean Empty State */
                <div className="p-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Inbox size={26} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-800">No records available yet.</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      There are currently zero blood requests submitted for your hospital in this session.
                    </p>
                  </div>
                  <Button asChild size="sm" className="bg-[#C8102E] hover:bg-[#8F1027] text-white font-bold rounded-xl text-xs">
                    <Link to="/request-blood">
                      <Droplet size={14} className="mr-1.5" />
                      Create a Blood Request
                    </Link>
                  </Button>
                </div>
              ) : (
                <>
                  <div className="divide-y divide-slate-100">
                    {displayedStaffRequests.map((req) => (
                      <div
                        key={req.referenceId}
                        className="p-5 sm:p-6 hover:bg-slate-50/60 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono font-extrabold text-sm text-[#C8102E] bg-rose-50 px-2.5 py-1 rounded-md border border-rose-100">
                              {req.referenceId}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                req.status === "Fulfilled"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : req.status === "Blood Bank Coordination"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {req.status}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                req.urgency === "Critical"
                                  ? "bg-rose-100 text-rose-700"
                                  : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {req.urgency}
                            </span>
                          </div>

                          <div className="text-sm font-bold text-slate-900">
                            Patient: {req.patientName} ({req.patientAge} yrs) · {req.units} units of {req.bloodGroup} {req.bloodComponent}
                          </div>

                          <div className="text-xs text-slate-500 flex items-center gap-3 flex-wrap">
                            <span>Hospital: {req.hospitalName} ({req.city}, {req.state})</span>
                            <span>·</span>
                            <span>Attendant: {req.attendantName} ({req.contactNumber})</span>
                            <span>·</span>
                            <span>Recorded: {req.submittedAt}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="text-xs font-semibold border-slate-200 hover:border-[#C8102E] rounded-xl"
                          >
                            <Link to="/request-blood" search={{ tab: "track", ref: req.referenceId }}>
                              <Search size={13} className="mr-1" /> Track Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {staffRequests.length > 3 && (
                    <div className="p-4 bg-slate-50/70 border-t border-slate-100 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAllRequests(!showAllRequests)}
                        className="text-xs font-bold text-[#C8102E] hover:bg-rose-50"
                      >
                        {showAllRequests ? "Show Less" : `View All (${staffRequests.length} Records)`}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Hospital & Staff Profile Details (Genuine Values Entered) */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 font-display">Staff &amp; Hospital Details</h3>
                <Button asChild variant="outline" size="sm" className="text-xs font-bold rounded-xl border-slate-200">
                  <Link to="/edit-profile">
                    <Edit size={12} className="mr-1" /> Edit Information
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block mb-1">Staff Officer</span>
                  <p className="font-bold text-slate-800 text-sm">{staffProfile?.fullName}</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block mb-1">Registered Email</span>
                  <p className="font-bold text-slate-800 text-sm truncate">{user.email}</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block mb-1">Personal Contact</span>
                  <p className="font-bold text-slate-800 text-sm">{staffProfile?.phone}</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block mb-1">Designation</span>
                  <p className="font-bold text-slate-800 text-sm">{staffProfile?.designation}</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block mb-1">Department</span>
                  <p className="font-bold text-slate-800 text-sm">{staffProfile?.department}</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block mb-1">Hospital Name</span>
                  <p className="font-bold text-slate-800 text-sm">{staffProfile?.hospitalName}</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 sm:col-span-2">
                  <span className="text-slate-400 block mb-1">Hospital Address</span>
                  <p className="font-bold text-slate-800 text-sm">{staffProfile?.hospitalAddress}, {staffProfile?.city}, {staffProfile?.state}</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block mb-1">Hospital Desk Contact</span>
                  <p className="font-bold text-slate-800 text-sm">{staffProfile?.hospitalContact}</p>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* ========================================================
             DONOR DASHBOARD (Genuine Data Only)
             ======================================================== */
          <div className="space-y-8">
            
            {/* Donor Overview Cards (Genuine Details) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Blood Group</span>
                <p className="text-3xl font-black text-[#C8102E]">{donorProfile?.bloodGroup || "—"}</p>
                <p className="text-xs text-slate-500">Verified donor blood type</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Availability Status</span>
                <div className="flex items-center gap-1.5 font-bold text-base pt-1 text-slate-900">
                  <CheckCircle2
                    size={18}
                    className={donorProfile?.availability === "Available" ? "text-emerald-600" : "text-amber-500"}
                  />
                  <span>{donorProfile?.availability || "Available"}</span>
                </div>
                <p className="text-xs text-slate-500">Ready for voluntary discovery</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Last Donation Date</span>
                <p className="text-lg font-bold text-slate-900 pt-1">
                  {donorProfile?.lastDonationDate || "First-time donor"}
                </p>
                <p className="text-xs text-slate-500">
                  {donorProfile?.lastDonationDate ? "Recorded interval" : "Ready for your first drop"}
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Body Weight</span>
                <p className="text-2xl font-extrabold text-slate-900">
                  {donorProfile?.weight ? `${donorProfile.weight} kg` : "Not specified"}
                </p>
                <p className="text-xs text-slate-500">WHO requirement &gt; 45–50 kg</p>
              </div>
            </div>

            {/* Donation Records: Genuine Records Only (Zero Fake Data) */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold font-display text-slate-900">Your Donation Records</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Verified clinical donation events associated with your BloodLink profile.
                  </p>
                </div>
                <Button asChild size="sm" variant="outline" className="text-xs font-bold rounded-xl border-slate-200">
                  <Link to="/#find-donors">Explore Donor Opportunities</Link>
                </Button>
              </div>

              {/* Clean Empty State: Never invent donation history */}
              <div className="p-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Inbox size={26} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">No records available yet.</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    You have not completed any in-app donation appointments in this session.
                  </p>
                </div>
                <Button asChild size="sm" className="bg-[#C8102E] hover:bg-[#8F1027] text-white font-bold rounded-xl text-xs">
                  <Link to="/#emergency-requests">
                    <Heart size={14} className="mr-1.5" />
                    Explore Donor Opportunities
                  </Link>
                </Button>
              </div>
            </div>

            {/* Blood Requests / Opportunities Matching Donor's Blood Group (Genuine Only) */}
            <div className="bg-gradient-to-br from-rose-50/70 to-slate-50 rounded-3xl border border-rose-200/80 p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-[#C8102E]" />
                    <h3 className="text-lg font-bold text-slate-900 font-display">
                      Blood Requests Matching Your Group ({donorProfile?.bloodGroup})
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Genuine clinical requirements requesting {donorProfile?.bloodGroup} blood components.
                  </p>
                </div>
                <Button asChild size="sm" className="bg-[#C8102E] hover:bg-[#8F1027] text-white font-bold rounded-xl text-xs">
                  <Link to="/#emergency-requests">
                    View All Emergency Requests
                  </Link>
                </Button>
              </div>

              {donorOpportunities.length === 0 ? (
                <div className="p-8 text-center bg-white/70 rounded-2xl border border-dashed border-rose-200 space-y-2">
                  <p className="text-xs font-bold text-slate-700">No records available yet.</p>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    No active emergency requirements currently match {donorProfile?.bloodGroup} blood in this session.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                    {displayedDonorOpportunities.map((req) => (
                      <div key={req.referenceId} className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-[#C8102E] bg-rose-50 px-2 py-0.5 rounded">
                            {req.referenceId}
                          </span>
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                              req.urgency === "Critical" ? "text-rose-700 bg-rose-50" : "text-amber-700 bg-amber-50"
                            }`}
                          >
                            {req.urgency} · {req.units} Units
                          </span>
                        </div>
                        <p className="font-bold text-sm text-slate-900 truncate">{req.hospitalName}</p>
                        <p className="text-xs text-slate-500 truncate">
                          {req.city}, {req.state} · {req.bloodComponent}
                        </p>
                        <Button asChild size="sm" variant="outline" className="w-full text-xs font-semibold border-rose-200 text-[#C8102E] hover:bg-rose-50 mt-1">
                          <Link to="/request-blood" search={{ tab: "track", ref: req.referenceId }}>
                            Respond to Request
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>

                  {donorOpportunities.length > 3 && (
                    <div className="pt-2 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAllOpportunities(!showAllOpportunities)}
                        className="text-xs font-bold text-[#C8102E] hover:bg-rose-50"
                      >
                        {showAllOpportunities ? "Show Less" : `View All (${donorOpportunities.length} Records)`}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Donor Profile Details Card (Genuine Values Entered) */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 font-display">Donor Profile Details</h3>
                <Button asChild variant="outline" size="sm" className="text-xs font-bold rounded-xl border-slate-200">
                  <Link to="/edit-profile">
                    <Edit size={12} className="mr-1" /> Edit Profile
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block mb-1">Full Name</span>
                  <p className="font-bold text-slate-800 text-sm">{donorProfile?.fullName}</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block mb-1">Registered Email</span>
                  <p className="font-bold text-slate-800 text-sm truncate">{user.email}</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block mb-1">Phone Number</span>
                  <p className="font-bold text-slate-800 text-sm">{donorProfile?.phone}</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block mb-1">Blood Group</span>
                  <p className="font-bold text-[#C8102E] text-sm">{donorProfile?.bloodGroup}</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block mb-1">Gender</span>
                  <p className="font-bold text-slate-800 text-sm">{donorProfile?.gender}</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block mb-1">Date of Birth</span>
                  <p className="font-bold text-slate-800 text-sm">{donorProfile?.dateOfBirth}</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block mb-1">Location</span>
                  <p className="font-bold text-slate-800 text-sm">{donorProfile?.city}, {donorProfile?.state}</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block mb-1">Availability</span>
                  <p className="font-bold text-slate-800 text-sm">{donorProfile?.availability}</p>
                </div>
              </div>

              {donorProfile?.medicalNotes && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <span className="text-slate-400 block mb-1">Medical / Eligibility Information</span>
                  <p className="font-medium text-slate-700 leading-relaxed">{donorProfile.medicalNotes}</p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

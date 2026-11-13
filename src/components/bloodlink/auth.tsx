import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, Heart, AlertCircle, CheckCircle2, User, LogOut, Building2, Droplet, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth, type UserRole } from "@/context/auth-context";
import { useToast } from "@/components/ui/toast-notification";

export function AuthPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, login, logout, getDisplayName } = useAuth();
  const { success } = useToast();

  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("Donor");
  const [resetSent, setResetSent] = useState(false);
  const [submittedError, setSubmittedError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedError("");

    if (!email || !email.includes("@")) {
      setSubmittedError("Please enter a valid email address.");
      return;
    }

    if (mode !== "forgot" && (!password || password.length < 6)) {
      setSubmittedError("Password must be at least 6 characters.");
      return;
    }

    if (mode === "forgot") {
      setResetSent(true);
      return;
    }

    // Authenticate demo session: checks if user has completed their profile
    const result = login(email, selectedRole);

    if (!result.user.profileCompleted) {
      // First login / incomplete profile: redirect to mandatory Complete Your Profile form
      success("Sign In Successful", "Please complete your mandatory profile details.");
      navigate({ to: "/complete-profile" });
    } else {
      // Profile already completed: redirect directly to dashboard
      success(`Welcome Back, ${getDisplayName()}`, `Signed in as ${selectedRole}.`);
      navigate({ to: "/dashboard" });
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 bg-gradient-to-b from-rose-50/40 via-white to-slate-50">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden">
        
        {/* Left Column: Visual Brand Experience */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#8F1027] via-[#C8102E] to-[#6E0B1D] text-white p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div>
            <div className="flex items-center gap-2.5 mb-8">
              <span className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Heart size={20} className="fill-white text-white" />
              </span>
              <span className="font-display font-extrabold text-2xl tracking-tight">BloodLink</span>
            </div>

            <span className="text-[11px] font-bold tracking-widest text-rose-200 uppercase mb-2 block">
              PORTAL ACCESS
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold font-display tracking-tight leading-tight mb-4">
              Genuine Healthcare Collaboration.
            </h2>
            <p className="text-rose-100/90 text-sm leading-relaxed mb-6">
              Connect directly with verified donors, hospital transfusion staff, and clinical coordinators with 100% genuine user-submitted records.
            </p>

            <div className="space-y-3 pt-4 border-t border-white/20 text-xs text-rose-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-300 shrink-0" />
                <span>Zero fabricated profiles or random records</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-300 shrink-0" />
                <span>Verified role-based portal for Donors &amp; Hospital Staff</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-300 shrink-0" />
                <span>User-driven profile and blood requirement management</span>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-white/20">
            <div className="flex items-center gap-2 text-xs text-rose-200">
              <ShieldCheck size={16} />
              <span>Verified Healthcare Partner Network</span>
            </div>
          </div>
        </div>

        {/* Right Column: Authentication Form / Active Session */}
        <div className="lg:col-span-7 p-8 lg:p-14 flex flex-col justify-center">
          {isAuthenticated && user ? (
            /* ── Authenticated User State ── */
            <div className="text-center space-y-6 py-8">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={42} />
              </div>
              <div>
                <h3 className="text-3xl font-black font-display text-slate-900 tracking-tight">
                  Welcome, {getDisplayName()}!
                </h3>
                <p className="text-sm text-slate-500 mt-2">
                  Session active · Role: <strong className="text-slate-800">{user.role}</strong>
                </p>
              </div>

              <div className="max-w-sm mx-auto p-5 bg-slate-50 border border-slate-200 rounded-2xl text-left space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C8102E] to-[#8F1027] text-white flex items-center justify-center font-bold text-base shadow-md">
                    <User size={22} />
                  </span>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{getDisplayName()}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-rose-100 text-[#C8102E] font-bold text-[10px] rounded-full">
                      {user.role}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                  <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                  <span>
                    {user.profileCompleted
                      ? "Profile completed & verified"
                      : "Profile details pending completion"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                {user.profileCompleted ? (
                  <Button
                    asChild
                    className="bg-gradient-to-r from-[#C8102E] to-[#8F1027] hover:from-[#A60D25] hover:to-[#730D20] text-white font-bold h-12 rounded-xl shadow-md px-6"
                  >
                    <Link to="/dashboard">
                      Go to My Dashboard <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    asChild
                    className="bg-gradient-to-r from-[#C8102E] to-[#8F1027] hover:from-[#A60D25] hover:to-[#730D20] text-white font-bold h-12 rounded-xl shadow-md px-6"
                  >
                    <Link to="/complete-profile">
                      <UserCheck size={16} className="mr-1.5" />
                      Complete Your Profile
                    </Link>
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="border-slate-300 font-semibold h-12 rounded-xl px-6 text-slate-700 hover:text-rose-600 hover:border-rose-300"
                  onClick={() => {
                    logout();
                    setEmail("");
                    setPassword("");
                    setMode("signin");
                  }}
                >
                  <LogOut size={15} className="mr-1" /> Sign Out
                </Button>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed max-w-md mx-auto">
                In-memory demonstration session active across all routes. Clears on page refresh.
              </p>
            </div>
          ) : (
            <>
              {/* Header Switcher */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-2xl font-black font-display text-slate-900 tracking-tight">
                    {mode === "signin"
                      ? "Sign In to BloodLink"
                      : mode === "signup"
                      ? "Create Portal Account"
                      : "Reset Password"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {mode === "signin"
                      ? "Enter your email and password to access your healthcare portal"
                      : mode === "signup"
                      ? "Register as a Donor or Hospital Staff"
                      : "Enter your registered email to receive a password reset link"}
                  </p>
                </div>
              </div>

              {/* Role Selector: ONLY Donor and Hospital Staff */}
              {mode !== "forgot" && (
                <div className="mb-6">
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                    Select Account Type
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setSelectedRole("Donor")}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
                        selectedRole === "Donor"
                          ? "bg-white text-slate-900 shadow-sm border border-slate-200/80"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Droplet size={14} className={selectedRole === "Donor" ? "text-[#C8102E]" : "text-slate-400"} />
                      <span>Donor</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole("Hospital Staff")}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
                        selectedRole === "Hospital Staff"
                          ? "bg-white text-slate-900 shadow-sm border border-slate-200/80"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Building2 size={14} className={selectedRole === "Hospital Staff" ? "text-[#C8102E]" : "text-slate-400"} />
                      <span>Hospital Staff</span>
                    </button>
                  </div>
                </div>
              )}

              {resetSent ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={28} />
                  </div>
                  <h4 className="font-bold text-slate-900 text-lg">Password Reset Request Queued</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If an account exists for <strong>{email}</strong>, password reset instructions will be delivered.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-2 text-xs font-semibold"
                    onClick={() => {
                      setResetSent(false);
                      setMode("signin");
                    }}
                  >
                    Return to Sign In
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {submittedError && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5 leading-relaxed">
                      <AlertCircle size={16} className="text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-semibold">Authentication Error:</strong>
                        <span>{submittedError}</span>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={
                          selectedRole === "Donor"
                            ? "donor@example.com or personal email"
                            : "staff@hospital.org"
                        }
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                      />
                    </div>
                  </div>

                  {mode !== "forgot" && (
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                          Password
                        </label>
                        {mode === "signin" && (
                          <button
                            type="button"
                            onClick={() => {
                              setMode("forgot");
                              setSubmittedError("");
                            }}
                            className="text-xs font-semibold text-[#C8102E] hover:underline"
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  )}

                  {mode === "signin" && (
                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={remember}
                          onChange={(e) => setRemember(e.target.checked)}
                          className="rounded border-slate-300 text-[#C8102E] focus:ring-[#C8102E]"
                        />
                        <span>Remember this session</span>
                      </label>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#C8102E] to-[#8F1027] hover:from-[#A60D25] hover:to-[#730D20] text-white font-bold h-12 rounded-xl shadow-md transition-all text-sm mt-2"
                  >
                    {mode === "signin" ? (
                      <>
                        Sign In as {selectedRole} <ArrowRight size={16} className="ml-1" />
                      </>
                    ) : mode === "signup" ? (
                      <>
                        Create {selectedRole} Account <ArrowRight size={16} className="ml-1" />
                      </>
                    ) : (
                      <>
                        Send Reset Link <ArrowRight size={16} className="ml-1" />
                      </>
                    )}
                  </Button>

                  {/* Mode Toggle footer */}
                  <div className="pt-4 text-center text-xs text-slate-500 border-t border-slate-100">
                    {mode === "signin" ? (
                      <p>
                        Don’t have an account yet?{" "}
                        <button
                          type="button"
                          onClick={() => {
                            setMode("signup");
                            setSubmittedError("");
                          }}
                          className="font-bold text-[#C8102E] hover:underline"
                        >
                          Register here
                        </button>
                      </p>
                    ) : (
                      <p>
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => {
                            setMode("signin");
                            setSubmittedError("");
                          }}
                          className="font-bold text-[#C8102E] hover:underline"
                        >
                          Sign In
                        </button>
                      </p>
                    )}
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

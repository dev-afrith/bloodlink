import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CheckCircle2,
  Heart,
  ArrowRight,
  ShieldCheck,
  LoaderCircle,
  Clock,
  Sparkles,
  Droplet,
  Users,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { bloodGroups, locations } from "@/data/demo";
import campaign from "@/assets/donor-campaign.jpg";
import { useToast } from "@/components/ui/toast-notification";
import { DemoNotice } from "./shared";

export const registrationSchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your full name."),
    email: z.string().email("Enter a valid email address."),
    mobile: z.string().regex(/^[6-9]\d{9}$/, "Enter a 10-digit Indian mobile number."),
    group: z.enum(bloodGroups, { errorMap: () => ({ message: "Choose a blood group." }) }),
    state: z.string().min(1, "Choose a state."),
    city: z.string().min(1, "Choose a city."),
    contact: z.enum(["Email", "Mobile"]),
    consent: z.boolean().refine((v) => v, "Please agree to the privacy notice."),
  })
  .refine((v) => locations[v.state]?.includes(v.city), {
    message: "Choose a city in your selected state.",
    path: ["city"],
  });

type Registration = z.infer<typeof registrationSchema>;

export function RegistrationForm() {
  const [submission, setSubmission] = useState<Registration | null>(null);
  const [busy, setBusy] = useState(false);
  const { success } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Registration>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { contact: "Email", consent: false },
  });

  const state = watch("state");

  const submit = (data: Registration) => {
    setBusy(true);
    setTimeout(() => {
      setSubmission(data);
      setBusy(false);
      success(
        "Registration Confirmed",
        `Thank you ${data.name}! You are registered as an active ${data.group} donor.`
      );
    }, 450);
  };

  return (
    <div className="registration-layout">
      <div className="registration-visual shadow-xl">
        <img
          src={campaign}
          loading="lazy"
          width={1024}
          height={1024}
          alt="A smiling healthcare professional assisting a voluntary donor at a bright clinic"
        />
        <div className="registration-message">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold mb-3 border border-white/20 shadow-sm">
            <Heart size={14} className="fill-white text-white animate-pulse" /> Voluntary Impact Network
          </div>
          <h3 className="font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight leading-tight">
            A little of you.
            <br />A lot of hope.
          </h3>
          <p className="text-white/90 text-sm max-w-sm mt-2 leading-relaxed">
            Join thousands of voluntary donors who show up when someone needs a miracle.
          </p>

          <div className="mt-5 pt-4 border-t border-white/20 grid grid-cols-2 gap-3 text-xs text-white/95 font-medium">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-rose-200" />
              <span>15 min donation</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplet size={16} className="text-rose-200" />
              <span>Saves up to 3 lives</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-rose-200" />
              <span>100% Sterile gear</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={16} className="text-rose-200" />
              <span>WHO Aligned</span>
            </div>
          </div>
        </div>
      </div>

      <div className="registration-form bg-white p-7 md:p-10 rounded-2xl border border-slate-200/90 shadow-xl">
        {submission ? (
          <div className="registration-success space-y-4" role="status">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
              <CheckCircle2 size={36} />
            </div>
            <span className="eyebrow !text-emerald-700">
              <span className="!bg-emerald-600" />
              VOLUNTARY DONOR REGISTERED
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-display">
              Thank You, {submission.name.split(" ")[0]}!
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Your voluntary commitment as a <strong>{submission.group}</strong> donor has been registered in our community database. You are helping build a safer, more connected healthcare community.
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs w-full">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Donor Name:</span>
                <strong className="text-slate-800">{submission.name}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Blood Group:</span>
                <span className="font-bold text-[#C8102E] bg-rose-50 px-2 py-0.5 rounded">
                  {submission.group}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Registered Location:</span>
                <strong className="text-slate-800">{submission.city}, {submission.state}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Preferred Channel:</span>
                <strong className="text-slate-800">{submission.contact}</strong>
              </div>
            </div>

            <Button
              className="bg-[#C8102E] hover:bg-[#8F1027] text-white font-semibold mt-2"
              onClick={() => {
                setSubmission(null);
                reset();
              }}
            >
              Register Another Volunteer <ArrowRight size={16} />
            </Button>
          </div>
        ) : (
          <>
            <span className="eyebrow">
              <span />
              BECOME A VOLUNTARY DONOR
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-display my-2">
              Your Blood.
              <br />
              Someone’s Second Chance.
            </h2>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Express your willingness to donate blood voluntarily. All registrations are handled with confidential care.
            </p>

            <form onSubmit={handleSubmit(submit)} noValidate className="space-y-4">
              <div className="form-grid">
                <label className="field">
                  <span>Full Name</span>
                  <input
                    aria-label="Full Name"
                    aria-invalid={!!errors.name}
                    placeholder="e.g. Rahul Sharma"
                    {...register("name")}
                    autoComplete="name"
                  />
                  {errors.name && <small className="field-error text-xs text-[#C8102E] font-medium mt-1">{errors.name.message}</small>}
                </label>

                <label className="field">
                  <span>Email Address</span>
                  <input
                    type="email"
                    aria-label="Email Address"
                    aria-invalid={!!errors.email}
                    placeholder="you@example.com"
                    {...register("email")}
                    autoComplete="email"
                  />
                  {errors.email && <small className="field-error text-xs text-[#C8102E] font-medium mt-1">{errors.email.message}</small>}
                </label>

                <label className="field">
                  <span>Mobile Number (India)</span>
                  <input
                    placeholder="10-digit mobile number"
                    aria-label="Mobile Number"
                    aria-invalid={!!errors.mobile}
                    inputMode="tel"
                    {...register("mobile")}
                    autoComplete="tel"
                  />
                  {errors.mobile && <small className="field-error text-xs text-[#C8102E] font-medium mt-1">{errors.mobile.message}</small>}
                </label>

                <label className="field">
                  <span>Blood Group</span>
                  <select aria-label="Blood Group" aria-invalid={!!errors.group} {...register("group")}>
                    <option value="">Select blood group</option>
                    {bloodGroups.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  {errors.group && <small className="field-error text-xs text-[#C8102E] font-medium mt-1">{errors.group.message}</small>}
                </label>

                <label className="field">
                  <span>State</span>
                  <select
                    aria-label="State"
                    aria-invalid={!!errors.state}
                    {...register("state", { onChange: () => setValue("city", "") })}
                  >
                    <option value="">Select state</option>
                    {Object.keys(locations).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.state && <small className="field-error text-xs text-[#C8102E] font-medium mt-1">{errors.state.message}</small>}
                </label>

                <label className="field">
                  <span>City</span>
                  <select aria-label="City" aria-invalid={!!errors.city} {...register("city")}>
                    <option value="">Select city</option>
                    {locations[state]?.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.city && <small className="field-error text-xs text-[#C8102E] font-medium mt-1">{errors.city.message}</small>}
                </label>

                <label className="field form-full">
                  <span>Preferred Contact Method</span>
                  <select {...register("contact")}>
                    <option value="Email">Email</option>
                    <option value="Mobile">Mobile</option>
                  </select>
                </label>
              </div>

              <label className="consent flex items-start gap-2.5 pt-2 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-0.5 rounded border-slate-300 text-[#C8102E] focus:ring-[#C8102E]"
                  {...register("consent")}
                />
                <span>
                  I agree to the privacy notice and understand that BloodLink facilitates voluntary donor discovery. Actual eligibility is assessed at authorized donation centers.
                </span>
              </label>
              {errors.consent && (
                <small className="field-error block text-xs text-[#C8102E] font-medium">
                  {errors.consent.message}
                </small>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={busy}
                className="registration-submit w-full bg-[#C8102E] hover:bg-[#8F1027] text-white font-semibold py-3 shadow-md hover:shadow-lg transition-all rounded-xl"
              >
                {busy ? (
                  <>
                    <LoaderCircle className="animate-spin mr-2" size={18} />
                    Processing Registration…
                  </>
                ) : (
                  <>
                    <Heart className="mr-2 fill-current" size={18} />
                    Join the Voluntary Donor Community
                    <ArrowRight className="ml-2" size={18} />
                  </>
                )}
              </Button>

              <div className="privacy-line text-xs text-slate-500 flex items-center justify-center gap-1.5 pt-2">
                <ShieldCheck size={15} className="text-emerald-600" />
                <span>Your contact details are encrypted and never sold or spammed.</span>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

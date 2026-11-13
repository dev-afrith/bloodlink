import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Heart, ArrowRight, ShieldCheck, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bloodGroups, locations } from "@/data/demo";
import campaign from "@/assets/donor-campaign.jpg";
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
  const {
    register,
    handleSubmit,
    watch,
    setValue,
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
    }, 600);
  };
  return (
    <div className="registration-layout">
      <div className="registration-visual">
        <img
          src={campaign}
          loading="lazy"
          width={1024}
          height={1024}
          alt="A smiling volunteer at a bright blood donation clinic"
        />
        <div className="registration-message">
          <Heart />
          <h3>
            A little of you.
            <br />A lot of hope.
          </h3>
          <p>Join a community built on kindness.</p>
        </div>
      </div>
      <div className="registration-form">
        {submission ? (
          <div className="registration-success" role="status">
            <CheckCircle2 />
            <span className="eyebrow">THANK YOU FOR YOUR KINDNESS</span>
            <h2>
              You’re part of the story,
              <br />
              {submission.name.split(" ")[0]}.
            </h2>
            <p>
              Your demonstration submission is saved only while this page is open. No account was
              created, no message was sent and no medical eligibility was certified.
            </p>
            <Button onClick={() => setSubmission(null)}>
              Back to Registration <ArrowRight />
            </Button>
          </div>
        ) : (
          <>
            <span className="eyebrow">
              <span />
              BECOME A VOLUNTARY DONOR
            </span>
            <h2>
              Your Blood.
              <br />
              Someone’s Second Chance.
            </h2>
            <p>One small act can create a lasting impact.</p>
            <form onSubmit={handleSubmit(submit)} noValidate>
              <div className="form-grid">
                <label className="field">
                  <span>Full Name</span>
                  <input aria-label="Full Name" aria-invalid={!!errors.name} placeholder="Your full name" {...register("name")} autoComplete="name" />
                  {errors.name && <small className="field-error">{errors.name.message}</small>}
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
                  {errors.email && <small className="field-error">{errors.email.message}</small>}
                </label>
                <label className="field">
                  <span>Mobile Number</span>
                  <input
                    placeholder="10-digit mobile number"
                    aria-label="Mobile Number"
                    aria-invalid={!!errors.mobile}
                    inputMode="tel"
                    {...register("mobile")}
                    autoComplete="tel"
                  />
                  {errors.mobile && <small className="field-error">{errors.mobile.message}</small>}
                </label>
                <label className="field">
                  <span>Blood Group</span>
                  <select aria-label="Blood Group" aria-invalid={!!errors.group} {...register("group")}>
                    <option value="">Select blood group</option>
                    {bloodGroups.map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                  {errors.group && <small className="field-error">{errors.group.message}</small>}
                </label>
                <label className="field">
                  <span>State</span>
                  <select aria-label="State" aria-invalid={!!errors.state} {...register("state", { onChange: () => setValue("city", "") })}>
                    <option value="">Select state</option>
                    {Object.keys(locations).map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  {errors.state && <small className="field-error">{errors.state.message}</small>}
                </label>
                <label className="field">
                  <span>City</span>
                  <select aria-label="City" aria-invalid={!!errors.city} {...register("city")}>
                    <option value="">Select city</option>
                    {locations[state]?.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  {errors.city && <small className="field-error">{errors.city.message}</small>}
                </label>
                <label className="field form-full">
                  <span>Preferred Contact Method</span>
                  <select {...register("contact")}>
                    <option>Email</option>
                    <option>Mobile</option>
                  </select>
                </label>
              </div>
              <label className="consent">
                <input type="checkbox" {...register("consent")} />
                <span>
                  I understand this is a demo and consent to temporary use of my submission on this
                  page. Please use fictional details.
                </span>
              </label>
              {errors.consent && <small className="field-error">{errors.consent.message}</small>}
              <Button type="submit" size="lg" disabled={busy} className="registration-submit">
                {busy ? <LoaderCircle className="animate-spin" /> : <Heart />}
                {busy ? "Saving demo submission…" : "Join the Donor Community"}
                <ArrowRight />
              </Button>
              <div className="privacy-line">
                <ShieldCheck size={14} />
                Your kindness matters. Your privacy does too.
              </div>
            </form>
          </>
        )}
        <DemoNotice>
          Prototype only. Eligibility is assessed by qualified medical personnel under local
          guidelines.
        </DemoNotice>
      </div>
    </div>
  );
}

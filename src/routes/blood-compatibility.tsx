import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, FinalCTA, DemoNotice } from "@/components/bloodlink/shared";
import { InteractiveCompatibilityDiagram, BloodGroupDistribution } from "@/components/bloodlink/charts";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Droplet, Heart, CheckCircle2, ShieldCheck, ArrowRight, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/blood-compatibility")({
  head: () => ({
    meta: [
      { title: "Blood Compatibility & Transfusion Matrix | BloodLink" },
      {
        name: "description",
        content:
          "Comprehensive ABO/Rh blood transfusion compatibility guide. Understand red cell and plasma donor-recipient relationships.",
      },
    ],
  }),
  component: BloodCompatibilityPage,
});

function BloodCompatibilityPage() {
  return (
    <>
      <PageIntro
        eyebrow="TRANSFUSION SCIENCE"
        title="Blood Compatibility Matrix."
        description="Understanding ABO and Rh factor compatibility is foundational to transfusion medicine. Review verified clinical matching guidelines below."
      />

      <section className="section bg-[#EFF6FF] border-t border-[#DBEAFE] py-16">
        <div className="container space-y-12">
          {/* Interactive Transfusion Tool */}
          <InteractiveCompatibilityDiagram />

          {/* Educational Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="p-8 bg-white border border-[#DBEAFE] rounded-3xl shadow-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C8102E] bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                RED BLOOD CELL COMPATIBILITY
              </span>
              <h3 className="text-2xl font-bold font-display text-[#1E293B]">
                Universal Red Cell Donor: O Negative
              </h3>
              <p className="text-sm md:text-base text-[#64748B] leading-relaxed">
                Individuals with <strong>O Negative (O-)</strong> blood have no A, B, or Rh antigens on their red blood cells. In acute emergencies when cross-matching cannot wait, O- red cells can be safely administered to any patient regardless of their blood group.
              </p>
              <div className="pt-2">
                <Button asChild variant="outline" className="border-[#DBEAFE] text-[#1E293B] hover:text-[#2563EB] hover:border-[#BFDBFE] rounded-xl bg-white shadow-xs">
                  <Link to="/find-donors" search={{ group: "O-" }}>
                    Search O- Donors <ArrowUpRight size={15} className="ml-1" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="p-8 bg-white border border-[#DBEAFE] rounded-3xl shadow-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-3 py-1 rounded-full border border-[#BFDBFE]">
                PLASMA COMPATIBILITY
              </span>
              <h3 className="text-2xl font-bold font-display text-[#1E293B]">
                Universal Plasma Donor: AB Positive
              </h3>
              <p className="text-sm md:text-base text-[#64748B] leading-relaxed">
                In contrast to red cells, <strong>AB Positive (AB+)</strong> plasma contains neither anti-A nor anti-B antibodies. This makes AB plasma universally compatible for trauma and burn victims across all 8 blood groups.
              </p>
              <div className="pt-2">
                <Button asChild variant="outline" className="border-[#DBEAFE] text-[#1E293B] hover:text-[#2563EB] hover:border-[#BFDBFE] rounded-xl bg-white shadow-xs">
                  <Link to="/find-donors" search={{ group: "AB+" }}>
                    Search AB+ Donors <ArrowUpRight size={15} className="ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Need Blood Callout */}
          <div className="p-6 bg-gradient-to-r from-rose-50 via-white to-rose-50 border border-rose-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C8102E] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Droplet size={18} className="fill-white" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">Need Blood for a Hospital Procedure?</h4>
                <p className="text-xs text-slate-600">Submit a verified requirement to find compatible voluntary donors and blood banks.</p>
              </div>
            </div>
            <Button asChild className="bg-[#C8102E] hover:bg-[#8F1027] text-white font-semibold rounded-xl text-xs sm:text-sm px-4 py-2 shrink-0 shadow-sm">
              <Link to="/request-blood">
                <span>Request Blood Now</span>
                <ArrowRight size={14} className="ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}


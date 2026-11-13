import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, FinalCTA, DemoNotice } from "@/components/bloodlink/shared";
import { BloodGroupDistribution } from "@/components/bloodlink/charts";
import { bloodGroups } from "@/data/demo";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Droplet, Heart, Users, ArrowUpRight, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blood-groups")({
  head: () => ({
    meta: [
      { title: "The 8 Blood Groups & Antigens | BloodLink" },
      {
        name: "description",
        content:
          "Explore the eight major human blood groups: O-, O+, A-, A+, B-, B+, AB-, AB+. Learn about prevalence, universal traits, and donation needs.",
      },
    ],
  }),
  component: BloodGroupsPage,
});

const groupDetails = [
  { group: "O-", role: "Universal Red Cell Donor", prevalence: "7% of donors", need: "Critical in trauma surgery; can give red cells to all groups.", bg: "from-rose-50 to-white" },
  { group: "O+", role: "High Emergency Need", prevalence: "31% of donors", need: "Most common blood type; vital for daily hospital emergency reserves.", bg: "from-slate-50 to-white" },
  { group: "A+", role: "High Community Demand", prevalence: "22% of donors", need: "High requirement for platelets and whole blood in oncology treatments.", bg: "from-slate-50 to-white" },
  { group: "A-", role: "Rare & Critical", prevalence: "5% of donors", need: "Vital for Rh-negative scheduled surgeries and preventing sensitization.", bg: "from-rose-50 to-white" },
  { group: "B+", role: "High Community Need", prevalence: "26% of donors", need: "Prevalent across India with high daily transfusion requirements.", bg: "from-slate-50 to-white" },
  { group: "B-", role: "Rare & Critical", prevalence: "4% of donors", need: "Rare Rh-negative profile; essential for safe cross-matched reserves.", bg: "from-rose-50 to-white" },
  { group: "AB+", role: "Universal Plasma Donor", prevalence: "11% of donors", need: "Universal red cell recipient and universal plasma donor for burn care.", bg: "from-amber-50 to-white" },
  { group: "AB-", role: "Rarest Blood Type", prevalence: "3% of donors", need: "Rarest global blood type; vital to maintain targeted rare donor lists.", bg: "from-rose-50 to-white" },
];

function BloodGroupsPage() {
  return (
    <>
      <PageIntro
        eyebrow="ABO & Rh SYSTEM"
        title="The Eight Major Blood Groups."
        description="Every blood type possesses distinct antigen profiles that dictate transfusion compatibility and clinical need. Explore each group below."
      />

      <section className="section bg-white">
        <div className="container space-y-12">
          {/* Demographic Distribution */}
          <BloodGroupDistribution />

          {/* 8 Detailed Cards Grid */}
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold font-display text-slate-900 mb-6">
              Clinical Profile of Each Blood Group
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {groupDetails.map((item) => (
                <div key={item.group} className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-rose-300 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-14 h-14 rounded-2xl bg-rose-50 text-[#C8102E] font-black text-2xl flex items-center justify-center border border-rose-100">
                        {item.group}
                      </span>
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                        {item.prevalence}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold font-display text-slate-900 mb-1">
                      {item.role}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">
                      {item.need}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <Button asChild variant="ghost" size="sm" className="w-full text-[#C8102E] hover:text-[#8F1027] hover:bg-rose-50 font-semibold justify-between">
                      <Link to="/find-donors" search={{ group: item.group }}>
                        <span>Find {item.group} Donors</span>
                        <ArrowRight size={14} />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Need Blood Callout */}
            <div className="mt-12 p-6 bg-gradient-to-r from-rose-50 via-white to-rose-50 border border-rose-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C8102E] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Droplet size={18} className="fill-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">Require Blood for a Hospital Patient?</h4>
                  <p className="text-xs text-slate-600">Broadcast an immediate or planned requirement across all 8 blood groups.</p>
                </div>
              </div>
              <Button asChild className="bg-[#C8102E] hover:bg-[#8F1027] text-white font-semibold rounded-xl text-xs sm:text-sm px-4 py-2 shrink-0 shadow-sm">
                <Link to="/request-blood">
                  <span>Submit Blood Request</span>
                  <ArrowRight size={14} className="ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}


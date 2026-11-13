import { describe, it, expect } from "vitest";
import { bloodGroups, filterDonors } from "@/data/demo";
import { registrationSchema } from "@/components/bloodlink/registration";
describe("BloodLink demonstration rules", () => {
  it("provides all eight requested blood groups", () =>
    expect([...bloodGroups]).toEqual(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]));
  it("preselected blood group filters concrete donor records", () =>
    expect(filterDonors({ group: "O+" }).map((d) => d.name)).toEqual(["Arjun Raman", "Dev Anand"]));
  it("search combines group, state, city, area and demonstration status", () =>
    expect(
      filterDonors({
        group: "O+",
        state: "Tamil Nadu",
        city: "Chennai",
        location: "adyar",
        availability: "available",
      }).map((d) => d.id),
    ).toEqual([1]));
  it("returns no results for an unmatched location", () =>
    expect(filterDonors({ location: "unknown district" })).toEqual([]));
  const valid = {
    name: "Demo Donor",
    email: "demo@example.com",
    mobile: "9876543210",
    group: "O+",
    state: "Tamil Nadu",
    city: "Chennai",
    contact: "Email",
    consent: true,
  };
  it("requires explicit privacy consent", () =>
    expect(registrationSchema.safeParse({ ...valid, consent: false }).success).toBe(false));
  it("accepts a valid demonstration registration", () =>
    expect(registrationSchema.safeParse(valid).success).toBe(true));
  it("rejects a city outside the selected state", () =>
    expect(registrationSchema.safeParse({ ...valid, city: "Mumbai" }).success).toBe(false));
  it("requires a full name and valid email and mobile number", () => {
    for (const field of ["name", "email", "mobile"])
      expect(registrationSchema.safeParse({ ...valid, [field]: "" }).success).toBe(false);
  });
});

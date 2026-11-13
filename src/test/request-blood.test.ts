import { describe, it, expect } from "vitest";
import { bloodRequestSchema, bloodComponents, urgencyLevels } from "@/components/bloodlink/request-blood-form";
import { bloodGroups } from "@/data/demo";

describe("Request Blood Feature Validation", () => {
  const validRequest = {
    patientName: "Karthik Subramanian",
    patientAge: "45",
    patientGender: "Male" as const,
    contactNumber: "9840123456",
    attendantName: "Meena Subramanian",
    bloodGroup: "O+" as const,
    units: "2",
    bloodComponent: "Packed Red Blood Cells (PRBC)" as const,
    urgency: "Urgent" as const,
    requiredDate: "2026-11-20",
    requiredTime: "11:30",
    hospitalName: "Apollo Main Hospital",
    hospitalAddress: "Greams Road, Thousand Lights",
    state: "Tamil Nadu",
    city: "Chennai",
    hospitalContact: "04428290200",
    ward: "ICU Bed 8",
    additionalNotes: "Pre-operative cross-match required.",
    consent: true,
    confirmation: true,
  };

  it("accepts a completely valid blood request", () => {
    const result = bloodRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
  });

  it("validates all eight blood groups", () => {
    for (const group of bloodGroups) {
      const result = bloodRequestSchema.safeParse({ ...validRequest, bloodGroup: group });
      expect(result.success).toBe(true);
    }
  });

  it("rejects an invalid blood group", () => {
    const result = bloodRequestSchema.safeParse({ ...validRequest, bloodGroup: "C+" as any });
    expect(result.success).toBe(false);
  });

  it("validates all four component types", () => {
    for (const comp of bloodComponents) {
      const result = bloodRequestSchema.safeParse({ ...validRequest, bloodComponent: comp });
      expect(result.success).toBe(true);
    }
  });

  it("validates all three urgency levels", () => {
    for (const lvl of urgencyLevels) {
      const result = bloodRequestSchema.safeParse({ ...validRequest, urgency: lvl.id });
      expect(result.success).toBe(true);
    }
  });

  it("requires a 10-digit Indian mobile number", () => {
    // Valid numbers
    expect(bloodRequestSchema.safeParse({ ...validRequest, contactNumber: "9876543210" }).success).toBe(true);
    expect(bloodRequestSchema.safeParse({ ...validRequest, contactNumber: "8123456789" }).success).toBe(true);
    expect(bloodRequestSchema.safeParse({ ...validRequest, contactNumber: "7012345678" }).success).toBe(true);
    expect(bloodRequestSchema.safeParse({ ...validRequest, contactNumber: "6380123456" }).success).toBe(true);

    // Invalid numbers
    expect(bloodRequestSchema.safeParse({ ...validRequest, contactNumber: "12345" }).success).toBe(false);
    expect(bloodRequestSchema.safeParse({ ...validRequest, contactNumber: "5123456789" }).success).toBe(false); // starts with 5
    expect(bloodRequestSchema.safeParse({ ...validRequest, contactNumber: "98765432100" }).success).toBe(false); // 11 digits
    expect(bloodRequestSchema.safeParse({ ...validRequest, contactNumber: "abcd123456" }).success).toBe(false);
  });

  it("validates patient age between 1 and 120", () => {
    expect(bloodRequestSchema.safeParse({ ...validRequest, patientAge: "1" }).success).toBe(true);
    expect(bloodRequestSchema.safeParse({ ...validRequest, patientAge: "120" }).success).toBe(true);
    expect(bloodRequestSchema.safeParse({ ...validRequest, patientAge: "0" }).success).toBe(false);
    expect(bloodRequestSchema.safeParse({ ...validRequest, patientAge: "150" }).success).toBe(false);
    expect(bloodRequestSchema.safeParse({ ...validRequest, patientAge: "invalid" }).success).toBe(false);
  });

  it("validates required units between 1 and 20", () => {
    expect(bloodRequestSchema.safeParse({ ...validRequest, units: "1" }).success).toBe(true);
    expect(bloodRequestSchema.safeParse({ ...validRequest, units: "20" }).success).toBe(true);
    expect(bloodRequestSchema.safeParse({ ...validRequest, units: "0" }).success).toBe(false);
    expect(bloodRequestSchema.safeParse({ ...validRequest, units: "25" }).success).toBe(false);
  });

  it("requires mandatory consent and confirmation checkboxes", () => {
    expect(bloodRequestSchema.safeParse({ ...validRequest, consent: false }).success).toBe(false);
    expect(bloodRequestSchema.safeParse({ ...validRequest, confirmation: false }).success).toBe(false);
  });

  it("enforces city matches selected state", () => {
    expect(bloodRequestSchema.safeParse({ ...validRequest, state: "Tamil Nadu", city: "Chennai" }).success).toBe(true);
    expect(bloodRequestSchema.safeParse({ ...validRequest, state: "Tamil Nadu", city: "Bengaluru" }).success).toBe(false);
  });
});

import { renderHook, act } from "@testing-library/react";
import React from "react";
import { BloodRequestProvider, useBloodRequests } from "@/context/blood-request-context";

describe("Shared In-Memory Blood Request Storage", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    React.createElement(BloodRequestProvider, null, children)
  );

  const sampleInput = {
    patientName: "Deepak Verma",
    patientAge: "38",
    patientGender: "Male" as const,
    contactNumber: "9876543210",
    attendantName: "Pooja Verma",
    bloodGroup: "AB+",
    units: "2",
    bloodComponent: "Platelets (RDP / SDP)",
    urgency: "Urgent" as const,
    requiredDate: "2026-11-25",
    requiredTime: "15:00",
    hospitalName: "Fortis Malar Hospital",
    hospitalAddress: "Gandhi Nagar, Adyar",
    state: "Tamil Nadu",
    city: "Chennai",
    hospitalContact: "04442892222",
    ward: "Daycare 3",
    additionalNotes: "Apheresis platelets",
    consent: true,
    confirmation: true,
  };

  it("provides baseline sample records in shared in-memory state", () => {
    const { result } = renderHook(() => useBloodRequests(), { wrapper });

    expect(result.current.findRequest("REQ-2026-4102")).toBeDefined();
    expect(result.current.findRequest("REQ-2026-4102")?.patientName).toBe("Siddharth Rao");
    expect(result.current.findRequest("REQ-2026-8841")).toBeDefined();
    expect(result.current.findRequest("REQ-2026-8841")?.patientName).toBe("Ayesha Banu");
  });

  it("stores a submitted blood request with unique Reference ID and retrieves it across operations", () => {
    const { result } = renderHook(() => useBloodRequests(), { wrapper });

    let submittedRefId = "";

    act(() => {
      const submitted = result.current.submitRequest(sampleInput);
      submittedRefId = submitted.referenceId;
      expect(submitted.referenceId).toMatch(/^REQ-2026-\d{4}$/);
      expect(submitted.patientName).toBe("Deepak Verma");
      expect(submitted.status).toBe("Submitted");
    });

    // Verify it is found in shared state
    const retrieved = result.current.findRequest(submittedRefId);
    expect(retrieved).toBeDefined();
    expect(retrieved?.referenceId).toBe(submittedRefId);
    expect(retrieved?.patientName).toBe("Deepak Verma");
    expect(retrieved?.hospitalName).toBe("Fortis Malar Hospital");

    // Case-insensitive and trimmed lookup
    const lowercaseRetrieved = result.current.findRequest(`  ${submittedRefId.toLowerCase()}  `);
    expect(lowercaseRetrieved).toBeDefined();
    expect(lowercaseRetrieved?.referenceId).toBe(submittedRefId);
  });

  it("returns undefined when searching for an unknown Reference ID", () => {
    const { result } = renderHook(() => useBloodRequests(), { wrapper });

    expect(result.current.findRequest("REQ-UNKNOWN-9999")).toBeUndefined();
    expect(result.current.findRequest("")).toBeUndefined();
  });
});


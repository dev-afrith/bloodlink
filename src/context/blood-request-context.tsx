import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type BloodComponent =
  | "Whole Blood"
  | "Packed Red Blood Cells (PRBC)"
  | "Platelets (RDP / SDP)"
  | "Fresh Frozen Plasma (FFP)";

export type UrgencyLevel = "Critical" | "Urgent" | "Planned";

export type RequestStatus =
  | "Submitted"
  | "Under Review"
  | "Blood Bank Coordination"
  | "Fulfilled"
  | "Closed";

export interface SubmittedBloodRequest {
  referenceId: string;
  submittedAt: string;
  status: RequestStatus;
  patientName: string;
  patientAge: string;
  patientGender?: "Male" | "Female" | "Other" | "Prefer not to say" | "";
  contactNumber: string;
  attendantName: string;
  bloodGroup: string;
  units: string;
  bloodComponent: string;
  urgency: UrgencyLevel;
  requiredDate: string;
  requiredTime: string;
  hospitalName: string;
  hospitalAddress: string;
  state: string;
  city: string;
  hospitalContact: string;
  ward?: string;
  additionalNotes?: string;
  consent: boolean;
  confirmation: boolean;
}

// Initial baseline in-memory records available for testing and demonstration
const INITIAL_REQUESTS: Record<string, SubmittedBloodRequest> = {
  "REQ-2026-4102": {
    referenceId: "REQ-2026-4102",
    submittedAt: "Today, 10:45 AM",
    status: "Under Review",
    patientName: "Siddharth Rao",
    patientAge: "42",
    patientGender: "Male",
    contactNumber: "9840123456",
    attendantName: "Kavitha Rao",
    bloodGroup: "O-",
    units: "3",
    bloodComponent: "Packed Red Blood Cells (PRBC)",
    urgency: "Critical",
    requiredDate: "2026-11-14",
    requiredTime: "14:00",
    hospitalName: "Apollo Hospitals (Main Block)",
    hospitalAddress: "21 Greams Lane, Thousand Lights",
    city: "Chennai",
    state: "Tamil Nadu",
    hospitalContact: "04428290200",
    ward: "ICU Bed 12",
    additionalNotes: "Emergency surgical cross-match required.",
    consent: true,
    confirmation: true,
  },
  "REQ-2026-8841": {
    referenceId: "REQ-2026-8841",
    submittedAt: "Yesterday, 04:20 PM",
    status: "Blood Bank Coordination",
    patientName: "Ayesha Banu",
    patientAge: "29",
    patientGender: "Female",
    contactNumber: "9880198765",
    attendantName: "Tariq Banu",
    bloodGroup: "B+",
    units: "2",
    bloodComponent: "Platelets (RDP / SDP)",
    urgency: "Urgent",
    requiredDate: "2026-11-15",
    requiredTime: "11:30",
    hospitalName: "Manipal Hospital",
    hospitalAddress: "98 HAL Old Airport Rd",
    city: "Bengaluru",
    state: "Karnataka",
    hospitalContact: "08025024444",
    ward: "Oncology Day Care",
    additionalNotes: "Single donor apheresis preferred.",
    consent: true,
    confirmation: true,
  },
};

interface BloodRequestContextValue {
  // All active in-memory requests
  requests: Record<string, SubmittedBloodRequest>;
  // Store newly submitted request and return the record with its generated Reference ID
  submitRequest: (data: Omit<SubmittedBloodRequest, "referenceId" | "submittedAt" | "status">) => SubmittedBloodRequest;
  // Look up request by reference ID (case-insensitive & trimmed)
  findRequest: (referenceId: string) => SubmittedBloodRequest | undefined;
  // Latest submitted request view in current session
  latestSubmittedRequest: SubmittedBloodRequest | null;
  setLatestSubmittedRequest: (request: SubmittedBloodRequest | null) => void;
  clearLatestSubmitted: () => void;
  // Shared active tab state ("form" | "track")
  activeTab: "form" | "track";
  setActiveTab: (tab: "form" | "track") => void;
  // Tracking query and results
  trackQuery: string;
  setTrackQuery: (query: string) => void;
  trackedRecord: SubmittedBloodRequest | null;
  setTrackedRecord: (record: SubmittedBloodRequest | null) => void;
}

const BloodRequestContext = createContext<BloodRequestContextValue | null>(null);

export function BloodRequestProvider({ children }: { children: ReactNode }) {
  // Pure in-memory React state (no localStorage, sessionStorage, or cookies)
  const [requests, setRequests] = useState<Record<string, SubmittedBloodRequest>>(INITIAL_REQUESTS);
  const [latestSubmittedRequest, setLatestSubmittedRequest] = useState<SubmittedBloodRequest | null>(null);
  const [activeTab, setActiveTab] = useState<"form" | "track">("form");
  const [trackQuery, setTrackQuery] = useState("");
  const [trackedRecord, setTrackedRecord] = useState<SubmittedBloodRequest | null>(null);

  const submitRequest = useCallback(
    (data: Omit<SubmittedBloodRequest, "referenceId" | "submittedAt" | "status">): SubmittedBloodRequest => {
      // Generate unique Reference ID: REQ-2026-XXXX
      const refId = `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      const newRecord: SubmittedBloodRequest = {
        ...data,
        referenceId: refId,
        submittedAt: `Today, ${timeString}`,
        status: "Submitted",
      };

      setRequests((prev) => ({
        ...prev,
        [refId]: newRecord,
      }));

      setLatestSubmittedRequest(newRecord);
      setTrackQuery(refId);

      return newRecord;
    },
    []
  );

  const findRequest = useCallback(
    (referenceId: string): SubmittedBloodRequest | undefined => {
      if (!referenceId) return undefined;
      const key = referenceId.trim().toUpperCase();
      return requests[key];
    },
    [requests]
  );

  const clearLatestSubmitted = useCallback(() => {
    setLatestSubmittedRequest(null);
  }, []);

  return (
    <BloodRequestContext.Provider
      value={{
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
      }}
    >
      {children}
    </BloodRequestContext.Provider>
  );
}

export function useBloodRequests() {
  const context = useContext(BloodRequestContext);
  if (!context) {
    throw new Error("useBloodRequests must be used within a BloodRequestProvider");
  }
  return context;
}


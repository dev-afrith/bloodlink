import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import React, { type ReactNode } from "react";
import { AuthProvider, useAuth } from "@/context/auth-context";

function wrapper({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

describe("BloodLink User-Driven Authentication & Profile Workflow", () => {
  it("initializes with an unauthenticated session and null user", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it("first sign-in sets profileCompleted: false without inserting fake names or data", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    let loginRes: any;
    act(() => {
      loginRes = result.current.login("donor@user.com", "Donor");
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(loginRes.isNewUser).toBe(true);
    expect(result.current.user?.email).toBe("donor@user.com");
    expect(result.current.user?.role).toBe("Donor");
    expect(result.current.user?.profileCompleted).toBe(false);
    expect(result.current.user?.donorProfile).toBeUndefined();
    expect(result.current.user?.hospitalStaffProfile).toBeUndefined();
  });

  it("completing Donor profile saves genuine details and updates displayName & avatar", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login("aravind@gmail.com", "Donor");
    });

    act(() => {
      result.current.saveDonorProfile({
        fullName: "Aravind Swaminathan",
        phone: "+91 98401 99999",
        dateOfBirth: "1994-05-12",
        gender: "Male",
        city: "Chennai",
        state: "Tamil Nadu",
        bloodGroup: "O+",
        weight: "72",
        availability: "Available",
        medicalNotes: "No chronic conditions.",
      });
    });

    expect(result.current.user?.profileCompleted).toBe(true);
    expect(result.current.user?.donorProfile?.fullName).toBe("Aravind Swaminathan");
    expect(result.current.user?.donorProfile?.bloodGroup).toBe("O+");
    expect(result.current.user?.donorProfile?.weight).toBe("72");
    expect(result.current.getDisplayName()).toBe("Aravind Swaminathan");
    expect(result.current.getAvatarText()).toBe("AS");
  });

  it("updating Donor profile preserves existing fields while modifying changed values", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login("aravind@gmail.com", "Donor");
      result.current.saveDonorProfile({
        fullName: "Aravind Swaminathan",
        phone: "+91 98401 99999",
        dateOfBirth: "1994-05-12",
        gender: "Male",
        city: "Chennai",
        state: "Tamil Nadu",
        bloodGroup: "O+",
        weight: "72",
        availability: "Available",
      });
    });

    // Edit profile: change phone and blood group
    act(() => {
      result.current.saveDonorProfile({
        ...result.current.user!.donorProfile!,
        phone: "+91 94444 11111",
        bloodGroup: "B+",
      });
    });

    expect(result.current.user?.donorProfile?.phone).toBe("+91 94444 11111");
    expect(result.current.user?.donorProfile?.bloodGroup).toBe("B+");
    expect(result.current.user?.donorProfile?.fullName).toBe("Aravind Swaminathan");
    expect(result.current.user?.donorProfile?.weight).toBe("72");
  });

  it("completing Hospital Staff profile saves genuine clinical details", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login("staff@apollo.org", "Hospital Staff");
    });

    act(() => {
      result.current.saveHospitalStaffProfile({
        fullName: "Dr. Deepa Natarajan",
        phone: "+91 98410 55555",
        designation: "Transfusion Head",
        department: "Department of Transfusion Medicine",
        hospitalName: "Apollo Speciality Hospitals",
        hospitalAddress: "320 Mount Road, Teynampet",
        city: "Chennai",
        state: "Tamil Nadu",
        hospitalContact: "044-24334455",
      });
    });

    expect(result.current.user?.profileCompleted).toBe(true);
    expect(result.current.user?.hospitalStaffProfile?.fullName).toBe("Dr. Deepa Natarajan");
    expect(result.current.user?.hospitalStaffProfile?.hospitalName).toBe("Apollo Speciality Hospitals");
    expect(result.current.getDisplayName()).toBe("Dr. Deepa Natarajan");
    expect(result.current.getAvatarText()).toBe("DD");
  });

  it("clears user session on logout", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login("donor@user.com", "Donor");
      result.current.saveDonorProfile({
        fullName: "Kavita Rao",
        phone: "+91 98888 77777",
        dateOfBirth: "1998-08-20",
        gender: "Female",
        city: "Bengaluru",
        state: "Karnataka",
        bloodGroup: "A+",
        availability: "Available",
      });
    });

    expect(result.current.isAuthenticated).toBe(true);

    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });
});

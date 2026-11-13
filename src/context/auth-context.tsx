import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type UserRole = "Donor" | "Hospital Staff";

export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export interface DonorProfile {
  fullName: string;
  phone: string;
  dateOfBirth: string;
  gender: "Male" | "Female" | "Other" | "Prefer not to say";
  city: string;
  state: string;
  bloodGroup: BloodGroup;
  weight?: string;
  lastDonationDate?: string;
  availability: "Available" | "Unavailable" | "On Call";
  medicalNotes?: string;
}

export interface HospitalStaffProfile {
  fullName: string;
  phone: string;
  designation: string;
  department: string;
  hospitalName: string;
  hospitalAddress: string;
  city: string;
  state: string;
  hospitalContact: string;
}

export interface DemoUser {
  email: string;
  role: UserRole;
  profileCompleted: boolean;
  donorProfile?: DonorProfile;
  hospitalStaffProfile?: HospitalStaffProfile;
}

interface AuthContextValue {
  user: DemoUser | null;
  isAuthenticated: boolean;
  login: (email: string, role: UserRole) => { user: DemoUser; isNewUser: boolean };
  logout: () => void;
  saveDonorProfile: (profile: DonorProfile) => void;
  saveHospitalStaffProfile: (profile: HospitalStaffProfile) => void;
  getDisplayName: () => string;
  getAvatarText: () => string;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Pure in-memory session user. No hardcoded or fake random profile details.
  const [user, setUser] = useState<DemoUser | null>(null);

  const login = useCallback((email: string, role: UserRole): { user: DemoUser; isNewUser: boolean } => {
    const cleanedEmail = email.trim().toLowerCase();

    // If a user is already signed in for this email in session with completed profile, preserve it
    if (user && user.email === cleanedEmail && user.role === role && user.profileCompleted) {
      return { user, isNewUser: false };
    }

    // New or uncompleted session: strictly only email, role, profileCompleted: false. No random fake records or defaults.
    const freshUser: DemoUser = {
      email: cleanedEmail,
      role,
      profileCompleted: false,
    };

    setUser(freshUser);
    return { user: freshUser, isNewUser: true };
  }, [user]);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const saveDonorProfile = useCallback((profile: DonorProfile) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        role: "Donor",
        profileCompleted: true,
        donorProfile: { ...profile },
      };
    });
  }, []);

  const saveHospitalStaffProfile = useCallback((profile: HospitalStaffProfile) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        role: "Hospital Staff",
        profileCompleted: true,
        hospitalStaffProfile: { ...profile },
      };
    });
  }, []);

  const getDisplayName = useCallback((): string => {
    if (!user) return "";
    if (user.role === "Donor" && user.donorProfile?.fullName) {
      return user.donorProfile.fullName;
    }
    if (user.role === "Hospital Staff" && user.hospitalStaffProfile?.fullName) {
      return user.hospitalStaffProfile.fullName;
    }
    return user.email.split("@")[0] || "User";
  }, [user]);

  const getAvatarText = useCallback((): string => {
    const name = getDisplayName();
    if (!name) return "BL";
    const parts = name.trim().split(" ").filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase() || "BL";
  }, [getDisplayName]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        saveDonorProfile,
        saveHospitalStaffProfile,
        getDisplayName,
        getAvatarText,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [doctor, setDoctor] = useState(() => {
    const storedDoctor = localStorage.getItem("doctor");
    return storedDoctor ? JSON.parse(storedDoctor) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isDoctorAuthenticated") === "true";
  });

  const loginDoctor = (doctorData) => {
    // Map API verified field to verificationStatus
    let verificationStatus = "pending";
    if (doctorData.verified === "Verified") {
      verificationStatus = "approved";
    } else if (doctorData.verified === "Rejected") {
      verificationStatus = "rejected";
    }

    const doctorWithStatus = {
      ...doctorData,
      verificationStatus,
    };

    setDoctor(doctorWithStatus);
    setIsAuthenticated(true);
    localStorage.setItem("doctor", JSON.stringify(doctorWithStatus));
    localStorage.setItem("isDoctorAuthenticated", "true");
  };

  const logout = () => {
    setDoctor(null);
    setIsAuthenticated(false);
    localStorage.removeItem("doctor");
    localStorage.removeItem("isDoctorAuthenticated");
  };

  const updateVerificationStatus = (status) => {
    setDoctor((prev) => {
      const updated = { ...prev, verificationStatus: status };
      localStorage.setItem("doctor", JSON.stringify(updated));
      return updated;
    });
  };
  // Sync state with localStorage on mount (in case localStorage changes externally)
  useEffect(() => {
    const handleStorage = () => {
      const storedDoctor = localStorage.getItem("doctor");
      setDoctor(storedDoctor ? JSON.parse(storedDoctor) : null);
      setIsAuthenticated(localStorage.getItem("isDoctorAuthenticated") === "true");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const value = {
    doctor,
    isAuthenticated,
    loginDoctor,
    logout,
    updateVerificationStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

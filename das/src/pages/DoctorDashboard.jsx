import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import StatusBanner from "../components/dashboard/StatusBanner";
import Overview from "../components/dashboard/Overview";
import AppointmentsSection from "../components/dashboard/AppointmentsSection";
import AvailabilitySection from "../components/dashboard/AvailabilitySection";
import ProfileSection from "../components/dashboard/ProfileSection";

const DoctorDashboard = () => {
  const { isAuthenticated, doctor } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/doctor/login" replace />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "appointments":
        return <AppointmentsSection />;
      case "availability":
        return <AvailabilitySection />;
      case "profile":
        return <ProfileSection />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {/* Status Banner - Only shows when pending */}
          <StatusBanner />

          {/* Dynamic Content */}
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;

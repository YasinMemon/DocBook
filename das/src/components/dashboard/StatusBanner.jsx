import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const StatusBanner = () => {
  const { doctor, loginDoctor } = useAuth();
  const [showVerificationBanner, setShowVerificationBanner] = useState(true);

  const handleCloseVerificationBanner = async () => {
    setShowVerificationBanner(false);
    
    // Call API to mark message as shown
    try {
      const response = await fetch(
        "https://docbook-57yh.onrender.com/api/doctor/mark-verification-message-shown",
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Verification message marked as shown:", data.doctor);
        
        // Update the doctor data in localStorage and context
        if (data.doctor) {
          loginDoctor(data.doctor);
        }
      }
    } catch (error) {
      console.error("Error marking verification message:", error);
    }
  };

  // Show success banner for verified doctors
  if (
    doctor?.verificationStatus === "approved" &&
    showVerificationBanner &&
    !doctor?.verificationMessageShown
  ) {
    return (
      <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-6 rounded-lg relative">
        <button
          onClick={handleCloseVerificationBanner}
          className="absolute top-4 right-4 text-green-600 hover:text-green-800 transition-colors"
          aria-label="Close verification banner"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1 pr-8">
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              ✓ Your Profile is Verified
            </h3>
            <p className="text-green-800 mb-4">
              Congratulations! Your doctor profile has been successfully verified.
              Patients can now discover and book appointments with you.
            </p>
            <div className="bg-green-100 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-900 font-medium mb-2">
                What's next?
              </p>
              <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
                <li>Set your availability and time slots</li>
                <li>Keep your profile information up to date</li>
                <li>Respond to patient appointments promptly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show rejected banner
  if (doctor?.verificationStatus === "rejected") {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6 rounded-lg">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-900 mb-2">
              ⚠ Verification Not Approved
            </h3>
            <p className="text-red-800 mb-4">
              Unfortunately, your profile could not be verified at this time.
              Please contact support for more information or resubmit your documents.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show pending banner
  if (doctor?.verificationStatus !== "pending") {
    return null;
  }

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6 rounded-lg">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <svg
            className="w-8 h-8 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">
            🔒 Your Profile is Under Review
          </h3>
          <p className="text-yellow-800 mb-4">
            Your doctor profile has been submitted successfully and is currently
            being reviewed by our verification team. You will receive approval
            within <strong>24–48 hours</strong>.
          </p>
          <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-900 font-medium mb-2">
              What happens during verification?
            </p>
            <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
              <li>Our team verifies your medical license and credentials</li>
              <li>We validate your professional registration details</li>
              <li>You'll receive an email notification once approved</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBanner;

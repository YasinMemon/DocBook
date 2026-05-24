import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";
import DoctorTable from "../components/admin/DoctorTable";
import DoctorDetailModal from "../components/admin/DoctorDetailModal";
import { toast } from "react-hot-toast";
import { getAllDoctors, approveDoctor, rejectDoctor } from "../api/auth";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Doctors data from API
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors data on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getAllDoctors();

        if (response.status && response.doctors) {
          // Transform API data to match component structure
          const transformedDoctors = response.doctors.map((doctor) => ({
            id: doctor._id,
            fullName: doctor.fullName,
            email: doctor.email,
            phone: doctor.phone,
            specialization: doctor.specialty,
            experience: doctor.experience.toString(),
            qualification: doctor.qualifications?.join(", ") || "N/A",
            registrationNumber: doctor.registration_number,
            clinicName: doctor.hospital_name,
            city: doctor.city,
            registrationDate: new Date(doctor.createdAt).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              },
            ),
            verificationStatus:
              doctor.verified === "Pending" || doctor.verified === "pending"
                ? "pending"
                : doctor.verified === "Verified" ||
                    doctor.verified === "verified" ||
                    doctor.verified === "true" ||
                    doctor.verified === true
                  ? "approved"
                  : "rejected",
            // Store additional data for detail view
            consultationType: doctor.consulation_type,
            consultationFee: doctor.consulation_fee,
            availableDays: doctor.available_days,
            timeSlots: doctor.time_slots,
            consultationDuration: doctor.conclusion_duration,
            medicalLicense: doctor.medical_license,
            governmentId: doctor.goverment_id,
            isActive: doctor.isActive,
          }));
          setDoctors(transformedDoctors.reverse());
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError(err.message || "Failed to fetch doctors data");
        toast.error("Failed to load doctors data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleViewDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDoctor(null);
  };

  const handleApprove = async (doctorId) => {
    try {
      const response = await approveDoctor(doctorId);

      if (response.status) {
        // Update local state
        setDoctors((prev) =>
          prev.map((doc) =>
            doc.id === doctorId
              ? { ...doc, verificationStatus: "approved" }
              : doc,
          ),
        );
        toast.success(response.message || "Doctor approved successfully!");
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error approving doctor:", error);
      toast.error(error.message || "Failed to approve doctor");
    }
  };

  const handleReject = async (doctorId) => {
    try {
      const response = await rejectDoctor(doctorId);

      if (response.status) {
        // Update local state
        setDoctors((prev) =>
          prev.map((doc) =>
            doc.id === doctorId
              ? { ...doc, verificationStatus: "rejected" }
              : doc,
          ),
        );
        toast.error(response.message || "Doctor rejected");
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error rejecting doctor:", error);
      toast.error(error.message || "Failed to reject doctor");
    }
  };

  // Calculate stats
  const stats = {
    total: doctors.length,
    pending: doctors.filter((d) => d.verificationStatus === "pending").length,
    approved: doctors.filter((d) => d.verificationStatus === "approved").length,
    rejected: doctors.filter((d) => d.verificationStatus === "rejected").length,
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <AdminTopbar />

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Doctors</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.total}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {stats.pending}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Approved</p>
                  <p className="text-3xl font-bold text-green-600">
                    {stats.approved}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
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
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Rejected</p>
                  <p className="text-3xl font-bold text-red-600">
                    {stats.rejected}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-600"
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
              </div>
            </div>
          </div>

          {/* Table Title */}
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {activeTab === "overview" && "All Doctors"}
              {activeTab === "pending" && "Pending Doctors"}
              {activeTab === "approved" && "Approved Doctors"}
              {activeTab === "rejected" && "Rejected Doctors"}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage doctor verifications and view their details
            </p>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 flex flex-col items-center justify-center">
              <svg
                className="animate-spin h-12 w-12 text-indigo-600 mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="text-gray-600">Loading doctors data...</p>
            </div>
          ) : error ? (
            /* Error State */
            <div className="bg-white rounded-xl shadow-sm border border-red-200 p-12 flex flex-col items-center justify-center">
              <svg
                className="w-12 h-12 text-red-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-600 font-medium mb-2">
                Failed to load data
              </p>
              <p className="text-gray-600 text-sm">{error}</p>
            </div>
          ) : (
            /* Doctor Table */
            <DoctorTable
              doctors={doctors}
              onViewDetails={handleViewDetails}
              onApprove={handleApprove}
              onReject={handleReject}
              filter={activeTab}
            />
          )}
        </main>
      </div>

      {/* Doctor Detail Modal */}
      {showModal && (
        <DoctorDetailModal
          doctor={selectedDoctor}
          onClose={handleCloseModal}
          onApprove={() => handleApprove(selectedDoctor.id)}
          onReject={() => handleReject(selectedDoctor.id)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;

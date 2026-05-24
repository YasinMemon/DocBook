import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getDoctorAppointments, approveAppointment, rejectAppointment } from "../../api/auth";
import CreateAppointmentModal from "./CreateAppointmentModal";

const AppointmentsSection = () => {
  const { doctor } = useAuth();
  const isPending = doctor?.verificationStatus === "pending";
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching doctor appointments...");
      const response = await getDoctorAppointments();
      console.log("API Response:", response);
      console.log("Appointments received:", response.appointments);
      console.log("Number of appointments:", response.appointments?.length || 0);
      setAppointments(response.appointments || []);
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
      setError(err.message || "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTimeSlotLabel = (slot) => {
    const timeSlots = {
      1: "9:00 AM - 10:00 AM",
      2: "10:00 AM - 11:00 AM",
      3: "11:00 AM - 12:00 PM",
      4: "12:00 PM - 1:00 PM",
      5: "2:00 PM - 3:00 PM",
      6: "3:00 PM - 4:00 PM",
      7: "4:00 PM - 5:00 PM",
      8: "5:00 PM - 6:00 PM",
    };
    return timeSlots[slot] || `Slot ${slot}`;
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "scheduled":
        return "bg-yellow-100 text-yellow-700";
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-gray-100 text-gray-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
    setRejectionReason("");
    setFeedback(null);
  };

  const handleApproveAppointment = async () => {
    if (!selectedAppointment) return;

    try {
      setActionLoading(true);
      setFeedback(null);
      
      const response = await approveAppointment(selectedAppointment._id);
      
      // Update the local state with the approved appointment
      setAppointments(appointments.map(apt => 
        apt._id === selectedAppointment._id 
          ? { ...apt, status: "Approved" }
          : apt
      ));
      
      setSelectedAppointment(prev => ({
        ...prev,
        status: "Approved"
      }));
      
      setFeedback({
        type: "success",
        message: "Appointment approved successfully!"
      });
      
      // Auto-close modal after success
      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (err) {
      console.error("Error approving appointment:", err);
      setFeedback({
        type: "error",
        message: err.message || "Failed to approve appointment"
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectAppointment = async () => {
    if (!selectedAppointment) return;

    try {
      setActionLoading(true);
      setFeedback(null);
      
      const response = await rejectAppointment(selectedAppointment._id, rejectionReason || null);
      
      // Update the local state with the rejected appointment
      setAppointments(appointments.map(apt => 
        apt._id === selectedAppointment._id 
          ? { ...apt, status: "Rejected" }
          : apt
      ));
      
      setSelectedAppointment(prev => ({
        ...prev,
        status: "Rejected"
      }));
      
      setFeedback({
        type: "success",
        message: "Appointment rejected successfully!"
      });
      
      // Auto-close modal after success
      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (err) {
      console.error("Error rejecting appointment:", err);
      setFeedback({
        type: "error",
        message: err.message || "Failed to reject appointment"
      });
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          disabled={isPending}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isPending
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
          title={isPending ? "Feature available after approval" : "Create a new appointment"}
        >
          Add Appointment
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
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
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        ) : appointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-gray-600 font-medium text-lg">
              No appointments yet
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Your appointments will appear here once patients book with you
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr key={appointment._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {appointment.patient?.fullName?.charAt(0) || "P"}
                          </div>
                          <span className="font-medium text-gray-900">
                            {appointment.patient?.fullName || "Unknown Patient"}
                          </span>
                        </div>
                        {appointment.patient?.email && (
                          <span className="text-xs text-gray-500 ml-13">
                            {appointment.patient.email}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div>{formatDate(appointment.appointmentDate)}</div>
                      <div className="text-gray-500">
                        {getTimeSlotLabel(appointment.timeSlot)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          appointment.consulation_type === "Online"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {appointment.consulation_type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewAppointment(appointment)}
                          disabled={isPending}
                          className={`p-2 rounded-lg transition-colors ${
                            isPending
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-indigo-600 hover:bg-indigo-50"
                          }`}
                          title={
                            isPending
                              ? "Feature available after approval"
                              : "View Details"
                          }
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                        {appointment.status === "Scheduled" && !isPending && (
                          <>
                            <button
                              onClick={() => {
                                handleApproveAppointment.appointmentId = appointment._id;
                                setSelectedAppointment(appointment);
                                setShowModal(true);
                              }}
                              className="p-2 rounded-lg transition-colors text-green-600 hover:bg-green-50"
                              title="Approve"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => {
                                handleRejectAppointment.appointmentId = appointment._id;
                                setSelectedAppointment(appointment);
                                setShowModal(true);
                              }}
                              className="p-2 rounded-lg transition-colors text-red-600 hover:bg-red-50"
                              title="Reject"
                            >
                              <svg
                                className="w-5 h-5"
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
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedAppointment && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600">
              <h3 className="text-xl font-bold text-white">
                Appointment Details
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1 transition-colors"
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
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Feedback Message */}
              {feedback && (
                <div
                  className={`p-4 rounded-lg flex items-center gap-3 ${
                    feedback.type === "success"
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  <svg
                    className={`w-5 h-5 flex-shrink-0 ${
                      feedback.type === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    {feedback.type === "success" ? (
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    ) : (
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    )}
                  </svg>
                  <p
                    className={`text-sm font-medium ${
                      feedback.type === "success"
                        ? "text-green-800"
                        : "text-red-800"
                    }`}
                  >
                    {feedback.message}
                  </p>
                </div>
              )}

              {/* Patient Info */}
              <div>
                <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
                  Patient Information
                </h4>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {selectedAppointment.patient?.fullName?.charAt(0) || "P"}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {selectedAppointment.patient?.fullName || "Unknown Patient"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedAppointment.patient?.email || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedAppointment.patient?.phone || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Date
                  </p>
                  <p className="text-gray-900 font-medium">
                    {formatDate(selectedAppointment.appointmentDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Time Slot
                  </p>
                  <p className="text-gray-900 font-medium">
                    {getTimeSlotLabel(selectedAppointment.timeSlot)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Consultation Type
                  </p>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      selectedAppointment.consulation_type === "Online"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {selectedAppointment.consulation_type}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Status
                  </p>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      selectedAppointment.status
                    )}`}
                  >
                    {selectedAppointment.status}
                  </span>
                </div>
              </div>

              {/* Symptoms/Notes */}
              {selectedAppointment.reason && (
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Reason for Visit
                  </p>
                  <p className="text-gray-700 p-3 bg-gray-50 rounded-lg">
                    {selectedAppointment.reason}
                  </p>
                </div>
              )}

              {/* Additional Notes */}
              {selectedAppointment.notes && (
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Notes
                  </p>
                  <p className="text-gray-700 p-3 bg-gray-50 rounded-lg">
                    {selectedAppointment.notes}
                  </p>
                </div>
              )}

              {/* Rejection Reason Input - Show only when rejecting */}
              {selectedAppointment.status === "Scheduled" && (
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Rejection Reason (Optional)
                  </p>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Enter reason for rejection (optional)..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    rows="3"
                    disabled={actionLoading}
                  />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-3">
                <button
                  onClick={handleCloseModal}
                  disabled={actionLoading}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Close
                </button>
                
                {/* Approve Button - Show only if status is Scheduled */}
                {selectedAppointment.status === "Scheduled" && !isPending && (
                  <button
                    onClick={handleApproveAppointment}
                    disabled={actionLoading}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Approving...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Approve
                      </>
                    )}
                  </button>
                )}
                
                {/* Reject Button - Show only if status is Scheduled */}
                {selectedAppointment.status === "Scheduled" && !isPending && (
                  <button
                    onClick={handleRejectAppointment}
                    disabled={actionLoading}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Rejecting...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
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
                        Reject
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Appointment Modal */}
      <CreateAppointmentModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={fetchAppointments}
      />
    </div>
  );
};

export default AppointmentsSection;

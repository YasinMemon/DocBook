import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Edit2,
  Save,
  X,
  LogOut,
  Clock,
  CheckCircle,
  AlertCircle,
  Camera,
  MapPin,
  Phone,
  FileText,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getUserData, clearUserAuth, isUserAuthenticated } from "../utils/authUtils";
import { logoutUser, getUserAppointments, cancelAppointment } from "../api/auth";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [editedData, setEditedData] = useState({
    fullName: "",
    email: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(true);
  const [appointmentsError, setAppointmentsError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [cancellationReason, setCancellationReason] = useState("");
  const [isCancelLoading, setIsCancelLoading] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    if (!isUserAuthenticated()) {
      navigate("/sign-in");
      return;
    }

    const userData = getUserData();
    setUser(userData);
    setEditedData({
      fullName: userData?.fullName || "",
      email: userData?.email || "",
    });

    // Fetch user appointments
    fetchAppointments();

    // Set up periodic refresh every 30 seconds to catch status updates
    const interval = setInterval(() => {
      fetchAppointments();
    }, 30000);

    // Listen for visibility changes to refresh when user comes back to tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchAppointments();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [navigate]);

  const fetchAppointments = async () => {
    try {
      setIsLoadingAppointments(true);
      setAppointmentsError(null);
      const response = await getUserAppointments();
      setAppointments(response.appointments || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointmentsError(error.message || "Failed to load appointments");
    } finally {
      setIsLoadingAppointments(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({
      fullName: user?.fullName || "",
      email: user?.email || "",
    });
    setSaveMessage("");
  };

  const handleSave = async () => {
    // TODO: Implement API call to update user profile
    // For now, just update localStorage
    const updatedUser = { ...user, ...editedData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    setSaveMessage("Profile updated successfully!");
    window.dispatchEvent(new Event("authChanged"));

    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSaveMessage("New passwords don't match!");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setSaveMessage("Password must be at least 8 characters!");
      return;
    }

    // TODO: Implement API call to change password
    setSaveMessage("Password changed successfully!");
    setShowPasswordChange(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearUserAuth();
      window.dispatchEvent(new Event("authChanged"));
      navigate("/");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenCancelModal = (appointment) => {
    setAppointmentToCancel(appointment);
    setCancellationReason("");
    setShowCancelModal(true);
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
    setAppointmentToCancel(null);
    setCancellationReason("");
    setIsCancelLoading(false);
  };

  const handleConfirmCancel = async () => {
    if (!appointmentToCancel) return;

    try {
      setIsCancelLoading(true);
      await cancelAppointment(appointmentToCancel._id, cancellationReason);

      // Update the local state
      setAppointments(appointments.map(apt =>
        apt._id === appointmentToCancel._id
          ? { ...apt, status: "Cancelled" }
          : apt
      ));

      toast.success("Appointment cancelled successfully");
      handleCloseCancelModal();
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error(error.message || "Failed to cancel appointment");
    } finally {
      setIsCancelLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const tabs = [
    { id: "profile", label: "Profile Information", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "appointments", label: "My Appointments", icon: Calendar },
  ];

  // Calculate appointment statistics
  const appointmentStats = {
    total: appointments.length,
    approved: appointments.filter(apt => apt.status?.toLowerCase() === "approved").length,
    scheduled: appointments.filter(apt => apt.status?.toLowerCase() === "scheduled").length,
    rejected: appointments.filter(apt => apt.status?.toLowerCase() === "rejected").length,
    completed: appointments.filter(apt => apt.status?.toLowerCase() === "completed").length,
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusLower = status?.toLowerCase() || "scheduled";
    const statusConfig = {
      scheduled: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        label: "Scheduled",
        icon: "⏳",
        description: "Waiting for doctor approval"
      },
      approved: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Approved",
        icon: "✓",
        description: "Approved by doctor"
      },
      rejected: {
        bg: "bg-red-100",
        text: "text-red-800",
        label: "Rejected",
        icon: "✕",
        description: "Rejected by doctor"
      },
      completed: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        label: "Completed",
        icon: "✔",
        description: "Appointment completed"
      },
      cancelled: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        label: "Cancelled",
        icon: "✕",
        description: "Appointment cancelled"
      },
    };
    const config = statusConfig[statusLower] || statusConfig.scheduled;
    return (
      <div className="flex flex-col items-start">
        <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${config.bg} ${config.text} inline-flex items-center gap-1.5`}>
          <span className="text-sm">{config.icon}</span>
          {config.label}
        </span>
        <span className="text-xs text-gray-500 mt-1">{config.description}</span>
      </div>
    );
  };

  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format time slot to be more readable
  const formatTimeSlot = (timeSlot) => {
    if (!timeSlot) return "Time not specified";

    // If it's already in a readable format (contains AM/PM or colon), return as is
    if (timeSlot.includes("AM") || timeSlot.includes("PM") || timeSlot.includes(":")) {
      return timeSlot;
    }

    // Convert number to time format (e.g., "1" to "1:00 PM")
    const hour = parseInt(timeSlot);
    if (isNaN(hour)) return timeSlot;

    if (hour === 0) return "12:00 AM";
    if (hour < 12) return `${hour}:00 AM`;
    if (hour === 12) return "12:00 PM";
    return `${hour - 12}:00 PM`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        {/* Success Message */}
        {saveMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
            <CheckCircle className="w-5 h-5" />
            {saveMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Profile Summary */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-6 text-white">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl font-bold border-4 border-white/30">
                    {user.fullName?.charAt(0).toUpperCase()}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-white text-blue-600 p-2 rounded-full shadow-lg hover:bg-gray-50 transition">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-xl font-semibold mt-4">{user.fullName}</h2>
                <p className="text-blue-100 text-sm mt-1">{user.email}</p>
              </div>

              {/* Navigation Tabs */}
              <div className="p-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${activeTab === tab.id
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Logout Button */}
              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-md p-6">
              {/* Profile Information Tab */}
              {activeTab === "profile" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Profile Information
                    </h2>
                    {!isEditing ? (
                      <button
                        onClick={handleEdit}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Profile
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={handleSave}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={editedData.fullName}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isEditing
                            ? "border-gray-300 bg-white"
                            : "border-gray-200 bg-gray-50"
                            }`}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={editedData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isEditing
                            ? "border-gray-300 bg-white"
                            : "border-gray-200 bg-gray-50"
                            }`}
                        />
                      </div>
                    </div>

                    {/* Member Since */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Member Since
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={
                            user.createdAt
                              ? new Date(user.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )
                              : "Recently joined"
                          }
                          disabled
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 bg-gray-50 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Account Stats */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-3 rounded-lg">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Total</p>
                          <p className="text-2xl font-bold text-gray-900">{appointmentStats.total}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
                      <div className="flex items-center gap-3">
                        <div className="bg-yellow-600 p-3 rounded-lg">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Pending</p>
                          <p className="text-2xl font-bold text-gray-900">{appointmentStats.scheduled}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-600 p-3 rounded-lg">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Approved</p>
                          <p className="text-2xl font-bold text-gray-900">{appointmentStats.approved}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
                      <div className="flex items-center gap-3">
                        <div className="bg-red-600 p-3 rounded-lg">
                          <AlertCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Rejected</p>
                          <p className="text-2xl font-bold text-gray-900">{appointmentStats.rejected}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg border border-indigo-200">
                      <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 p-3 rounded-lg">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Completed</p>
                          <p className="text-2xl font-bold text-gray-900">{appointmentStats.completed}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    Security Settings
                  </h2>

                  <div className="space-y-6">
                    {/* Password Section */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Password
                          </h3>
                          <p className="text-sm text-gray-600">
                            Update your password regularly to keep your account secure
                          </p>
                        </div>
                        {!showPasswordChange && (
                          <button
                            onClick={() => setShowPasswordChange(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          >
                            Change Password
                          </button>
                        )}
                      </div>

                      {showPasswordChange && (
                        <form onSubmit={handlePasswordChange} className="space-y-4 mt-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Current Password
                            </label>
                            <input
                              type="password"
                              name="currentPassword"
                              value={passwordData.currentPassword}
                              onChange={handlePasswordInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              New Password
                            </label>
                            <input
                              type="password"
                              name="newPassword"
                              value={passwordData.newPassword}
                              onChange={handlePasswordInputChange}
                              required
                              minLength={8}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              name="confirmPassword"
                              value={passwordData.confirmPassword}
                              onChange={handlePasswordInputChange}
                              required
                              minLength={8}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div className="flex gap-3">
                            <button
                              type="submit"
                              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                            >
                              Update Password
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setShowPasswordChange(false);
                                setPasswordData({
                                  currentPassword: "",
                                  newPassword: "",
                                  confirmPassword: "",
                                });
                              }}
                              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}
                    </div>

                    {/* Account Security Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <div className="flex gap-3">
                        <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Security Tips
                          </h4>
                          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                            <li>Use a strong, unique password for your account</li>
                            <li>Change your password regularly</li>
                            <li>Never share your password with anyone</li>
                            <li>Log out from shared devices after use</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Appointments Tab */}
              {activeTab === "appointments" && (
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      My Appointments
                    </h2>
                    <button
                      onClick={() => {
                        setRefreshing(true);
                        fetchAppointments().finally(() => setRefreshing(false));
                      }}
                      disabled={refreshing || isLoadingAppointments}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${refreshing || isLoadingAppointments
                        ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                    >
                      <svg
                        className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      {refreshing ? "Refreshing..." : "Refresh"}
                    </button>
                  </div>

                  {/* Loading State */}
                  {isLoadingAppointments && (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading appointments...</p>
                    </div>
                  )}

                  {/* Error State */}
                  {appointmentsError && !isLoadingAppointments && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                      <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-2" />
                      <p className="text-red-800">{appointmentsError}</p>
                      <button
                        onClick={fetchAppointments}
                        className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        Try Again
                      </button>
                    </div>
                  )}

                  {/* Empty State */}
                  {!isLoadingAppointments && !appointmentsError && appointments.length === 0 && (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-4">
                        <Calendar className="w-12 h-12 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No Appointments Yet
                      </h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        You haven't booked any appointments yet. Start by finding the
                        right doctor for your needs.
                      </p>
                      <button
                        onClick={() => navigate("/doctors")}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                      >
                        <Calendar className="w-5 h-5" />
                        Find Doctors
                      </button>
                    </div>
                  )}

                  {/* Appointments List */}
                  {!isLoadingAppointments && !appointmentsError && appointments.length > 0 && (
                    <div className="space-y-4">
                      {appointments.map((appointment) => {
                        const statusLower = appointment.status?.toLowerCase() || "scheduled";
                        const statusColors = {
                          scheduled: "from-yellow-600 to-yellow-700",
                          approved: "from-green-600 to-green-700",
                          rejected: "from-red-600 to-red-700",
                          completed: "from-blue-600 to-blue-700",
                          cancelled: "from-gray-600 to-gray-700",
                        };
                        const borderColors = {
                          scheduled: "border-yellow-300 bg-yellow-50",
                          approved: "border-green-300 bg-green-50",
                          rejected: "border-red-300 bg-red-50",
                          completed: "border-blue-300 bg-blue-50",
                          cancelled: "border-gray-300 bg-gray-50",
                        };

                        return (
                          <div
                            key={appointment._id}
                            className={`bg-white border-2 ${borderColors[statusLower]} rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden`}
                          >
                            {/* Header with Status - Enhanced */}
                            <div className={`bg-gradient-to-r ${statusColors[statusLower]} px-6 py-4 text-white flex justify-between items-center`}>
                              <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium">Appointment ID: {appointment._id.slice(-6).toUpperCase()}</span>
                              </div>
                              <StatusBadge status={appointment.status} />
                            </div>

                            <div className="p-6">
                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Doctor Info Section - Left */}
                                <div className="lg:col-span-1 flex gap-4">
                                  <div className="relative">
                                    <img
                                      src={appointment.doctor?.profile_image || "/placeholder-doctor.png"}
                                      alt={appointment.doctor?.fullName || "Doctor"}
                                      className="w-24 h-24 rounded-xl object-cover border-3 border-white shadow-md"
                                    />
                                    <div className={`absolute -bottom-2 -right-2 ${statusColors[statusLower]} text-white rounded-full p-1.5 shadow-lg`}>
                                      <User className="w-3 h-3" />
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                                      Dr. {appointment.doctor?.fullName || "Unknown"}
                                    </h3>
                                    <p className={`text-xs font-semibold mb-3 flex items-center gap-1`}
                                      style={{ color: statusLower === "approved" ? "#059669" : statusLower === "rejected" ? "#dc2626" : "#2563eb" }}
                                    >
                                      <span className="w-1.5 h-1.5 bg-current rounded-full"></span>
                                      {appointment.doctor?.specialty || "Specialty"}
                                    </p>

                                    {/* Contact Info */}
                                    <div className="space-y-1">
                                      {appointment.doctor?.city && (
                                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                          <MapPin className="w-3 h-3 text-gray-500" />
                                          <span>{appointment.doctor.city}</span>
                                        </div>
                                      )}
                                      {appointment.doctor?.phone && (
                                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                          <Phone className="w-3 h-3 text-gray-500" />
                                          <span>{appointment.doctor.phone}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {/* Appointment Details Section - Middle & Right */}
                                <div className="lg:col-span-2">
                                  {/* Appointment On - Prominent Section */}
                                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3.5 border-2 border-blue-200 mb-4">
                                    <div className="flex items-start justify-between">
                                      <div>
                                        <p className="text-xs font-semibold text-blue-900 uppercase mb-1.5">📅 Appointment On</p>
                                        <div className="flex items-center gap-4">
                                          <div>
                                            <p className="text-xs text-blue-700 mb-0.5">Date</p>
                                            <p className="text-sm font-bold text-gray-900">
                                              {formatDate(appointment.appointmentDate)}
                                            </p>
                                          </div>
                                          <div className="h-8 w-px bg-blue-300"></div>
                                          <div>
                                            <p className="text-xs text-blue-700 mb-0.5">Time</p>
                                            <p className="text-sm font-bold text-gray-900">
                                              {formatTimeSlot(appointment.timeSlot)}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Top Row - Quick Info */}
                                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
                                    {/* Type */}
                                    {appointment.consulation_type && (
                                      <div className="bg-purple-50 rounded-lg p-2.5 border border-purple-100">
                                        <div className="flex items-center gap-1.5 mb-1">
                                          <FileText className="w-3.5 h-3.5 text-purple-600" />
                                          <span className="text-xs font-semibold text-purple-900">TYPE</span>
                                        </div>
                                        <p className="text-xs font-bold text-gray-900">
                                          {appointment.consulation_type}
                                        </p>
                                      </div>
                                    )}

                                    {/* Fee */}
                                    {appointment.fee > 0 && (
                                      <div className="bg-green-50 rounded-lg p-2.5 border border-green-100">
                                        <div className="flex items-center gap-1.5 mb-1">
                                          <span className="text-xs font-semibold text-green-900">FEE</span>
                                        </div>
                                        <p className="text-xs font-bold text-gray-900">
                                          ${appointment.fee}
                                        </p>
                                      </div>
                                    )}

                                    {/* Booked Date */}
                                    <div className="bg-orange-50 rounded-lg p-2.5 border border-orange-100">
                                      <div className="flex items-center gap-1.5 mb-1">
                                        <span className="text-xs font-semibold text-orange-900">BOOKED ON</span>
                                      </div>
                                      <p className="text-xs font-bold text-gray-900">
                                        {new Date(appointment.createdAt).toLocaleDateString("en-US", {
                                          month: "short",
                                          day: "numeric",
                                          year: "numeric",
                                        })}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Status Information Box */}
                                  <div className={`p-3 rounded-lg border-2 ${borderColors[statusLower]}`}>
                                    <p className="text-xs font-semibold text-gray-700 mb-1">STATUS</p>
                                    <p className="text-xs font-medium text-gray-900 leading-snug">
                                      {statusLower === "scheduled" && "⏳ Awaiting doctor approval"}
                                      {statusLower === "approved" && "✓ Approved - arrive 10 mins early"}
                                      {statusLower === "rejected" && "✕ Request not approved"}
                                      {statusLower === "completed" && "✔ Completed"}
                                      {statusLower === "cancelled" && "Cancelled"}
                                    </p>
                                  </div>

                                  {/* Bottom Info and Actions */}
                                  <div className="flex items-center justify-end mt-3 pt-3 border-t border-gray-200">
                                    {(statusLower === "scheduled" || statusLower === "approved") && (
                                      <button
                                        onClick={() => handleOpenCancelModal(appointment)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg transition-colors border border-red-200"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        Cancel
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cancellation Modal */}
      {showCancelModal && appointmentToCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/20 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-white" />
                <h3 className="text-xl font-bold text-white">Cancel Appointment</h3>
              </div>
              <button
                onClick={handleCloseCancelModal}
                disabled={isCancelLoading}
                className="text-white hover:bg-red-700 p-1 rounded-lg transition disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800">
                  <strong>Important:</strong> You are about to cancel your appointment with Dr. {appointmentToCancel.doctor?.fullName} scheduled for <strong>{formatDate(appointmentToCancel.appointmentDate)}</strong>. This action cannot be undone.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Cancellation (Optional)
                </label>
                <textarea
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  placeholder="Tell us why you're canceling this appointment..."
                  disabled={isCancelLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none disabled:bg-gray-50"
                  rows="3"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex gap-3">
              <button
                onClick={handleCloseCancelModal}
                disabled={isCancelLoading}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Keep Appointment
              </button>
              <button
                onClick={handleConfirmCancel}
                disabled={isCancelLoading}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isCancelLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Cancelling...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Cancel Appointment
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default UserProfilePage;

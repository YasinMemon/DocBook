import React, { useState, useEffect } from "react";
import {
  createDoctorAppointment,
  getDoctorAvailability,
  getBookedAppointmentsForDoctor,
} from "../../api/auth";
import {
  parseTimeSlots,
  getBookedSlotsForDate,
  getAvailableSlotsForDate,
  isPastDate,
  isDateAvailable,
  isSlotAvailable,
} from "../../utils/availabilityUtils";
import toast from "react-hot-toast";

const CreateAppointmentModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    appointmentDate: "",
    timeSlot: "",
    consultationType: "Clinic",
    notes: "",
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [consultationTypes, setConsultationTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [errors, setErrors] = useState({});
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedDateSlots, setSelectedDateSlots] = useState([]);
  const [doctorId, setDoctorId] = useState(null);

  // Fetch available time slots and days on component mount
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        // Extract doctor ID from localStorage (doctor panel is authenticated)
        const doctorToken = localStorage.getItem("doctorAuthToken");
        if (doctorToken) {
          try {
            const payload = JSON.parse(atob(doctorToken.split(".")[1]));
            setDoctorId(payload.id);
          } catch (err) {
            console.error("Error extracting doctor ID from token:", err);
          }
        }

        const response = await getDoctorAvailability();

        // Parse time slots from ranges (morning/afternoon/evening) or use as-is
        const slots = response.time_slots || [];
        const parsedSlots = parseTimeSlots(slots);
        setAvailableSlots(parsedSlots);

        // Set available days
        setAvailableDays(response.available_days || []);

        // Set consultation types
        const consType = response.consulation_type || "Both";
        if (consType === "Both") {
          setConsultationTypes([
            { value: "Clinic", label: "Clinic Visit" },
            { value: "Online", label: "Online Consultation" },
          ]);
        } else if (consType === "Clinic") {
          setConsultationTypes([{ value: "Clinic", label: "Clinic Visit" }]);
        } else if (consType === "Online") {
          setConsultationTypes([{ value: "Online", label: "Online Consultation" }]);
        }
      } catch (error) {
        console.error("Failed to fetch availability:", error);
        toast.error("Failed to load doctor availability");
      }
    };

    if (isOpen) {
      fetchAvailability();
    }
  }, [isOpen]);

  // Handle date change - fetch booked appointments for that date
  const handleDateChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      timeSlot: "", // Reset time when date changes
    }));

    if (!value || !doctorId) {
      setSelectedDateSlots([]);
      return;
    }

    // Check if date is past or unavailable
    if (isPastDate(value) || !isDateAvailable(value, availableDays)) {
      setSelectedDateSlots([]);
      return;
    }

    // Fetch booked appointments for this date
    try {
      setLoadingSlots(true);
      const response = await getBookedAppointmentsForDoctor(doctorId, value);

      // Filter out booked slots
      const available = getAvailableSlotsForDate(availableSlots, response.bookedSlots);
      setSelectedDateSlots(available);

      if (available.length === 0) {
        toast.info("No available slots for this date. Please select another date.");
      }
    } catch (error) {
      console.error("Error fetching booked appointments:", error);
      // Show all slots if fetch fails
      setSelectedDateSlots(availableSlots);
    } finally {
      setLoadingSlots(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = "Patient name is required";
    }

    if (!formData.patientEmail.trim()) {
      newErrors.patientEmail = "Patient email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.patientEmail)) {
      newErrors.patientEmail = "Please enter a valid email address";
    }

    if (!formData.patientPhone.trim()) {
      newErrors.patientPhone = "Patient phone is required";
    } else if (formData.patientPhone.length < 10) {
      newErrors.patientPhone = "Please enter a valid phone number";
    }

    if (!formData.appointmentDate) {
      newErrors.appointmentDate = "Appointment date is required";
    } else if (isPastDate(formData.appointmentDate)) {
      newErrors.appointmentDate = "Cannot select a past date";
    } else if (availableDays.length > 0 && !isDateAvailable(formData.appointmentDate, availableDays)) {
      newErrors.appointmentDate = `Doctor is only available on: ${availableDays.join(", ")}`;
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = "Time slot is required";
    } else if (!selectedDateSlots.includes(formData.timeSlot)) {
      // Verify selected slot is in the available slots for this date
      newErrors.timeSlot = "Selected time slot is no longer available";
    }

    if (!formData.consultationType) {
      newErrors.consultationType = "Consultation type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setFeedback(null);

      const response = await createDoctorAppointment({
        patientName: formData.patientName,
        patientEmail: formData.patientEmail,
        patientPhone: formData.patientPhone,
        appointmentDate: formData.appointmentDate,
        timeSlot: formData.timeSlot,
        consultationType: formData.consultationType,
        notes: formData.notes,
      });

      setFeedback({
        type: "success",
        message: "Appointment created successfully!",
      });

      toast.success("Appointment created successfully!");

      // Reset form
      setFormData({
        patientName: "",
        patientEmail: "",
        patientPhone: "",
        appointmentDate: "",
        timeSlot: "",
        consultationType: "Clinic",
        notes: "",
      });

      // Close modal and refresh appointments after success
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Failed to create appointment:", error);
      const errorMessage =
        error.data?.message || error.message || "Failed to create appointment. Please try again.";
      
      setFeedback({
        type: "error",
        message: errorMessage,
      });

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/20">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Create Appointment</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Feedback Message */}
          {feedback && (
            <div
              className={`p-4 rounded-lg ${
                feedback.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {feedback.message}
            </div>
          )}

          {/* Patient Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.patientName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter patient name"
            />
            {errors.patientName && (
              <p className="text-red-500 text-sm mt-1">{errors.patientName}</p>
            )}
          </div>

          {/* Patient Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="patientEmail"
              value={formData.patientEmail}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.patientEmail ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter patient email"
            />
            {errors.patientEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.patientEmail}</p>
            )}
          </div>

          {/* Patient Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="patientPhone"
              value={formData.patientPhone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.patientPhone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter patient phone number"
            />
            {errors.patientPhone && (
              <p className="text-red-500 text-sm mt-1">{errors.patientPhone}</p>
            )}
          </div>

          {/* Appointment Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Appointment Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleDateChange}
              min={new Date().toISOString().split("T")[0]}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.appointmentDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.appointmentDate && (
              <p className="text-red-500 text-sm mt-1">{errors.appointmentDate}</p>
            )}
          </div>

          {/* Time Slot */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Slot <span className="text-red-500">*</span>
            </label>
            {loadingSlots ? (
              <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                <span className="text-sm text-gray-600">Loading available slots...</span>
              </div>
            ) : (
              <select
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.timeSlot ? "border-red-500" : "border-gray-300"
                }`}
                disabled={selectedDateSlots.length === 0 && formData.appointmentDate}
              >
                <option value="">
                  {selectedDateSlots.length === 0 && formData.appointmentDate
                    ? "No available slots for this date"
                    : "Select a time slot"}
                </option>
                {selectedDateSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            )}
            {errors.timeSlot && (
              <p className="text-red-500 text-sm mt-1">{errors.timeSlot}</p>
            )}
          </div>

          {/* Consultation Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Consultation Type <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              {consultationTypes.length > 0 ? (
                consultationTypes.map((type) => (
                  <label key={type.value} className="flex items-center">
                    <input
                      type="radio"
                      name="consultationType"
                      value={type.value}
                      checked={formData.consultationType === type.value}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-gray-700">{type.label}</span>
                  </label>
                ))
              ) : (
                <>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="consultationType"
                      value="Clinic"
                      checked={formData.consultationType === "Clinic"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Clinic</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="consultationType"
                      value="Online"
                      checked={formData.consultationType === "Online"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Online</span>
                  </label>
                </>
              )}
            </div>
            {errors.consultationType && (
              <p className="text-red-500 text-sm mt-1">{errors.consultationType}</p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Add any additional notes"
              rows="3"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 px-4 py-2 text-white font-medium rounded-lg transition-colors ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Creating..." : "Create Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAppointmentModal;

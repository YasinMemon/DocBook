import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  getVerifiedDoctors, 
  createAppointment,
  getBookedAppointmentsForDoctor 
} from "../api/auth";
import { getUserData } from "../utils/authUtils";
import {
  parseTimeSlots,
  isDateAvailable,
  getBookedSlotsForDate,
  getAvailableSlotsForDate,
  isPastDate,
  isSlotAvailable,
} from "../utils/availabilityUtils";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const BookAppointmentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDateSlots, setSelectedDateSlots] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    consultationType: "",
    reason: "",
    notes: "",
  });

  const SLOT_RANGES = {
    Morning: { start: "09:00", end: "12:00" },
    Afternoon: { start: "12:00", end: "17:00" },
    Evening: { start: "17:00", end: "21:00" },
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split("T")[0];

  // Get available consultation types based on doctor's consulation_type
  const getAvailableConsultationTypes = () => {
    if (!doctor) return [];

    const type = doctor.consulation_type;
    if (type === "Both") {
      return [
        { value: "Clinic", label: "Clinic Visit" },
        { value: "Online", label: "Online Consultation" },
      ];
    } else if (type === "Clinic") {
      return [{ value: "Clinic", label: "Clinic Visit" }];
    } else if (type === "Online") {
      return [{ value: "Online", label: "Online Consultation" }];
    }
    return [];
  };

  // Get time slots from doctor data
  const getTimeSlots = () => {
    if (!doctor || !doctor.time_slots || doctor.time_slots.length === 0) {
      return [];
    }
    return parseTimeSlots(doctor.time_slots);
  };

  useEffect(() => {
    const fetchDoctorDetail = async () => {
      try {
        setLoading(true);
        const response = await getVerifiedDoctors();
        if (response.status && response.doctors) {
          const foundDoctor = response.doctors.find(
            (doc) => doc._id === id || doc.id === id,
          );
          setDoctor(foundDoctor);
        }
      } catch (err) {
        console.error("Error fetching doctor details:", err);
        toast.error("Failed to load doctor details");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetail();
  }, [id]);

  // Check if selected date is on an available day
  const checkDateAvailability = (dateString) => {
    if (!doctor) return false;
    return isDateAvailable(dateString, doctor.available_days);
  };

  // Fetch booked appointments for selected date
  const handleDateChange = async (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      time: "", // Reset time when date changes
    }));

    if (!value || !doctor) {
      setSelectedDateSlots([]);
      return;
    }

    // Check if date is past or unavailable
    if (isPastDate(value) || !checkDateAvailability(value)) {
      setSelectedDateSlots([]);
      return;
    }

    // Fetch booked appointments for this date
    try {
      setLoadingSlots(true);
      const response = await getBookedAppointmentsForDoctor(id, value);
      
      // Get all available slots
      const allSlots = getTimeSlots();
      
      // Filter out booked slots
      const available = getAvailableSlotsForDate(allSlots, response.bookedSlots);
      setSelectedDateSlots(available);

      if (available.length === 0) {
        toast.info("No available slots for this date. Please select another date.");
      }
    } catch (error) {
      console.error("Error fetching booked appointments:", error);
      // Show all slots if fetch fails
      setSelectedDateSlots(getTimeSlots());
    } finally {
      setLoadingSlots(false);
    }
  };

  // Handle input change for other form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.patientName ||
      !formData.email ||
      !formData.phone ||
      !formData.date ||
      !formData.time ||
      !formData.consultationType
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Phone validation (basic)
    if (formData.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    // Past date check
    if (isPastDate(formData.date)) {
      toast.error("Cannot select a past date");
      return;
    }

    // Date availability validation
    if (!checkDateAvailability(formData.date)) {
      const availableDays =
        doctor.available_days?.join(", ") || "available days";
      toast.error(`Doctor is only available on: ${availableDays}`);
      return;
    }

    // Check if selected time slot is available
    if (!isSlotAvailable(formData.time, getBookedSlotsForDate(bookedAppointments, formData.date))) {
      toast.error("Selected time slot is no longer available. Please select another time.");
      return;
    }

    try {
      // Get current user data
      const userData = getUserData();
      if (!userData || !userData._id) {
        toast.error("Please login to book an appointment");
        navigate("/sign-in");
        return;
      }

      // Prepare appointment data according to API requirements
      const appointmentData = {
        doctorId: id,
        appointmentDate: formData.date,
        timeSlot: formData.time,
        consultationType: formData.consultationType,
      };

      // Call the API to create appointment
      const response = await createAppointment(appointmentData);

      if (response.message) {
        toast.success(response.message);

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/doctors"); // Redirect to doctors list or dashboard
        }, 2000);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error(
        error.message || "Failed to book appointment. Please try again.",
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Doctor Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The doctor you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/doctors")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate(`/doctor/${id}`)}
            className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2"
          >
            ← Back to Doctor Details
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Book Appointment</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <div className="text-center mb-4">
                <img
                  src={doctor.profile_image}
                  alt={doctor.fullName}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-blue-100"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {doctor.fullName}
                </h3>
                <p className="text-blue-600 font-medium">{doctor.specialty}</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <span>💼</span>
                  <span>{doctor.experience} years experience</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>📍</span>
                  <span>{doctor.city}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>💰</span>
                  <span>Consultation Fee: ${doctor.consulation_fee}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">
                  📅 Available Days
                </h4>
                {doctor.available_days && doctor.available_days.length > 0 ? (
                  <div className="space-y-1">
                    {doctor.available_days.map((day, index) => (
                      <p key={index} className="text-sm text-gray-600">
                        • {day}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">Monday - Saturday</p>
                )}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Appointment Details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Patient Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Appointment Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleDateChange}
                      min={today}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time <span className="text-red-500">*</span>
                    </label>
                    {loadingSlots ? (
                      <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span className="text-sm text-gray-600">Loading available slots...</span>
                      </div>
                    ) : (
                      <select
                        name="time"
                        value={formData.time}
                        onChange={(e) => {
                          setFormData((prev) => ({
                            ...prev,
                            [e.target.name]: e.target.value,
                          }));
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        disabled={selectedDateSlots.length === 0 && formData.date}
                      >
                        <option value="">
                          {selectedDateSlots.length === 0 && formData.date
                            ? "No available slots for this date"
                            : "Select a time"}
                        </option>
                        {selectedDateSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    )}
                    {doctor?.available_days &&
                      doctor.available_days.length > 0 && (
                        <p className="mt-1 text-sm text-gray-500">
                          Available on: {doctor.available_days.join(", ")}
                        </p>
                      )}
                  </div>
                </div>

                {/* Consultation Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consultation Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="consultationType"
                    value={formData.consultationType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select consultation type</option>
                    {getAvailableConsultationTypes().map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {doctor && (
                    <p className="mt-1 text-sm text-gray-500">
                      Available:{" "}
                      {doctor.consulation_type === "Both"
                        ? "Clinic & Online"
                        : doctor.consulation_type}
                    </p>
                  )}
                </div>

                {/* Reason for Visit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Visit
                  </label>
                  <input
                    type="text"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Regular checkup, consultation"
                  />
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Any specific concerns or information you'd like the doctor to know..."
                  ></textarea>
                </div>

                {/* Terms and Submit */}
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      ⚠️ <strong>Note:</strong> Your appointment is subject to
                      confirmation. You will receive a confirmation email or
                      call within 24 hours.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => navigate(`/doctor/${id}`)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookAppointmentPage;

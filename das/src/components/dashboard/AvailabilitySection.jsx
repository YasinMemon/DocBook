import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { getDoctorAvailability, updateDoctorSchedule } from "../../api/auth";

const AvailabilitySection = () => {
  const { doctor } = useAuth();
  const isPending = doctor?.verificationStatus === "pending";
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(true);
  const [availabilityError, setAvailabilityError] = useState("");
  const [editedSchedule, setEditedSchedule] = useState({});
  const [availability, setAvailability] = useState({
    available_days: doctor?.available_days || [],
    time_slots: doctor?.time_slots || [],
  });

  // Available time slot options
  const TIME_SLOTS = [
    { id: "Morning", label: "Morning", time: "9:00 AM - 12:00 PM", apiFormat: "09:00-12:00" },
    { id: "Afternoon", label: "Afternoon", time: "12:00 PM - 5:00 PM", apiFormat: "12:00-17:00" },
    { id: "Evening", label: "Evening", time: "5:00 PM - 9:00 PM", apiFormat: "17:00-21:00" },
  ];

  const normalizeSlot = (slot) => {
    if (!slot) return "";
    const normalized = slot.toLowerCase();
    if (normalized === "09:00-12:00") return "morning";
    if (normalized === "12:00-17:00") return "afternoon";
    if (normalized === "17:00-21:00") return "evening";
    return normalized;
  };

  const fetchAvailability = useCallback(async () => {
    try {
      setIsLoadingAvailability(true);
      setAvailabilityError("");
      const response = await getDoctorAvailability();

      setAvailability({
        available_days: response?.available_days || [],
        time_slots: (response?.time_slots || []).map(normalizeSlot),
      });
    } catch (error) {
      console.error("Error fetching availability:", error);
      setAvailabilityError(error.message || "Failed to load availability");
    } finally {
      setIsLoadingAvailability(false);
    }
  }, []);

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  // Convert slot names to API format
  const convertToApiFormat = (slotName) => {
    const slot = TIME_SLOTS.find(s => s.id.toLowerCase() === slotName.toLowerCase());
    return slot ? slot.apiFormat : null;
  };

  // Convert time slot names to readable time ranges
  const getTimeRangeForSlot = (slot) => {
    const slotLower = slot?.toLowerCase();
    const timeRanges = {
      morning: "9:00 AM - 12:00 PM",
      afternoon: "12:00 PM - 5:00 PM",
      evening: "5:00 PM - 9:00 PM",
    };
    return timeRanges[slotLower] || slot;
  };

  // Generate display text for time slots
  const getSlotsDisplayText = (slots) => {
    if (!slots || slots.length === 0) return "Unavailable";

    const timeRanges = slots
      .map((slot) => getTimeRangeForSlot(slot))
      .filter((range) => range !== "Unavailable");

    if (timeRanges.length === 0) return "Unavailable";

    const uniqueRanges = [...new Set(timeRanges)];
    if (uniqueRanges.length === 1) {
      return uniqueRanges[0];
    }

    const allSlots = slots.map((s) => s.toLowerCase());

    if (
      allSlots.includes("morning") &&
      allSlots.includes("afternoon") &&
      allSlots.includes("evening")
    ) {
      return "9:00 AM - 9:00 PM";
    } else if (allSlots.includes("morning") && allSlots.includes("afternoon")) {
      return "9:00 AM - 5:00 PM";
    } else if (allSlots.includes("afternoon") && allSlots.includes("evening")) {
      return "12:00 PM - 9:00 PM";
    }

    return uniqueRanges.join(", ");
  };

  // Generate weekly schedule from doctor's data
  const weekDays = useMemo(() => {
    const allDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    return allDays.map((day) => {
      const isAvailable = availability?.available_days?.includes(day) || false;

      // Generate slots display from time_slots
      const slotsDisplay = isAvailable
        ? getSlotsDisplayText(availability?.time_slots)
        : "Unavailable";

      return {
        day,
        available: isAvailable,
        slots: slotsDisplay,
        selectedSlots: isAvailable ? availability?.time_slots || [] : [],
      };
    });
  }, [availability?.available_days, availability?.time_slots]);

  // Initialize edit mode with current schedule
  const handleEditClick = () => {
    const initialSchedule = {};
    weekDays.forEach((dayData) => {
      initialSchedule[dayData.day] = {
        enabled: dayData.available,
        slots: dayData.selectedSlots.map((s) => s.toLowerCase()),
      };
    });
    setEditedSchedule(initialSchedule);
    setIsEditMode(true);
  };

  // Toggle day availability
  const toggleDayAvailability = (day) => {
    setEditedSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day]?.enabled,
        slots: prev[day]?.enabled ? [] : prev[day]?.slots || [],
      },
    }));
  };

  // Toggle time slot for a specific day
  const toggleTimeSlot = (day, slotId) => {
    const slotLower = slotId.toLowerCase();
    setEditedSchedule((prev) => {
      const currentSlots = prev[day]?.slots || [];
      const hasSlot = currentSlots.includes(slotLower);

      return {
        ...prev,
        [day]: {
          ...prev[day],
          enabled: prev[day]?.enabled || false,
          slots: hasSlot
            ? currentSlots.filter((s) => s !== slotLower)
            : [...currentSlots, slotLower],
        },
      };
    });
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditMode(false);
    setEditedSchedule({});
  };

  // Save schedule changes
  const handleSave = async () => {
    // Validate: Check if any enabled day has no time slots
    const invalidDays = Object.keys(editedSchedule).filter(
      (day) =>
        editedSchedule[day].enabled && editedSchedule[day].slots.length === 0,
    );

    if (invalidDays.length > 0) {
      alert(
        `Please select at least one time slot for: ${invalidDays.join(", ")}`,
      );
      return;
    }

    setIsSaving(true);

    try {
      // Prepare data for API
      const availableDays = Object.keys(editedSchedule).filter(
        (day) => editedSchedule[day].enabled,
      );

      // Get all unique time slots from all enabled days and convert to API format
      const allSlots = new Set();
      Object.values(editedSchedule).forEach((dayData) => {
        if (dayData.enabled && dayData.slots) {
          dayData.slots.forEach((slot) => {
            const apiFormat = convertToApiFormat(slot);
            if (apiFormat) allSlots.add(apiFormat);
          });
        }
      });

      const scheduleData = {
        available_days: availableDays,
        time_slots: Array.from(allSlots),
      };

      console.log("Schedule to save:", scheduleData);

      // Call the API
      const response = await updateDoctorSchedule(scheduleData);

      console.log("API Response:", response);

      // Reflect changes instantly, then sync with server source of truth.
      setAvailability({
        available_days: availableDays,
        time_slots: Array.from(allSlots).map(normalizeSlot),
      });
      await fetchAvailability();

      // Show success message
      alert(response.message || "Schedule updated successfully!");

      setIsEditMode(false);
      setEditedSchedule({});
    } catch (error) {
      console.error("Error saving schedule:", error);
      const errorMessage = error.message || "Failed to save schedule. Please try again.";
      alert(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {isLoadingAvailability && !isEditMode && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">Loading your latest availability...</p>
        </div>
      )}

      {availabilityError && !isEditMode && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-red-800">{availabilityError}</p>
            <button
              onClick={fetchAvailability}
              className="px-3 py-1.5 text-xs font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Availability Settings
        </h2>
        {!isEditMode ? (
          <div className="relative group">
            <button
              onClick={handleEditClick}
              disabled={isPending}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isPending
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              Edit Schedule
            </button>
            {isPending && (
              <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                Feature available after approval
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="px-4 py-2 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
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
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        )}
      </div>

      {isPending && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Availability editing is disabled until your
            profile is verified.
          </p>
        </div>
      )}

      {isEditMode && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <p className="text-sm text-blue-800">
              <strong>Edit Mode:</strong> Toggle days on/off and select time
              slots for each available day. Click "Save Changes" when done.
            </p>
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => {
                  const allEnabled = {};
                  weekDays.forEach((day) => {
                    allEnabled[day.day] = {
                      enabled: true,
                      slots: ["morning", "afternoon", "evening"],
                    };
                  });
                  setEditedSchedule(allEnabled);
                }}
                className="px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Enable All Days
              </button>
              <button
                onClick={() => {
                  const allDisabled = {};
                  weekDays.forEach((day) => {
                    allDisabled[day.day] = {
                      enabled: false,
                      slots: [],
                    };
                  });
                  setEditedSchedule(allDisabled);
                }}
                className="px-3 py-1.5 text-xs font-medium bg-white border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap"
              >
                Disable All
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Weekly Schedule
        </h3>
        <div className="space-y-3">
          {weekDays.map((schedule, index) => {
            const dayData = editedSchedule[schedule.day] || {
              enabled: schedule.available,
              slots: schedule.selectedSlots.map((s) => s.toLowerCase()),
            };
            const isEnabled = isEditMode ? dayData.enabled : schedule.available;
            const currentSlots = isEditMode
              ? dayData.slots
              : schedule.selectedSlots.map((s) => s.toLowerCase());

            return (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all ${
                  isEnabled
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="w-12">
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${
                          isEnabled ? "bg-green-500" : "bg-gray-400"
                        }`}
                      ></span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {schedule.day}
                      </h4>
                      {!isEditMode && (
                        <p className="text-sm text-gray-600">
                          {schedule.slots}
                        </p>
                      )}
                    </div>
                  </div>
                  {isEditMode ? (
                    <button
                      onClick={() => toggleDayAvailability(schedule.day)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isEnabled
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-600 text-white hover:bg-gray-700"
                      }`}
                    >
                      {isEnabled ? "Enabled" : "Enable Day"}
                    </button>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isEnabled
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {isEnabled ? "Available" : "Unavailable"}
                    </span>
                  )}
                </div>

                {isEditMode && isEnabled && (
                  <div className="pl-16 space-y-2">
                    <p className="text-xs font-medium text-gray-600 mb-2">
                      Select Time Slots:
                    </p>
                    {currentSlots.length === 0 && (
                      <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                        ⚠️ Please select at least one time slot
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {TIME_SLOTS.map((slot) => {
                        const isSelected = currentSlots.includes(
                          slot.id.toLowerCase(),
                        );
                        return (
                          <button
                            key={slot.id}
                            onClick={() =>
                              toggleTimeSlot(schedule.day, slot.id)
                            }
                            className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                              isSelected
                                ? "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700"
                                : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400 hover:bg-indigo-50"
                            }`}
                          >
                            <div className="text-left">
                              <div className="font-semibold">{slot.label}</div>
                              <div className="text-xs opacity-90">
                                {slot.time}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Consultation Duration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Per Session</p>
            <p className="text-2xl font-bold text-gray-900">
              {doctor?.conclusion_duration || 30} min
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Consultation Type</p>
            <p className="text-lg font-bold text-gray-900">
              {doctor?.consulation_type || "Both"}
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Consultation Fee</p>
            <p className="text-2xl font-bold text-gray-900">
              ₹{doctor?.consulation_fee || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilitySection;

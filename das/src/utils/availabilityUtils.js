/**
 * Utility functions for managing appointment availability
 * Handles date disabling, time slot filtering, and conflict prevention
 */

/**
 * Parse time slot ranges (morning/afternoon/evening) into specific times
 * @param {string[]} slots - Array of slot names or times (e.g., ["morning", "09:00 AM"])
 * @returns {string[]} Array of formatted time slots
 */
export function parseTimeSlots(slots) {
  if (!slots || slots.length === 0) {
    // Return default time slots if none provided
    const defaultSlots = [];
    for (let hour = 9; hour <= 17; hour++) {
      const displayHour = hour > 12 ? hour - 12 : hour;
      const period = hour >= 12 ? "PM" : "AM";
      defaultSlots.push(`${displayHour}:00 ${period}`);
    }
    return defaultSlots;
  }

  const slotRanges = {
    morning: { start: 9, end: 12 },
    afternoon: { start: 12, end: 17 },
    evening: { start: 17, end: 21 },
  };

  const allSlots = [];

  slots.forEach((slot) => {
    const slotLower = slot.toLowerCase();

    if (slotRanges[slotLower]) {
      const range = slotRanges[slotLower];
      for (let hour = range.start; hour < range.end; hour++) {
        let displayHour = hour;
        let period = "AM";

        if (hour >= 12) {
          period = "PM";
          if (hour > 12) displayHour = hour - 12;
        }
        if (hour === 0) displayHour = 12;

        allSlots.push(`${displayHour}:00 ${period}`);
      }
    } else if (slot.includes(":")) {
      allSlots.push(slot);
    }
  });

  // Remove duplicates and sort
  return [...new Set(allSlots)].sort((a, b) => {
    const timeA = a.match(/(\d+):(\d+)\s*(AM|PM)/i);
    const timeB = b.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!timeA || !timeB) return 0;

    let hourA = parseInt(timeA[1]);
    let hourB = parseInt(timeB[1]);

    if (timeA[3].toUpperCase() === "PM" && hourA !== 12) hourA += 12;
    if (timeA[3].toUpperCase() === "AM" && hourA === 12) hourA = 0;
    if (timeB[3].toUpperCase() === "PM" && hourB !== 12) hourB += 12;
    if (timeB[3].toUpperCase() === "AM" && hourB === 12) hourB = 0;

    return hourA - hourB;
  });
}

/**
 * Check if a date is available for booking
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @param {string[]} availableDays - Array of available day names (e.g., ["Monday", "Wednesday"])
 * @returns {boolean} true if date is on an available day
 */
export function isDateAvailable(dateString, availableDays) {
  if (!availableDays || availableDays.length === 0) {
    return true; // If no specific days, allow all
  }

  const date = new Date(dateString);
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  return availableDays.includes(dayName);
}

/**
 * Check if date is in the past
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {boolean} true if date is in the past
 */
export function isPastDate(dateString) {
  const selectedDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate < today;
}

/**
 * Get booked time slots for a specific date
 * @param {Array} appointments - Array of appointment objects
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @param {string[]} blockedStatuses - Appointment statuses that block booking (default: ["Approved", "Scheduled"])
 * @returns {string[]} Array of booked time slots
 */
export function getBookedSlotsForDate(appointments, dateString, blockedStatuses = ["Approved", "Scheduled"]) {
  if (!appointments || appointments.length === 0) {
    return [];
  }

  const selectedDate = new Date(dateString);
  const selectedDateStr = selectedDate.toISOString().split("T")[0];

  return appointments
    .filter((apt) => {
      // Convert appointment date to string format for comparison
      const aptDate = new Date(apt.appointmentDate);
      const aptDateStr = aptDate.toISOString().split("T")[0];
      
      // Check if dates match and status blocks booking
      return aptDateStr === selectedDateStr && blockedStatuses.includes(apt.status);
    })
    .map((apt) => apt.timeSlot);
}

/**
 * Get available time slots for a specific date
 * @param {string[]} allTimeSlots - All available time slots from doctor's schedule
 * @param {string[]} bookedSlots - Already booked slots
 * @returns {string[]} Array of available time slots
 */
export function getAvailableSlotsForDate(allTimeSlots, bookedSlots) {
  if (!allTimeSlots || allTimeSlots.length === 0) {
    return [];
  }

  if (!bookedSlots || bookedSlots.length === 0) {
    return allTimeSlots;
  }

  return allTimeSlots.filter((slot) => !bookedSlots.includes(slot));
}

/**
 * Get list of dates that should be disabled in calendar
 * @param {string} minDate - Minimum date (today) in YYYY-MM-DD format
 * @param {string} maxDate - Maximum date (e.g., 90 days from now) in YYYY-MM-DD format
 * @param {string[]} availableDays - Available day names
 * @param {object} appointments - All appointments for the doctor
 * @param {string[]} allTimeSlots - All available time slots
 * @returns {Set} Set of disabled date strings in YYYY-MM-DD format
 */
export function getDisabledDates(minDate, maxDate, availableDays, appointments, allTimeSlots) {
  const disabledDates = new Set();

  if (!minDate || !maxDate) {
    return disabledDates;
  }

  const currentDate = new Date(minDate);
  const endDate = new Date(maxDate);

  // Iterate through each date in range
  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split("T")[0];
    
    // Disable if not an available day
    if (!isDateAvailable(dateStr, availableDays)) {
      disabledDates.add(dateStr);
    } else {
      // Check if all slots are booked
      const bookedSlots = getBookedSlotsForDate(appointments, dateStr);
      const availableSlots = getAvailableSlotsForDate(allTimeSlots, bookedSlots);
      
      // Disable if no available slots left
      if (availableSlots.length === 0) {
        disabledDates.add(dateStr);
      }
    }

    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return disabledDates;
}

/**
 * Format appointment data for comparison and display
 * @param {object} appointment - Appointment object from backend
 * @returns {object} Formatted appointment
 */
export function formatAppointmentData(appointment) {
  return {
    ...appointment,
    appointmentDate: new Date(appointment.appointmentDate).toISOString().split("T")[0],
  };
}

/**
 * Check if a specific time slot is available
 * @param {string} timeSlot - Time slot to check (e.g., "09:00 AM")
 * @param {string[]} bookedSlots - List of booked slots
 * @returns {boolean} true if slot is available
 */
export function isSlotAvailable(timeSlot, bookedSlots) {
  if (!bookedSlots || bookedSlots.length === 0) {
    return true;
  }
  return !bookedSlots.includes(timeSlot);
}

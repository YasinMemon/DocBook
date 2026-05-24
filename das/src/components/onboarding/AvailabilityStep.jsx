import React from "react";

const AvailabilityStep = ({
  formData,
  errors,
  handleChange,
  handleArrayChange,
}) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Availability Schedule
        </h2>
        <p className="text-gray-600">Set your consultation availability</p>
      </div>

      {/* Available Days */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Available Days <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {days.map((day) => (
            <label
              key={day}
              className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="checkbox"
                name="availableDays"
                value={day}
                checked={formData.availableDays.includes(day)}
                onChange={handleArrayChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">{day}</span>
            </label>
          ))}
        </div>
        {errors.availableDays && (
          <p className="mt-1 text-sm text-red-600">{errors.availableDays}</p>
        )}
      </div>

      {/* Time Slots */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Time Slots <span className="text-red-500">*</span>
        </label>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              name="timeSlots"
              value="morning"
              checked={formData.timeSlots.includes("morning")}
              onChange={handleArrayChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <p className="font-medium text-gray-900">Morning</p>
              <p className="text-sm text-gray-500">9:00 AM - 12:00 PM</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              name="timeSlots"
              value="afternoon"
              checked={formData.timeSlots.includes("afternoon")}
              onChange={handleArrayChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <p className="font-medium text-gray-900">Afternoon</p>
              <p className="text-sm text-gray-500">12:00 PM - 5:00 PM</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              name="timeSlots"
              value="evening"
              checked={formData.timeSlots.includes("evening")}
              onChange={handleArrayChange}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <p className="font-medium text-gray-900">Evening</p>
              <p className="text-sm text-gray-500">5:00 PM - 9:00 PM</p>
            </div>
          </label>
        </div>
        {errors.timeSlots && (
          <p className="mt-1 text-sm text-red-600">{errors.timeSlots}</p>
        )}
      </div>

      {/* Consultation Duration */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Consultation Duration <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center justify-center gap-2 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="consultationDuration"
              value="15"
              checked={formData.consultationDuration === "15"}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <div className="text-center">
              <p className="font-semibold text-gray-900">15 minutes</p>
              <p className="text-xs text-gray-500">Quick consultations</p>
            </div>
          </label>

          <label className="flex items-center justify-center gap-2 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="consultationDuration"
              value="30"
              checked={formData.consultationDuration === "30"}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <div className="text-center">
              <p className="font-semibold text-gray-900">30 minutes</p>
              <p className="text-xs text-gray-500">Standard sessions</p>
            </div>
          </label>
        </div>
        {errors.consultationDuration && (
          <p className="mt-1 text-sm text-red-600">
            {errors.consultationDuration}
          </p>
        )}
      </div>
    </div>
  );
};

export default AvailabilityStep;

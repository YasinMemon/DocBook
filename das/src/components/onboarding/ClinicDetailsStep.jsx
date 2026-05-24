import React from "react";

const ClinicDetailsStep = ({ formData, errors, handleChange }) => {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Clinic & Consultation Details
        </h2>
        <p className="text-gray-600">Where and how do you see your patients?</p>
      </div>

      {/* Clinic Name */}
      <div>
        <label
          htmlFor="clinicName"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Clinic/Hospital Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="clinicName"
          name="clinicName"
          value={formData.clinicName}
          onChange={handleChange}
          placeholder="City Medical Center"
          className={`w-full px-4 py-2.5 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.clinicName
              ? "border-red-500 bg-red-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        />
        {errors.clinicName && (
          <p className="mt-1 text-sm text-red-600">{errors.clinicName}</p>
        )}
      </div>

      {/* City */}
      <div>
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          City <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="New York"
          className={`w-full px-4 py-2.5 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.city
              ? "border-red-500 bg-red-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        />
        {errors.city && (
          <p className="mt-1 text-sm text-red-600">{errors.city}</p>
        )}
      </div>

      {/* Consultation Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Consultation Type <span className="text-red-500">*</span>
        </label>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="consultationType"
              value="Clinic"
              checked={formData.consultationType === "Clinic"}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <p className="font-medium text-gray-900">In-Clinic Only</p>
              <p className="text-sm text-gray-500">
                See patients at your clinic
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="consultationType"
              value="Online"
              checked={formData.consultationType === "Online"}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <p className="font-medium text-gray-900">Online Only</p>
              <p className="text-sm text-gray-500">
                Virtual consultations via video
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="consultationType"
              value="Both"
              checked={formData.consultationType === "Both"}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <p className="font-medium text-gray-900">Both</p>
              <p className="text-sm text-gray-500">
                In-clinic and online consultations
              </p>
            </div>
          </label>
        </div>
        {errors.consultationType && (
          <p className="mt-1 text-sm text-red-600">{errors.consultationType}</p>
        )}
      </div>

      {/* Consultation Fee */}
      <div>
        <label
          htmlFor="consultationFee"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Consultation Fee (USD) <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            $
          </span>
          <input
            type="number"
            id="consultationFee"
            name="consultationFee"
            value={formData.consultationFee}
            onChange={handleChange}
            placeholder="50"
            min="0"
            step="5"
            className={`w-full pl-8 pr-4 py-2.5 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.consultationFee
                ? "border-red-500 bg-red-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          />
        </div>
        {errors.consultationFee && (
          <p className="mt-1 text-sm text-red-600">{errors.consultationFee}</p>
        )}
      </div>
    </div>
  );
};

export default ClinicDetailsStep;

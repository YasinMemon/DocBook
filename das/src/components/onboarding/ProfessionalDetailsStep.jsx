import React from "react";

const ProfessionalDetailsStep = ({ formData, errors, handleChange }) => {
  const specializations = [
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Orthopedic Surgeon",
    "Neurologist",
    "General Physician",
    "Gynecologist",
    "Psychiatrist",
    "Dentist",
    "Ophthalmologist",
    "ENT Specialist",
    "Other",
  ];

  const qualifications = [
    "MBBS",
    "MD",
    "MS",
    "DNB",
    "DM",
    "MCh",
    "BDS",
    "MDS",
    "BAMS",
    "BHMS",
    "Other",
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Professional Details
        </h2>
        <p className="text-gray-600">Tell us about your medical expertise</p>
      </div>

      {/* Specialization */}
      <div>
        <label
          htmlFor="specialization"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Specialization <span className="text-red-500">*</span>
        </label>
        <select
          id="specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.specialization
              ? "border-red-500 bg-red-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          <option value="">Select your specialization</option>
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
        {errors.specialization && (
          <p className="mt-1 text-sm text-red-600">{errors.specialization}</p>
        )}
      </div>

      {/* Years of Experience */}
      <div>
        <label
          htmlFor="experience"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Years of Experience <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="5"
          min="0"
          max="60"
          className={`w-full px-4 py-2.5 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.experience
              ? "border-red-500 bg-red-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        />
        {errors.experience && (
          <p className="mt-1 text-sm text-red-600">{errors.experience}</p>
        )}
      </div>

      {/* Qualification */}
      <div>
        <label
          htmlFor="qualification"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Qualification <span className="text-red-500">*</span>
        </label>
        <select
          id="qualification"
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.qualification
              ? "border-red-500 bg-red-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          <option value="">Select your qualification</option>
          {qualifications.map((qual) => (
            <option key={qual} value={qual}>
              {qual}
            </option>
          ))}
        </select>
        {errors.qualification && (
          <p className="mt-1 text-sm text-red-600">{errors.qualification}</p>
        )}
      </div>

      {/* Medical Registration Number */}
      <div>
        <label
          htmlFor="registrationNumber"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Medical Registration Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="registrationNumber"
          name="registrationNumber"
          value={formData.registrationNumber}
          onChange={handleChange}
          placeholder="MED123456789"
          className={`w-full px-4 py-2.5 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.registrationNumber
              ? "border-red-500 bg-red-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        />
        {errors.registrationNumber && (
          <p className="mt-1 text-sm text-red-600">
            {errors.registrationNumber}
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Enter your state medical council registration number
        </p>
      </div>
    </div>
  );
};

export default ProfessionalDetailsStep;

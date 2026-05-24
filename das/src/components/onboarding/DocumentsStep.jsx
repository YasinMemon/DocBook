import React from "react";

const DocumentsStep = ({ formData, errors, handleFileChange }) => {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Document Upload
        </h2>
        <p className="text-gray-600">
          Upload required documents for verification
        </p>
      </div>

      {/* Medical License */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Medical License Certificate <span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
          <input
            type="file"
            id="medicalLicense"
            name="medicalLicense"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="medicalLicense"
            className="cursor-pointer flex flex-col items-center"
          >
            <svg
              className="w-12 h-12 text-gray-400 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            {formData.medicalLicense ? (
              <div className="text-sm">
                <p className="font-medium text-green-600">
                  ✓ {formData.medicalLicense.name}
                </p>
                <p className="text-gray-500 mt-1">Click to change</p>
              </div>
            ) : (
              <div className="text-sm">
                <p className="font-medium text-gray-700">
                  Click to upload or drag and drop
                </p>
                <p className="text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
              </div>
            )}
          </label>
        </div>
        {errors.medicalLicense && (
          <p className="mt-1 text-sm text-red-600">{errors.medicalLicense}</p>
        )}
      </div>

      {/* ID Proof */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Government ID Proof <span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
          <input
            type="file"
            id="idProof"
            name="idProof"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="idProof"
            className="cursor-pointer flex flex-col items-center"
          >
            <svg
              className="w-12 h-12 text-gray-400 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            {formData.idProof ? (
              <div className="text-sm">
                <p className="font-medium text-green-600">
                  ✓ {formData.idProof.name}
                </p>
                <p className="text-gray-500 mt-1">Click to change</p>
              </div>
            ) : (
              <div className="text-sm">
                <p className="font-medium text-gray-700">
                  Click to upload or drag and drop
                </p>
                <p className="text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
              </div>
            )}
          </label>
        </div>
        {errors.idProof && (
          <p className="mt-1 text-sm text-red-600">{errors.idProof}</p>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Document Guidelines</p>
            <ul className="space-y-1 list-disc list-inside text-blue-800">
              <li>Documents must be clear and readable</li>
              <li>All information should be visible</li>
              <li>Accepted formats: PDF, JPG, PNG</li>
              <li>Maximum file size: 10MB per document</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsStep;

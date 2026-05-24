import React from "react";

const SpecializationHeader = ({ specialization }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-6xl">{specialization.icon}</span>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {specialization.name}
            </h1>
            <p className="text-blue-100 text-lg mt-2">
              {specialization.description}
            </p>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-2 text-white">
          <span className="text-2xl font-bold">
            {specialization.doctorCount}
          </span>
          <span className="text-blue-100">verified doctors available</span>
        </div>
      </div>
    </div>
  );
};

export default SpecializationHeader;

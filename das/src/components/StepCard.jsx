import React from "react";

const StepCard = ({ step, icon, title, description, isLast }) => {
  return (
    <div className="relative flex flex-col items-center text-center">
      {/* Step Number Badge */}
      <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-2xl mb-4 shadow-lg z-10">
        {step}
      </div>

      {/* Icon */}
      <div className="text-6xl mb-4">{icon}</div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 max-w-xs">{description}</p>

      {/* Connector Arrow (hidden on last step) */}
      {!isLast && (
        <div className="hidden lg:block absolute top-8 left-full w-full h-1">
          <div className="relative w-full h-full">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-200"></div>
            <div className="absolute top-[-4px] right-0 w-0 h-0 border-t-[5px] border-t-transparent border-l-[10px] border-l-blue-200 border-b-[5px] border-b-transparent"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepCard;

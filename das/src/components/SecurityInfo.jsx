import React from "react";

const SecurityInfo = () => {
  const securityFeatures = [
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      text: "Secure Login",
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      text: "Verified Doctors Only",
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      ),
      text: "HIPAA Compliant System",
    },
  ];

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <div className="grid grid-cols-1 gap-3">
        {securityFeatures.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-sm text-gray-600"
          >
            <div className="flex-shrink-0 w-9 h-9 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
              {feature.icon}
            </div>
            <span className="font-medium">{feature.text}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
        <p className="text-xs text-indigo-800 leading-relaxed">
          <span className="font-semibold">Security Notice:</span> This portal is
          exclusively for verified healthcare professionals. All activity is
          monitored and logged for security purposes.
        </p>
      </div>
    </div>
  );
};

export default SecurityInfo;

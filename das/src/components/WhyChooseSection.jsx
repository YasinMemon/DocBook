import React from "react";

const WhyChooseSection = ({ specialization }) => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Why Choose a {specialization.name}?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Common Problems Treated */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-4xl mb-4">🩺</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Common Problems Treated
            </h3>
            <ul className="space-y-2 text-gray-600">
              {specialization.commonProblems.map((problem, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* When to Consult */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              When to Consult
            </h3>
            <ul className="space-y-2 text-gray-600">
              {specialization.whenToConsult.map((symptom, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Benefits of Early Consultation
            </h3>
            <ul className="space-y-2 text-gray-600">
              {specialization.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;

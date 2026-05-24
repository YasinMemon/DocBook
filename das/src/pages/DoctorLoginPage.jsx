import React from "react";
import { Link } from "react-router-dom";
import DoctorLoginForm from "../components/DoctorLoginForm";
import SecurityInfo from "../components/SecurityInfo";

const DoctorLoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Left Column - Branding & Info */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 p-8 lg:p-12 flex flex-col justify-between text-white">
              {/* Header */}
              <div>
                <Link
                  to="/"
                  className="inline-flex items-center text-white hover:text-indigo-100 mb-8 transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Home
                </Link>

                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl mb-6">
                    <svg
                      className="w-8 h-8 text-white"
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
                  </div>

                  <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                    Doctor Portal
                  </h1>

                  <p className="text-lg text-indigo-100 leading-relaxed mb-8">
                    Access your dashboard, manage appointments, and grow your
                    practice with our comprehensive healthcare platform.
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {[
                    {
                      icon: (
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                          />
                        </svg>
                      ),
                      title: "Manage Appointments",
                      description: "View and organize your patient schedule",
                    },
                    {
                      icon: (
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      ),
                      title: "Patient Records",
                      description: "Secure access to patient information",
                    },
                    {
                      icon: (
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      ),
                      title: "Analytics Dashboard",
                      description: "Track your practice performance",
                    },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-indigo-100 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-8 border-t border-white/20">
                <p className="text-sm text-indigo-100">
                  Trusted by over 10,000+ healthcare professionals worldwide
                </p>
              </div>
            </div>

            {/* Right Column - Login Form */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-600">
                  Sign in to your doctor account to continue
                </p>
              </div>

              <DoctorLoginForm />

              <SecurityInfo />

              {/* Patient Login Link */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  Are you a patient?{" "}
                  <Link
                    to="/sign-in"
                    className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
                  >
                    Patient Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorLoginPage;

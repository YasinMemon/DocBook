import React from "react";
import { useNavigate } from "react-router-dom";

const AboutUsPage = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: "🤝",
      title: "Trust & Transparency",
      description:
        "We believe in complete transparency with verified doctor credentials and honest reviews",
    },
    {
      icon: "❤️",
      title: "Patient-First Approach",
      description:
        "Every decision we make prioritizes patient convenience, safety, and satisfaction",
    },
    {
      icon: "⭐",
      title: "Quality Healthcare Access",
      description:
        "Connecting patients with top-quality healthcare professionals across all specializations",
    },
    {
      icon: "💡",
      title: "Technology-Driven Solutions",
      description:
        "Leveraging modern technology to make healthcare access simple and efficient",
    },
  ];

  const whyChooseUs = [
    {
      icon: "✓",
      title: "Verified Doctors",
      description:
        "Every doctor is thoroughly vetted with verified credentials and licenses",
    },
    {
      icon: "🔒",
      title: "Secure Booking Process",
      description:
        "Your personal and medical information is protected with enterprise-grade security",
    },
    {
      icon: "🔄",
      title: "Easy Rescheduling",
      description: "Life happens. Change or cancel appointments hassle-free",
    },
    {
      icon: "📱",
      title: "User-Friendly Platform",
      description: "Simple, intuitive interface designed for users of all ages",
    },
  ];

  const problems = [
    {
      icon: "⏰",
      title: "Long Hospital Queues",
      description: "Hours wasted waiting in crowded hospitals",
    },
    {
      icon: "🔍",
      title: "Finding the Right Specialist",
      description: "Difficulty in locating qualified doctors in your area",
    },
    {
      icon: "❓",
      title: "Lack of Transparency",
      description:
        "No clear information about doctor availability and qualifications",
    },
  ];

  const solutions = [
    {
      icon: "🔍",
      title: "Smart Search",
      description:
        "Find doctors by specialization, location, and availability in seconds",
    },
    {
      icon: "👨‍⚕️",
      title: "Verified Profiles",
      description:
        "View complete doctor profiles with credentials, experience, and patient reviews",
    },
    {
      icon: "⚡",
      title: "Instant Booking",
      description:
        "Book appointments instantly and receive immediate confirmation",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero / Intro Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Us
          </h1>
          <p className="text-2xl text-blue-100 mb-8">
            Making healthcare access simpler, faster, and reliable
          </p>
          <p className="text-lg text-blue-50 leading-relaxed max-w-3xl mx-auto">
            We are on a mission to transform how people access healthcare. By
            connecting patients with verified doctors through our easy-to-use
            platform, we're eliminating the barriers that make healthcare access
            difficult and time-consuming.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <div className="bg-blue-50 rounded-xl p-8 md:p-12">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              To make quality healthcare accessible to everyone by simplifying
              the way people find and connect with the right medical
              professionals.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <p className="text-gray-700 font-medium">
                  Help users find the right doctor
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⏱️</div>
                <p className="text-gray-700 font-medium">Reduce waiting time</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">✨</div>
                <p className="text-gray-700 font-medium">
                  Make booking seamless
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Problem We Solve
            </h2>
            <p className="text-lg text-gray-600">
              We understand the challenges patients face when seeking healthcare
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md text-center"
              >
                <div className="text-5xl mb-4">{problem.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {problem.title}
                </h3>
                <p className="text-gray-600">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Solution
            </h2>
            <p className="text-lg text-gray-600">
              A platform designed to eliminate healthcare access barriers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center hover:shadow-lg transition duration-300"
              >
                <div className="text-5xl mb-4">{solution.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {solution.title}
                </h3>
                <p className="text-gray-600">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 text-center"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600">
              Built with trust, security, and convenience in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 bg-blue-50 rounded-xl p-6 hover:bg-blue-100 transition duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    {item.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section (Optional) */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Built by Healthcare Enthusiasts
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Our team combines healthcare expertise with cutting-edge technology
            to create a platform that truly serves patients and doctors alike.
            We're passionate about making healthcare access better for everyone.
          </p>
          <div className="flex justify-center gap-4 text-4xl">👨‍💻 👩‍⚕️ 👨‍⚕️ 👩‍💻</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your Health, Our Priority
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of patients who trust us for their healthcare needs
          </p>
          <button
            onClick={() => navigate("/doctors")}
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-10 rounded-lg text-lg transition duration-200 shadow-xl hover:shadow-2xl"
          >
            Find a Doctor
          </button>
          <p className="text-blue-100 mt-6 text-sm">
            Start your journey to better health today
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;

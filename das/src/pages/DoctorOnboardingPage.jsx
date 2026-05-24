import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StepIndicator from "../components/onboarding/StepIndicator";
import BasicInfoStep from "../components/onboarding/BasicInfoStep";
import ProfessionalDetailsStep from "../components/onboarding/ProfessionalDetailsStep";
import ClinicDetailsStep from "../components/onboarding/ClinicDetailsStep";
import AvailabilityStep from "../components/onboarding/AvailabilityStep";
import DocumentsStep from "../components/onboarding/DocumentsStep";
import SuccessStep from "../components/onboarding/SuccessStep";
import { registerDoctor } from "../api/auth";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const DoctorOnboardingPage = () => {
  const navigate = useNavigate();
  const { loginDoctor } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    profileImage: null,

    // Step 2: Professional Details
    specialization: "",
    experience: "",
    qualification: "",
    registrationNumber: "",

    // Step 3: Clinic Details
    clinicName: "",
    city: "",
    consultationType: "",
    consultationFee: "",

    // Step 4: Availability
    availableDays: [],
    timeSlots: [],
    consultationDuration: "",

    // Step 5: Documents
    medicalLicense: null,
    idProof: null,
    governmentId: "GOV123456",
  });

  const totalSteps = 6;

  // Handle text/select input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle checkbox/multi-select changes
  const handleArrayChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => {
      const currentArray = prev[name] || [];
      if (checked) {
        return { ...prev, [name]: [...currentArray, value] };
      } else {
        return {
          ...prev,
          [name]: currentArray.filter((item) => item !== value),
        };
      }
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle file upload changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      // Clear error for this field
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  // Validation functions for each step
  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.profileImage) {
      newErrors.profileImage = "Profile image is required";
    } else if (formData.profileImage.size > 5 * 1024 * 1024) {
      newErrors.profileImage = "Image size must be less than 5MB";
    } else if (!formData.profileImage.type.startsWith("image/")) {
      newErrors.profileImage = "Please upload a valid image file";
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.trim().length < 10) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.specialization) {
      newErrors.specialization = "Please select a specialization";
    }

    if (!formData.experience) {
      newErrors.experience = "Years of experience is required";
    } else if (formData.experience < 0 || formData.experience > 60) {
      newErrors.experience = "Please enter a valid number (0-60)";
    }

    if (!formData.qualification) {
      newErrors.qualification = "Please select your qualification";
    }

    if (!formData.registrationNumber.trim()) {
      newErrors.registrationNumber = "Medical registration number is required";
    } else if (formData.registrationNumber.trim().length < 5) {
      newErrors.registrationNumber = "Please enter a valid registration number";
    }

    return newErrors;
  };

  const validateStep3 = () => {
    const newErrors = {};

    if (!formData.clinicName.trim()) {
      newErrors.clinicName = "Clinic/Hospital name is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.consultationType) {
      newErrors.consultationType = "Please select a consultation type";
    }

    if (!formData.consultationFee) {
      newErrors.consultationFee = "Consultation fee is required";
    } else if (formData.consultationFee < 0) {
      newErrors.consultationFee = "Fee must be a positive number";
    }

    return newErrors;
  };

  const validateStep4 = () => {
    const newErrors = {};

    if (formData.availableDays.length === 0) {
      newErrors.availableDays = "Please select at least one available day";
    }

    if (formData.timeSlots.length === 0) {
      newErrors.timeSlots = "Please select at least one time slot";
    }

    if (!formData.consultationDuration) {
      newErrors.consultationDuration = "Please select consultation duration";
    }

    return newErrors;
  };

  const validateStep5 = () => {
    const newErrors = {};

    if (!formData.medicalLicense) {
      newErrors.medicalLicense = "Medical license is required";
    }

    if (!formData.idProof) {
      newErrors.idProof = "ID proof is required";
    }

    return newErrors;
  };

  // Handle next button click
  const handleNext = () => {
    let stepErrors = {};

    switch (currentStep) {
      case 1:
        stepErrors = validateStep1();
        break;
      case 2:
        stepErrors = validateStep2();
        break;
      case 3:
        stepErrors = validateStep3();
        break;
      case 4:
        stepErrors = validateStep4();
        break;
      case 5:
        stepErrors = validateStep5();
        break;
      default:
        break;
    }

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      const firstError = Object.values(stepErrors)[0];
      if (firstError) toast.error(firstError);
      return;
    }

    setErrors({});
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  // Handle back button click
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
  };

  // Handle form submission
  const handleSubmit = async () => {
    const stepErrors = validateStep5();

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      const firstError = Object.values(stepErrors)[0];
      if (firstError) toast.error(firstError);
      return;
    }

    setIsSubmitting(true);

    try {
      // Build FormData directly to match backend expectations
      const fd = new FormData();

      // Add all text fields
      fd.append("fullName", formData.fullName);
      fd.append("email", formData.email);
      fd.append("phone", formData.phone);
      fd.append("password", formData.password);
      fd.append("specialty", formData.specialization);
      fd.append("experience", formData.experience || "0");
      fd.append("qualifications", formData.qualification || "");
      fd.append("registration_number", formData.registrationNumber);
      fd.append("hospital_name", formData.clinicName);
      fd.append("city", formData.city);
      fd.append("consulation_type", formData.consultationType);
      fd.append("consulation_fee", formData.consultationFee || "0");

      // Handle arrays - send as JSON strings for backend to parse
      if (formData.availableDays && formData.availableDays.length > 0) {
        fd.append("available_days", JSON.stringify(formData.availableDays));
      }
      if (formData.timeSlots && formData.timeSlots.length > 0) {
        fd.append("time_slots", JSON.stringify(formData.timeSlots));
      }
      fd.append("conclusion_duration", formData.consultationDuration || "15");

      // Add file uploads
      if (formData.profileImage) {
        fd.append("profile_image", formData.profileImage);
      }
      if (formData.medicalLicense) {
        fd.append("medical_license", formData.medicalLicense);
      }
      if (formData.idProof) {
        fd.append("goverment_id", formData.idProof);
      }

      const response = await registerDoctor(fd);

      console.log("Doctor registration success:", response);
      toast.success("Registration submitted for verification.");

      // Store token if provided
      if (response.token) {
        localStorage.setItem("doctorAuthToken", response.token);
      }

      // Login the doctor with their data
      loginDoctor({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        specialization: formData.specialization,
        experience: formData.experience,
        qualification: formData.qualification,
        registrationNumber: formData.registrationNumber,
        clinicName: formData.clinicName,
        city: formData.city,
      });

      setErrors({});

      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        navigate("/doctor/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Doctor registration failed:", err);
      const message =
        err?.data?.message || err?.message || "Registration failed";
      toast.error(message);
      setErrors((prev) => ({ ...prev, form: message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render current step component
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
          />
        );
      case 2:
        return (
          <ProfessionalDetailsStep
            formData={formData}
            errors={errors}
            handleChange={handleChange}
          />
        );
      case 3:
        return (
          <ClinicDetailsStep
            formData={formData}
            errors={errors}
            handleChange={handleChange}
          />
        );
      case 4:
        return (
          <AvailabilityStep
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleArrayChange={handleArrayChange}
          />
        );
      case 5:
        return (
          <DocumentsStep
            formData={formData}
            errors={errors}
            handleFileChange={handleFileChange}
          />
        );
      case 6:
        return <SuccessStep />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4"
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Doctor Registration
          </h1>
          <p className="text-gray-600">
            Join our platform and start connecting with patients
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* Step Indicator */}
          {currentStep < 6 && (
            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
          )}

          {/* Step Content */}
          <div className="mt-8">{renderStep()}</div>

          {/* Show server/form error */}
          {errors.form && (
            <p className="mt-4 text-sm text-red-600">{errors.form}</p>
          )}

          {/* Navigation Buttons */}
          {currentStep < 6 && (
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              {currentStep > 1 && (
                <button
                  onClick={handleBack}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Back
                </button>
              )}

              {currentStep < 5 ? (
                <button
                  onClick={handleNext}
                  className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    currentStep === 1 ? "flex-1" : "flex-1"
                  }`}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting…" : "Submit for Verification"}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Help Text */}
        {currentStep < 6 && (
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Need help?{" "}
              <a
                href="mailto:support@docbook.com"
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Contact our support team
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorOnboardingPage;

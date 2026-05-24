import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, ArrowRight, ShieldCheck, Star, Users } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    specialization: "",
    location: "",
    date: "",
  });

  const specializations = [
    "Cardiologist",
    "Dermatologist",
    "Dentist",
    "Pediatrician",
    "Orthopedic",
    "Neurologist",
    "Psychiatrist",
    "General Physician",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Build query string from form data
    const queryParams = new URLSearchParams();
    if (formData.specialization) queryParams.append("specialization", formData.specialization);
    if (formData.location) queryParams.append("location", formData.location);
    if (formData.date) queryParams.append("date", formData.date);
    
    // Navigate to doctors page with filters
    navigate(`/doctors?${queryParams.toString()}`);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="relative bg-[#F8FAFC] pt-20 pb-32 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full mb-8">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-bold text-blue-700 uppercase tracking-wider">
              Verified Healthcare Network
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Your Health, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Simplified.
            </span>
          </h1>
          
          <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Skip the waiting room. Connect with the world's best doctors 
            through our secure, end-to-end clinical platform.
          </p>
        </div>

        {/* Professional Search Bar */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-2 rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] border border-slate-100">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row items-center gap-2"
            >
              {/* Specialization Input */}
              <div className="w-full md:flex-1 relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Search className="w-5 h-5" />
                </div>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-5 bg-transparent border-none focus:ring-0 text-slate-700 font-medium appearance-none cursor-pointer"
                >
                  <option value="">Search Specialty</option>
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-8 bg-slate-200" />

              {/* Location Input */}
              <div className="w-full md:flex-1 relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-5 bg-transparent border-none focus:ring-0 text-slate-700 font-medium placeholder:text-slate-400"
                />
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-8 bg-slate-200" />

              {/* Date Input */}
              <div className="w-full md:flex-1 relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Calendar className="w-5 h-5" />
                </div>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-5 bg-transparent border-none focus:ring-0 text-slate-700 font-medium"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 px-10 rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-200"
              >
                <span>Find Doctors</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Social Proof / Trust Bar */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-slate-900" />
            <span className="font-bold text-slate-900">10k+ Happy Patients</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span className="font-bold text-slate-900">4.9/5 Average Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <span className="font-bold text-slate-900">HIPAA Compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
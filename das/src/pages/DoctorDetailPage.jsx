import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVerifiedDoctors } from "../api/auth";
import { 
  ChevronLeft, 
  MapPin, 
  Clock, 
  Award, 
  DollarSign, 
  Calendar, 
  ShieldCheck, 
  Mail, 
  Phone,
  Building2
} from "lucide-react";
import Footer from "../components/Footer";

const DoctorDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("about");

  useEffect(() => {
    const fetchDoctorDetail = async () => {
      try {
        setLoading(true);
        const response = await getVerifiedDoctors();
        if (response.status && response.doctors) {
          const foundDoctor = response.doctors.find(
            (doc) => doc._id === id || doc.id === id
          );
          setDoctor(foundDoctor);
        }
      } catch (err) {
        console.error("Error fetching doctor details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctorDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="relative">
          <div className="h-20 w-20 rounded-full border-t-4 border-b-4 border-blue-600 animate-spin"></div>
          <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-t-4 border-b-4 border-blue-200 opacity-20"></div>
        </div>
        <p className="mt-6 text-gray-500 font-medium animate-pulse">Loading specialist profile...</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="max-w-md text-center">
          <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Profile Unavailable</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            We couldn't find the medical professional you're looking for. They may have updated their profile or moved.
          </p>
          <button
            onClick={() => navigate("/doctors")}
            className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-all shadow-lg"
          >
            Return to Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 pb-32 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/doctors")}
            className="flex items-center gap-2 text-blue-100 hover:text-white mb-8 transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Specialist List</span>
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="relative">
              <img
                src={doctor.profile_image}
                alt={doctor.fullName}
                className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-4 border-white/20 shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 p-1.5 rounded-full border-4 border-[#1E40AF]">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="text-white">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                  {doctor.fullName}
                </h1>
                <span className="bg-blue-500/30 text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider border border-white/20">
                  Verified
                </span>
              </div>
              <p className="text-xl text-blue-100 font-light mb-4 italic">
                {doctor.specialty} Specialist
              </p>
              
              <div className="flex flex-wrap gap-6 text-sm text-blue-50">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-300" />
                  <span>{doctor.experience}+ Years Exp.</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-300" />
                  <span>{doctor.city}, {doctor.state || 'Primary Office'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-blue-300" />
                  <span>${doctor.consulation_fee} Consultation Fee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Tabs & Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex border-b border-gray-100 bg-gray-50/50">
                {["about", "clinic", "availability"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-8 py-5 text-sm font-bold uppercase tracking-wider transition-all relative ${
                      selectedTab === tab 
                      ? "text-blue-600" 
                      : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {tab}
                    {selectedTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>
                    )}
                  </button>
                ))}
              </div>

              <div className="p-8">
                {selectedTab === "about" && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Biography</h3>
                    <p className="text-gray-600 leading-relaxed text-lg mb-8">
                      {doctor.bio || `Dr. ${doctor.fullName} is a distinguished ${doctor.specialty} dedicated to providing evidence-based clinical excellence. With over ${doctor.experience} years of practice, they focus on patient-centered care and innovative treatments.`}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <h4 className="font-bold text-blue-900 mb-1">Education</h4>
                        <p className="text-blue-800/80">{doctor.qualification || "Board Certified Medical Professional"}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <h4 className="font-bold text-gray-900 mb-1">Medical License</h4>
                        <p className="text-gray-600">#{doctor.medical_license_number || "Verified Provider"}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === "clinic" && (
                  <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="flex items-start gap-5">
                      <div className="bg-blue-100 p-3 rounded-xl">
                        <Building2 className="w-6 h-6 text-blue-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{doctor.clinic_name || "Excellence Health Center"}</h3>
                        <p className="text-gray-600 mt-1">{doctor.clinic_address || `${doctor.city}, ${doctor.state}`}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-2 rounded-lg"><Phone className="w-5 h-5 text-gray-600" /></div>
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase">Phone</p>
                          <p className="text-gray-900 font-medium">{doctor.contact_number || "Direct line unavailable"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-2 rounded-lg"><Mail className="w-5 h-5 text-gray-600" /></div>
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase">Email</p>
                          <p className="text-gray-900 font-medium">{doctor.email || "Contact via portal"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === "availability" && (
                  <div className="animate-in fade-in duration-500">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      Consultation Hours
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {(doctor.available_days || ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]).map((day) => (
                        <div key={day} className="flex justify-between items-center p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
                          <span className="font-bold text-gray-700">{day}</span>
                          <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-bold">
                            {doctor.available_time_from || "09:00 AM"} - {doctor.available_time_to || "05:00 PM"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 p-8">
              <div className="mb-6">
                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2">Consultation Fee</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">${doctor.consulation_fee}</span>
                  <span className="text-gray-500 font-medium">/ session</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>Next available: <strong>Tomorrow</strong></span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <span>Instant Booking Confirmation</span>
                </div>
              </div>

              <button
                onClick={() => navigate(`/book-appointment/${doctor._id || doctor.id}`)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95"
              >
                Book Appointment
              </button>
              
              <p className="text-center text-xs text-gray-400 mt-6">
                No charges applied until the appointment is confirmed by the doctor.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DoctorDetailPage;
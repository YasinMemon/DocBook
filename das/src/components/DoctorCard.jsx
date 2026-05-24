import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  MapPin, 
  Briefcase, 
  CircleDollarSign, 
  Star, 
  ShieldCheck, 
  ArrowUpRight 
} from "lucide-react";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/doctor/${doctor._id || doctor.id}`);
  };

  const handleBookAppointment = (e) => {
    e.stopPropagation();
    navigate(`/book-appointment/${doctor._id || doctor.id}`);
  };

  return (
    <div 
      onClick={handleViewProfile}
      className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 cursor-pointer overflow-hidden relative"
    >
      {/* Top Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

      <div className="p-6">
        {/* Header: Image & Name */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-md">
              <img
                src={doctor.profile_image}
                alt={doctor.fullName}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1 rounded-lg shadow-lg border-2 border-white">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                {doctor.fullName}
              </h3>
              <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mt-1">
              {doctor.specialty}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-3 py-4 border-t border-slate-50 mb-6">
          <div className="flex items-center gap-3 text-slate-500">
            <div className="bg-slate-100 p-1.5 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">{doctor.city}</span>
          </div>

          <div className="flex items-center gap-3 text-slate-500">
            <div className="bg-slate-100 p-1.5 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">{doctor.experience} Years of Practice</span>
          </div>

          <div className="flex items-center gap-3 text-slate-500">
            <div className="bg-slate-100 p-1.5 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
              <CircleDollarSign className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-slate-900">${doctor.consulation_fee} <span className="text-slate-400 font-normal">per session</span></span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={handleBookAppointment}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-2xl transition-all shadow-lg shadow-blue-100 active:scale-95"
          >
            Book Now
          </button>
          {/* <button 
            className="px-4 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl transition-all border border-slate-100"
            aria-label="Save for later"
          >
            <Star className="w-5 h-5 group-hover:fill-amber-400 group-hover:text-amber-400 transition-all" />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
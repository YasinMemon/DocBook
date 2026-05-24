import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  HeartPulse, 
  UserRound, 
  Baby, 
  Stethoscope, 
  Brain, 
  Activity, 
  ArrowRight,
  Sparkles,
  Smile
} from "lucide-react";

const PopularSpecializations = () => {
  const navigate = useNavigate();

  const specializations = [
    {
      name: "Cardiologist",
      type: "cardiologist",
      description: "Comprehensive heart & cardiovascular wellness.",
      icon: <HeartPulse className="w-8 h-8 text-rose-500" />,
      color: "bg-rose-50",
      doctorCount: "120+ Specialists",
    },
    {
      name: "Dermatologist",
      type: "dermatologist",
      description: "Advanced skin, hair, and nail therapeutic care.",
      icon: <Sparkles className="w-8 h-8 text-emerald-500" />,
      color: "bg-emerald-50",
      doctorCount: "85+ Specialists",
    },
    {
      name: "Dentist",
      type: "dentist",
      description: "Oral health, hygiene, and cosmetic dentistry.",
      icon: <Smile className="w-8 h-8 text-blue-500" />,
      color: "bg-blue-50",
      doctorCount: "150+ Specialists",
    },
    {
      name: "Pediatrician",
      type: "pediatrician",
      description: "Expert medical care for infants and children.",
      icon: <Baby className="w-8 h-8 text-amber-500" />,
      color: "bg-amber-50",
      doctorCount: "95+ Specialists",
    },
    {
      name: "Orthopedic",
      type: "orthopedic",
      description: "Specialized bone, joint, and muscle treatments.",
      icon: <Activity className="w-8 h-8 text-indigo-500" />,
      color: "bg-indigo-50",
      doctorCount: "75+ Specialists",
    },
    {
      name: "Neurologist",
      type: "neurologist",
      description: "Intricate brain and nervous system diagnostics.",
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      color: "bg-purple-50",
      doctorCount: "60+ Specialists",
    },
  ];

  const handleClick = (type) => {
    navigate(`/specialization/${type}`);
  };

  return (
    <section id="specializations" className="py-24 px-4 bg-white overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-100 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative ">
        <div className="flex flex-col items-center justify-center text-center mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">
              Medical Departments
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Top-Rated <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Specializations</span>
            </h3>
            <p className="mt-4 text-xl text-gray-500 font-light">
              Connect with world-class experts across various medical fields.
            </p>
          </div>
          <button 
            onClick={() => navigate('/specializations')}
            className="hidden md:flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors group mx-auto"
          >
            View All Categories
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specializations.map((spec, index) => (
            <div
              key={index}
              onClick={() => handleClick(spec.type)}
              className="group relative bg-white rounded-[2rem] p-8 cursor-pointer border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Hover Background Accent */}
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-blue-600 rounded-full p-2">
                   <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className={`${spec.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                {spec.icon}
              </div>

              <h4 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {spec.name}
              </h4>
              
              <p className="text-gray-500 leading-relaxed mb-6 font-medium">
                {spec.description}
              </p>

              <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-400 group-hover:text-gray-900 transition-colors">
                   {spec.doctorCount}
                </span>
                <span className="text-xs font-black uppercase tracking-tighter text-blue-600/0 group-hover:text-blue-600 transition-all">
                  Book Now
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 md:hidden">
          <button 
            onClick={() => navigate('/specializations')}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-2xl font-bold"
          >
            Explore All Departments
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularSpecializations;
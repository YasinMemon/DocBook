import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Heart, 
  Sparkles, 
  Baby, 
  Activity, 
  Brain, 
  MessageSquare, 
  Stethoscope, 
  Search,
  ChevronRight,
  Ear
} from "lucide-react";

const SpecializationsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Map icons to types for a consistent look
  const specializations = [
    { name: "Cardiologist", type: "cardiologist", icon: <Heart />, color: "text-rose-500", bg: "bg-rose-50", doctorCount: "120+", description: "Heart & blood vessel specialists helping you stay healthy", conditions: ["High blood pressure", "Heart disease", "Chest pain"] },
    { name: "Dermatologist", type: "dermatologist", icon: <Sparkles />, color: "text-amber-500", bg: "bg-amber-50", doctorCount: "85+", description: "Skin, hair & nail treatment specialists", conditions: ["Acne", "Skin allergies", "Psoriasis"] },
    { name: "Pediatrician", type: "pediatrician", icon: <Baby />, color: "text-blue-500", bg: "bg-blue-50", doctorCount: "95+", description: "Child health & development specialists", conditions: ["Common cold", "Vaccinations", "Allergies"] },
    { name: "Orthopedic", type: "orthopedic", icon: <Activity />, color: "text-emerald-500", bg: "bg-emerald-50", doctorCount: "75+", description: "Bone, joint & muscle specialists", conditions: ["Arthritis", "Fractures", "Back pain"] },
    { name: "Neurologist", type: "neurologist", icon: <Brain />, color: "text-purple-500", bg: "bg-purple-50", doctorCount: "60+", description: "Brain & nervous system specialists", conditions: ["Migraines", "Epilepsy", "Stroke"] },
    { name: "Psychiatrist", type: "psychiatrist", icon: <MessageSquare />, color: "text-indigo-500", bg: "bg-indigo-50", doctorCount: "55+", description: "Mental health & behavioral specialists", conditions: ["Depression", "Anxiety", "PTSD"] },
    { name: "General Physician", type: "general-physician", icon: <Stethoscope />, color: "text-slate-600", bg: "bg-slate-100", doctorCount: "180+", description: "Primary care & general health specialists", conditions: ["Fever", "Flu", "General health"] },
    { name: "ENT Specialist", type: "ent-specialist", icon: <Ear />, color: "text-cyan-500", bg: "bg-cyan-50", doctorCount: "45+", description: "Ear, nose & throat specialists", conditions: ["Hearing", "Sinus", "Infections"] },
  ];

  const filteredSpecs = specializations.filter(spec => 
    spec.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* HERO SECTION */}
      <div className="bg-white border-b border-slate-200 pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Find the right <span className="text-blue-600">Specialist</span>
          </h1>
          <p className="text-lg text-slate-500 mb-10 font-medium">
            Search through our network of verified experts across all medical fields.
          </p>
          
          {/* SEARCH BAR */}
          <div className="relative max-w-2xl mx-auto group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text"
              placeholder="Search by specialty (e.g. Heart, Skin, Child)..."
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-900 shadow-sm"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* SPECIALIZATIONS GRID */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSpecs.map((spec, index) => (
              <div
                key={index}
                onClick={() => navigate(`/specialization/${spec.type}`)}
                className="bg-white rounded-[2rem] border border-slate-100 p-8 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300 cursor-pointer group relative overflow-hidden"
              >
                {/* ICON BOX */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 ${spec.bg} ${spec.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                    {React.cloneElement(spec.icon, { size: 28, strokeWidth: 2.5 })}
                  </div>
                  <span className="bg-slate-50 text-slate-400 text-xs font-bold px-3 py-1 rounded-full border border-slate-100">
                    {spec.doctorCount} Specialists
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {spec.name}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                  {spec.description}
                </p>

                {/* CONDITIONS CHIPS */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-50">
                  {spec.conditions.map((condition, idx) => (
                    <span key={idx} className="text-[10px] uppercase tracking-widest font-black text-slate-400">
                      • {condition}
                    </span>
                  ))}
                </div>

                {/* BOTTOM HOVER ACTION */}
                <div className="mt-8 flex items-center text-blue-600 font-bold text-sm">
                  Find Doctors <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
          
          {filteredSpecs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400 font-medium">No specializations match your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* HELP CARD */}
      <div className="max-w-5xl mx-auto px-4 pb-24">
        <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Can't find what you're looking for?</h2>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto font-medium">
            Our support team can help you find the right medical expert for your specific symptoms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-xl shadow-blue-500/20">
              Talk to Support
            </button>
            <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold px-8 py-4 rounded-xl transition-all">
              Browse All Doctors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecializationsPage;
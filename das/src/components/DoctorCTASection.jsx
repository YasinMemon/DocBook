import React from "react";
import { Link } from "react-router-dom";
import { ClipboardCheck, Users, TrendingUp, ArrowRight, UserPlus } from "lucide-react";

const DoctorCTASection = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="mt-8 pt-6 border-t border-slate-100 text-center">
        <p className="text-sm text-slate-500 mb-4 font-medium">Are you a healthcare professional?</p>
        <Link
          to="/doctor/onboarding"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-indigo-700 font-bold text-sm transition-colors group"
        >
          <UserPlus className="w-4 h-4" />
          Join as a Doctor
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      {/* Subtle Background Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-20 -z-10" />
      
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-slate-900 rounded-[3rem] shadow-2xl shadow-blue-900/20 overflow-hidden">
          
          {/* Decorative Glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Column - Content */}
            <div className="p-10 md:p-16 relative z-10">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-blue-500/20">
                <TrendingUp className="w-3 h-3" />
                Grow your practice
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-[1.1]">
                Partner with us to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                  reach more patients.
                </span>
              </h2>

              <p className="text-lg text-slate-400 mb-10 max-w-md leading-relaxed">
                Join our elite network of verified specialists and streamline your clinical workflow with our digital dashboard.
              </p>

              <div className="space-y-6 mb-12">
                {[
                  { icon: <Users />, title: "Discovered by thousands", desc: "Appear in local searches for your specialty." },
                  { icon: <ClipboardCheck />, title: "Digital Management", desc: "Automated booking and patient history." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
                      {React.cloneElement(item.icon, { size: 20 })}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/doctor/onboarding"
                className="inline-flex items-center justify-center gap-3 bg-white text-slate-900 hover:bg-blue-50 font-black px-10 py-5 rounded-2xl transition-all duration-300 group shadow-xl hover:shadow-blue-500/10 active:scale-95"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right Column - Premium Placeholder/Image */}
            <div className="hidden lg:block relative bg-slate-800">
              <img 
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1000&auto=format&fit=crop" 
                alt="Healthcare professional"
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity hover:opacity-100 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent" />
              
              {/* Floating Stat Card */}
              <div className="absolute bottom-12 right-12 bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-3xl animate-bounce-slow">
                <p className="text-blue-400 text-3xl font-black tracking-tighter">500k+</p>
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Active Patients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorCTASection;
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  UserCheck, 
  CalendarCheck, 
  Video, 
  ShieldCheck, 
  Zap, 
  Clock, 
  RefreshCcw,
  Users,
  Heart,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const HowItWorksPage = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: <Search className="w-7 h-7" />,
      title: "Discover Experts",
      description: "Search by specialty, location, or insurance. Filter by what matters to you.",
      color: "blue"
    },
    {
      icon: <UserCheck className="w-7 h-7" />,
      title: "Review Profiles",
      description: "Read verified patient reviews and view doctor credentials and experience.",
      color: "indigo"
    },
    {
      icon: <CalendarCheck className="w-7 h-7" />,
      title: "Book Instantly",
      description: "Pick a time that works for you. No phone calls, no waiting on hold.",
      color: "violet"
    },
    {
      icon: <Video className="w-7 h-7" />,
      title: "Receive Care",
      description: "Meet your doctor in person or via a secure, high-definition video call.",
      color: "emerald"
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-24 px-4 bg-slate-950 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[70%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-indigo-600/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-semibold mb-8 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Step-by-Step Guide
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-[1.1]">
            Your Journey to <br />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Better Health</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            We've reimagined the medical booking experience. From first search to follow-up, 
            it’s healthcare at the speed of life.
          </p>
        </div>
      </section>

      {/* --- STEP-BY-STEP PROCESS --- */}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative">
            {/* Desktop Connecting Line */}
            <div className="hidden lg:block absolute top-12 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-slate-200 to-transparent -z-10" />
            
            {steps.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="flex flex-col items-center lg:items-start">
                  <div className={`w-20 h-20 bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 rounded-3xl flex items-center justify-center text-blue-600 mb-8 group-hover:-translate-y-2 transition-all duration-500 ease-out relative z-10`}>
                    {item.icon}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-slate-900 text-white text-xs font-bold rounded-lg flex items-center justify-center shadow-lg">
                      0{idx + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-base leading-relaxed font-medium text-center lg:text-left">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHO IS THIS FOR? (FEATURE GRID) --- */}
      <section className="py-32 px-4 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Designed for Everyone.</h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                Whether you're a digital native or someone who prefers simplicity, 
                our platform adapts to your needs.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200" />
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-white bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  50k+
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Patients", 
                desc: "Quality care without the administrative headache. Search, book, and see your doctor in minutes.",
                icon: <Heart className="text-rose-500 w-6 h-6" />,
                features: ["Smart Filters", "One-Tap Booking"]
              },
              { 
                title: "Families", 
                desc: "Manage dependents effortlessly. Centralize records and appointments for children and elderly parents.",
                icon: <Users className="text-blue-500 w-6 h-6" />,
                features: ["Multi-user Profiles", "Unified Dashboard"]
              },
              { 
                title: "Seniors", 
                desc: "Accessibility-first design. Large fonts, high contrast, and simplified navigation for stress-free use.",
                icon: <ShieldCheck className="text-emerald-500 w-6 h-6" />,
                features: ["Simplified Interface", "SMS Confirmations"]
              }
            ].map((card, i) => (
              <div key={i} className="group bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{card.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-8 font-medium">{card.desc}</p>
                <ul className="space-y-3">
                  {card.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm font-bold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-500" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      [Image of a digital healthcare platform workflow showing patient search and booking steps]

      {/* --- TRUST BADGES --- */}
      <section className="py-24 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: <ShieldCheck />, title: "Verified Experts", desc: "Rigorous credential vetting." },
              { icon: <Zap />, title: "Instant Sync", desc: "Real-time clinic availability." },
              { icon: <Clock />, title: "24/7 Access", desc: "Book anytime, anywhere." },
              { icon: <RefreshCcw />, title: "Easy Rescheduling", desc: "Change plans in seconds." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="text-blue-600 mb-6 p-4 bg-blue-50 rounded-2xl">
                  {React.cloneElement(item.icon, { size: 28 })}
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-sm text-slate-500 font-medium leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto bg-slate-950 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
          {/* Decorative background circle */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1]">
              Ready to take control of your health?
            </h2>
            <p className="text-slate-400 mb-12 text-xl font-medium opacity-90">
              Join the 50,000+ patients who have found a better way to see their doctor. 
              No fees, no stress, just care.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => navigate('/doctors')}
                className="group w-full sm:w-auto bg-blue-600 text-white font-bold py-5 px-10 rounded-2xl text-lg hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2"
              >
                Start Booking Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto bg-white/5 border border-white/10 text-white font-bold py-5 px-10 rounded-2xl text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
                View All Specialities
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
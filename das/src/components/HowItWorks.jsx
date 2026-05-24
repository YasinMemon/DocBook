import React from "react";
import { Search, UserCircle, CalendarCheck, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Search Specialist",
      description: "Filter by expertise, clinical focus, or geographic proximity to find your ideal match.",
      icon: <Search className="w-8 h-8 text-blue-600" />,
      tag: "Discover"
    },
    {
      title: "Review Credentials",
      description: "Examine board certifications, clinical history, and verified patient testimonials with full transparency.",
      icon: <UserCircle className="w-8 h-8 text-indigo-600" />,
      tag: "Verify"
    },
    {
      title: "Instant Booking",
      description: "Secure your consultation in real-time with automated calendar integration and instant SMS alerts.",
      icon: <CalendarCheck className="w-8 h-8 text-emerald-600" />,
      tag: "Confirm"
    },
  ];

  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      {/* Structural Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <h2 className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em] mb-4">
            The Process
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Healthcare at the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Speed of Life</span>
          </h3>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/3 left-0 w-full h-[2px] bg-slate-50">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 w-1/2 opacity-20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="group flex flex-col items-center text-center">
                {/* Icon Container */}
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,_112,_184,_0.08)] border border-slate-100 flex items-center justify-center transition-all duration-500 group-hover:shadow-blue-900/10 group-hover:-translate-y-2 group-hover:rotate-3">
                    {step.icon}
                  </div>
                  
                  {/* Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-xs border-4 border-white shadow-lg">
                    0{index + 1}
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-md border border-slate-100">
                    {step.tag}
                  </span>
                  
                  <h4 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h4>
                  
                  <p className="text-slate-500 leading-relaxed font-medium px-4">
                    {step.description}
                  </p>
                </div>

                {/* Mobile Connector */}
                {index < steps.length - 1 && (
                  <div className="md:hidden my-8 opacity-20">
                    <ArrowRight className="w-6 h-6 rotate-90 text-slate-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-20 text-center">
          <button className="bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-slate-200">
            Start Your Search Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
import React from "react";
import { 
  ShieldCheck, 
  Lock, 
  RefreshCcw, 
  Zap, 
  Headphones, 
  Smartphone 
} from "lucide-react";

const TrustBenefits = () => {
  const benefits = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      title: "Verified Doctors",
      description: "Thoroughly vetted credentials and active licenses.",
    },
    {
      icon: <Lock className="w-6 h-6 text-indigo-600" />,
      title: "Secure Payments",
      description: "256-bit encrypted secure payment processing.",
    },
    {
      icon: <RefreshCcw className="w-6 h-6 text-emerald-600" />,
      title: "Easy Rescheduling",
      description: "One-tap cancellation and flexible rescheduling.",
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-600" />,
      title: "Instant Confirmation",
      description: "Real-time updates via SMS and Email.",
    },
    {
      icon: <Headphones className="w-6 h-6 text-rose-600" />,
      title: "24/7 Support",
      description: "Dedicated assistance for all your queries.",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-purple-600" />,
      title: "Mobile Friendly",
      description: "Optimized experience across all your devices.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto">
        
        {/* CENTERED HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-3">Reliability</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Patients <span className="text-blue-600">Trust Us</span>
          </h3>
          <div className="w-12 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* COMPACT BENEFITS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-8 bg-white rounded-3xl border border-slate-100 hover:border-blue-200 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)]"
            >
              <div className="flex items-start gap-5">
                {/* ICON BOX */}
                <div className="flex-shrink-0 w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300">
                  {benefit.icon}
                </div>
                
                {/* TEXT CONTENT */}
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustBenefits;
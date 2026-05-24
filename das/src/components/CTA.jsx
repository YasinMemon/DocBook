import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Simple Bordered Box */}
        <div className="bg-slate-50 rounded-[2.5rem] p-10 md:p-16 text-center border border-slate-100">
          
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Book Your Appointment <br />
              <span className="text-blue-600">in Minutes.</span>
            </h2>

            <p className="text-lg text-slate-500 mb-10 leading-relaxed font-medium">
              Join thousands of patients who trust DocBook for their healthcare needs. 
              Simple, secure, and always available.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-95 flex items-center justify-center gap-2">
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className="w-full sm:w-auto bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 font-bold py-4 px-10 rounded-xl transition-all">
                Learn More
              </button>
            </div>

            {/* Flat Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {["Free to use", "Instant booking", "Verified doctors"].map((text, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-bold uppercase tracking-wide">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
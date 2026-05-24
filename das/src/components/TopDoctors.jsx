import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DoctorCard from "./DoctorCard";
import { getVerifiedDoctors } from "../api/auth";
import { ArrowRight, Sparkles, UserCheck } from "lucide-react";

const TopDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        const response = await getVerifiedDoctors();

        if (response.status && response.doctors) {
          const transformedDoctors = response.doctors
            .slice(0, 6)
            .map((doctor) => ({
              ...doctor,
              id: doctor._id,
            }));
          setDoctors(transformedDoctors);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Professional Skeleton Loader for a "Medical Tech" feel
  const SkeletonCard = () => (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 animate-pulse">
      <div className="w-full h-48 bg-slate-100 rounded-2xl mb-4" />
      <div className="h-4 w-3/4 bg-slate-100 rounded mb-3" />
      <div className="h-3 w-1/2 bg-slate-50 rounded mb-6" />
      <div className="flex justify-between items-center">
        <div className="h-8 w-24 bg-slate-100 rounded-lg" />
        <div className="h-8 w-8 bg-slate-100 rounded-full" />
      </div>
    </div>
  );

  return (
    <section className="py-24 px-4 bg-[#F8FAFC] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 mx-auto">
              <Sparkles className="w-3 h-3" />
              Expert Care
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Top Rated <span className="text-blue-600">Specialists</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-xl leading-relaxed mx-auto">
              Our network consists of board-certified professionals selected through a rigorous 15-point verification process.
            </p>
          </div>

          <button
            onClick={() => navigate("/doctors")}
            className="group flex items-center gap-2 text-slate-900 font-bold hover:text-blue-600 transition-all mx-auto"
          >
            Explore all 500+ doctors
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Content Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <SkeletonCard key={n} />
            ))}
          </div>
        ) : doctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="hover:scale-[1.02] transition-transform duration-300">
                <DoctorCard doctor={doctor} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-slate-200">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <UserCheck className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Expanding our network</h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              We're currently verifying specialists in your area. Check back shortly for updated listings.
            </p>
          </div>
        )}

        {/* Bottom CTA for Mobile */}
        <div className="mt-16 md:hidden text-center">
          <button
            onClick={() => navigate("/doctors")}
            className="w-full bg-white border border-slate-200 text-slate-900 font-bold py-4 rounded-2xl shadow-sm active:scale-95 transition-all"
          >
            View Directory
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopDoctors;
import React from "react";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import PopularSpecializations from "../components/PopularSpecializations";
import TopDoctors from "../components/TopDoctors";
import TrustBenefits from "../components/TrustBenefits";
import DoctorCTASection from "../components/DoctorCTASection";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      <PopularSpecializations />
      <TopDoctors />
      <TrustBenefits />
      <DoctorCTASection />
      <CTA />
      <Footer />
    </div>
  );
};

export default HomePage;

import React from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-slate-300">
      {/* NEWSLETTER SECTION */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-12 md:flex md:items-center md:justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-white">Join our newsletter</h3>
            <p className="text-slate-400 text-sm mt-1">Get the latest healthcare tips and updates.</p>
          </div>
          <div className="flex max-w-md w-full gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-xl transition-colors">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* COMPANY INFO */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black tracking-tighter text-white">
              Doc<span className="text-blue-500">Book</span>
            </h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Transforming the healthcare experience by connecting patients with top-tier specialists instantly. Quality care is just a click away.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">For Patients</h3>
            <ul className="space-y-4">
              {['Find Doctors', 'Specializations', 'How It Works', 'Sign Up'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm hover:text-blue-400 transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-2 h-[1px] bg-blue-400 mr-0 group-hover:mr-2 transition-all"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* FOR DOCTORS */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">For Doctors</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/doctor/onboarding" className="text-sm text-blue-400 hover:text-blue-300 font-bold flex items-center gap-2">
                  Apply to Join
                </Link>
              </li>
              {['Doctor Dashboard', 'Practice Growth', 'Pricing'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm hover:text-blue-400 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                <span>123 Medical Drive, Health Plaza, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <span>+1 (555) 000-1234</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <span>support@docbook.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © 2026 DocBook Inc. All rights reserved. Made with ❤️ for better health.
          </p>
          <div className="flex gap-8 text-xs font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
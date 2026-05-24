import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut, ChevronDown, Stethoscope } from "lucide-react";
import { logoutUser } from "../api/auth";
import { clearUserAuth, isUserAuthenticated, getUserData } from "../utils/authUtils";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadAuth = () => {
      // Authentication is now cookie-based (httpOnly cookie)
      // Check if user data exists in localStorage
      setIsAuthenticated(isUserAuthenticated());
      setAuthUser(getUserData());
    };

    loadAuth();
    window.addEventListener("authChanged", loadAuth);
    return () => window.removeEventListener("authChanged", loadAuth);
  }, []);

  const handleLogout = async () => {
    try {
      // Call backend to clear the httpOnly cookie
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear user data from localStorage using utility function
      clearUserAuth();
      window.dispatchEvent(new Event("authChanged"));
      setIsProfileOpen(false);
      navigate("/");
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Find Doctors", path: "/doctors" },
    { name: "Specializations", path: "/specializations" },
    { name: "How It Works", path: "/how-it-works" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <Stethoscope className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-blue-600">Doc</span>
              <span className="text-gray-900">Book</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full border border-gray-200 hover:border-blue-300 transition-colors"
                >
                  {authUser?.profile_image ? (
                    <img 
                      src={authUser.profile_image} 
                      alt={authUser.fullName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">
                      {authUser?.fullName?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <span className="text-sm font-semibold text-gray-700">
                    {authUser?.fullName?.split(" ")[0]}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                    >
                      {/* User Info Header */}
                      <div className="px-4 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          {authUser?.profile_image ? (
                            <img 
                              src={authUser.profile_image} 
                              alt={authUser.fullName}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
                              {authUser?.fullName?.charAt(0).toUpperCase() || "U"}
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">{authUser?.fullName}</p>
                            <p className="text-xs text-gray-600">{authUser?.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        <User className="w-4 h-4" /> Profile Settings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/doctor/login"
                  className="px-5 py-2.5 text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-full border border-indigo-200 transition-all flex items-center gap-2"
                >
                  <Stethoscope className="w-4 h-4" />
                  For Doctors
                </Link>
                <Link
                  to="/sign-in"
                  className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium ${
                    isActive(link.path)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="my-4 border-gray-100" />
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-gray-600"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-600 font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/doctor/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 mb-3"
                  >
                    <Stethoscope className="w-4 h-4" />
                    For Doctors
                  </Link>
                  <div className="grid grid-cols-2 gap-3 p-2">
                    <Link
                      to="/sign-in"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-center py-3 rounded-xl font-semibold text-gray-700 bg-gray-50"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/sign-up"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-center py-3 rounded-xl font-semibold text-white bg-blue-600"
                    >
                      Sign Up
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

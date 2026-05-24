import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DoctorsPage from "./pages/DoctorsPage";
import SpecializationPage from "./pages/SpecializationPage";
import SpecializationsPage from "./pages/SpecializationsPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import AboutUsPage from "./pages/AboutUsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import DoctorOnboardingPage from "./pages/DoctorOnboardingPage";
import DoctorLoginPage from "./pages/DoctorLoginPage";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDetailPage from "./pages/DoctorDetailPage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import UserProfilePage from "./pages/UserProfilePage";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import AdminProtectedRoute from "./ProtectedAdminRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";

function AppContent() {
  const location = useLocation();

  // Hide navbar on admin and doctor dashboard/login pages
  const hideNavbarRoutes = [
    "/admin/login",
    "/admin/dashboard",
    "/doctor/dashboard",
  ];

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/doctor/:id" element={<DoctorDetailPage />} />
        <Route path="/book-appointment/:id" element={<BookAppointmentPage />} />
        <Route path="/specializations" element={<SpecializationsPage />} />
        <Route path="/specialization/:type" element={<SpecializationPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/doctor/login" element={<DoctorLoginPage />} />
        <Route path="/doctor/onboarding" element={<DoctorOnboardingPage />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
    </GoogleOAuthProvider>
  );
}

export default App;

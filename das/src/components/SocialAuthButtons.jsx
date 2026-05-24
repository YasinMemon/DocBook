import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setUserData } from "../utils/authUtils";
import { googleLogin } from "../api/auth";

const SocialAuthButtons = ({ signUpMode = false }) => {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log("Google login response received");

      // Send the ID token to backend for verification using API helper
      const res = await googleLogin(credentialResponse.credential);

      const { user, token, role } = res;
      console.log("Google login successful:", { user, token, role });

      // Store user data in localStorage using utility function
      setUserData({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profile_image: user.profile_image,
        role,
      });

      // Store token for API requests
      localStorage.setItem("userAuthToken", token);
      localStorage.setItem("userRole", role);

      // Dispatch event to notify navbar and other components
      window.dispatchEvent(new Event("authChanged"));

      toast.success("Logged in successfully!");

      // Redirect to home page
      navigate("/");

    } catch (error) {
      console.error("Google OAuth error:", error);
      toast.error(error.message || "Google login failed");
    }
  };

  const handleGoogleError = () => {
    console.log("Google login failed");
  };

  const handleAppleAuth = (e) => {
    e.preventDefault();
    console.log(
      `Apple ${signUpMode ? "sign-up" : "sign-in"} clicked - connect to OAuth provider`,
    );
    // TODO: Integrate with Apple OAuth
  };

  return (
    <div className="space-y-3">
      {/* Google Auth Button */}
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        text={signUpMode ? "signup_with" : "signin_with"}
        theme="outline"
        width="100%"
      />

      {/* Apple Auth Button */}
      <button
        onClick={handleAppleAuth}
        type="button"
        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={`${signUpMode ? "Sign up" : "Sign in"} with Apple`}
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.05 13.5c-.91 0-1.82.55-2.65 1.52.93.64 1.94 1.6 1.94 3.04 0 2.08-1.69 3.28-3.39 3.28-2.09 0-3.63-1.51-3.63-4.04 0-1.16.36-2.23 1.01-3.08-1.27 0-2.47-.92-2.47-2.37 0-1.21.76-2.28 2.04-2.5-.44-.72-.71-1.54-.71-2.4 0-2.59 2.11-4.69 4.7-4.69 2.59 0 4.7 2.1 4.7 4.69 0 .86-.27 1.68-.71 2.4 1.28.22 2.04 1.29 2.04 2.5 0 1.45-1.2 2.37-2.47 2.37.65.85 1.01 1.92 1.01 3.08 0 2.53-1.54 4.04-3.63 4.04-1.7 0-3.39-1.2-3.39-3.28 0-1.44 1.01-2.4 1.94-3.04-.83-.97-1.74-1.52-2.65-1.52v-1.5c1.23 0 2.36.6 3.13 1.54.77-.94 1.9-1.54 3.13-1.54v1.5z" />
        </svg>
        <span className="font-medium text-gray-700">Continue with Apple</span>
      </button>
    </div>
  );
};

export default SocialAuthButtons;

# Sign In - Integration Examples

Quick copy-paste code snippets for common backend & OAuth integrations.

## 🔌 Backend API Integration

### Option 1: Basic Fetch (Simplest)

Replace the `setTimeout` in `SignInForm.jsx` at line ~58:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();

  const formErrors = validateForm();
  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      // Store token securely
      localStorage.setItem("authToken", data.token);
      navigate("/");
    } else {
      setErrors({ form: data.message || "Sign in failed" });
    }
  } catch (error) {
    setErrors({ form: "Network error. Please try again." });
  } finally {
    setIsSubmitting(false);
  }
};
```

### Option 2: Axios (Recommended)

Install: `npm install axios`

```javascript
import axios from "axios";

const handleSubmit = async (e) => {
  e.preventDefault();

  const formErrors = validateForm();
  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
    return;
  }

  setIsSubmitting(true);

  try {
    const { data } = await axios.post("/api/auth/sign-in", {
      email: formData.email,
      password: formData.password,
    });

    localStorage.setItem("authToken", data.token);
    navigate("/");
  } catch (error) {
    setErrors({
      form: error.response?.data?.message || "Sign in failed",
    });
  } finally {
    setIsSubmitting(false);
  }
};
```

### Option 3: React Query (Modern)

Install: `npm install @tanstack/react-query`

```javascript
import { useMutation } from "@tanstack/react-query";

const signInMutation = useMutation({
  mutationFn: async (credentials) => {
    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },
  onSuccess: (data) => {
    localStorage.setItem("authToken", data.token);
    navigate("/");
  },
  onError: (error) => {
    setErrors({ form: error.message });
  },
});

const handleSubmit = async (e) => {
  e.preventDefault();
  const formErrors = validateForm();
  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
    return;
  }
  signInMutation.mutate(formData);
};
```

## 🔐 Google OAuth Integration

### Step 1: Install Package

```bash
npm install @react-oauth/google
```

### Step 2: Wrap App with GoogleOAuthProvider

In `main.jsx`:

```javascript
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
    <App />
  </GoogleOAuthProvider>,
);
```

### Step 3: Update SocialAuthButtons.jsx

```javascript
import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const SocialAuthButtons = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (codeResponse) => {
    try {
      // Send token to backend
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: codeResponse.access_token,
        }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("authToken", data.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Google sign-in failed:", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    flow: "implicit",
  });

  const handleAppleSignIn = (e) => {
    e.preventDefault();
    console.log("Apple sign-in clicked");
    // TODO: Implement Apple OAuth
  };

  return (
    <div className="space-y-3">
      <button
        onClick={() => googleLogin()}
        type="button"
        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Sign in with Google"
      >
        {/* SVG... */}
        <span className="font-medium text-gray-700">Continue with Google</span>
      </button>

      {/* Apple button... */}
    </div>
  );
};

export default SocialAuthButtons;
```

## 🍎 Apple OAuth Integration

Install: `npm install apple-signin-web`

```javascript
import AppleID from "apple-signin-web";

useEffect(() => {
  AppleID.auth.init({
    clientId: "your.apple.client.id",
    teamId: "YOUR_TEAM_ID",
    keyId: "YOUR_KEY_ID",
    redirect_uri: "https://yourdomain.com/auth/apple/callback",
    scope: "email name",
    responseType: "code id_token",
    responseMode: "form_post",
    usePopup: true,
  });
}, []);

const handleAppleSignIn = async (response) => {
  try {
    const res = await fetch("/api/auth/apple", {
      method: "POST",
      body: JSON.stringify(response),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    localStorage.setItem("authToken", data.token);
    navigate("/");
  } catch (error) {
    console.error("Apple sign-in failed:", error);
  }
};
```

## 🔒 Secure Token Storage

### Option 1: localStorage (Simple, Less Secure)

```javascript
// Store after login
localStorage.setItem("authToken", data.token);

// Retrieve for API calls
const token = localStorage.getItem("authToken");

// Clear on logout
localStorage.removeItem("authToken");
```

### Option 2: httpOnly Cookies (Recommended)

Backend sets cookie:

```javascript
// Backend (Node.js/Express example)
res.cookie("authToken", token, {
  httpOnly: true,
  secure: true, // HTTPS only
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
```

Frontend (no action needed - cookies sent automatically):

```javascript
// Axios will send cookies automatically
axios.defaults.withCredentials = true;
```

### Option 3: Memory Storage (Most Secure, Lost on Refresh)

```javascript
let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
};

export const getAuthToken = () => authToken;

export const clearAuthToken = () => {
  authToken = null;
};
```

## 📱 Remember Me Implementation

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();

  // ... validation ...

  const response = await fetch("/api/auth/sign-in", {
    method: "POST",
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
      rememberMe: formData.rememberMe,
    }),
  });

  const data = await response.json();

  if (data.success) {
    // Always store token
    localStorage.setItem("authToken", data.token);

    // Optionally store email for next time
    if (formData.rememberMe) {
      localStorage.setItem("savedEmail", formData.email);
    }

    navigate("/");
  }
};

// Load saved email on component mount
useEffect(() => {
  const savedEmail = localStorage.getItem("savedEmail");
  if (savedEmail) {
    setFormData((prev) => ({ ...prev, email: savedEmail }));
  }
}, []);
```

## 🚨 Error Handling

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();

  const formErrors = validateForm();
  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Handle different response codes
    switch (data.code) {
      case "USER_NOT_FOUND":
        setErrors({ email: "No account found with this email" });
        break;
      case "INVALID_PASSWORD":
        setErrors({ password: "Incorrect password" });
        break;
      case "ACCOUNT_LOCKED":
        setErrors({ form: "Account locked. Try again later." });
        break;
      case "SUCCESS":
        localStorage.setItem("authToken", data.token);
        navigate("/");
        break;
      default:
        setErrors({ form: "Something went wrong. Please try again." });
    }
  } catch (error) {
    // Network or parsing error
    setErrors({ form: "Network error. Please check your connection." });
    console.error("Sign-in error:", error);
  } finally {
    setIsSubmitting(false);
  }
};
```

## 🔗 Add Sign In Link to Navbar

In `Navbar.jsx`:

```javascript
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  // ... existing code ...

  return (
    <nav className="...">
      {/* ... existing navbar items ... */}

      {/* Add this in the nav links section */}
      <Link
        to="/sign-in"
        className="font-medium text-gray-700 hover:text-blue-600 transition-colors"
      >
        Sign In
      </Link>
    </nav>
  );
};
```

## 📧 Password Reset Flow

Create new file: `src/pages/ForgotPasswordPage.jsx`

```javascript
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Failed to send reset email");
    }
  };

  return submitted ? (
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold mb-4">Check Your Email</h2>
      <p className="text-gray-600">
        We've sent a password reset link to {email}
      </p>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="w-full px-4 py-2 border rounded-lg"
      />
      {error && <p className="text-red-600">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        Send Reset Link
      </button>
    </form>
  );
}
```

Then add route in `App.jsx`:

```javascript
<Route path="/forgot-password" element={<ForgotPasswordPage />} />
```

---

**Need more examples?** Check the implementation guide: [SIGNIN_IMPLEMENTATION.md](SIGNIN_IMPLEMENTATION.md)

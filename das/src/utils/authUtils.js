/**
 * Authentication utility functions for managing cookies and localStorage
 */

/**
 * Clear all user-related authentication data from localStorage
 */
export function clearUserAuth() {
  localStorage.removeItem("user");
  localStorage.removeItem("token"); // Legacy support
  localStorage.removeItem("userAuthToken"); // JWT token
}

/**
 * Clear all doctor-related authentication data from localStorage
 */
export function clearDoctorAuth() {
  localStorage.removeItem("doctor");
  localStorage.removeItem("doctorToken");
  localStorage.removeItem("doctorAuthToken"); // JWT token
}

/**
 * Clear all admin-related authentication data from localStorage
 */
export function clearAdminAuth() {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("userRole");
  localStorage.removeItem("adminAuthToken"); // JWT token
}

/**
 * Clear all authentication data from localStorage
 */
export function clearAllAuth() {
  clearUserAuth();
  clearDoctorAuth();
  clearAdminAuth();
}

/**
 * Check if user is authenticated (has user data in localStorage)
 */
export function isUserAuthenticated() {
  return !!localStorage.getItem("user");
}

/**
 * Check if admin is authenticated
 */
export function isAdminAuthenticated() {
  return !!localStorage.getItem("adminToken");
}

/**
 * Check if doctor is authenticated
 */
export function isDoctorAuthenticated() {
  return !!localStorage.getItem("doctor");
}

/**
 * Get user data from localStorage
 */
export function getUserData() {
  try {
    const userJson = localStorage.getItem("user");
    if (!userJson) return null;
    
    let parsed = JSON.parse(userJson);
    if (typeof parsed === "string") {
      parsed = JSON.parse(parsed);
    }
    return parsed;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
}

/**
 * Store user data in localStorage
 */
export function setUserData(userData) {
  try {
    const userToStore = typeof userData === "string" ? JSON.parse(userData) : userData;
    localStorage.setItem("user", JSON.stringify(userToStore));
    // Notify other components of auth change
    window.dispatchEvent(new Event("authChanged"));
    return true;
  } catch (error) {
    console.error("Error storing user data:", error);
    return false;
  }
}

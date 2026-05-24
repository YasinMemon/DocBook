const isDev = import.meta.env.DEV;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function buildURL(path) {
  // In dev use relative path so Vite dev server proxy handles /api requests (avoids CORS).
  // In production (or when explicitly configured) use the full BASE_URL.
  return isDev ? path : `${BASE_URL || ""}${path}`;
}

function getAuthHeaders() {
  const headers = { "Content-Type": "application/json" };
  
  // Check for admin token first
  const adminToken = localStorage.getItem("adminAuthToken");
  if (adminToken) {
    headers.Authorization = `Bearer ${adminToken}`;
    return headers;
  }
  
  // Check for doctor token
  const doctorToken = localStorage.getItem("doctorAuthToken");
  if (doctorToken) {
    headers.Authorization = `Bearer ${doctorToken}`;
    return headers;
  }
  
  // Check for user token
  const userToken = localStorage.getItem("userAuthToken");
  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`;
  }
  
  return headers;
}

async function post(path, body) {
  // If body is FormData, send it as-is (do not set Content-Type header)
  const isForm = typeof FormData !== "undefined" && body instanceof FormData;

  const res = await fetch(buildURL(path), {
    method: "POST",
    credentials: "include",
    headers: isForm ? undefined : getAuthHeaders(),
    body: isForm ? body : JSON.stringify(body),
  });

  let data;
  try {
    data = await res.json();
  } catch (e) {
    // No JSON body
    if (!res.ok) {
      const err = new Error(res.statusText || "Request failed");
      err.status = res.status;
      throw err;
    }
    return {};
  }

  if (!res.ok) {
    const err = new Error(data?.message || "Request failed");
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

async function get(path) {
  const res = await fetch(buildURL(path), {
    method: "GET",
    credentials: "include",
    headers: getAuthHeaders(),
  });

  let data;
  try {
    data = await res.json();
  } catch (e) {
    // No JSON body
    if (!res.ok) {
      const err = new Error(res.statusText || "Request failed");
      err.status = res.status;
      throw err;
    }
    return {};
  }

  if (!res.ok) {
    const err = new Error(data?.message || "Request failed");
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

async function patch(path, body) {
  const res = await fetch(buildURL(path), {
    method: "PATCH",
    credentials: "include",
    headers: getAuthHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  });

  let data;
  try {
    data = await res.json();
  } catch (e) {
    // No JSON body
    if (!res.ok) {
      const err = new Error(res.statusText || "Request failed");
      err.status = res.status;
      throw err;
    }
    return {};
  }

  if (!res.ok) {
    const err = new Error(data?.message || "Request failed");
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

async function put(path, body) {
  // If body is FormData, send it as-is (do not set Content-Type header)
  const isForm = typeof FormData !== "undefined" && body instanceof FormData;

  const res = await fetch(buildURL(path), {
    method: "PUT",
    credentials: "include",
    headers: isForm ? undefined : getAuthHeaders(),
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  });

  let data;
  try {
    data = await res.json();
  } catch (e) {
    // No JSON body
    if (!res.ok) {
      const err = new Error(res.statusText || "Request failed");
      err.status = res.status;
      throw err;
    }
    return {};
  }

  if (!res.ok) {
    const err = new Error(data?.message || "Request failed");
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export function registerUser(payload) {
  return post("/api/user/register", payload);
}

export function loginUser(payload) {
  return post("/api/user/login", payload);
}

export function logoutUser() {
  return post("/api/user/logout", {});
}

export function loginAdmin(payload) {
  return post("/api/admin/login", payload);
}

export function logoutAdmin() {
  return post("/api/admin/logout", {});
}

export function loginDoctor(payload) {
  return post("/api/doctor/login", payload);
}

export function logoutDoctor() {
  return post("/api/doctor/logout", {});
}

export function registerDoctor(payload) {
  // Expects FormData with form-data fields matching the backend API
  return post("/api/doctor/register", payload);
}

export function getAllDoctors() {
  return get("/api/admin/doctors");
}

export function getVerifiedDoctors() {
  return get("/api/user/verified/doctors");
}

export function getDoctorsBySpecialization(specialization) {
  return get(`/api/user/verified/doctors/${specialization}`);
}

export function approveDoctor(doctorId) {
  return patch(`/api/admin/approve/${doctorId}`);
}

export function rejectDoctor(doctorId) {
  return patch(`/api/admin/reject/${doctorId}`);
}

export function createAppointment(payload) {
  return post("/api/appointment/create", payload);
}

export function getDoctorAppointments() {
  return get("/api/doctor/appointments");
}

export function getDoctorAvailability() {
  return get("/api/doctor/availability");
}

export function getUserAppointments() {
  return get("/api/user/appointments");
}

export function updateDoctorSchedule(payload) {
  return put("/api/doctor/schedule", payload);
}

export function approveAppointment(appointmentId) {
  return post(`/api/appointment/${appointmentId}/approve`, {});
}

export function rejectAppointment(appointmentId, reason = null) {
  return post(`/api/appointment/${appointmentId}/reject`, { reason });
}

export function createDoctorAppointment(payload) {
  return post("/api/doctor/create-appointment", payload);
}

export function getBookedAppointmentsForDoctor(doctorId, date) {
  return get(`/api/doctor/${doctorId}/booked-appointments/${date}`);
}

export function cancelAppointment(appointmentId, reason = null) {
  return post(`/api/appointment/${appointmentId}/cancel`, { reason });
}

export function googleLogin(token) {
  return post("/api/google/login", { token });
}

export function updateUserProfilePicture(file) {
  const formData = new FormData();
  formData.append("profilePic", file);
  return put("/api/user/profile-picture", formData);
}

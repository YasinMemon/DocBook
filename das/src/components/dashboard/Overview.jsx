import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const Overview = () => {
  const { doctor } = useAuth();
  const isPending = doctor?.verificationStatus === "pending";
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    upcomingAppointments: 0,
    todayAppointments: 0,
    profileCompletion: 0,
  });
  const [loading, setLoading] = useState(true);

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    if (!doctor) return 0;

    const fields = [
      doctor.fullName,
      doctor.email,
      doctor.phone,
      doctor.specialty,
      doctor.experience,
      doctor.qualifications?.length,
      doctor.registration_number,
      doctor.hospital_name,
      doctor.city,
      doctor.consulation_type,
      doctor.consulation_fee,
      doctor.available_days?.length,
      doctor.time_slots?.length,
      doctor.conclusion_duration,
      doctor.medical_license,
      doctor.goverment_id,
      doctor.profile_image,
    ];

    const filledFields = fields.filter(field => field && field > 0).length;
    return Math.round((filledFields / fields.length) * 100);
  };

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:5000/api/doctor/appointments",
          {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const appointmentsList = data.appointments || [];
          setAppointments(appointmentsList);

          // Calculate stats
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const todayAppointments = appointmentsList.filter((apt) => {
            const aptDate = new Date(apt.appointmentDate);
            aptDate.setHours(0, 0, 0, 0);
            return aptDate.getTime() === today.getTime();
          });

          const upcomingAppointments = appointmentsList.filter((apt) => {
            return new Date(apt.appointmentDate) > new Date();
          });

          setStats({
            totalAppointments: appointmentsList.length,
            upcomingAppointments: upcomingAppointments.length,
            todayAppointments: todayAppointments.length,
            profileCompletion: calculateProfileCompletion(),
          });
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    if (doctor) {
      fetchAppointments();
    }
  }, [doctor]);

  const statsData = [
    {
      label: "Total Appointments",
      value: loading ? "..." : stats.totalAppointments,
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Upcoming",
      value: loading ? "..." : stats.upcomingAppointments,
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "from-green-500 to-green-600",
    },
    {
      label: "Today's Schedule",
      value: loading ? "..." : stats.todayAppointments,
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Profile Completion",
      value: loading ? "..." : `${stats.profileCompletion}%`,
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      color: "from-orange-500 to-orange-600",
    },
  ];

  // Get today's appointments
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todaysAppointmentsList = appointments
    .filter((apt) => {
      const aptDate = new Date(apt.appointmentDate);
      aptDate.setHours(0, 0, 0, 0);
      return aptDate.getTime() === today.getTime();
    })
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-white`}
              >
                {stat.icon}
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Profile Completion Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Profile Completion
          </h3>
          <span className="text-sm font-semibold text-indigo-600">
            {loading ? "..." : `${stats.profileCompletion}%`}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full transition-all"
            style={{ width: `${loading ? 0 : stats.profileCompletion}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">
          Complete your profile to increase visibility and attract more
          patients.
        </p>
      </div>

      {/* Today's Appointments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Today's Appointments
          </h3>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
            View All
          </button>
        </div>

        {todaysAppointmentsList.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No appointments scheduled for today
          </p>
        ) : (
          <div className="space-y-4">
            {todaysAppointmentsList.map((appointment) => {
              const appointmentTime = new Date(appointment.appointmentDate);
              const timeString = appointmentTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={appointment._id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {appointment.patient?.fullName?.charAt(0) || "N"}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {appointment.patient?.fullName || "Unknown Patient"}
                      </h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-gray-600">
                          {timeString}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${appointment.consultationType === "Online"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                            }`}
                        >
                          {appointment.consultationType || "Clinic"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {appointment.status === "pending" && (
                      <span className="text-xs px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">
                        Pending
                      </span>
                    )}
                    {appointment.status === "confirmed" && (
                      <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                        Confirmed
                      </span>
                    )}
                    <div className="relative group">
                      <button
                        disabled={isPending}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${isPending
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                          }`}
                      >
                        {isPending ? "Locked" : "Accept"}
                      </button>
                      {isPending && (
                        <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                          Feature available after approval
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;

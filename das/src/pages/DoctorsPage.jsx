import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import DoctorCard from "../components/DoctorCard";
import EmptyState from "../components/EmptyState";
import { getVerifiedDoctors } from "../api/auth";

const DoctorsPage = () => {
  const [searchParams] = useSearchParams();
  const [allDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize filters from URL query parameters
  const initialFilters = {
    search: searchParams.get("search") || "",
    location: searchParams.get("location") || "",
    specialization: searchParams.get("specialization") || "All Specializations",
    availability: searchParams.get("availability") || "Any Time",
    sortBy: searchParams.get("sortBy") || "rating",
  };

  // Fetch verified doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await getVerifiedDoctors();
        if (response.status && response.doctors) {
          setAllDoctors(response.doctors);
        }
      } catch (err) {
        console.error("Error fetching verified doctors:", err);
        setError(err.message || "Failed to fetch doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Dummy doctors data (for fallback)
  const dummyDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop",
      rating: 4.9,
      reviews: 247,
      location: "New York, NY",
      experience: 15,
      fee: 150,
      availability: "Today",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialization: "Dermatologist",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop",
      rating: 4.8,
      reviews: 189,
      location: "Los Angeles, CA",
      experience: 12,
      fee: 120,
      availability: "Tomorrow",
    },
    {
      id: 3,
      name: "Dr. Emily Williams",
      specialization: "Pediatrician",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop",
      rating: 5.0,
      reviews: 312,
      location: "Chicago, IL",
      experience: 18,
      fee: 130,
      availability: "Today",
    },
    {
      id: 4,
      name: "Dr. James Martinez",
      specialization: "Dentist",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop",
      rating: 4.7,
      reviews: 156,
      location: "Houston, TX",
      experience: 10,
      fee: 100,
      availability: "This Week",
    },
    {
      id: 5,
      name: "Dr. Lisa Anderson",
      specialization: "Orthopedic",
      image:
        "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=200&h=200&fit=crop",
      rating: 4.9,
      reviews: 203,
      location: "Phoenix, AZ",
      experience: 14,
      fee: 140,
      availability: "Today",
    },
    {
      id: 6,
      name: "Dr. David Kim",
      specialization: "Neurologist",
      image:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop",
      rating: 4.8,
      reviews: 178,
      location: "Seattle, WA",
      experience: 16,
      fee: 160,
      availability: "Tomorrow",
    },
    {
      id: 7,
      name: "Dr. Jennifer Brown",
      specialization: "Cardiologist",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop",
      rating: 4.6,
      reviews: 134,
      location: "Boston, MA",
      experience: 11,
      fee: 145,
      availability: "This Week",
    },
    {
      id: 8,
      name: "Dr. Robert Taylor",
      specialization: "Psychiatrist",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop",
      rating: 4.9,
      reviews: 221,
      location: "Miami, FL",
      experience: 13,
      fee: 135,
      availability: "Today",
    },
    {
      id: 9,
      name: "Dr. Amanda White",
      specialization: "Dermatologist",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop",
      rating: 4.7,
      reviews: 167,
      location: "Denver, CO",
      experience: 9,
      fee: 115,
      availability: "Tomorrow",
    },
    {
      id: 10,
      name: "Dr. Christopher Lee",
      specialization: "General Physician",
      image:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop",
      rating: 4.5,
      reviews: 98,
      location: "Austin, TX",
      experience: 8,
      fee: 90,
      availability: "This Week",
    },
    {
      id: 11,
      name: "Dr. Patricia Garcia",
      specialization: "Pediatrician",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop",
      rating: 4.8,
      reviews: 245,
      location: "San Diego, CA",
      experience: 17,
      fee: 125,
      availability: "Today",
    },
    {
      id: 12,
      name: "Dr. Daniel Martinez",
      specialization: "Dentist",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop",
      rating: 4.6,
      reviews: 142,
      location: "Portland, OR",
      experience: 12,
      fee: 105,
      availability: "Tomorrow",
    },
  ];

  const [filters, setFilters] = useState(initialFilters);

  // Update filters when URL query parameters change
  useEffect(() => {
    setFilters(initialFilters);
  }, [searchParams]);

  const [filteredDoctors, setFilteredDoctors] = useState(allDoctors);

  // Helper: derive a simple availability label from available_days array
  const getAvailabilityLabel = (doctor) => {
    // Dummy doctors already have a string availability field
    if (typeof doctor.availability === "string") return doctor.availability;
    // Real doctors have available_days: ["Monday", "Wednesday", ...]
    const days = doctor.available_days || [];
    if (!days.length) return "This Week";
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const todayName = dayNames[today.getDay()];
    const tomorrowName = dayNames[(today.getDay() + 1) % 7];
    if (days.includes(todayName)) return "Today";
    if (days.includes(tomorrowName)) return "Tomorrow";
    return "This Week";
  };

  // Filter and sort doctors whenever filters change
  useEffect(() => {
    let result = [...(allDoctors.length > 0 ? allDoctors : dummyDoctors)];

    // Apply search filter
    // Real doctors use fullName + specialty; dummy doctors use name + specialization
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter((doctor) => {
        const name = (doctor.fullName || doctor.name || "").toLowerCase();
        const spec = (doctor.specialty || doctor.specialization || "").toLowerCase();
        return name.includes(q) || spec.includes(q);
      });
    }

    // Apply location filter
    // Real doctors use city; dummy doctors use location
    if (filters.location) {
      const q = filters.location.toLowerCase();
      result = result.filter((doctor) => {
        const loc = (doctor.city || doctor.location || "").toLowerCase();
        return loc.includes(q);
      });
    }

    // Apply specialization filter
    // Real doctors use specialty; dummy doctors use specialization
    if (filters.specialization !== "All Specializations") {
      result = result.filter((doctor) => {
        const spec = (doctor.specialty || doctor.specialization || "").toLowerCase();
        return spec === filters.specialization.toLowerCase();
      });
    }

    // Apply availability filter
    // Real doctors use available_days[]; dummy doctors use availability string
    if (filters.availability !== "Any Time") {
      result = result.filter(
        (doctor) => getAvailabilityLabel(doctor) === filters.availability,
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "experience":
        result.sort((a, b) => (b.experience || 0) - (a.experience || 0));
        break;
      case "availability": {
        const availabilityOrder = { Today: 1, Tomorrow: 2, "This Week": 3 };
        result.sort(
          (a, b) =>
            (availabilityOrder[getAvailabilityLabel(a)] || 999) -
            (availabilityOrder[getAvailabilityLabel(b)] || 999),
        );
        break;
      }
      default:
        break;
    }

    setFilteredDoctors(result);
  }, [filters, allDoctors]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSortChange = (sortValue) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: sortValue,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      location: "",
      specialization: "All Specializations",
      availability: "Any Time",
      sortBy: "rating",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onResetFilters={handleResetFilters}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="ml-4 text-gray-600">Loading verified doctors...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-medium">Error loading doctors</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Results Count */}
        {!loading && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Doctors
            </h2>
            <p className="text-gray-600 mt-1">
              {filteredDoctors.length} doctor
              {filteredDoctors.length !== 1 ? "s" : ""} found
            </p>
          </div>
        )}

        {/* Doctors Grid or Empty State */}
        {!loading && filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor._id || doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : !loading ? (
          <EmptyState onResetFilters={handleResetFilters} />
        ) : null}
      </div>
    </div>
  );
};

export default DoctorsPage;

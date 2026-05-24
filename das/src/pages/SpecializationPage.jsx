import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SpecializationHeader from "../components/SpecializationHeader";
import QuickFilters from "../components/QuickFilters";
import DoctorCard from "../components/DoctorCard";
import WhyChooseSection from "../components/WhyChooseSection";
import { getDoctorsBySpecialization } from "../api/auth";

const SpecializationPage = () => {
  const { type } = useParams();
  const specializationType = type || "cardiologist";

  // Specialization data - scalable structure
  const specializationData = {
    cardiologist: {
      name: "Cardiologists",
      icon: "❤️",
      description: "Heart & blood vessel specialists helping you stay healthy",
      doctorCount: 120,
      commonProblems: [
        "High blood pressure",
        "Heart disease",
        "Chest pain",
        "Irregular heartbeat",
        "Heart failure",
      ],
      whenToConsult: [
        "Persistent chest pain",
        "Shortness of breath",
        "Family history of heart disease",
        "High cholesterol",
        "Diabetes management",
      ],
      benefits: [
        "Prevent heart attacks",
        "Better disease management",
        "Improved quality of life",
        "Early detection of issues",
        "Personalized treatment plans",
      ],
    },
    dermatologist: {
      name: "Dermatologists",
      icon: "✨",
      description: "Skin, hair & nail treatment specialists",
      doctorCount: 85,
      commonProblems: [
        "Acne and pimples",
        "Skin allergies",
        "Hair loss",
        "Psoriasis",
        "Eczema",
      ],
      whenToConsult: [
        "Persistent skin issues",
        "Unusual moles or growths",
        "Severe acne",
        "Hair thinning",
        "Nail problems",
      ],
      benefits: [
        "Clear healthy skin",
        "Early cancer detection",
        "Hair restoration",
        "Improved confidence",
        "Long-term skin health",
      ],
    },
    dentist: {
      name: "Dentists",
      icon: "🦷",
      description: "Dental & oral health specialists",
      doctorCount: 150,
      commonProblems: [
        "Tooth decay",
        "Gum disease",
        "Tooth sensitivity",
        "Bad breath",
        "Misaligned teeth",
      ],
      whenToConsult: [
        "Tooth pain",
        "Bleeding gums",
        "Loose teeth",
        "Jaw pain",
        "Regular checkups",
      ],
      benefits: [
        "Prevent tooth loss",
        "Better oral hygiene",
        "Improved smile",
        "Pain relief",
        "Overall health improvement",
      ],
    },
    pediatrician: {
      name: "Pediatricians",
      icon: "👶",
      description: "Child health & development specialists",
      doctorCount: 95,
      commonProblems: [
        "Common cold and flu",
        "Vaccinations",
        "Growth concerns",
        "Allergies",
        "Behavioral issues",
      ],
      whenToConsult: [
        "High fever in children",
        "Persistent cough",
        "Developmental delays",
        "Regular checkups",
        "Vaccination schedules",
      ],
      benefits: [
        "Healthy child development",
        "Early problem detection",
        "Vaccination protection",
        "Peace of mind for parents",
        "Preventive care",
      ],
    },
    orthopedic: {
      name: "Orthopedic Surgeons",
      icon: "🦴",
      description: "Bone, joint & muscle specialists",
      doctorCount: 75,
      commonProblems: [
        "Arthritis",
        "Fractures",
        "Sports injuries",
        "Back pain",
        "Joint problems",
      ],
      whenToConsult: [
        "Persistent joint pain",
        "Limited mobility",
        "Sports injuries",
        "Chronic back pain",
        "Post-surgery care",
      ],
      benefits: [
        "Pain relief",
        "Improved mobility",
        "Faster injury recovery",
        "Better quality of life",
        "Preventive care",
      ],
    },
    neurologist: {
      name: "Neurologists",
      icon: "🧠",
      description: "Brain & nervous system specialists",
      doctorCount: 60,
      commonProblems: [
        "Migraines",
        "Epilepsy",
        "Stroke",
        "Multiple sclerosis",
        "Parkinsons disease",
      ],
      whenToConsult: [
        "Severe headaches",
        "Seizures",
        "Memory problems",
        "Numbness or tingling",
        "Balance issues",
      ],
      benefits: [
        "Early diagnosis",
        "Better disease management",
        "Improved brain health",
        "Reduced symptoms",
        "Enhanced quality of life",
      ],
    },
    "ent-specialist": {
      name: "ENT Specialists",
      icon: "👂",
      description: "Ear, nose & throat specialists",
      doctorCount: 50,
      commonProblems: [
        "Ear infections",
        "Sinusitis",
        "Throat infections",
        "Hearing problems",
        "Tonsillitis",
      ],
      whenToConsult: [
        "Persistent ear pain",
        "Hearing loss",
        "Chronic sinus issues",
        "Throat problems",
        "Balance disorders",
      ],
      benefits: [
        "Better hearing health",
        "Relief from chronic conditions",
        "Improved breathing",
        "Enhanced quality of life",
        "Expert diagnosis",
      ],
    },
  };

  // All doctors database (scalable - would be fetched from API in production)
  const allDoctorsDatabase = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "cardiologist",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop",
      rating: 4.9,
      reviews: 247,
      location: "New York, NY",
      experience: 15,
      fee: 150,
      availableToday: true,
      availableThisWeek: true,
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialization: "dermatologist",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop",
      rating: 4.8,
      reviews: 189,
      location: "Los Angeles, CA",
      experience: 12,
      fee: 120,
      availableToday: false,
      availableThisWeek: true,
    },
    {
      id: 3,
      name: "Dr. Emily Williams",
      specialization: "pediatrician",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop",
      rating: 5.0,
      reviews: 312,
      location: "Chicago, IL",
      experience: 18,
      fee: 130,
      availableToday: true,
      availableThisWeek: true,
    },
    {
      id: 4,
      name: "Dr. James Martinez",
      specialization: "dentist",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop",
      rating: 4.7,
      reviews: 156,
      location: "Houston, TX",
      experience: 10,
      fee: 100,
      availableToday: false,
      availableThisWeek: true,
    },
    {
      id: 5,
      name: "Dr. Lisa Anderson",
      specialization: "orthopedic",
      image:
        "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=200&h=200&fit=crop",
      rating: 4.9,
      reviews: 203,
      location: "Phoenix, AZ",
      experience: 14,
      fee: 140,
      availableToday: true,
      availableThisWeek: true,
    },
    {
      id: 6,
      name: "Dr. David Kim",
      specialization: "neurologist",
      image:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop",
      rating: 4.8,
      reviews: 178,
      location: "Seattle, WA",
      experience: 16,
      fee: 160,
      availableToday: false,
      availableThisWeek: true,
    },
    {
      id: 7,
      name: "Dr. Jennifer Brown",
      specialization: "cardiologist",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop",
      rating: 4.6,
      reviews: 134,
      location: "Boston, MA",
      experience: 11,
      fee: 145,
      availableToday: false,
      availableThisWeek: true,
    },
    {
      id: 8,
      name: "Dr. Robert Taylor",
      specialization: "psychiatrist",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop",
      rating: 4.9,
      reviews: 221,
      location: "Miami, FL",
      experience: 13,
      fee: 135,
      availableToday: true,
      availableThisWeek: true,
    },
    {
      id: 9,
      name: "Dr. Amanda White",
      specialization: "dermatologist",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop",
      rating: 4.7,
      reviews: 167,
      location: "Denver, CO",
      experience: 9,
      fee: 115,
      availableToday: true,
      availableThisWeek: true,
    },
    {
      id: 10,
      name: "Dr. Christopher Lee",
      specialization: "general-physician",
      image:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop",
      rating: 4.5,
      reviews: 98,
      location: "Austin, TX",
      experience: 8,
      fee: 90,
      availableToday: false,
      availableThisWeek: true,
    },
    {
      id: 11,
      name: "Dr. Patricia Garcia",
      specialization: "pediatrician",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop",
      rating: 4.8,
      reviews: 245,
      location: "San Diego, CA",
      experience: 17,
      fee: 125,
      availableToday: true,
      availableThisWeek: true,
    },
    {
      id: 12,
      name: "Dr. Daniel Martinez",
      specialization: "dentist",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop",
      rating: 4.6,
      reviews: 142,
      location: "Portland, OR",
      experience: 12,
      fee: 105,
      availableToday: false,
      availableThisWeek: true,
    },
    {
      id: 13,
      name: "Dr. Rachel Green",
      specialization: "cardiologist",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop",
      rating: 4.9,
      reviews: 289,
      location: "New York, NY",
      experience: 20,
      fee: 180,
      availableToday: true,
      availableThisWeek: true,
    },
    {
      id: 14,
      name: "Dr. Thomas Wilson",
      specialization: "orthopedic",
      image:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop",
      rating: 4.7,
      reviews: 167,
      location: "Chicago, IL",
      experience: 13,
      fee: 155,
      availableToday: true,
      availableThisWeek: true,
    },
    {
      id: 15,
      name: "Dr. Maria Rodriguez",
      specialization: "dermatologist",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop",
      rating: 4.8,
      reviews: 201,
      location: "Los Angeles, CA",
      experience: 15,
      fee: 130,
      availableToday: true,
      availableThisWeek: true,
    },
  ];

  const [filters, setFilters] = useState({
    location: "",
    availability: "all",
    minRating: "0",
    minExperience: "0",
  });

  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const specialization =
    specializationData[specializationType] || specializationData.cardiologist;

  // Fetch doctors by specialization from API
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      setError(null);
      try {
        // Capitalize the specialization type for the API call
        // Handle special cases like ENT
        const formattedSpecialization = specializationType
          .split("-")
          .map(word => word.toUpperCase() === "ENT" ? "ENT" : word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        
        const response = await getDoctorsBySpecialization(formattedSpecialization);
        setDoctors(response.doctors || []);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError(err.message || "Failed to fetch doctors");
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [specializationType]);

  // Filter doctors based on filters
  useEffect(() => {
    let result = [...doctors];

    // Apply location filter (using city field from API)
    if (filters.location) {
      result = result.filter((doctor) =>
        doctor.city?.toLowerCase().includes(filters.location.toLowerCase()),
      );
    }

    // Apply availability filter
    if (filters.availability === "today") {
      result = result.filter((doctor) => doctor.availableToday);
    } else if (filters.availability === "this-week") {
      result = result.filter((doctor) => doctor.availableThisWeek);
    }

    // Apply rating filter
    const minRating = parseFloat(filters.minRating);
    if (minRating > 0) {
      result = result.filter((doctor) => doctor.rating >= minRating);
    }

    // Apply experience filter
    const minExperience = parseInt(filters.minExperience);
    if (minExperience > 0) {
      result = result.filter((doctor) => doctor.experience >= minExperience);
    }

    // Sort by experience (highest first) since rating might not be available
    result.sort((a, b) => (b.experience || 0) - (a.experience || 0));

    setFilteredDoctors(result);
  }, [doctors, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (name === "reset") {
      setFilters({
        location: "",
        availability: "all",
        minRating: "0",
        minExperience: "0",
      });
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SpecializationHeader specialization={specialization} />
      <QuickFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* Doctors List Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Doctors
            </h2>
            <p className="text-gray-600 mt-1">
              {loading ? (
                "Loading doctors..."
              ) : (
                <>
                  {filteredDoctors.length} doctor
                  {filteredDoctors.length !== 1 ? "s" : ""} found
                </>
              )}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading doctors...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Error Loading Doctors
              </h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Try Again
              </button>
            </div>
          ) : filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No doctors found
              </h3>
              <p className="text-gray-600 mb-4">
                {doctors.length === 0 
                  ? "No verified doctors available for this specialization yet"
                  : "Try adjusting your filters"
                }
              </p>
              {doctors.length > 0 && (
                <button
                  onClick={() =>
                    handleFilterChange({ target: { name: "reset", value: "" } })
                  }
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Reset Filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <WhyChooseSection specialization={specialization} />

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Book a Trusted {specialization.name.slice(0, -1)} Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get expert care from verified specialists in your area
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-10 rounded-lg text-lg transition duration-200 shadow-xl hover:shadow-2xl"
          >
            View Available Doctors
          </button>
        </div>
      </section>
    </div>
  );
};

export default SpecializationPage;

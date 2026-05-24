import React, { useState } from "react";

const FilterBar = ({
  filters,
  onFilterChange,
  onSortChange,
  onResetFilters,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const specializations = [
    "All Specializations",
    "Cardiologist",
    "Dermatologist",
    "Dentist",
    "Pediatrician",
    "Orthopedic",
    "Neurologist",
    "Psychiatrist",
    "General Physician",
  ];

  const availabilityOptions = ["Any Time", "Today", "Tomorrow", "This Week"];

  const sortOptions = [
    { value: "rating", label: "Rating" },
    { value: "experience", label: "Experience" },
    { value: "availability", label: "Availability" },
  ];

  return (
    <div className="bg-white shadow-md sticky top-16 z-40 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium text-gray-700">Filters</h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            {showFilters ? "Hide" : "Show"}
          </button>
        </div>

        {/* Search & Primary Filters */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 ${!showFilters ? "hidden md:grid" : ""}`}>
          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Doctor
            </label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={onFilterChange}
              placeholder="Doctor name or specialty"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={onFilterChange}
              placeholder="City or ZIP code"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Specialization Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specialization
            </label>
            <select
              name="specialization"
              value={filters.specialization}
              onChange={onFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          {/* Availability Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Availability
            </label>
            <select
              name="availability"
              value={filters.availability}
              onChange={onFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {availabilityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort & Reset Row */}
        <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${!showFilters ? "hidden md:flex" : ""}`}>
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">
              Sort by:
            </label>
            <div className="flex gap-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onSortChange(option.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                    filters.sortBy === option.value
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onResetFilters}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 transition duration-200"
          >
            <span>🔄</span>
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

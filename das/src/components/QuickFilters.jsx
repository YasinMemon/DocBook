import React from "react";

const QuickFilters = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-wrap gap-3">
          {/* Location Filter */}
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={onFilterChange}
              placeholder="📍 Filter by location"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Availability Filter */}
          <select
            name="availability"
            value={filters.availability}
            onChange={onFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Availability</option>
            <option value="today">Available Today</option>
            <option value="this-week">This Week</option>
          </select>

          {/* Rating Filter */}
          <select
            name="minRating"
            value={filters.minRating}
            onChange={onFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="0">All Ratings</option>
            <option value="4">4★ & above</option>
            <option value="4.5">4.5★ & above</option>
          </select>

          {/* Experience Filter */}
          <select
            name="minExperience"
            value={filters.minExperience}
            onChange={onFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="0">All Experience</option>
            <option value="5">5+ years</option>
            <option value="10">10+ years</option>
            <option value="15">15+ years</option>
          </select>

          {/* Reset Button */}
          <button
            onClick={() => {
              onFilterChange({ target: { name: "reset", value: "" } });
            }}
            className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition duration-200"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickFilters;

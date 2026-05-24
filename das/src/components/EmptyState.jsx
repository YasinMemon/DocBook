import React from "react";

const EmptyState = ({ onResetFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🔍</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          No Doctors Found
        </h3>
        <p className="text-gray-600 mb-8">
          We couldn't find any doctors matching your selected filters. Try
          adjusting your search criteria or reset all filters.
        </p>
        <button
          onClick={onResetFilters}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default EmptyState;

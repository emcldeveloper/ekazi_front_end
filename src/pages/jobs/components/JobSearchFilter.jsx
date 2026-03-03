import { useState } from "react";

export default function JobSearchFilter() {
  const [showFilters, setShowFilters] = useState(false);
  const [salaryRange, setSalaryRange] = useState([0, 150000]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const clearFilters = () => {
    setSalaryRange([0, 150000]);
  };

  return (
    <div className="w-full bg-white shadow-sm border-b">
      {/* 🔍 Top Search Section */}
      <div className="flex items-center gap-4 p-4 max-w-7xl mx-auto">
        {/* Category Dropdown */}
        <select className="border rounded-lg px-4 py-2 text-gray-600">
          <option>All</option>
          <option>IT</option>
          <option>Finance</option>
          <option>Marketing</option>
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search jobs or keywords..."
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Filters Button */}
        <button
          onClick={toggleFilters}
          className="border rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-100"
        >
          Filters
        </button>

        {/* Clear */}
        <button
          onClick={clearFilters}
          className="text-blue-500 hover:underline"
        >
          Clear
        </button>
      </div>

      {/* 🎯 Filter Panel */}
      {showFilters && (
        <div className="border-t bg-gray-50">
          <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Job Type */}
            <div>
              <h3 className="font-semibold mb-3">Job Type</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Full-Time
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Internship
                </label>
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <h3 className="font-semibold mb-3">Experience Level</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Entry-level (0–1 yr)
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Junior-level (1–2 yrs)
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Mid-level (3–5 yrs)
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Senior-level (6+ yrs)
                </label>
              </div>
            </div>

            {/* Salary Range */}
            <div>
              <h3 className="font-semibold mb-3">
                Salary Range
                <span className="float-right text-gray-500 text-sm">
                  ${salaryRange[0]} - ${salaryRange[1]}
                </span>
              </h3>

              <div className="flex flex-col gap-4">
                <input
                  type="range"
                  min="0"
                  max="150000"
                  value={salaryRange[0]}
                  onChange={(e) =>
                    setSalaryRange([Number(e.target.value), salaryRange[1]])
                  }
                  className="w-full"
                />

                <input
                  type="range"
                  min="0"
                  max="150000"
                  value={salaryRange[1]}
                  onChange={(e) =>
                    setSalaryRange([salaryRange[0], Number(e.target.value)])
                  }
                  className="w-full"
                />

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Min: ${salaryRange[0]}</span>
                  <span>Max: ${salaryRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

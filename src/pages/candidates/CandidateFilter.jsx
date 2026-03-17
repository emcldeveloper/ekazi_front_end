import { useState } from "react";
import { useIndustry, usePositionLevel } from "../../hooks/useUniversal";

const CandidateFilter = ({ onFilterChange }) => {
  // fetching industries and position levels for filter options
  const { data: industries } = useIndustry();
  const { data: positionLevels } = usePositionLevel();

  // filter states
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All");
  const [positionLevelsSelected, setPositionLevelsSelected] = useState([]);
  const [gender, setGender] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => setShowFilters(!showFilters);

  // function to trigger filter changes with current state values
  const triggerFilters = (updates) => {
    const newFilters = {
      search,
      industry,
      positionLevels: positionLevelsSelected,
      gender,
      ...updates,
    };

    onFilterChange(newFilters);
  };

  // handles checkbox changes for position
  const handleCheckboxChange = (value, state, setState, key) => {
    let updated;

    if (state.includes(value)) {
      updated = state.filter((item) => item !== value);
    } else {
      updated = [...state, value];
    }

    setState(updated);

    triggerFilters({
      search,
      industry,
      positionLevels:
        key === "positionLevels" ? updated : positionLevelsSelected,
      gender,
    });
  };

  // handles search input changes
  const handleSearch = (value) => {
    setSearch(value);

    triggerFilters({
      search: value,
      industry,
      positionLevels: positionLevelsSelected,
      gender,
    });
  };

  // clears all filters and resets to default values
  const clearFilters = () => {
    setSearch("");
    setIndustry("All");
    setPositionLevelsSelected([]);
    setGender("");
    setShowFilters(false);

    triggerFilters({
      search: "",
      industry: "All",
      positionLevels: [],
      gender: "",
    });
  };

  return (
    <div className="w-full mb-4">
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 max-w-7xl mx-auto">
        {/* Industry */}
        {/* <select
          value={industry}
          onChange={(e) => {
            const value = e.target.value;
            setIndustry(value);

            triggerFilters({
              search,
              industry: value,
              positionLevels: positionLevelsSelected,
              gender,
            });
          }}
          className="border rounded-lg px-4 py-2"
        >
          <option value="All">All Industries</option>

          {industries?.map((industry) => (
            <option key={industry.id} value={industry.industry_name}>
              {industry.industry_name}
            </option>
          ))}
        </select> */}

        {/* Search */}
        <input
          type="text"
          placeholder="Search candidates..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2"
        />

        {/* Toggle Filters */}
        {/* <button
          onClick={toggleFilters}
          className="border rounded-lg px-4 py-2 hover:bg-gray-100"
        >
          Filters
        </button> */}

        {/* Clear */}
        {/* <button
          onClick={clearFilters}
          className="text-blue-500 hover:underline"
        >
          Clear
        </button> */}
      </div>

      {showFilters && (
        <div className="border-t bg-gray-50 mt-4">
          <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-3 gap-8">
            {/* Experience */}
            <div>
              <p className="font-semibold mb-3">Experience</p>

              {positionLevels?.map((level) => (
                <label
                  key={level.id}
                  className="flex items-center gap-2 mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    onChange={() =>
                      handleCheckboxChange(
                        level.id,
                        positionLevelsSelected,
                        setPositionLevelsSelected,
                        "positionLevels",
                      )
                    }
                  />
                  {level.position_name}
                </label>
              ))}
            </div>

            {/* Location */}
            <div>
              <p className="font-semibold mb-3">Gender</p>

              <select
                value={gender}
                onChange={(e) => {
                  const value = e.target.value;
                  setGender(value);

                  triggerFilters({
                    search,
                    industry,

                    positionLevels: positionLevelsSelected,
                    gender: value,
                  });
                }}
                className="border rounded-lg px-3 py-2 w-full"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateFilter;

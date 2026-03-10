import { useState } from "react";
import {
  useIndustry,
  useJobTypes,
  usePositionLevel,
  useRegions,
} from "../../hooks/useUniversal";

const JobFilters = ({ onFilterChange, initialFilters }) => {
  const { data: industries } = useIndustry();
  const { data: jobTypesData } = useJobTypes();
  const { data: regions } = useRegions();
  const { data: positionLevels } = usePositionLevel();

  const tanzaniaRegions = regions?.filter((region) => region.country_id === 1);

  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState(initialFilters?.industry || "All");
  const [jobTypes, setJobTypes] = useState([]);
  const [positionLevelsSelected, setPositionLevelsSelected] = useState([]);
  const [location, setLocation] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => setShowFilters(!showFilters);

  const triggerFilters = (filters) => {
    onFilterChange(filters);
  };

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
      jobTypes: key === "jobTypes" ? updated : jobTypes,
      positionLevels:
        key === "positionLevels" ? updated : positionLevelsSelected,
      location,
    });
  };

  const handleSearch = (value) => {
    setSearch(value);

    triggerFilters({
      search: value,
      industry,
      jobTypes,
      positionLevels: positionLevelsSelected,
      location,
    });
  };

  const clearFilters = () => {
    setSearch("");
    setIndustry("All");
    setJobTypes([]);
    setPositionLevelsSelected([]);
    setLocation("");
    setShowFilters(false);

    triggerFilters({
      search: "",
      industry: "All",
      jobTypes: [],
      positionLevels: [],
      location: "",
    });
  };

  return (
    <div className="w-full mb-4">
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 max-w-7xl mx-auto">
        {/* Industry */}
        <select
          value={industry}
          onChange={(e) => {
            const value = e.target.value;
            setIndustry(value);

            triggerFilters({
              search,
              industry: value,
              jobTypes,
              positionLevels: positionLevelsSelected,
              location,
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
        </select>

        {/* Search */}
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2"
        />

        {/* Toggle Filters */}
        <button
          onClick={toggleFilters}
          className="border rounded-lg px-4 py-2 hover:bg-gray-100"
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

      {showFilters && (
        <div className="border-t bg-gray-50 mt-4">
          <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-3 gap-8">
            {/* Job Types */}
            <div>
              <p className="font-semibold mb-3">Job Type</p>

              {jobTypesData?.map((type) => (
                <label
                  key={type.id}
                  className="flex items-center gap-2 mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    onChange={() =>
                      handleCheckboxChange(
                        type.type_name,
                        jobTypes,
                        setJobTypes,
                        "jobTypes",
                      )
                    }
                  />
                  {type.type_name}
                </label>
              ))}
            </div>

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
              <p className="font-semibold mb-3">Location</p>

              <select
                value={location}
                onChange={(e) => {
                  const value = e.target.value;
                  setLocation(value);

                  triggerFilters({
                    search,
                    industry,
                    jobTypes,
                    positionLevels: positionLevelsSelected,
                    location: value,
                  });
                }}
                className="border rounded-lg px-3 py-2 w-full"
              >
                <option value="">All Regions</option>

                {tanzaniaRegions?.map((region) => (
                  <option key={region.id} value={region.region_name}>
                    {region.region_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFilters;

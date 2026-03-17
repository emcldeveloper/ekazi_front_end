import { useState, useEffect } from "react";
import { useIndustry } from "../../hooks/useUniversal";

const JobFilters = ({ onFilterChange, initialFilters }) => {
  const { data: industries } = useIndustry();

  const [search, setSearch] = useState(initialFilters?.search || "");
  const [industry, setIndustry] = useState(initialFilters?.industry || "");

  // 🔹 Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilterChange({
        search,
        industry,
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, [search, industry, onFilterChange]);

  return (
    <div className="w-full mb-4">
      <div className="grid md:grid-cols-3 items-center gap-4 max-w-7xl mx-auto">
        {/* Industry */}
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="col-span-1 border rounded-lg shadow-sm px-4 py-2"
        >
          <option value="">All Industries</option>

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
          onChange={(e) => setSearch(e.target.value)}
          className="col-span-2 border rounded-lg shadow-sm px-4 py-2"
        />
      </div>
    </div>
  );
};

export default JobFilters;

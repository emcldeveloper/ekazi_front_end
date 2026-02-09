import React from "react";
import { Link } from "react-router-dom";
import { useClientsJobCountByIndustry } from "../../../../hooks/useJobCategories.js";

const Category = () => {
  const {
    data: industryCounts,
    isLoading,
    isError,
  } = useClientsJobCountByIndustry();

  return (
    <div>
      <h4 className="mb-4">Industries with Job Listings</h4>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading industries.</p>}

      {!isLoading && industryCounts?.length === 0 && (
        <p>No industries found.</p>
      )}

      {!isLoading && industryCounts?.length > 0 && (
        <div className="row">
          {industryCounts.map((industry) => {
            const formattedName = industry.industry_name
              .toLowerCase()
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");

            return (
              <div
                key={industry.id}
                className="col-md-4 mb-3 d-flex align-items-center"
              >
                <span className="badge bg-primary rounded-pill me-3">
                  {industry.job_count}
                </span>

                <Link
                  to={`/jobs?industry=${industry.id}`}
                  className="text-decoration-none text-dark"
                >
                  {formattedName}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Category;

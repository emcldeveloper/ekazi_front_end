import React from "react";
import { Link } from "react-router-dom";
import { useJobCountByRegion } from "../../../../hooks/useJobCategories.js";

const Locations = () => {
  const { data: regions, isLoading, isError } = useJobCountByRegion();

  return (
    <div>
      <h4 className="mb-4">Jobs by Location</h4>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading locations.</p>}

      {!isLoading && regions?.length === 0 && <p>No job locations found.</p>}

      {!isLoading && regions?.length > 0 && (
        <div className="row">
          {regions.map((region) => {
            const formattedRegionName = region.region_name
              .toLowerCase()
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");

            return (
              <div
                key={region.region_id}
                className="col-md-4 mb-3 d-flex align-items-center"
              >
                <span className="badge bg-primary rounded-pill me-3">
                  {region.total_positions}
                </span>

                <Link
                  to={`/jobs?region=${region.region_id}`}
                  className="text-decoration-none text-dark"
                >
                  {formattedRegionName}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Locations;

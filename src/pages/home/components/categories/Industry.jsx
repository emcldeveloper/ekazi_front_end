import { Link } from "react-router-dom";
import { useJobCategorySummary } from "../../../../hooks/useJobCategories.js";

const Industries = () => {
  const { data: categories, isLoading, isError } = useJobCategorySummary();

  return (
    <div>
      <h4 className="mb-4">Jobs by Industry</h4>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading industries.</p>}

      {!isLoading && categories?.length === 0 && <p>No industries found.</p>}

      {!isLoading && categories?.length > 0 && (
        <div className="row">
          {categories.map((category) => {
            const formattedCategoryName = category.category_name
              .toLowerCase()
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");

            return (
              <div
                key={category.category_id}
                className="col-md-4 mb-3 d-flex align-items-center"
              >
                <span className="badge bg-primary rounded-pill me-3">
                  {category.total_positions}
                </span>

                <Link
                  to={`/jobs?industry=${category.category_id}`}
                  className="text-decoration-none text-dark"
                >
                  {formattedCategoryName}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Industries;

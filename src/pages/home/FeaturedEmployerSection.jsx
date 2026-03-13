import { useEmployers } from "../../hooks/useEmployer.js";
import { DEFAULT_LOGO, IMG_BASE } from "../../helpers/img.js";
import { useNavigate } from "react-router-dom";

const FeaturedEmployerSection = () => {
  const navigate = useNavigate();

  const { data: jobCompanies, isLoading, isError, error } = useEmployers(1, 20);

  const safeCompanies = Array.isArray(jobCompanies) ? jobCompanies : [];

  const employers = [
    ...safeCompanies,
    ...safeCompanies,
    ...safeCompanies,
    ...safeCompanies,
  ];

  return (
    <section className="bg-white py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-center text-3xl font-semibold text-Blue mb-10">
          Featured Employers
        </h2>

        {/* Errors */}
        {isError && (
          <p className="text-center text-red-500">{error?.message}</p>
        )}

        {/* Loader */}
        {isLoading ? (
          <div className="flex justify-center">
            <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="relative w-full overflow-hidden">
            {/* Scroll container */}
            <div className="flex gap-4 employer-scroll">
              {employers.map((employer, idx) => {
                const logoURL = employer.logo
                  ? `${IMG_BASE}${employer.logo}`
                  : DEFAULT_LOGO;

                return (
                  <div
                    key={`${employer.id}-${idx}`}
                    onClick={() =>
                      navigate(`/employer/details`, {
                        state: { client: employer },
                      })
                    }
                    className="flex-shrink-0"
                  >
                    <div className="w-24 h-24 md:w-28 md:h-28 bg-white border border-white rounded-xl flex items-center justify-center hover:shadow-md transition hover:-translate-y-1 cursor-pointer">
                      <img
                        src={logoURL}
                        alt={employer.client_name || "Employer"}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Animation */}
      <style>{`
        .employer-scroll {
          animation: scrollLeft 35s linear infinite;
          width: max-content;
        }

        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedEmployerSection;

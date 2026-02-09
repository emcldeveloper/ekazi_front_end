import { Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import JobAlertsSection from "./Jobalert";
import { useEmployers } from "../../../hooks/useEmployer";
import TemplateSlider from "../../../pages/JobSeeker/Cv/components/TemplateSlider";

const RightSideBar = () => {
  const navigate = useNavigate();
  const { data: employers = [] } = useEmployers({ page: 1, perPage: 10 });

  return (
    <div className="d-flex flex-column gap-3">
      {/* Templates */}
      <TemplateSlider />

      {/* Featured Companies Section */}
      <Card className="shadow-sm">
        <Card.Body>
          <div className="relative bg-gradient-to-r from-orange-600 via-red-500 to-yellow-500 h-24 flex items-center justify-between px-8 rounded-t-lg shadow-md">
            <div>
              <h5 className="text-white text-2xl font-bold tracking-wide">
                Featured Companies
              </h5>
              <div className="mt-1 w-24 h-[3px] bg-white/80 rounded"></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-blue/90">Updated Weekly</span>
              <i className="fa-solid fa-building text-white text-lg"></i>
            </div>
          </div>

          <div
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              paddingRight: "8px", // Prevents content from touching scrollbar
            }}
          >
            {employers.map((company) => (
              <div
                key={company.id}
                className="d-flex align-items-center gap-3 p-2 hover-shadow-sm rounded mb-2"
                style={{
                  transition: "all 0.2s ease",
                  ":hover": {
                    backgroundColor: "#f8f9fa",
                  },
                }}
              >
                <div
                  className="bg-light rounded-circle overflow-hidden"
                  style={{ width: "60px", height: "60px" }}
                >
                  <a href={`/featured/employer/details/${company.id}`}>
                    <Image
                      src={
                        company.logo
                          ? `https://api.ekazi.co.tz/${company.logo}`
                          : "/employer.png"
                      }
                      alt={company.client_name}
                      roundedCircle
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        backgroundColor: "white",
                      }}
                    />
                  </a>
                </div>
                <div className="flex-grow-1">
                  <h6
                    className="mb-0 fw-semibold text-truncate"
                    style={{ maxWidth: "200px", cursor: "pointer" }}
                    onClick={() =>
                      navigate(`/featured/employer/details/${company.id}`)
                    }
                  >
                    {company.client_name} msoft company
                  </h6>

                  {/* Optional job count */}
                  {/* <small className="text-muted">12 Jobs</small> */}
                </div>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>

      {/* Job Alerts Section */}
      <JobAlertsSection />
      {/* <ChatApp /> */}
    </div>
  );
};

export default RightSideBar;

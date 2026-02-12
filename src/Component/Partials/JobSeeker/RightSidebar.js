import { Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import JobAlertsSection from "./Jobalert";
import { useEmployers } from "../../../hooks/useEmployer";
import TemplateSlider from "../../../pages/JobSeeker/Cv/components/TemplateSlider";

const RightSideBar = () => {
  const navigate = useNavigate();
  const { data: employers = [] } = useEmployers({ page: 1, perPage: 10 });

  console.log("Companies", employers);

  return (
    <div className="d-flex flex-column gap-3">
      {/* Templates */}
      <TemplateSlider />

      {/* Featured Companies Section */}
      <Card className="shadow-sm">
        <Card.Header className="p-0">
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
        </Card.Header>
        <Card.Body className="p-3">
          <div
            style={{
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {employers.map((company) => (
              <div
                key={company.id}
                onClick={() =>
                  navigate(`/featured/employer/details/${company.id}`)
                }
                className="d-flex align-items-center gap-3 p-2 rounded-3 mb-2 company-item"
                style={{
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {/* Logo */}
                <div
                  className="d-flex align-items-center justify-content-center bg-light rounded-3 overflow-hidden"
                  style={{
                    width: "90px",
                    height: "90px",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={
                      company.logo
                        ? `https://api.ekazi.co.tz/${company.logo}`
                        : "/employer.png"
                    }
                    alt={company.client_name}
                    style={{
                      maxWidth: "80%",
                      maxHeight: "80%",
                      objectFit: "contain",
                    }}
                  />
                </div>

                {/* Company Info */}
                <div className="flex-grow-1">
                  <h6
                    className="fw-semibold mb-1"
                    style={{
                      lineHeight: "1.4",
                      wordBreak: "break-word",
                    }}
                  >
                    {company.client_name}
                  </h6>

                  {/* Optional: Add jobs count later */}
                  {/* <small className="text-muted">12 Jobs Available</small> */}
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

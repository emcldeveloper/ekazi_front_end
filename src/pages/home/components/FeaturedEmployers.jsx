import React from "react";
import { Card, Col, Image, Button } from "react-bootstrap";

import { IMG_BASE, DEFAULT_LOGO } from "../../../helpers/img.js";

const FeaturedEmployers = ({ jobCompanies }) => {
  const safeCompanies = Array.isArray(jobCompanies) ? jobCompanies : [];

  // Duplicate array for scrolling effect
  const employers = [...safeCompanies, ...safeCompanies];

  return (
    <Col md={12} className="bg-white p-4">
      <h2 className="text-center fw-bold mb-4" style={{ color: "#2E58A6" }}>
        Employers
      </h2>

      <div className="position-relative overflow-hidden w-100">
        <div className="d-flex employer-scroll">
          {employers.map((employer, idx) => {
            const logoURL = employer.logo
              ? `${IMG_BASE}${employer.logo}`
              : DEFAULT_LOGO;

            return (
              <div
                key={`${employer.id}-${idx}`}
                className="d-flex justify-content-center align-items-center px-2"
                style={{ flex: "0 0 auto", width: "130px" }}
              >
                <Card className="border-0 shadow-sm" style={{ height: "auto" }}>
                  <Card.Body className="text-center py-2 px-2">
                    <a href={`/featured/employer/details/${employer.id}`}>
                      <Image
                        src={logoURL}
                        alt={employer.client_name || "Employer"}
                        roundedCircle
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "contain",
                          backgroundColor: "white",
                        }}
                      />
                    </a>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Button
          href="/employer/find"
          style={{ backgroundColor: "#D36314", borderColor: "#D36314" }}
          className="px-4 py-1"
        >
          Browse All
        </Button>
      </div>

      <style>{`
        .employer-scroll {
          animation: scroll-left 40s linear infinite;
          display: flex;
          white-space: nowrap;
        }

        @keyframes scroll-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </Col>
  );
};

export default FeaturedEmployers;

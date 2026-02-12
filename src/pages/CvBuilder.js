import React, { useState } from "react";
import { Carousel, Button, Container, Row, Col } from "react-bootstrap";
import MainLayout1 from "../layouts/MainLayout1";
import { TEMPLATES } from "./JobSeeker/Cv/data/templates";
import { useNavigate } from "react-router-dom";
import LoginModal from "./Auth/LoginModal";

const AUTH_TOKEN_KEY = "auth_token";

const CVBuilder = () => {
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem(AUTH_TOKEN_KEY),
  );

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/jobseeker/sample-selection");
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setIsLoggedIn(true);
    navigate("/jobseeker/sample-selection");
  };

  return (
    <MainLayout1>
      {/* <PageHeader title="Cv Builder" /> */}
      <Container fluid className="py-5" style={{ background: "#f8fafc" }}>
        <Container>
          <Row className="align-items-center g-5">
            {/* LEFT CONTENT */}
            <Col lg={7}>
              <h2
                className="fw-bold mb-4"
                style={{
                  color: "#2E58A6",
                  fontSize: "2.5rem",
                }}
              >
                Create a Job-Winning CV in Minutes
              </h2>

              <p className="text-muted font-semibold mb-3 fs-5">
                Your CV is fully portable — download it for external job
                applications or use it to apply for vacancies directly within
                the platform.
              </p>

              <div className="text-muted mb-4" style={{ lineHeight: "1.7" }}>
                <p>
                  Build a professional CV in minutes — at no cost. Our platform
                  enables job seekers to create a complete, structured, and
                  market-ready professional profile with ease.
                </p>

                <p>
                  After registering or logging in, you can develop your full
                  professional profile in one place. The system guides you step
                  by step to capture essential details, including personal
                  information, education background, work experience,
                  professional skills, certifications, and referees.
                </p>

                {expanded && (
                  <>
                    <p>
                      Once completed, you can select from multiple
                      professionally designed templates and instantly switch
                      between layouts to match different job applications,
                      industries, or preferred profile length. This allows you
                      to tailor presentation without rewriting your content.
                    </p>

                    <p>
                      Your CV is fully portable — download it for external job
                      applications or use it to apply for vacancies directly
                      within the platform.
                    </p>

                    <p>
                      Create your profile today and transform your professional
                      information into a polished, employer-ready CV in minutes.
                      Click the link to register or log in.
                    </p>
                  </>
                )}

                {/* Toggle Link */}
                <span
                  onClick={() => setExpanded(!expanded)}
                  style={{
                    color: "#2E58A6",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  {expanded ? "Read Less" : "Read More"}
                </span>
              </div>

              {/* Buttons */}
              <div className="d-flex flex-wrap gap-3">
                <Button
                  className="rounded-lg"
                  size="lg"
                  style={{
                    backgroundColor: "#D36314",
                    border: "none",
                    padding: "12px 28px",
                  }}
                  onClick={handleClick}
                >
                  Build Your CV Now
                </Button>
              </div>
            </Col>

            {/* RIGHT CAROUSEL */}
            <Col lg={5}>
              <div
                className="shadow-lg rounded-4 overflow-hidden"
                style={{
                  height: "450px",
                  background: "#fff",
                }}
              >
                <Carousel indicators={false}>
                  {TEMPLATES.map((template) => (
                    <Carousel.Item key={template.id}>
                      <div
                        style={{
                          height: "450px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "20px",
                        }}
                      >
                        <img
                          src={template.image}
                          alt={template.name}
                          style={{
                            maxHeight: "100%",
                            maxWidth: "100%",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                          onClick={handleClick}
                        />
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </MainLayout1>
  );
};

export default CVBuilder;

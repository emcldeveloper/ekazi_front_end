import React from "react";
import { Carousel, Button, Container, Row, Col } from "react-bootstrap";
import MainLayout1 from "../layouts/MainLayout1";
import PageHeader from "../Component/Pages/PageHeader";

const templates = [
  { id: 1, src: "/cv1.png", title: "Basic template" },
  { id: 2, src: "/cv2.png", title: "Professional template" },
  { id: 3, src: "/cv3.png", title: "Standard template" },
  { id: 4, src: "/cv4.png" },
  { id: 5, src: "/cv5.png" },
  { id: 6, src: "/cv6.png" },
  { id: 7, src: "/cv7.png" },
];

const isAuthenticated = false; // Set this dynamically
const applicantId = null;       // Set this dynamically

const CVBuilder = () => {
  const handleCVClick = (templateId) => {
    if (isAuthenticated && applicantId) {
      window.location.href = `/cv-template/${templateId}`;
    } else {
      sessionStorage.setItem("fromCvTemplateClick", templateId);
      window.location.href = `/login?from_cv_template=${templateId}`;
    }
  };

  return (
    <MainLayout1>
      <PageHeader title="Cv Builder" />
      <Container className="my-5">
        <Row className="align-items-center mb-5">
          <Col md={4}>
            <Carousel>
              {templates.map((template) => (
                <Carousel.Item key={template.id}>
                  <div className="position-relative">
                    <Button
                      variant="primary"
                      style={{
                        backgroundColor: "#D36314",
                        borderRadius: "50px",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 10,
                        padding: "10px 20px",
                      }}
                      onClick={() => handleCVClick(template.id)}
                    >
                      Build my CV
                    </Button>
                    <img
                      className="d-block w-100"
                      src={template.src}
                      alt={template.title || `CV ${template.id}`}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col md={8}>
            <h1 className="display-4 fw-bold" style={{ color: "#2E58A6" }}>
              Build your perfect CV
            </h1>
            <p className="h4">
              Build or edit your CV with expert guidance by choosing a template and
              effortlessly importing all your information step by step from your account.
            </p>
            <div className="d-flex">
              {isAuthenticated && applicantId ? (
                <>
                  <Button
                    variant="primary"
                    className="me-3"
                    style={{ backgroundColor: "#2E58A6", borderRadius: "50px" }}
                    onClick={() => handleCVClick(1)}
                  >
                    Build my CV
                  </Button>
                  <Button
                    variant="primary"
                    className="me-3"
                    style={{ backgroundColor: "#D36314", borderRadius: "50px" }}
                  >
                    Edit Profile
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="primary"
                    className="me-3"
                    style={{ backgroundColor: "#2E58A6", borderRadius: "50px" }}
                    onClick={() => (window.location.href = "/login")}
                  >
                    Build my CV
                  </Button>
                  <Button
                    variant="primary"
                    className="me-3"
                    style={{ backgroundColor: "#D36314", borderRadius: "50px" }}
                    onClick={() => (window.location.href = "/login")}
                  >
                    Edit Profile
                  </Button>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </MainLayout1>
  );
};

export default CVBuilder;

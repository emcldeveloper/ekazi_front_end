import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import EmployerProfileCard from "./EmployerProfileCard";
import AboutEmployer from "./AboutEmployer";
import EmployerJobs from "./EmployerJobs";
import AdPlaceholder from "../Ads/Vertical/AdPlaceholder";

const EmployerProfile = () => {
  const location = useLocation();
  const client = location.state?.client;

  return (
    <Container className="py-5">
      <Row>
        <Col xs={12} md={9}>
          <EmployerProfileCard client={client} isAuthenticated={true} />
          <AboutEmployer client={client} />
          <EmployerJobs client={client} />
        </Col>
        <Col
          xs={12}
          md={3}
          style={{ position: "sticky", top: "180px", alignSelf: "flex-start" }}
        >
          <AdPlaceholder />
        </Col>
      </Row>
    </Container>
  );
};

export default EmployerProfile;

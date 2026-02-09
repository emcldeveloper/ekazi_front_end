// src/components/JobSeeker/Layouts/JobSeekerDashboardLayout.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LeftSideBar from "../Component/Partials/JobSeeker/LeftSideBar";
import AppFooter from "../Component/Partials/AppFooter";
import AppHeader from "../Component/Partials/AppHeader";

const JobSeekerLayout2 = ({ children, correspondences, setShowConsentModal }) => {
  return (
    <>
      <AppHeader />

      <Container fluid>
        <Row className="d-flex">
          {/* Left Sidebar */}
          <Col xs={12} md={3} className="bg-light p-3">
            <LeftSideBar 
              correspondences={correspondences || []} 
              setShowConsentModal={setShowConsentModal}
            />
          </Col>

          {/* Main content */}
          <Col xs={12} md={9} className="bg-light p-3">
            {children}
          </Col>
        </Row>
      </Container>

      <AppFooter />
    </>
  );
};

export default JobSeekerLayout2;

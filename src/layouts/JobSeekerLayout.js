// src/components/JobSeeker/Layouts/JobSeekerDashboardLayout.jsx
import React, { useState } from "react";
import { Container, Row, Col, Alert, Modal, Button } from "react-bootstrap";
import LeftSideBar from "../Component/Partials/JobSeeker/LeftSideBar";
import RightSidebar from "../Component/Partials/JobSeeker/RightSidebar";
import AppFooter from "../Component/Partials/AppFooter";
import AppHeader from "../Component/Partials/AppHeader";
import { FaTimes } from "react-icons/fa";
import {
  useApplicantProfile,
  useUpdateWelcomeNote,
  useWelcomeNote,
} from "../hooks/useCandidates";
import ApplicantHeader from "../components/layouts/ApplicantHeader";

const JobSeekerLayout = ({ children }) => {
  const { data } = useWelcomeNote();
  // const { mutate } = useUpdateWelcomeNote();
  // const { data: profile } = useApplicantProfile();

  const welcomeNote = data?.note_data?.note?.[0]?.official_notes?.note ?? "";
  // const applicantId = profile?.data?.applicant_profile?.[0]?.id;

  const [showAlert, setShowAlert] = useState(true);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <AppHeader />
      {/* <ApplicantHeader /> */}

      <Container fluid>
        {welcomeNote && showAlert && (
          <Row className="mt-4">
            <Col>
              <Alert variant="warning" className="text-center">
                <div className="d-flex align-items-center justify-content-between">
                  <p className="m-0 p-0">{welcomeNote}</p>
                  <button
                    className="btn btn-link text-dark p-0"
                    onClick={handleCloseAlert}
                  >
                    <FaTimes />
                  </button>
                </div>
              </Alert>
            </Col>
          </Row>
        )}

        <Row>
          <Col xs={12} md={3} className="bg-light p-3">
            <LeftSideBar />
          </Col>

          <Col xs={12} md={6} className="bg-light p-3">
            {children}
          </Col>

          <Col xs={12} md={3} className="bg-light p-3">
            <RightSidebar />
          </Col>
        </Row>
      </Container>

      <AppFooter />
    </>
  );
};

export default JobSeekerLayout;

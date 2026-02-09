import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BsFacebook, BsLinkedin, BsTwitter, BsInstagram } from "react-icons/bs";

import SubFooter from "./SubFooter";
import ContactModal from "../Pages/ContactModal";
import MapModal from "../Pages/MapModal";

const AppFooter = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenMap = () => setShowMap(true);
  const handleCloseMap = () => setShowMap(false);

  return (
    <section className="bg-light w-100">
      <Container className="p-4 ">
        <SubFooter />

        <Row className="mt-4 justify-content-center">
          {/* Logo & Social Links */}
          <Col md={3}>
            <img
              src="/logo.png"
              alt="eKazi Logo"
              style={{ maxWidth: "120px", marginBottom: "10px" }}
            />
            <p className="mb-2 text-muted">
              © {currentYear}.
              <a href="https://ekazi.co.tz/" className="text-primary ms-1">
                eKazi.co.tz
              </a>
            </p>
            <div className="d-flex gap-3">
              <a
                href="https://facebook.com/eKazi.co.tz"
                className="text-primary"
                title="Facebook"
              >
                <BsFacebook size={20} />
              </a>
              <a href="#" className="text-primary" title="LinkedIn">
                <BsLinkedin size={20} />
              </a>
              <a href="#" className="text-primary" title="Twitter">
                <BsTwitter size={20} />
              </a>
              <a
                href="https://www.instagram.com/ekazi.co.tz?igsh=M2VyNW5keTlnbHFn"
                className="text-primary"
                title="Twitter"
              >
                <BsInstagram size={20} />
              </a>
            </div>
          </Col>

          {/* Job Seeker Links */}
          <Col md={3}>
            <h6 className="fw-bold">JOB SEEKER</h6>
            {[
              ["Sign up", "jobseeker-register/"],
              ["Search jobs", "jobs/"],
              ["Sign in", "login/"],
              ["View applications", "login/"],
              ["Job alerts", "login/"],
              ["Post resume", ""],
              ["My courses", "/jobseeker/dashboard"],
              ["Application tracking", ""],
              ["Job seeker dashboard", "/jobseeker/dashboard"],
              ["CV builder", "/jobseeker/sample-selection"],
            ].map(([label, link]) => (
              <div key={label}>
                <a href="#" className="text-primary">
                  {label}
                </a>
              </div>
            ))}
          </Col>

          {/* Employer Links */}
          <Col md={3}>
            <h6 className="fw-bold">EMPLOYER</h6>
            {[
              ["Post a job", "employer/job/post"],
              ["Search CV/Profiles", "employer/search/applicant"],
              ["Sign in", "login/"],
              ["Sign up", "register/"],
              ["Applicant tracking", "/employer/dashboard/"],
            ].map(([label, link]) => (
              <div key={label}>
                <a
                  href={`https://api.ekazi.co.tz/${link}`}
                  className="text-primary"
                >
                  {label}
                </a>
              </div>
            ))}
          </Col>

          {/* Information Links */}
          <Col md={3}>
            <h6 className="fw-bold">INFORMATION</h6>

            <a href="/about" className="text-primary">
              About us
            </a>

            {/* View Map Button */}
            <div className="my-2">
              <span
                className="text-primary"
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={handleOpenMap}
              >
                View Map
              </span>
            </div>

            {/* Contact Modal Link */}
            <div>
              <span
                onClick={handleOpenModal}
                className="text-primary"
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                Contact
              </span>
            </div>
          </Col>
        </Row>

        {/* Modals */}
        <ContactModal show={showModal} handleClose={handleCloseModal} />
        <MapModal show={showMap} handleClose={handleCloseMap} />
      </Container>
    </section>
  );
};

export default AppFooter;

import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { BsFacebook, BsLinkedin, BsTwitter, BsInstagram } from "react-icons/bs";

import ContactModal from "../Component/Pages/ContactModal";
import MapModal from "../Component/Pages/MapModal";

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
      <Container className="p-4">
        <Row className="my-5">
          <Col md={4} className="text-center">
            <div className="d-flex flex-col align-items-center">
              <FaCheckCircle color="#D36314" size={32} className="mb-4" />
              <h6 className="text-primary font-bold">Hire Candidate</h6>
              <p className="text-primary">
                Find the potential candidate from eKazi
              </p>
            </div>
          </Col>

          <Col md={4} className="text-center">
            <div className="d-flex flex-col align-items-center">
              <FaCheckCircle color="#D36314" size={32} className="mb-4" />
              <h6 className="text-primary font-bold">Get Hired</h6>
              <p className="text-primary">Receive new jobs directly</p>
            </div>
          </Col>

          <Col md={4} className="text-center">
            <div className="d-flex flex-col align-items-center">
              <FaCheckCircle color="#D36314" size={32} className="mb-4" />
              <h6 className="text-primary font-bold">Explore Careers</h6>
              <p className="text-primary">
                See personalized job and career recommendations
              </p>
            </div>
          </Col>
        </Row>

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
              <a
                href="https://www.instagram.com/ekazi.co.tz?igsh=M2VyNW5keTlnbHFn"
                className="text-primary"
                alt="LinkedIn"
              >
                <BsLinkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/ekazi.co.tz?igsh=M2VyNW5keTlnbHFn"
                className="text-primary"
                alt="Twitter"
              >
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
            <h6 className="fw-bold">Job seeker</h6>
            {[
              ["Jobs", "/jobs"],
              ["CV builder", "/cv-builder"],
              ["Companies", "/employers"],
              ["Login", "/login"],
              ["Register", "/register"],
            ].map(([label, link]) => (
              <div key={label}>
                <a href={link} alt={label} className="text-primary">
                  {label}
                </a>
              </div>
            ))}
          </Col>

          {/* Employer Links */}
          <Col md={3}>
            <h6 className="fw-bold">Employer</h6>
            {[
              ["Post a job", "/login"],
              ["Find talents", "/candidates"],
              ["Login", "/login"],
              ["Register", "/register"],
            ].map(([label, link]) => (
              <div key={label}>
                <a href={link} alt={label} className="text-primary">
                  {label}
                </a>
              </div>
            ))}
          </Col>

          {/* Information Links */}
          <Col md={3}>
            <h6 className="fw-bold">Company</h6>

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

      {/* Copyright */}
      <div className="bg-[#1E65A6] w-100 p-4 text-center">
        <p className="m-0 text-white">
          {`© ${currentYear}. All rights reserved.`}
        </p>
      </div>
    </section>
  );
};

export default AppFooter;

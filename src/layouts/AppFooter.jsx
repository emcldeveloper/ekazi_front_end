import { useState } from "react";
import { Container } from "react-bootstrap";
import {
  BsFacebook,
  BsLinkedin,
  BsInstagram,
  BsWhatsapp,
} from "react-icons/bs";

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
    <section className="bg-Blue text-white w-100">
      <Container className="p-4">
        <div className="my-4 grid md:grid-cols-4 gap-8 md:gap-20">
          {/* Logo & Social Links */}
          <div>
            <img
              src="/logos/ekazi-white.png"
              alt="eKazi Logo"
              style={{ maxWidth: "120px", marginBottom: "10px" }}
            />
            <p className="mb-4 text-gray-300">
              ekazi is An Online Recruitment Management Platform Designed for
              Employers/Recruiters, Job Seekers and Freelancers.
            </p>
            <div className="d-flex gap-3">
              <a
                href="https://facebook.com/eKazi.co.tz"
                className=" text-white"
                title="Facebook"
                target="_blank"
                rel="noreferrer"
              >
                <BsFacebook size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/ekazi-online-recruitment-platform/"
                className="text-white"
                alt="LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                <BsLinkedin size={20} />
              </a>
              <a
                href="https://whatsapp.com/channel/0029VayXx2m0VycFOUT7wI1K"
                className="text-white"
                alt="WhatsApp"
                target="_blank"
                rel="noreferrer"
              >
                <BsWhatsapp size={20} />
              </a>
              <a
                href="https://www.instagram.com/ekazi.co.tz?igsh=M2VyNW5keTlnbHFn"
                className="text-white"
                alt="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <BsInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Job Seeker Links */}
          <div>
            <h6 className="fw-bold">Job seeker</h6>
            {[
              ["Jobs", "/jobs"],
              ["Employers", "/employers"],
              ["CV builder", "/cv-builder"],
              ["Salary Calculator", "/salary-calculator"],
              ["View applications", "/login"],
              ["Job alerts", "/login"],
            ].map(([label, link]) => (
              <div key={label}>
                <a
                  href={link}
                  alt={label}
                  className="text-gray-300 text-decoration-none"
                >
                  {label}
                </a>
              </div>
            ))}
          </div>

          {/* Employer Links */}
          <div>
            <h6 className="fw-bold">Employer</h6>
            {[
              ["Post a job", "/login"],
              ["Featured candidates", "/featured-jobseeker"],
              ["Applicant tracking", "/login"],
              ["Search resume", "/login"],
            ].map(([label, link]) => (
              <div key={label}>
                <a
                  href={link}
                  alt={label}
                  className="text-gray-300 text-decoration-none"
                >
                  {label}
                </a>
              </div>
            ))}
          </div>

          {/* Information Links */}
          <div>
            <h6 className="fw-bold">Company</h6>

            <a href="/about" className="text-gray-300 text-decoration-none">
              About us
            </a>

            {/* View Map Button */}
            <div className="my-2">
              <span
                className="text-gray-300"
                style={{ cursor: "pointer" }}
                onClick={handleOpenMap}
              >
                View Map
              </span>
            </div>

            {/* Contact Modal Link */}
            <div>
              <span
                onClick={handleOpenModal}
                className="text-white"
                style={{ cursor: "pointer" }}
              >
                Contact
              </span>
            </div>
          </div>
        </div>

        {/* Modals */}
        <ContactModal show={showModal} handleClose={handleCloseModal} />
        <MapModal show={showMap} handleClose={handleCloseMap} />
      </Container>

      {/* Copyright */}
      <div className="bg-[#1E65A6] w-100 p-4 flex flex-col md:flex-row justify-between items-center">
        <div>
          <p className=" text-white text-sm">
            {`© ${currentYear}. All rights reserved.`}
          </p>
        </div>

        <div className="flex items-center text-sm gap-3">
          <p>Terms & Conditions</p>
          <p>|</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </section>
  );
};

export default AppFooter;

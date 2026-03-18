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
import LoginModal from "../pages/Auth/LoginModal";

const AppFooter = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const currentYear = new Date().getFullYear();

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenMap = () => setShowMap(true);
  const handleCloseMap = () => setShowMap(false);

  const links = [
    { label: "Jobs", link: "/jobs" },
    { label: "Employers", link: "/employers" },
    { label: "CV builder", link: "/cv-builder" },
    { label: "Salary Calculator", link: "/salary-calculator" },
    { label: "View applications", link: "/login", requiresAuth: true },
    { label: "Job alerts", link: "/login", requiresAuth: true },
  ];

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
              An Online Recruitment Management Platform Designed for
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

            {links.map(({ label, link, requiresAuth }) => (
              <div key={label}>
                <a
                  href={link}
                  className="text-gray-300 text-decoration-none"
                  onClick={(e) => {
                    if (requiresAuth) {
                      e.preventDefault(); // stop navigation
                      setShowLoginModal(true);
                    }
                  }}
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
              ["Post a job", "https://api.ekazi.co.tz/login"],
              ["Featured candidates", "/candidates"],
              ["Applicant tracking", "https://api.ekazi.co.tz/login"],
              ["Search resume", "https://api.ekazi.co.tz/login"],
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
      <div className="bg-[#1E65A6] w-100 p-4 ">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
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
      </div>

      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
      />
    </section>
  );
};

export default AppFooter;

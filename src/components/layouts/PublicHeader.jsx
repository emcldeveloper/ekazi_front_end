import { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import RegisterModal from "../../Auth/RegisterModal";
import LoginModal from "../../Auth/LoginModal";
import { useNavigate } from "react-router-dom";

const PublicHeader = () => {
  const navigate = useNavigate();

  /* -------------------- Modals -------------------- */
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <Navbar
        expand="lg"
        sticky="top"
        style={{
          backgroundColor: "#DFE3E2",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>
            <img src="/logo.png" alt="eKazi" width="120" />
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            {/* -------------------- Center Nav -------------------- */}
            <Nav className="mx-auto">
              <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate("/jobs")}>Find Jobs</Nav.Link>
              <Nav.Link onClick={() => navigate("/employers")}>
                Employers
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/salary-calculator")}>
                Salary Calculator
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/pricelists")}>
                Pricing
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/pricelists")}>Hapaa</Nav.Link>
            </Nav>

            {/* -------------------- Right Section -------------------- */}
            <Nav className="align-items-center">
              <Nav.Link onClick={() => setShowRegisterModal(true)}>
                Register
              </Nav.Link>
              <Nav.Link onClick={() => setShowLoginModal(true)}>Login</Nav.Link>
              <Button
                className="ms-2"
                style={{ backgroundColor: "#D36314", border: "none" }}
                onClick={() => navigate("/post-job")}
              >
                Post Job
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* -------------------- Modals -------------------- */}
      <RegisterModal
        show={showRegisterModal}
        onHide={() => setShowRegisterModal(false)}
      />

      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default PublicHeader;

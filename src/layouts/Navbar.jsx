import React, { useState } from "react";
import { Container, Nav, Navbar as RBNavbar } from "react-bootstrap";
import RegisterModal from "../pages/Auth/RegisterModal";
import LoginModal from "../pages/Auth/LoginModal";

const AppNavbar = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <section className="w-full">
      <RBNavbar
        expand="lg"
        sticky="top"
        style={{
          zIndex: 1020,
          backgroundColor: "#DFE3E2",
          boxShadow: "0 2px 4px rgba(0,0,0,.1)",
        }}
      >
        <Container>
          <RBNavbar.Brand href="/">
            <img src="/logo.png" alt="eKazi" className="w-24 md:w-32" />
          </RBNavbar.Brand>

          <RBNavbar.Toggle />

          <RBNavbar.Collapse id="main-navbar" className="order-lg-1">
            {/* ---------- CENTER MENU ---------- */}
            <Nav className="mx-auto flex-wrap text-center">
              <Nav.Link href="/" className="text-primary">
                Home
              </Nav.Link>

              <Nav.Link href="/jobs" className="text-primary">
                Find Jobs
              </Nav.Link>

              <Nav.Link href="/employers" className="text-primary">
                Employers
              </Nav.Link>

              <Nav.Link href="/cv-builder" className="text-primary">
                CV Builder
              </Nav.Link>

              <Nav.Link href="/salary-calculator" className="text-primary">
                Salary Calculator
              </Nav.Link>

              <Nav.Link href="/pricelists" className="text-primary">
                Pricing
              </Nav.Link>

              <Nav.Link href="/articles" className="text-primary">
                Articles
              </Nav.Link>
            </Nav>

            {/* AUTH LINKS */}
            <Nav className="ms-3 align-items-center">
              <Nav.Link onClick={() => setShowRegisterModal(true)}>
                Register
              </Nav.Link>
              <span className="mx-2 d-none d-lg-inline">|</span>
              <Nav.Link onClick={() => setShowLoginModal(true)}>Login</Nav.Link>
            </Nav>
          </RBNavbar.Collapse>
        </Container>
      </RBNavbar>

      {/* MODALS */}
      <RegisterModal
        show={showRegisterModal}
        onHide={() => setShowRegisterModal(false)}
      />
      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
      />
    </section>
  );
};

export default AppNavbar;

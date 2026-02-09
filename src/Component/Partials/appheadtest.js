import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import RegisterModal from '../../Auth/RegisterModal';
import LoginModal from '../../Auth/LoginModal';
import {
  HouseDoorFill,
  GearFill,
  KeyFill,
  ShieldLockFill,
  BoxArrowRight
} from 'react-bootstrap-icons';



const AppHeader = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('role_id');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <>
      <Navbar
        expand="lg"
        sticky="top"
        style={{
          zIndex: 1020,
          backgroundColor: '#DFE3E2',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Container className="d-flex justify-content-between align-items-center">
          <Navbar.Brand href="/">
            <img src="/logo.png" alt="eKazi" width="120" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="ekazi-navbar" />
          <Navbar.Collapse id="ekazi-navbar" className="w-100">
            <Nav className="mx-auto">
              <Nav.Link href="/" className="text-primary">Home</Nav.Link>
              <Nav.Link href="/jobs" className="text-primary">Find Jobs</Nav.Link>
              <Nav.Link href="/employers" className="text-primary">Employers</Nav.Link>
              <Nav.Link href="/jobseeker/sample-selection" className="text-primary">CV Builder</Nav.Link>
              <Nav.Link href="/salary-calculator" className="text-primary">Salary Calculator</Nav.Link>
              <Nav.Link href="/pricelists" className="text-primary">Pricing</Nav.Link>
            </Nav>
            

            <Nav className="ms-auto align-items-center">
              {isLoggedIn ? (
                <NavDropdown
                  align="end"
                  title={
                    <img
                      src="/default_user.jpeg"
                      alt="Profile"
                      className="rounded-circle"
                      style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'cover',
                      }}
                    />
                  }
                  id="profile-dropdown"
                >
                  <NavDropdown.Header style={{ fontWeight: 'bold' }}>MY ACCOUNT</NavDropdown.Header>

                  {/* Menu Items with Perfectly Aligned Icons */}
                  <NavDropdown.Item href="/jobseeker/dashboard" className="d-flex align-items-center">
                    <HouseDoorFill style={{ width: '18px', height: '18px' }} className="me-2" />
                    <span>Dashboard</span>
                  </NavDropdown.Item>

                  <NavDropdown.Item href="/jobseeker/account-settings" className="d-flex align-items-center">
                    <GearFill style={{ width: '18px', height: '18px' }} className="me-2" />
                    <span>Account Setting</span>
                  </NavDropdown.Item>

                  <NavDropdown.Item href="/jobseeker/change-password" className="d-flex align-items-center">
                    <KeyFill style={{ width: '18px', height: '18px' }} className="me-2" />
                    <span>Change Password</span>
                  </NavDropdown.Item>

                  <NavDropdown.Item href="/jobseeker/Privacy-policy" className="d-flex align-items-center">
                    <ShieldLockFill style={{ width: '18px', height: '18px' }} className="me-2" />
                    <span>Privacy Policy</span>
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item onClick={handleLogout} className="d-flex align-items-center text-danger">
                    <BoxArrowRight style={{ width: '18px', height: '18px' }} className="me-2" />
                    <span>Logout</span>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link onClick={() => setShowRegisterModal(true)} className="text-primary">Register</Nav.Link>
                  <span className="mx-2">|</span>
                  <Nav.Link onClick={() => setShowLoginModal(true)} className="text-primary">Login</Nav.Link>
                </>
              )}

              <Nav.Link href="/post-job">
                <a
                  href="/post-job"
                  className="btn mx-auto"
                  style={{
                    backgroundColor: '#D36314',
                    color: '#fff',
                    padding: '0.5rem 1.5rem',
                    textDecoration: 'none',
                    textAlign: 'center',
                  }}
                >
                  Post Job
                </a>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modals */}
      <RegisterModal show={showRegisterModal} onHide={() => setShowRegisterModal(false)} />
      <LoginModal
        show={showLoginModal}
        onHide={() => {
          setShowLoginModal(false);
          setIsLoggedIn(!!localStorage.getItem('auth_token'));
        }}
      />
    </>
  );
};

export default AppHeader;

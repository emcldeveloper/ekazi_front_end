import { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Card,
  ListGroup,
  Button,
  Dropdown,
  Tab,
  Tabs,
} from "react-bootstrap";
import {
  HouseDoorFill,
  GearFill,
  KeyFill,
  ShieldLockFill,
  BoxArrowRight,
  PersonFill,
} from "react-bootstrap-icons";
import { Envelope, Briefcase, Bell } from "react-bootstrap-icons";
import { RxAvatar } from "react-icons/rx";

import SubscriptionSection from "./subscription";
import RegisterModal from "../../pages/Auth/RegisterModal";
import LoginModal from "../../pages/Auth/LoginModal";

const notificationData = {
  correspondence: [],
  chart: [],
};

const AppHeader = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role_id");
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = "/";
  };
  // New state for notifications
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState(notificationData);
  const [unreadCount, setUnreadCount] = useState(0); // Total unread count

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    // Mark as read when opened
    setUnreadCount(0);
  };

  return (
    <section className="w-full">
      <Navbar
        expand="lg"
        sticky="top"
        style={{
          zIndex: 1020,
          backgroundColor: "#DFE3E2",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Container className="d-flex justify-content-between align-items-center">
          <Navbar.Brand href="/">
            <img src="/logo.png" alt="eKazi" width="120" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="ekazi-navbar" />
          <Navbar.Collapse id="ekazi-navbar" className="w-100">
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
              <Nav.Link href="/salary-calculator" className="text-primary">
                Salary Calculator
              </Nav.Link>
              <Nav.Link href="/pricelists" className="text-primary">
                Pricing
              </Nav.Link>

              {!isLoggedIn && (
                <Nav.Link href="/articles" className="text-primary">
                  Articles
                </Nav.Link>
              )}

              {isLoggedIn && <SubscriptionSection isLoggedIn={isLoggedIn} />}
            </Nav>

            <div className="d-flex align-items-center">
              {isLoggedIn && (
                <>
                  <Dropdown
                    show={showNotifications}
                    onToggle={handleNotificationClick}
                    className="me-2"
                    align="end"
                  >
                    <Dropdown.Toggle
                      as="span"
                      bsPrefix="notification-toggle"
                      variant="light"
                      id="dropdown-notifications"
                      className="notification-toggle d-flex align-items-center justify-content-center position-relative border-0 bg-transparent p-0"
                      style={{ cursor: "pointer" }}
                      size="lg"
                    >
                      <Bell size={28} className="text-dark" />

                      {unreadCount > 0 && (
                        <span
                          className="position-absolute rounded-circle bg-danger text-white d-flex justify-content-center align-items-center"
                          style={{
                            top: "-5px",
                            right: "-5px",
                            width: "18px",
                            height: "18px",
                            fontSize: "0.65rem",
                            border: "2px solid white",
                          }}
                        >
                          {unreadCount > 99 ? "99+" : unreadCount}
                        </span>
                      )}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="p-0" style={{ width: "300px" }}>
                      <Card className="border-0">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">Notifications</h6>
                          <small className="text-primary cursor-pointer">
                            Mark all as read
                          </small>
                        </Card.Header>

                        <Card.Body className="p-0">
                          <Tabs
                            defaultActiveKey="correspondence"
                            className="px-2"
                          >
                            {/* --- Updates Tab --- */}
                            <Tab eventKey="correspondence" title="Updates">
                              <ListGroup variant="flush">
                                {notifications.correspondence.map((notif) => (
                                  <ListGroup.Item
                                    key={notif.id}
                                    action
                                    className="py-2"
                                  >
                                    <div className="d-flex align-items-center">
                                      <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-2">
                                        <Envelope className="text-primary" />
                                      </div>

                                      <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between align-items-center">
                                          <strong>{notif.employer}</strong>
                                          <span
                                            className="rounded-circle d-flex justify-content-center align-items-center text-white bg-primary"
                                            style={{
                                              width: "20px",
                                              height: "20px",
                                              fontSize: "0.7rem",
                                              border: "2px solid #fff",
                                              flexShrink: 0,
                                            }}
                                          >
                                            {notif.count > 99
                                              ? "99+"
                                              : notif.count}
                                          </span>
                                        </div>
                                        <small className="text-muted">
                                          {/* {dayjs(notif.timestamp).fromNow()} */}
                                        </small>
                                      </div>
                                    </div>
                                  </ListGroup.Item>
                                ))}
                              </ListGroup>
                            </Tab>

                            {/* --- Chats Tab --- */}
                            <Tab eventKey="chart" title="Chats">
                              <ListGroup variant="flush">
                                {notifications.chart.map((notif) => (
                                  <ListGroup.Item
                                    key={notif.id}
                                    action
                                    className="py-2"
                                  >
                                    <div className="d-flex align-items-center">
                                      <div className="bg-info bg-opacity-10 p-2 rounded-circle me-2">
                                        <Briefcase className="text-info" />
                                      </div>

                                      <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between align-items-center">
                                          <div>
                                            <strong>{notif.username}</strong>
                                            <div className="small text-muted">
                                              {notif.message}
                                            </div>
                                          </div>
                                          <span
                                            className="rounded-circle d-flex justify-content-center align-items-center text-white bg-info"
                                            style={{
                                              width: "20px",
                                              height: "20px",
                                              fontSize: "0.7rem",
                                              border: "2px solid #fff",
                                              flexShrink: 0,
                                            }}
                                          >
                                            {notif.count > 99
                                              ? "99+"
                                              : notif.count}
                                          </span>
                                        </div>
                                        <small className="text-muted">
                                          {/* {dayjs(notif.timestamp).fromNow()} */}
                                        </small>
                                      </div>
                                    </div>
                                  </ListGroup.Item>
                                ))}
                              </ListGroup>
                            </Tab>
                          </Tabs>
                        </Card.Body>

                        <Card.Footer className="text-center">
                          <Button variant="link" size="sm">
                            View all notifications
                          </Button>
                        </Card.Footer>
                      </Card>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}

              <Nav className="ms-lg-2 align-items-center">
                {isLoggedIn ? (
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      as="span"
                      bsPrefix="notification-toggle"
                      id="profile-dropdown"
                      className="d-flex align-items-center justify-content-center position-relative"
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <RxAvatar size={30} className="text-dark" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ width: "300px" }}>
                      <Dropdown.Header className="fw-bold">
                        MY ACCOUNT
                      </Dropdown.Header>

                      <Dropdown.Item
                        href="/jobseeker/dashboard"
                        className="d-flex align-items-center"
                      >
                        <HouseDoorFill className="me-2" size={14} />
                        <span>Dashboard</span>
                      </Dropdown.Item>

                      <Dropdown.Item
                        href="/jobseeker/profile-preview"
                        className="d-flex align-items-center"
                      >
                        <PersonFill className="me-2" size={14} />
                        <span>My Profile</span>
                      </Dropdown.Item>

                      <Dropdown.Item
                        href="/jobseeker/account-settings"
                        className="d-flex align-items-center"
                      >
                        <GearFill className="me-2" size={14} />
                        <span>Account Setting</span>
                      </Dropdown.Item>

                      <Dropdown.Item
                        href="/jobseeker/change-password"
                        className="d-flex align-items-center"
                      >
                        <KeyFill className="me-2" size={14} />
                        <span>Change Password</span>
                      </Dropdown.Item>

                      <Dropdown.Item
                        href="/jobseeker/Privacy-policy"
                        className="d-flex align-items-center"
                      >
                        <ShieldLockFill className="me-2" size={14} />
                        <span>Privacy Policy</span>
                      </Dropdown.Item>

                      <Dropdown.Divider />

                      <Dropdown.Item
                        onClick={handleLogout}
                        className="d-flex align-items-center text-danger"
                      >
                        <BoxArrowRight className="me-2" size={14} />
                        <span>Logout</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <>
                    <Nav.Link
                      onClick={() => setShowRegisterModal(true)}
                      className="text-primary"
                    >
                      Register
                    </Nav.Link>
                    <span className="mx-2 d-none d-lg-inline">|</span>
                    <Nav.Link
                      onClick={() => setShowLoginModal(true)}
                      className="text-primary"
                    >
                      Login
                    </Nav.Link>
                    <Nav.Link href="/post-job" className="ms-lg-2">
                      <Button
                        style={{
                          backgroundColor: "#D36314",
                          color: "#fff",
                          border: "none",
                          padding: "0.5rem 1.5rem",
                        }}
                      >
                        Post Job
                      </Button>
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modals */}
      <RegisterModal
        show={showRegisterModal}
        onHide={() => setShowRegisterModal(false)}
      />
      <LoginModal
        show={showLoginModal}
        onHide={() => {
          setShowLoginModal(false);
          setIsLoggedIn(!!localStorage.getItem("auth_token"));
        }}
      />
    </section>
  );
};

export default AppHeader;

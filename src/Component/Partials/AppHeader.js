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
  BoxArrowRight,
  PersonFill,
} from "react-bootstrap-icons";
import { Bell } from "react-bootstrap-icons";
import { RxAvatar } from "react-icons/rx";
import dayjs from "dayjs";

import SubscriptionSection from "./subscription";
import RegisterModal from "../../pages/Auth/RegisterModal";
import LoginModal from "../../pages/Auth/LoginModal";
import { useAllThreads } from "../../hooks/candidates/useCorrespondence";

const AppHeader = () => {
  const applicant_id = localStorage.getItem("applicantId");

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const { data: correspondences = [], isPending: loading } =
    useAllThreads(applicant_id);

  const sortedThreads = [...correspondences].sort(
    (a, b) => new Date(b.last_message_at) - new Date(a.last_message_at),
  );

  /* ---------------- AUTH CHECK ---------------- */
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
  }, []);

  /* ---------------- UNREAD COUNT ---------------- */
  useEffect(() => {
    if (!Array.isArray(correspondences)) return;

    const closedCount = correspondences.filter(
      (thread) => thread.status === "closed",
    ).length;

    setUnreadCount(closedCount);
  }, [correspondences]);

  /* ---------------- ACTIONS ---------------- */
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  /* ---------------- RENDER ---------------- */
  return (
    <section className="w-full">
      <Navbar
        expand="lg"
        sticky="top"
        style={{
          zIndex: 1020,
          backgroundColor: "#DFE3E2",
          boxShadow: "0 2px 4px rgba(0,0,0,.1)",
        }}
      >
        <Container>
          <Navbar.Brand href="/">
            <img src="/logo.png" alt="eKazi" className="w-24 md:w-32" />
          </Navbar.Brand>

          {/* ---------- RIGHT ACTIONS ---------- */}
          <div className="d-flex align-items-center gap-1 mr-2 ms-auto order-lg-2">
            {/* 🔔 Notifications */}
            {isLoggedIn && (
              <Dropdown
                show={showNotifications}
                onToggle={toggleNotifications}
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

                <Dropdown.Menu className="p-0 w-[280px] md:w-80">
                  <Card className="border-0">
                    <Card.Header>
                      <strong>Notifications</strong>
                    </Card.Header>

                    <Card.Body className="p-0">
                      <Tabs defaultActiveKey="updates" className="px-2">
                        <Tab eventKey="updates" title="Updates">
                          <ListGroup variant="flush">
                            {loading && (
                              <div className="text-center py-2">Loading…</div>
                            )}

                            {!loading && correspondences.length === 0 && (
                              <div className="text-center text-muted py-2">
                                No notifications
                              </div>
                            )}

                            {!loading &&
                              sortedThreads.slice(0, 5).map((thread) => {
                                const lastMessage =
                                  thread.messages?.[thread.messages.length - 1];

                                return (
                                  <ListGroup.Item
                                    key={thread.id}
                                    action
                                    href="/jobseeker/employer-correspondence"
                                    style={{
                                      backgroundColor:
                                        thread.applicant_unread_count > 0
                                          ? "#FFF3CD"
                                          : "transparent",
                                    }}
                                  >
                                    <div className="d-flex justify-content-between">
                                      <strong>
                                        {thread.subject.length > 30
                                          ? thread.subject.slice(0, 30) + "…"
                                          : thread.subject}
                                      </strong>
                                      <small className="text-muted">
                                        {dayjs(thread.last_message_at).format(
                                          "MMM D, h:mm A",
                                        )}
                                      </small>
                                    </div>

                                    <small className="d-block text-truncate">
                                      {lastMessage?.message || "No message"}
                                    </small>

                                    {thread.applicant_unread_count > 0 && (
                                      <span className="badge bg-danger mt-1">
                                        Unread
                                      </span>
                                    )}
                                  </ListGroup.Item>
                                );
                              })}
                          </ListGroup>
                        </Tab>

                        <Tab eventKey="chats" title="Chats">
                          <div className="text-center text-muted py-3">
                            No chats yet
                          </div>
                        </Tab>
                      </Tabs>
                    </Card.Body>

                    <Card.Footer className="text-center">
                      <Button
                        variant="link"
                        size="sm"
                        href="/jobseeker/employer-correspondence"
                      >
                        View all
                      </Button>
                    </Card.Footer>
                  </Card>
                </Dropdown.Menu>
              </Dropdown>
            )}

            {/* 👤 Profile */}
            {isLoggedIn && (
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
                    <span> Settings</span>
                  </Dropdown.Item>

                  <Dropdown.Item
                    href="/jobseeker/change-password"
                    className="d-flex align-items-center"
                  >
                    <KeyFill className="me-2" size={14} />
                    <span>Change Password</span>
                  </Dropdown.Item>

                  {/* <Dropdown.Item
                        href="/jobseeker/Privacy-policy"
                        className="d-flex align-items-center"
                      >
                        <ShieldLockFill className="me-2" size={14} />
                        <span>Privacy Policy</span>
                      </Dropdown.Item> */}

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
            )}
          </div>

          <Navbar.Toggle />

          <Navbar.Collapse id="main-navbar" className="order-lg-1">
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

              {!isLoggedIn && (
                <Nav.Link href="/cv-builder" className="text-primary">
                  CV Builder
                </Nav.Link>
              )}

              <Nav.Link href="/salary-calculator" className="text-primary">
                Salary Calculator
              </Nav.Link>

              {!isLoggedIn && (
                <Nav.Link href="/pricelists" className="text-primary">
                  Pricing
                </Nav.Link>
              )}

              {!isLoggedIn && (
                <Nav.Link href="/articles" className="text-primary">
                  Articles
                </Nav.Link>
              )}

              {isLoggedIn && <SubscriptionSection isLoggedIn={isLoggedIn} />}
            </Nav>

            {!isLoggedIn && (
              <Nav className="ms-3 align-items-center">
                <Nav.Link onClick={() => setShowRegisterModal(true)}>
                  Register
                </Nav.Link>
                <span className="mx-2 d-none d-lg-inline">|</span>
                <Nav.Link onClick={() => setShowLoginModal(true)}>
                  Login
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

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

export default AppHeader;

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
import { Bell } from "react-bootstrap-icons";
import { RxAvatar } from "react-icons/rx";
import dayjs from "dayjs";

import SubscriptionSection from "./subscription";
import RegisterModal from "../../pages/Auth/RegisterModal";
import LoginModal from "../../pages/Auth/LoginModal";
import useCorrespondence from "../../hooks/candidates/useCorrespondence";

const AppHeader = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // TODO: get from auth context later
  // const applicantId = localStorage.getItem("applicant_id");
   const applicantId = 78;

  const { correspondences = [], loading } = useCorrespondence(applicantId);

  /* ---------------- AUTH CHECK ---------------- */
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
  }, []);

  /* ---------------- UNREAD COUNT ---------------- */
  useEffect(() => {
    if (!Array.isArray(correspondences)) return;

    const totalUnread = correspondences.reduce(
      (sum, thread) => sum + (thread.applicant_unread_count || 0),
      0
    );

    setUnreadCount(totalUnread);
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
            <img src="/logo.png" alt="eKazi" width="120" />
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            {/* ---------- CENTER MENU ---------- */}
            <Nav className="mx-auto text-center">
              <Nav.Link href="/" className="text-primary">Home</Nav.Link>
              <Nav.Link href="/jobs" className="text-primary">Find Jobs</Nav.Link>
              <Nav.Link href="/employers" className="text-primary">Employers</Nav.Link>
              <Nav.Link href="/salary-calculator" className="text-primary">Salary Calculator</Nav.Link>
              <Nav.Link href="/pricelists" className="text-primary">Pricing</Nav.Link>
              <Nav.Link href="/articles" className="text-primary">Articles</Nav.Link>
              {isLoggedIn && <SubscriptionSection />}
            </Nav>

            {/* ---------- RIGHT ACTIONS ---------- */}
            <div className="d-flex align-items-center">
              {/* 🔔 Notifications */}
              {isLoggedIn && (
                <Dropdown
                  show={showNotifications}
                  onToggle={toggleNotifications}
                  align="end"
                >
                  <Dropdown.Toggle
                    as="span"
                    className="position-relative bg-transparent border-0 p-0"
                    style={{ cursor: "pointer" }}
                  >
                    <Bell size={28} />
                    {unreadCount > 0 && (
                      <span
                        className="position-absolute bg-danger text-white rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          top: "-5px",
                          right: "-5px",
                          width: 18,
                          height: 18,
                          fontSize: "0.65rem",
                        }}
                      >
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </span>
                    )}
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ width: 320 }} className="p-0">
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
                                correspondences.map((thread) => {
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
                                          {dayjs(
                                            thread.last_message_at
                                          ).format("MMM D, h:mm A")}
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
                          href="/jobseeker/correspondence"
                        >
                          View all
                        </Button>
                      </Card.Footer>
                    </Card>
                  </Dropdown.Menu>
                </Dropdown>
              )}

              {/* 👤 Profile */}
              <Nav className="ms-3">
                {isLoggedIn ? (
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      as="span"
                      className="bg-transparent border-0"
                      style={{ cursor: "pointer" }}
                    >
                      <RxAvatar size={30} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ width: 260 }}>
                      <Dropdown.Item href="/jobseeker/dashboard">
                        <HouseDoorFill className="me-2" /> Dashboard
                      </Dropdown.Item>
                      <Dropdown.Item href="/jobseeker/profile-preview">
                        <PersonFill className="me-2" /> My Profile
                      </Dropdown.Item>
                      <Dropdown.Item href="/jobseeker/account-settings">
                        <GearFill className="me-2" /> Settings
                      </Dropdown.Item>
                      <Dropdown.Item href="/jobseeker/change-password">
                        <KeyFill className="me-2" /> Change Password
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={handleLogout}
                        className="text-danger"
                      >
                        <BoxArrowRight className="me-2" /> Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <>
                    <Nav.Link onClick={() => setShowRegisterModal(true)}>
                      Register
                    </Nav.Link>
                    <Nav.Link onClick={() => setShowLoginModal(true)}>
                      Login
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </div>
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

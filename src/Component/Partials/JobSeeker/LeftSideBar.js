import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  ProgressBar,
  Accordion,
  ListGroup,
  Badge,
  Modal,
} from "react-bootstrap";
import {
  BarChartFill,
  FileEarmarkTextFill,
  BriefcaseFill,
  PersonFill,
  BookFill,
  PeopleFill,
  InfoCircleFill,
} from "react-bootstrap-icons";
import ConsentFormModal from "../../Forms/JobSeeker/ConsertForm";
import {
  completeprofile,
  primarydata,
} from "../../../Api/Jobseeker/JobSeekerProfileApi";

const LeftSideBar = ({ correspondences = [] }) => {
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [dataprimary, setPrimaryData] = useState([]);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const navigate = useNavigate();
  const applicant_id = localStorage.getItem("applicantId");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Track online/offline
  useEffect(() => {
    const handleStatusChange = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", handleStatusChange);
    window.addEventListener("offline", handleStatusChange);
    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, []);

  // Fetch profile completion
  useEffect(() => {
    const fetchCompleteProfile = async () => {
      try {
        setLoading(true);
        const data = await completeprofile(applicant_id);
        setProfileCompletion(Math.round(data));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchCompleteProfile();
  }, [applicant_id]);

  // Fetch primary profile data
  useEffect(() => {
    const fetchPrimaryData = async () => {
      try {
        setLoading(true);
        const data = await primarydata(applicant_id);
        setPrimaryData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPrimaryData();
  }, [applicant_id]);

  const picture = dataprimary?.[0]?.picture
    ? `https://api.ekazi.co.tz/${dataprimary[0].picture}`
    : "https://api.ekazi.co.tz/uploads/picture/pre_photo.jpg";

  const backgroundPicture = dataprimary?.[0]?.background_picture
    ? `https://api.ekazi.co.tz/${dataprimary[0].background_picture}`
    : "https://api.ekazi.co.tz/svg/dotted.svg";

  // Calculate Inbox count dynamically from correspondences
  const inboxCount = correspondences.filter((c) => {
    // console.log(c.visible_to_applicant); // log each value
    return c.visible_to_applicant === true; // check if true
  }).length;

  const sentCount = correspondences.filter(
    (c) => c.status === "accepted" || c.status === "rejected",
  ).length;

  return (
    <div className="d-flex flex-column gap-2">
      <Card className="shadow-sm">
        <div style={{ position: "relative" }}>
          {/* Cover Image */}
          <div
            style={{
              height: "80px",
              width: "100%",
              backgroundImage: `url(${backgroundPicture})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "#2995CC",
            }}
          />
          {/* Profile Image */}
          <div style={{ position: "absolute", bottom: "-30px", left: "16px" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                border: "3px solid #28a745",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title="Available for Job"
            >
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  border: "3px solid white",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  backgroundImage: `url(${picture})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>
          </div>
          {/* Edit Profile Button */}
          <button
            style={{
              position: "absolute",
              bottom: "8px",
              right: "16px",
              borderRadius: "4px",
              padding: "4px 8px",
              backgroundColor: "#0d6efd",
              border: "none",
              color: "white",
              fontSize: "12px",
            }}
            onClick={() => navigate("/jobseeker/profile-preview")}
          >
            Edit Profile
          </button>
        </div>

        <Card.Body className="text-start capitalize mt-4">
          <h5 className="fw-bold mb-1">
            {dataprimary?.[0]?.first_name} {dataprimary?.[0]?.last_name}
          </h5>
          <p style={{ fontSize: "12px" }} className="text-muted mb-1">
            {dataprimary?.[0]?.latest_position?.position?.position_name || ""}
          </p>

          {/* Profile Completion */}
          <div className="text-start mb-2">
            <div className="d-flex justify-content-between small text-muted mb-1">
              <span>Profile Completion</span>
              <span>{profileCompletion}%</span>
            </div>
            <ProgressBar
              now={profileCompletion}
              variant="success"
              className="mb-2"
              style={{ height: "5px" }}
            />
            <div className="d-flex align-items-center gap-2">
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: isOnline ? "#28a745" : "#6c757d",
                  animation: isOnline ? "pulse 1.5s infinite" : "none",
                }}
              />
              <small
                className={
                  isOnline
                    ? "text-success fw-semibold"
                    : "text-secondary fw-semibold"
                }
              >
                {isOnline ? "Online" : "Offline"}
              </small>
            </div>
          </div>

          <ConsentFormModal
            show={showConsentModal}
            onClose={() => setShowConsentModal(false)}
          />

          {/* Dashboard & Accordions */}
          <h6
            className="border-top pt-2 text-start fw-semibold d-flex align-items-center cursor-pointer"
            onClick={() => navigate("/jobseeker/dashboard")}
          >
            <BarChartFill className="me-2" /> Dashboard
          </h6>

          <Accordion
            flush
            className="text-start mb-1"
            style={{ maxHeight: "300px", overflowY: "auto" }}
          >
            {[
              {
                key: "0",
                title: "Cv Manager",
                icon: <FileEarmarkTextFill className="me-2" />,
                items: [
                  { name: "Build Cv", path: "/jobseeker/sample-selection" },
                  { name: "My Cv" },
                  { name: "My subscription" },
                ],
              },
              {
                key: "1",
                title: "My Correspondence",
                icon: <PersonFill className="me-2" />,
                items: [
                  {
                    name: "Inbox",
                    path: "/jobseeker/employer-correspondence",
                    count: inboxCount,
                  },
                  {
                    name: "Sent",
                    path: "/jobseeker/sent-correspondence",
                    count: sentCount,
                  },
                  {
                    name: "Consent Form",
                    onClick: () => setShowConsentModal(true),
                  },
                ],
              },
              {
                key: "2",
                title: "My Application",
                icon: <BriefcaseFill className="me-2" />,
                items: [
                  {
                    name: "Create Cover Letter",
                    path: "/jobseeker/cover-letter",
                  },
                  { name: "My Applied Job", path: "/jobseeker/My-application" },
                  { name: "Saved Jobs", path: "/jobseeker/saved-jobs" },
                  { name: "Job Match", path: "/jobseeker/job-match" },
                ],
              },
              {
                key: "4",
                title: "Resources",
                icon: <BookFill className="me-2" />,
                items: [
                  { name: "Articles", path: "/jobseeker/articles" },
                  { name: "Resume Tips" },
                  { name: "Interview Tips" },
                ],
              },
            ].map((section) => (
              <Accordion.Item
                eventKey={section.key}
                key={section.key}
                className="border-0"
              >
                <Accordion.Header
                  className="small py-0 border-top px-0"
                  style={{ fontSize: "0.8rem" }}
                >
                  <div className="d-flex align-items-center">
                    {React.cloneElement(section.icon, { size: 14 })}
                    <span>{section.title}</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body className="py-1 px-0">
                  <ListGroup variant="flush">
                    {section.items.map((item, index) => (
                      <ListGroup.Item
                        key={index}
                        className="small py-1 px-0 border-0 d-flex justify-content-between align-items-center"
                        action
                        onClick={
                          item.onClick ||
                          (() => item.path && navigate(item.path))
                        }
                      >
                        <span className="text-decoration-none cursor-pointer">
                          {item.name}
                        </span>
                        {item.count !== undefined && (
                          <span
                            className="badge bg-secondary rounded-circle"
                            style={{
                              fontSize: "0.65rem",
                              minWidth: "29px",
                              height: "29px",
                              lineHeight: "29px",
                              display: "inline-flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginRight: "20px",
                            }}
                          >
                            {item.count > 99 ? "99+" : item.count}
                          </span>
                        )}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card.Body>
      </Card>

      {/* Availability Modal */}
      <Modal
        show={showAvailabilityModal}
        onHide={() => setShowAvailabilityModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Make Your Profile Public</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-3">
            <PeopleFill className="text-primary" size={48} />
          </div>
          <p>
            To make your profile visible to employers and appear in search
            results, you need a Premium account.
          </p>
          <div className="alert alert-info small">
            <InfoCircleFill className="me-2" />
            Premium members get:
            <ul className="mt-2 mb-0">
              <li>Profile visibility to top employers</li>
              <li>Higher ranking in search results</li>
              <li>Access to exclusive job opportunities</li>
              <li>Priority application processing</li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAvailabilityModal(false)}
          >
            Not Now
          </Button>
          <Button
            variant="primary"
            onClick={() => setShowAvailabilityModal(false)}
            style={{
              background: "linear-gradient(90deg, #7f00ff 0%, #e100ff 100%)",
              border: "none",
            }}
          >
            Upgrade to Premium
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LeftSideBar;

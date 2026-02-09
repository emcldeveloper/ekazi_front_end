import { useState } from "react";
import { Row, Col, Card, Button, Modal, ProgressBar } from "react-bootstrap";
import { FaBuilding } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { formatDistanceToNow } from "date-fns";
import JobDetailModal from "../../Component/Jobs/JobDetailModel/JobModelDetail";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { BsLightbulb } from "react-icons/bs";
import useJob from "../../hooks/useJob";

const MatchJobList = () => {
  const navigate = useNavigate();
  const { jobs } = useJob();

  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };
  const [showMatchModal, setShowMatchModal] = useState(false);
  return (
    <div className="w-100">
      <Card className="mb-4 shadow-smy">
        <Card.Body>
          {/* Match Details Modal */}
          <Modal
            show={showMatchModal}
            onHide={() => setShowMatchModal(false)}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Your Job Match Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-4">
                <h5 className="fw-bold mb-3">
                  Overall Match: <span className="text-primary">78%</span>
                </h5>
                <ProgressBar
                  now={78}
                  variant="primary"
                  className="mb-3"
                  style={{ height: "8px" }}
                />

                <div className="row">
                  {[
                    {
                      name: "Skills Match",
                      percent: 85,
                      description:
                        "Your skills align well with most required qualifications",
                    },
                    {
                      name: "Experience Level",
                      percent: 72,
                      description:
                        "You meet 72% of the experience requirements",
                    },
                    {
                      name: "Education Match",
                      percent: 90,
                      description: "Your education exceeds requirements",
                    },
                    {
                      name: "Location Preference",
                      percent: 65,
                      description: "65% of jobs match your preferred locations",
                    },
                    {
                      name: "Salary Expectation",
                      percent: 60,
                      description:
                        "Your expected salary range matches 60% of jobs",
                    },
                    {
                      name: "Company Culture",
                      percent: 55,
                      description: "Moderate alignment with company values",
                    },
                  ].map((item, index) => (
                    <div key={index} className="col-md-6 mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span>{item.name}</span>
                        <span className="fw-bold">{item.percent}%</span>
                      </div>
                      <ProgressBar
                        now={item.percent}
                        variant={index % 2 === 0 ? "success" : "info"}
                      />
                      <small className="text-muted">{item.description}</small>
                    </div>
                  ))}
                </div>
              </div>

              <div className="alert alert-info">
                <div className="d-flex">
                  <BsLightbulb className="me-2 mt-1" />
                  <div>
                    <h6 className="alert-heading">Improve Your Match Score</h6>
                    <ul className="mb-0">
                      <li>Add more skills to your profile</li>
                      <li>Complete your work history details</li>
                      <li>Adjust your location preferences</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowMatchModal(false)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setShowMatchModal(false);
                  navigate("/jobseeker/profile-settings");
                }}
              >
                Improve My Profile
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Recommended Jobs */}
          <Row className="align-items-center justify-content-between mb-3">
            <Col>
              <h5 className="fw-bold mb-0">Jobs match for you</h5>
            </Col>
          </Row>

          {/* Job Listings */}
          {jobs.slice(0, 8).map((job) => (
            <Card
              key={job.id}
              className="mb-3 shadow-smy job-item"
              onClick={() => handleJobClick(job)}
              style={{ cursor: "pointer" }}
            >
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs={3} md={2}>
                    <div
                      className="bg-light rounded overflow-hidden"
                      style={{ width: "100%", height: "100%" }}
                    >
                      <img
                        src={
                          job.client?.logo
                            ? `https://api.ekazi.co.tz/${job.client.logo}`
                            : "/default-logo.png"
                        }
                        alt={job.client?.name || "Company Logo"}
                        className="img-fluid h-100 w-100 object-fit-cover"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                        onError={(e) => {
                          e.target.src = "/default-logo.png";
                        }}
                      />
                    </div>
                  </Col>
                  <Col>
                    <h6 className="fw-bold mb-1">
                      {" "}
                      {job.job_position?.position_name || "Untitled"}
                    </h6>
                    <div className="text-muted d-flex align-items-center mb-1">
                      <FaBuilding className="me-2" />{" "}
                      {job.client?.client_name || "N/A"}
                    </div>
                    <div className="text-muted mb-1">
                      {job.job_addresses?.[0]?.region?.region_name || ""},{" "}
                      {job.job_addresses?.[0]?.region?.country?.name || "N/A"}
                    </div>

                    <small className="text-muted">
                      Posted:{" "}
                      {job.created_at
                        ? formatDistanceToNow(new Date(job.created_at), {
                            addSuffix: true,
                          })
                        : "Not specified"}
                    </small>

                    {/* <p>{job.created_at ? new Date(job.created_at).toDateString() : 'Not specified'}</p> */}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            //   <JobDetailModal
            //   job={selectedJob}
            //   show={showModal}
            //   onHide={() => setShowModal(false)}
            // />
          ))}
        </Card.Body>
      </Card>
      <JobDetailModal
        job={selectedJob}
        show={showModal}
        onHide={() => setShowModal(false)}
      />

      <style>{`
    
        .job-item:hover {
          background-color: rgba(0, 0, 0, 0.03);
        }
      `}</style>
    </div>
  );
};

export default MatchJobList;

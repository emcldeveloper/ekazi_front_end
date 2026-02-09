import { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { FaBuilding } from "react-icons/fa";
import {
  BsArrowRight,
  BsFileEarmarkText,
  BsBriefcase,
  BsClock,
  BsBuilding,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import JobDetailModal from "../../../../Component/Jobs/JobDetailModel/JobModelDetail";
import ApplicantPipeline from "../../../../Component/Profile/ApplicantPipeline";
import { useJobs } from "../../../../hooks/useJobs";
import { DEFAULT_LOGO, IMG_BASE } from "../../../../helpers/img";
import { useDashboardStatistics } from "../../../../hooks/useCandidates";

const JobSeekerStatistic = () => {
  const applicant_id = localStorage.getItem("applicant_id");

  const { data: jobs = [] } = useJobs(10, 1);
  const { data } = useDashboardStatistics(applicant_id);

  const dashboard = data?.statisticsdashboard || {
    application: 0,
    download_cv: 0,
    savedjob: 0,
    searchjob: 0,
  };

  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  return (
    <div className="w-100">
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h5 className="fw-bold mb-2">Applicant Dashboard</h5>

          <Row className="mb-3 g-2">
            {/* Resume Downloads */}
            <Col xs={12} sm={6} md={3}>
              <Card className="text-center border-0 shadow-sm h-100">
                <Card.Body className="p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="text-primary fw-bold mb-0">
                        {dashboard.download_cv}
                      </h5>
                      <small className="text-muted">Downloaded CV</small>
                    </div>
                    <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-2">
                      <BsFileEarmarkText size={18} />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Applications */}
            <Col xs={12} sm={6} md={3}>
              <Card className="text-center border-0 shadow-sm h-100">
                <Card.Body className="p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="text-success fw-bold mb-0">
                        {dashboard.application}
                      </h5>
                      <small className="text-muted">Applications</small>
                    </div>
                    <div className="bg-success bg-opacity-10 text-success rounded-circle p-2">
                      <BsBriefcase size={18} />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Saved Jobs */}
            <Col xs={12} sm={6} md={3}>
              <Card className="text-center border-0 shadow-sm h-100">
                <Card.Body className="p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="text-info fw-bold mb-0">
                        {dashboard.savedjob}
                      </h5>
                      <small className="text-muted">Saved Jobs</small>
                    </div>
                    <div className="bg-info bg-opacity-10 text-info rounded-circle p-2">
                      <BsBuilding size={18} />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Saved Searches */}
            <Col xs={12} sm={6} md={3}>
              <Card className="text-center border-0 shadow-sm h-100">
                <Card.Body className="p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="text-warning fw-bold mb-0">
                        {dashboard.searchjob}
                      </h5>
                      <small className="text-muted">Saved Search</small>
                    </div>
                    <div className="bg-warning bg-opacity-10 text-warning rounded-circle p-2">
                      <BsClock size={18} />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <ApplicantPipeline />
          </Row>

          {/* Recommended Jobs List */}
          <Row className="align-items-center justify-content-between mb-3">
            <Col>
              <h5 className="fw-bold mb-0">Recommended jobs for you</h5>
            </Col>
            <Col className="text-end">
              <Link
                to={"/jobs"}
                className="text-decoration-none text-primary d-flex align-items-center justify-content-end"
              >
                View All Jobs <BsArrowRight className="ms-2" />
              </Link>
            </Col>
          </Row>

          {/* Job Cards */}
          {jobs.slice(0, 7).map((job) => (
            <Card
              key={job.id}
              className="mb-3 shadow-sm job-item"
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
                            ? `${IMG_BASE}${job.client.logo}`
                            : DEFAULT_LOGO
                        }
                        alt={job.client?.client_name || "Company Logo"}
                        className="img-fluid h-100 w-100 object-fit-cover"
                      />
                    </div>
                  </Col>
                  <Col>
                    <h6 className="fw-bold mb-1">
                      {job.job_position?.position_name || "Untitled"}
                    </h6>
                    <div className="text-muted d-flex align-items-center mb-1">
                      <FaBuilding className="me-2" />{" "}
                      {job.client?.client_name || "N/A"}
                    </div>
                    <div className="text-muted mb-1">
                      {job.job_addresses?.[0]?.region?.region_name || ""},{" "}
                      {job.job_addresses?.[0]?.region?.country?.name || ""}
                    </div>
                    <small className="text-muted">
                      Posted{" "}
                      {job.publish_date
                        ? formatDistanceToNow(new Date(job.publish_date), {
                            addSuffix: true,
                          })
                        : "Not specified"}
                    </small>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}

          <JobDetailModal
            job={selectedJob}
            show={showModal}
            onHide={() => setShowModal(false)}
          />

          <style>{`
            .job-item:hover {
              background-color: rgba(0,0,0,0.03);
            }
          `}</style>
        </Card.Body>
      </Card>
    </div>
  );
};

export default JobSeekerStatistic;

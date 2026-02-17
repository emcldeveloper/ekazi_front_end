import { useState } from "react";

import { Container, Card, Table, Badge, Button } from "react-bootstrap";
import {
  FaEye,
  FaTrashAlt,
  FaBriefcase,
  FaCalendarAlt,
  FaUserTie,
  FaFileContract,
  FaSearch,
  FaCheckCircle,
} from "react-icons/fa";
import { formatDate } from "../../utils/dateUtils";
import JobDetailModal from "./JobDetailModel/JobModelDetail";
import { useAppliedJobs } from "../../hooks/useJobs";
import { useNavigate } from "react-router-dom";
import InterviewDetailsModal from "./InterviewDetailsModal";

const AppliedJobsList = () => {
  const navigate = useNavigate();

  const { data: applications } = useAppliedJobs();

  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState(null);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  return (
    <Container fluid className="px-4 py-3">
      <Card className="border-0 shadow-sm">
        <Card.Header
          style={{ backgroundColor: "#D36314" }}
          className=" text-white d-flex justify-content-between align-items-center"
        >
          <div className="d-flex align-items-center">
            <FaBriefcase className="me-2" />
            <h4 className="m-0">My Job Applications</h4>
          </div>
          <Badge pill bg="light" text="dark">
            {applications?.length || 0} Applications
          </Badge>
        </Card.Header>

        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">Position & Company</th>
                  <th>
                    <div className="flex items-center">
                      <FaCalendarAlt className="me-1" /> Posted
                    </div>
                  </th>
                  <th>
                    <div className="flex items-center">
                      <FaCalendarAlt className="me-1" /> Applied
                    </div>
                  </th>
                  <th>Status</th>
                  {/* <th className="text-center">Documents</th> */}
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications?.map((app, idx) => {
                  const job = app?.job;
                  const client = job?.client?.client_name;
                  const jobPosition =
                    app?.job.job_position?.position_name || "";
                  const applicationStatus = app.status || "";

                  //  Job Offer
                  const offerStage = job?.job_stages?.find(
                    (stage) => stage?.stage?.stage_name === "Offer",
                  );

                  console.log("Offer Stage:", offerStage);
                  console.log("Offer Details:", offerStage?.offer_details);

                  const getStatusBadge = () => {
                    const baseClass =
                      "rounded-pill py-1 px-3 d-inline-flex align-items-center";

                    switch (applicationStatus) {
                      case "Interview":
                        return (
                          <Badge
                            bg="info"
                            className={`${baseClass} cursor-pointer`}
                            onClick={() => {
                              const interviewStage = app?.job?.job_stages?.find(
                                (s) => s?.stage?.stage_name === "Interview",
                              );

                              setInterviewDetails(
                                interviewStage?.interview_details || null,
                              );
                              setShowInterviewModal(true);
                            }}
                          >
                            <FaUserTie className="me-1" /> {applicationStatus}
                          </Badge>
                        );
                      case "Offer":
                        if (!offerStage) return null;

                        return (
                          <div
                            onClick={() =>
                              navigate("/jobseeker/job-offers", {
                                state: {
                                  offers: offerStage?.offer_details,
                                },
                              })
                            }
                            className={`badge bg-success ${baseClass} text-white text-decoration-none cursor-pointer`}
                          >
                            <FaCheckCircle className="me-1" />{" "}
                            {applicationStatus}
                          </div>
                        );
                      case "Employed":
                        return (
                          <Button
                            variant="success"
                            size="sm"
                            className={`${baseClass} border-0`}
                            onClick={() =>
                              window.previewContractForm(
                                app.applicant_id,
                                job.id,
                                app.stage.id,
                              )
                            }
                          >
                            <FaFileContract className="me-1" />{" "}
                            {applicationStatus}
                          </Button>
                        );
                      case "Screening":
                        return (
                          <Badge bg="secondary" className={baseClass}>
                            <FaSearch className="me-1" /> Screening
                          </Badge>
                        );
                      default:
                        return (
                          <Badge bg="light" text="dark" className={baseClass}>
                            {applicationStatus}
                          </Badge>
                        );
                    }
                  };

                  return (
                    <tr
                      key={idx}
                      className={job.checkDeadline ? "table-warning" : ""}
                    >
                      <td className="ps-4">
                        <div className="fw-semibold">{jobPosition}</div>
                        <div className="text-muted small">{client}</div>
                      </td>

                      <td>
                        <div className="text-nowrap">
                          {formatDate(app.job?.publish_date)}
                        </div>
                      </td>

                      <td>
                        <div className="text-nowrap">
                          {formatDate(app.created_at)}
                        </div>
                      </td>

                      <td>{getStatusBadge()}</td>

                      <td>
                        <div className="d-flex align-items-center gap-2 small">
                          <div
                            onClick={() => handleJobClick(job)}
                            className="d-flex align-items-center text-success cursor-pointer"
                          >
                            <FaEye className="me-2" /> View
                          </div>

                          <div
                            href={`/applications/job/cancel/${app.id}`}
                            className="d-flex align-items-center text-danger cursor-pointer"
                            onClick={(e) => {
                              if (
                                !window.confirm(
                                  `Cancel application for ${jobPosition}?`,
                                )
                              ) {
                                e.preventDefault();
                              }
                            }}
                          >
                            <FaTrashAlt className="me-2" /> Cancel
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Card.Body>

        <Card.Footer className="bg-light d-flex justify-content-between align-items-center">
          <div className="text-muted small">
            Showing {applications?.length || 0} applications
          </div>
          {/* Pagination would go here */}
        </Card.Footer>
      </Card>

      <JobDetailModal
        job={selectedJob}
        show={showModal}
        onHide={() => setShowModal(false)}
      />

      {/* Interview Details Modal  */}
      <InterviewDetailsModal
        show={showInterviewModal}
        onHide={() => setShowInterviewModal(false)}
        interviewDetails={interviewDetails}
      />
    </Container>
  );
};

export default AppliedJobsList;

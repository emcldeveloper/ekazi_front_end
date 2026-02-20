import { useState } from "react";

import {
  Container,
  Card,
  Table,
  Badge,
  Button,
  Dropdown,
} from "react-bootstrap";
import {
  FaEye,
  FaTrashAlt,
  FaBriefcase,
  FaCalendarAlt,
  FaUserTie,
} from "react-icons/fa";
import { formatDate } from "../../utils/dateUtils";
import JobDetailModal from "./JobDetailModel/JobModelDetail";
import { useApplicationStages, useAppliedJobs } from "../../hooks/useJobs";
import { useNavigate } from "react-router-dom";
import InterviewDetailsModal from "./InterviewDetailsModal";
import { BsThreeDotsVertical } from "react-icons/bs";

const AppliedJobsList = () => {
  const navigate = useNavigate();

  const { data: applications } = useAppliedJobs();
  const { data: stages } = useApplicationStages();

  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState(null);

  // Checking for jobs applied by applicants
  const appliedJobIds = applications?.map((app) => app.job_id) || [];

  const filteredApplications = applications?.filter((app) => {
    if (statusFilter === "All") return true;

    return app.status === statusFilter;
  });

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
          {/* Filter */}
          <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
            <div className="fw-semibold">Filter by Stage</div>

            <select
              className="form-select w-auto"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>

              {stages
                ?.sort((a, b) => a.stage_number - b.stage_number)
                .map((stage) => (
                  <option key={stage.id} value={stage.stage_name}>
                    {stage.stage_name}
                  </option>
                ))}
            </select>
          </div>

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
                {filteredApplications?.map((app, idx) => {
                  const job = app?.job;
                  const client = job?.client?.client_name;
                  const jobPosition =
                    app?.job.job_position?.position_name || "";
                  const applicationStatus = app.status || "";

                  //  Job Offer
                  const offerStage = job?.job_stages?.find(
                    (stage) => stage?.stage?.stage_name === "Offer",
                  );

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
                            {/* <FaUserTie className="me-1" />  */}
                            {applicationStatus}
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
                            {/* <FaCheckCircle className="me-1" />{" "} */}
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
                            {/* <FaFileContract className="me-1" />{" "} */}
                            {applicationStatus}
                          </Button>
                        );
                      case "Screening":
                        return (
                          <Badge bg="warning" className={baseClass}>
                            {/* <FaSearch className="me-1" />  */}
                            Screening
                          </Badge>
                        );
                      default:
                        return (
                          <Badge bg="secondary" className={baseClass}>
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
                        <div
                          onClick={() => handleJobClick(job)}
                          className="job-link fw-semibold cursor-pointer"
                        >
                          {jobPosition}
                        </div>
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
                        <div className="d-flex align-items-center justify-content-center cursor-pointer">
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
                              <BsThreeDotsVertical />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              {applicationStatus === "Interview" && (
                                <Dropdown.Item
                                  onClick={() => {
                                    const interviewStage =
                                      app?.job?.job_stages?.find(
                                        (s) =>
                                          s?.stage?.stage_name === "Interview",
                                      );

                                    setInterviewDetails(
                                      interviewStage?.interview_details || null,
                                    );
                                    setShowInterviewModal(true);
                                  }}
                                  className="d-flex align-items-center small"
                                >
                                  <FaUserTie className="me-2" />
                                  View Interview
                                </Dropdown.Item>
                              )}

                              {applicationStatus === "Offer" && (
                                <Dropdown.Item
                                  onClick={() =>
                                    navigate("/jobseeker/job-offers", {
                                      state: {
                                        offers: offerStage?.offer_details,
                                      },
                                    })
                                  }
                                  className="d-flex align-items-center small"
                                >
                                  <FaEye className="me-2" /> View Offer
                                </Dropdown.Item>
                              )}

                              <Dropdown.Item
                                onClick={() => handleJobClick(job)}
                                className="d-flex align-items-center small"
                              >
                                <FaEye className="me-2" /> View details
                              </Dropdown.Item>

                              <Dropdown.Item
                                // onClick={() => handleJobClick(job)}
                                className="d-flex align-items-center small"
                              >
                                <FaTrashAlt className="me-2" /> Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        {/* <div className="d-flex align-items-center gap-2 small">
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
                        </div> */}
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
        appliedJobIds={appliedJobIds}
      />

      {/* Interview Details Modal  */}
      <InterviewDetailsModal
        show={showInterviewModal}
        onHide={() => setShowInterviewModal(false)}
        interviewDetails={interviewDetails}
      />

      <style>
        {`
    .job-link {
      text-decoration: none;
      cursor: pointer;
    }

    .job-link:hover {
      text-decoration: underline;
    }
  `}
      </style>
    </Container>
  );
};

export default AppliedJobsList;

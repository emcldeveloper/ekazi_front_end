import { useState } from "react";

import {
  Container,
  Card,
  Table,
  Badge,
  Button,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
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
import { useAppliedJobs, useInterviewResponse } from "../../hooks/useJobs";
import { useNavigate } from "react-router-dom";

const AppliedJobsList = () => {
  const navigate = useNavigate();

  const { data: applications } = useAppliedJobs();

  const { mutate: respondInterview, isPending } = useInterviewResponse();

  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState(null);
  const [showRescheduleForm, setShowRescheduleForm] = useState(false);
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [rescheduleReason, setRescheduleReason] = useState("");

  const [rescheduleDate, setRescheduleDate] = useState("");
  const [cancelReason, setCancelReason] = useState("");

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

                      {/* <td className="text-center">
                        <ButtonGroup size="sm">
                          <OverlayTrigger
                            overlay={<Tooltip>Cover Letter</Tooltip>}
                          >
                            <Button
                              variant="outline-secondary"
                              href={`/applications/cover-letter/download/${job.id}/${app.applicant_id}`}
                              target="_blank"
                            >
                              <FaFileDownload />
                            </Button>
                          </OverlayTrigger>

                          {job.applicant_contract ? (
                            <OverlayTrigger
                              overlay={<Tooltip>View Contract</Tooltip>}
                            >
                              <Button
                                variant="outline-primary"
                                href={`/applications/view/contract/${job.applicant_contract.id}`}
                                target="_blank"
                              >
                                <FaFilePdf />
                              </Button>
                            </OverlayTrigger>
                          ) : (
                            <ContractCell
                              job={job}
                              onUpload={handleContractUpload}
                            />
                          )}
                        </ButtonGroup>
                      </td> */}

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
      <Modal
        show={showInterviewModal}
        onHide={() => setShowInterviewModal(false)}
        size="md"
        centered
        scrollable
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {interviewDetails && (
            <Row className="g-3">
              {/* Header */}
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h5 className="mb-1 fw-bold">Interview Details</h5>
                <Badge
                  bg={
                    interviewDetails?.status === "Pending"
                      ? "warning"
                      : interviewDetails?.status === "Interested"
                        ? "success"
                        : interviewDetails?.status === "Reschedule"
                          ? "primary"
                          : "danger"
                  }
                  className="px-3 py-2 rounded-pill"
                >
                  {interviewDetails?.status || "Unknown"}
                </Badge>
              </div>

              {/* LEFT LABELS */}
              <Col md={6} className="fw-bold text-muted">
                <p>Type</p>
                <p>Duration</p>
                <p>Link</p>
                <p>Interview Date</p>

                {interviewDetails?.reschedule_date && <p>Reschedule Date</p>}
                {interviewDetails?.reason && <p>Reason</p>}
              </Col>

              {/* RIGHT VALUES */}
              <Col md={6} className="text-end">
                <p>{interviewDetails?.interview_type || "-"}</p>
                <p>
                  {interviewDetails?.duration
                    ? `${interviewDetails.duration} mins`
                    : "-"}
                </p>

                <p>
                  {interviewDetails?.url ? (
                    <a
                      href={interviewDetails.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Join Interview
                    </a>
                  ) : (
                    "-"
                  )}
                </p>

                <p>{interviewDetails?.interview_date || "Not scheduled"}</p>

                {interviewDetails?.reschedule_date && (
                  <p className="text-warning fw-semibold">
                    {interviewDetails.reschedule_date}
                  </p>
                )}

                {interviewDetails?.reason && (
                  <p className="text-danger">{interviewDetails.reason}</p>
                )}
              </Col>

              {/* RESCHEDULE FORM */}
              {showRescheduleForm && (
                <Col xs={12}>
                  <div className="border rounded-3 p-3 bg-light">
                    <h6 className="fw-semibold mb-2">Reschedule Interview</h6>

                    <div className="mb-3">
                      <label className="form-label small text-muted">
                        New Interview Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        value={rescheduleDate}
                        onChange={(e) => setRescheduleDate(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small text-muted">
                        Reason (optional)
                      </label>
                      <textarea
                        rows={3}
                        className="form-control"
                        placeholder="Why are you rescheduling?"
                        value={rescheduleReason}
                        onChange={(e) => setRescheduleReason(e.target.value)}
                      />
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-primary btn-sm"
                        disabled={isPending}
                        onClick={() => {
                          respondInterview({
                            id: interviewDetails.id,
                            status: "Reschedule",
                            reason: rescheduleReason || null,
                            reschedule_date: rescheduleDate,
                          });

                          setShowRescheduleForm(false);
                          setRescheduleDate("");
                          setRescheduleReason("");
                        }}
                      >
                        {isPending ? "Submitting..." : "Submit"}
                      </button>

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setShowRescheduleForm(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Col>
              )}

              {/* CANCEL FORM */}
              {showCancelForm && (
                <Col xs={12}>
                  <div className="border rounded-3 p-3 bg-light">
                    <h6 className="fw-semibold mb-2">Cancel Interview</h6>

                    <textarea
                      rows={3}
                      className="form-control mb-3"
                      placeholder="Reason (optional)"
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                    />

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-danger btn-sm"
                        disabled={isPending}
                        onClick={() => {
                          respondInterview({
                            id: interviewDetails.id,
                            status: "Not Interested",
                            reason: cancelReason || null,
                            reschedule_date: null,
                          });

                          setShowCancelForm(false);
                          setCancelReason("");
                        }}
                      >
                        {isPending ? "Submitting..." : "Submit"}
                      </button>

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setShowCancelForm(false)}
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </Col>
              )}
            </Row>
          )}
        </Modal.Body>

        <Modal.Footer>
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-outline-primary"
              disabled={isPending}
              onClick={() => {
                setShowCancelForm(false);
                setShowRescheduleForm(true);
              }}
            >
              Reschedule
            </button>

            <button
              className="btn btn-outline-success"
              disabled={isPending}
              onClick={() => {
                respondInterview({
                  id: interviewDetails.id,
                  status: "Interested",
                  reason: null,
                  reschedule_date: null,
                });
              }}
            >
              {isPending ? "Submitting..." : "Interested"}
            </button>

            <button
              className="btn btn-outline-danger"
              disabled={isPending}
              onClick={() => {
                setShowRescheduleForm(false);
                setShowCancelForm(true);
              }}
            >
              Not interested
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AppliedJobsList;

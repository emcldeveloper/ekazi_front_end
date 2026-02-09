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
import ContractCell from "../Forms/Job/UploadContract";
import JobDetailModal from "./JobDetailModel/JobModelDetail";

const AppliedJobsList = ({ applicant }) => {
  const handleContractUpload = (jobId, file) => {
    // Your API upload logic here
    // Example: await uploadContractAPI(jobId, file);
  };
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
            {applicant?.length || 0} Applications
          </Badge>
        </Card.Header>

        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">Position & Company</th>
                  <th>
                    <FaCalendarAlt className="me-1" /> Posted
                  </th>
                  <th>
                    <FaCalendarAlt className="me-1" /> Applied
                  </th>
                  <th>Status</th>
                  {/* <th className="text-center">Documents</th> */}
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applicant?.map((app, idx) => {
                  const job = app.job || {};
                  const client =
                    job.client?.name || "Exact Manpower Consulting Ltd";
                  const jobPosition = job.job_position?.position_name || "";
                  const stage = app.status || "";

                  const getStatusBadge = () => {
                    const baseClass =
                      "rounded-pill py-1 px-3 d-inline-flex align-items-center";

                    switch (stage) {
                      case "Interview":
                        return (
                          <Badge
                            bg="info"
                            className={`${baseClass} cursor-pointer`}
                            // onClick={() => handleViewInterview(job.id, app.applicant_id)}
                          >
                            <FaUserTie className="me-1" /> {stage}
                          </Badge>
                        );
                      case "Offer":
                        return (
                          <a
                            href={`/applicant/offer/${app.applicant_id}/${job.id}/${app.stage.id}`}
                            className={`badge bg-success ${baseClass} text-white text-decoration-none`}
                          >
                            <FaCheckCircle className="me-1" /> {stage}
                          </a>
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
                                app.stage.id
                              )
                            }
                          >
                            <FaFileContract className="me-1" /> {stage}
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
                            {stage}
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
                              href={`/applicant/cover-letter/download/${job.id}/${app.applicant_id}`}
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
                                href={`/applicant/view/contract/${job.applicant_contract.id}`}
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
                            href={`/applicant/job/cancel/${app.id}`}
                            className="d-flex align-items-center text-danger cursor-pointer"
                            onClick={(e) => {
                              if (
                                !window.confirm(
                                  `Cancel application for ${jobPosition}?`
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
            Showing {applicant?.length || 0} applications
          </div>
          {/* Pagination would go here */}
        </Card.Footer>
      </Card>
      <JobDetailModal
        job={selectedJob}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </Container>
  );
};

export default AppliedJobsList;

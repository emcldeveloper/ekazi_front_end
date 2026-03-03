import React, { useState } from "react";
import { Card, Row, Col, Badge, Image, Button } from "react-bootstrap";

import JobDetailModal from "../Jobs/JobDetailModel/JobModelDetail";
import { formatDate } from "../../utils/dateUtils";
import { useJobs } from "../../hooks/useJobs";

const EmployerJobs = ({ client }) => {
  const { jobs, isPending: isLoading, isError } = useJobs({ limit: 12, page: 1 });
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  if (!client) return null;

  const employerJobs = jobs?.filter((job) => job.client_id === client.id) || [];
  const defaultLogo = "/default-logo.png"; // Replace with actual path

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setShowModal(false);
  };

  return (
    <div className="mt-4">
      <h4 className="text-primary mb-3">Jobs at {client.client_name}</h4>

      {isLoading && <p>Loading jobs...</p>}
      {isError && <p className="text-danger">Error isLoading jobs.</p>}
      {!isLoading && employerJobs.length === 0 && (
        <p className="text-muted">No job postings found for this employer.</p>
      )}

      <Row>
        {employerJobs.map((job) => (
          <Col md={12} key={job.id} className="mb-1">
            <Card className="shadow-sm h-100">
              <Card.Body>
                <Row className="align-items-center">
                  {/* Left: Logo */}
                  <Col xs={12} md={2} className="text-center mb-3 mb-md-0">
                    <Image
                      src={
                        job.client?.logo
                          ? `https://api.ekazi.co.tz/${job.client.logo}`
                          : defaultLogo
                      }
                      alt="Employer Logo"
                      roundedCircle
                      width={70}
                      height={70}
                    />
                  </Col>

                  {/* Center: Job Info */}
                  <Col xs={12} md={8}>
                    <Card.Title className=" mb-1 text-primary">
                      {job.job_position?.position_name || "Untitled Position"}
                    </Card.Title>

                    <div className="text-muted small mb-1">
                      {job.job_type?.type_name} •{" "}
                      {job.job_addresses?.[0]?.region?.region_name},{" "}
                      {job.job_addresses?.[0]?.region?.country?.name}
                    </div>
                    <div className="text-muted small">
                      <strong>Level:</strong>{" "}
                      {job.position_level?.position_name || "Not specified"} •{" "}
                      <strong>Deadline:</strong>{" "}
                      {job.dead_line ? formatDate(job.dead_line) : "N/A"}
                    </div>
                  </Col>

                  {/* Right: Actions */}
                  <Col
                    xs={12}
                    md={2}
                    className="text-md-end text-center mt-3 mt-md-0"
                  >
                    {job.featured === 1 && (
                      <Badge bg="warning" text="dark" className="mb-2">
                        Featured
                      </Badge>
                    )}
                    <div>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleViewJob(job)}
                      >
                        View Job
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          show={showModal}
          onHide={handleCloseModal}
        />
      )}
    </div>
  );
};

export default EmployerJobs;

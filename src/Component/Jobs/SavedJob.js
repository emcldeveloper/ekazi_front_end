import { useState } from "react";
import {
  Container,
  Card,
  Table,
  Badge,
  Dropdown,
  Button,
} from "react-bootstrap";
import { FaEye, FaTrashAlt, FaEllipsisV, FaBriefcase } from "react-icons/fa";
import { formatDate } from "../../utils/dateUtils";
import JobDetailModal from "./JobDetailModel/JobModelDetail";
import { useGetSavedJobs } from "../../hooks/useCandidates";

const SavedJobsList = () => {
  const { data: savedJobs = [] } = useGetSavedJobs();

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
          className="text-white d-flex justify-content-between align-items-center"
        >
          <div className="d-flex align-items-center">
            <FaBriefcase className="me-2" />
            <h4 className="m-0">Saved Jobs</h4>
          </div>

          {/* Correct count */}
          <Badge pill bg="light" text="dark">
            {savedJobs.length} jobs
          </Badge>
        </Card.Header>

        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">Position & Company</th>
                  <th>Posted On</th>
                  <th>Deadline</th>
                  <th className="text-center">Apply</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {savedJobs.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-3 text-muted">
                      You have no saved jobs yet.
                    </td>
                  </tr>
                )}

                {savedJobs.map((app, idx) => {
                  const job = app.job || {};
                  const jobTitle =
                    job.job_position?.position_name || "Untitled Job";
                  const company = job.client?.client_name || "Unknown Company";

                  const postedOn = formatDate(job.publish_date);
                  const deadline = formatDate(job.dead_line);

                  return (
                    <tr key={idx}>
                      <td className="ps-4">
                        <div className="fw-semibold">{jobTitle}</div>
                        <div className="text-muted small">{company}</div>
                      </td>

                      <td>{postedOn}</td>

                      <td>{deadline}</td>

                      <td className="text-center">
                        <Button
                          size="sm"
                          variant="primary"
                          href={`/jobs/${job.id}`}
                        >
                          Apply
                        </Button>
                      </td>

                      <td className="text-center">
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="light"
                            size="sm"
                            className="px-2"
                          >
                            <FaEllipsisV />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => handleJobClick(job)}
                              className="d-flex align-items-center"
                            >
                              <FaEye className="me-2" /> View Details
                            </Dropdown.Item>

                            <Dropdown.Divider />

                            <Dropdown.Item className="d-flex align-items-center text-danger">
                              <FaTrashAlt className="me-2" /> Remove from Saved
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
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
            Showing {savedJobs.length} saved jobs
          </div>
        </Card.Footer>
      </Card>

      {/* Job Details Modal */}
      <JobDetailModal
        job={selectedJob}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </Container>
  );
};

export default SavedJobsList;

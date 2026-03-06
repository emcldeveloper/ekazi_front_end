import React from "react";
import { Container, Row, Spinner, Alert, Button } from "react-bootstrap";
import useJob from "../../hooks/useJob.js";
import JobCard from "./components/jobs/JobCard";
import { useNavigate } from "react-router-dom";

const FeaturedJobsSection = () => {
  const navigate = useNavigate();
  const { jobs, loading, error } = useJob();

  return (
    <Container className="my-5">
      <h2 className="text-center font-bold mb-4" style={{ color: "#2E58A6" }}>
        Latest Jobs
      </h2>

      {error && <Alert variant="danger">{error.message}</Alert>}

      <Row>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </Row>

      {/* Initial Loading */}
      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" />
        </div>
      )}

      <div className="text-center my-4">
        <Button onClick={() => navigate("/jobs")}>View More</Button>
      </div>
    </Container>
  );
};

export default FeaturedJobsSection;

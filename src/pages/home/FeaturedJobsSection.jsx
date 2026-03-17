import React from "react";
import { Container, Row, Spinner, Alert, Col } from "react-bootstrap";
import useJob from "../../hooks/useJob.js";
import JobCard from "./components/jobs/JobCard";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FeaturedJobsSection = () => {
  const navigate = useNavigate();
  const { jobs, loading, error } = useJob();

  return (
    <Container className="my-10">
      <h2 className="text-center text-3xl font-semibold text-Blue mb-10">
        Latest Jobs
      </h2>

      {error && <Alert variant="danger">{error.message}</Alert>}

      <Row>
        {jobs.slice(0, 9).map((job) => (
          <Col key={job.id} md={4} className="mb-4">
            <JobCard job={job} />
          </Col>
        ))}
      </Row>

      {/* Initial Loading */}
      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" />
        </div>
      )}

      <div className="flex justify-center my-4">
        <button
          onClick={() => navigate("/jobs")}
          className="flex items-center gap-2 px-4 py-2 bg-Blue text-white rounded-lg hover:bg-blue-700 transition"
        >
          View More <ArrowRight size={18} />
        </button>
      </div>
    </Container>
  );
};

export default FeaturedJobsSection;

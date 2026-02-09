import React from "react";
import { Container, Row, Spinner, Alert, Button } from "react-bootstrap";
import useJob from "../../hooks/useJob.js";
import JobCard from "./components/JobCard";

const FeaturedJobsSection = () => {
  const { jobs, loading, error, hasMore, loadMore, loadingMore } = useJob();

  return (
    <Container className="my-5">
      <h2 className="text-center font-bold mb-4" style={{ color: "#2E58A6" }}>
        All Jobs
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

      {/* Load More Button */}
      {!loading && hasMore && !loadingMore && (
        <div className="text-center my-4">
          <Button onClick={loadMore}>Load More</Button>
        </div>
      )}

      {/* Loading More Spinner */}
      {loadingMore && (
        <div className="text-center my-3">
          <Spinner animation="border" />
        </div>
      )}

      {/* No More Jobs */}
      {!loading && !hasMore && jobs.length > 0 && (
        <div className="text-center my-4">
          <Alert variant="info">No more jobs to load.</Alert>
        </div>
      )}
    </Container>
  );
};

export default FeaturedJobsSection;

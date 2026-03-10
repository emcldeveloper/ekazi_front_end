import { Link } from "react-router-dom";
import { Row, Container, Spinner, Alert, Button, Col } from "react-bootstrap";

import { useFeaturedJobSeeker } from "../../hooks/useCandidates.js";
import CandidateCard from "../candidates/CandidateCard.jsx";

const FeaturedCandidateSection = () => {
  const { data, isLoading, isError, error } = useFeaturedJobSeeker();

  const candidates = Array.isArray(data) ? data : (data?.data ?? []);

  return (
    <Container className="my-5">
      <h2 className="text-center font-bold mb-4" style={{ color: "#2E58A6" }}>
        Featured Candidates
      </h2>

      {/* Loading */}
      {isLoading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {/* Error */}
      {isError && (
        <Alert variant="danger" className="text-center">
          {error?.message || "Failed to load featured candidates"}
        </Alert>
      )}

      {/* Candidate Cards */}
      {!isLoading && !isError && (
        <Row>
          {candidates.slice(0, 9).map((candidate) => (
            <Col key={candidate.id} md={4} className="mb-4">
              <CandidateCard candidate={candidate} />
            </Col>
          ))}
        </Row>
      )}

      <div className="text-center mt-4">
        <Link to="/candidates" style={{ textDecoration: "none" }}>
          <Button variant="primary" className="btn-md">
            Browse All
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default FeaturedCandidateSection;

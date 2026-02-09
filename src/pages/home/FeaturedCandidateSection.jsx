import { Link } from "react-router-dom";
import { Row, Container, Spinner, Alert, Button } from "react-bootstrap";
import FeatureCandidate from "./components/FeatureCandidate.jsx";
import { useFeaturedJobSeeker } from "../../hooks/useCandidates.js";

const FeaturedCandidateSection = () => {
  const { data, isLoading, isError, error } = useFeaturedJobSeeker();

  const candidates = Array.isArray(data) ? data : data?.data ?? [];

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
            <FeatureCandidate key={candidate.id} candidate={candidate} />
          ))}
        </Row>
      )}

      <div className="text-center mt-4">
        <Link to="/featured-jobseeker" style={{ textDecoration: "none" }}>
          <Button variant="primary" className="btn-md">
            Browse All
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default FeaturedCandidateSection;

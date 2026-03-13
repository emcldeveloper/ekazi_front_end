import { Row, Container, Spinner, Alert, Col } from "react-bootstrap";

import { useFeaturedJobSeeker } from "../../hooks/useCandidates.js";
import CandidateCard from "../candidates/CandidateCard.jsx";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeaturedCandidateSection = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useFeaturedJobSeeker();
  const candidates = Array.isArray(data) ? data : (data?.data ?? []);

  return (
    <Container className="my-10">
      <h2 className="text-center text-3xl font-semibold text-Blue mb-10">
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

      <div className="flex justify-center my-4">
        <button
          onClick={() => navigate("/candidates")}
          className="flex items-center gap-2 px-4 py-2 bg-Blue text-white rounded-lg hover:bg-blue-700 transition"
        >
          Browse All <ArrowRight size={18} />
        </button>
      </div>
    </Container>
  );
};

export default FeaturedCandidateSection;

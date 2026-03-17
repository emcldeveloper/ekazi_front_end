import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";

import MainLayout1 from "../../layouts/MainLayout1";
import AdPlaceholder from "../../components/ads/AdPlaceholder";
import { useFeaturedJobSeeker } from "../../hooks/useCandidates";
import CandidateCard from "./CandidateCard";
import CandidateFilter from "./CandidateFilter";

const FeaturedCandidates = () => {
  // fetching featured candidates
  const {
    data: candidates = [],
    isPending: isLoading,
    error,
  } = useFeaturedJobSeeker();
  const jobSeekers = candidates;

  console.log("Featured Candidates:", jobSeekers);

  const [visibleCount, setVisibleCount] = useState(18);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    setVisibleCount(18);
  }, [filters]);

  // Filter candidates based on selected filters
  const filteredCandidates = jobSeekers.filter((candidate) => {
    const name =
      `${candidate?.applicant?.first_name ?? ""} ${candidate?.applicant?.last_name ?? ""}`.toLowerCase();

    if (filters.search && !name.includes(filters.search.toLowerCase())) {
      return false;
    }

    if (
      filters.industry &&
      filters.industry !== "All" &&
      candidate.applicant.positions[0]?.industry?.industry_name?.toLowerCase() !==
        filters.industry?.toLowerCase()
    ) {
      return false;
    }

    if (filters.gender && candidate.gender?.gender_name !== filters.gender) {
      return false;
    }

    if (
      filters.positionLevels?.length &&
      !filters.positionLevels.includes(candidate.position_level?.id)
    ) {
      return false;
    }

    return true;
  });

  return (
    <MainLayout1>
      <Container className="py-10">
        <Breadcrumb className="custom-breadcrumb">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active className="text-black">
            Featured Candidates
          </Breadcrumb.Item>
        </Breadcrumb>

        <Row>
          <Col md={9}>
            <CandidateFilter onFilterChange={setFilters} />
          </Col>

          <Col md={9}>
            {isLoading && (
              <div className="text-center">
                <Spinner animation="border" />
              </div>
            )}

            {error && (
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            )}

            {/* Candidates List */}
            <Row className="mt-4">
              {filteredCandidates.slice(0, visibleCount).map((candidate) => (
                <Col key={candidate.id} md={6} className="mb-4">
                  <CandidateCard candidate={candidate} />
                </Col>
              ))}

              {!isLoading && filteredCandidates.length === 0 && (
                <Alert variant="info" className="text-center mt-4">
                  No candidates match the selected filters.
                </Alert>
              )}
            </Row>

            {visibleCount < filteredCandidates.length && (
              <div className="text-center mt-4">
                <Button
                  variant="outline-primary"
                  onClick={() => setVisibleCount(visibleCount + 9)}
                >
                  Load More
                </Button>
              </div>
            )}
          </Col>

          <Col
            md={3}
            className="mb-3"
            style={{
              position: "sticky",
              top: "180px",
              alignSelf: "flex-start",
            }}
          >
            <AdPlaceholder />
          </Col>
        </Row>
      </Container>
    </MainLayout1>
  );
};

export default FeaturedCandidates;

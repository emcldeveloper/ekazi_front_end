import React, { useState } from "react";
import { Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import AllFeatureCandidateCard from "./AllFeatureCandidateCard";
import useFeaturedJobSeekers from "../../hooks/Candidate/FeaturedJobSeeker";
import JobSeekerFilterForm from "./JobSeekerFilterForm";

const AllFeaturedCandidate = () => {
  const { jobSeekers, loading, error } = useFeaturedJobSeekers();
  const [visibleCount, setVisibleCount] = useState(18);
  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState({
    knowledges: "", // Single string, no array
    level: "",
    experience: "",
    industry: "",
    title: "",
    education: "",
    gender: "",
    region: "",
    country: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const clearFilters = () => {
    setFilters({
      knowledges: "",
      level: "",
      experience: "",
      industry: "",
      title: "",
      education: "",
      gender: "",
      region: "",
      country: ""
    });
  };

const filteredCandidates = jobSeekers.filter(candidate => {
  const applicant = candidate.applicant;

  const inputKnowledge = filters.knowledges?.toLowerCase().trim();
  const applicantKnowledges = applicant?.applicant_knowledges?.map(
    k => k.knowledge?.knowledge_name?.toLowerCase().trim()
  ) || [];

  const hasMatchingKnowledge =
    !inputKnowledge ||
    applicantKnowledges.some(k => k.includes(inputKnowledge));

  const hasMatchingTitle =
    !filters.title ||
    applicant.positions?.some(pos =>
      pos.position?.position_name?.toLowerCase().includes(filters.title.toLowerCase())
    );

  const hasMatchingEducation =
    !filters.education ||
    applicant.educations?.some(edu =>
      edu.education_level_id?.toString() === filters.education
    );

  const hasMatchingLevel =
    !filters.level ||
    applicant.positions?.some(pos =>
      pos.level?.id?.toString() === filters.level
    );

  return (
    hasMatchingKnowledge &&
    hasMatchingTitle &&
    hasMatchingEducation &&
    hasMatchingLevel &&
    (!filters.experience || applicant.experience?.toString() === filters.experience) &&
    (!filters.industry || applicant.positions?.some(pos => pos.industry?.id?.toString() === filters.industry)) &&
    (!filters.gender || applicant.gender_id?.toString() === filters.gender) &&
    (!filters.region || applicant.address?.region_id?.toString() === filters.region) &&
    (!filters.country || applicant.address?.region?.country_id?.toString() === filters.country)
  );
});


  return (
    <Row>
      <Col md={12}>
        {/* Filter Form */}
        {showFilter && (
          <JobSeekerFilterForm
            filters={filters}
            setFilters={setFilters}
            handleInputChange={handleInputChange}
            clearFilters={clearFilters}
          />
        )}

        {/* Toggle Filter Button */}
        <Button
  variant="outline-secondary"
  onClick={() => setShowFilter(prev => !prev)}
  className="mt-3"
>
  {showFilter ? "Hide Filters" : "Show Filters"}
  <FaFilter style={{ marginLeft: "8px" }} />
</Button>



        {/* Loading and Error States */}
        {loading && <div className="text-center"><Spinner animation="border" /></div>}
        {error && <Alert variant="danger" className="text-center">{error}</Alert>}

        {/* Candidates List */}
        <Row className="mt-4">
          {filteredCandidates.slice(0, visibleCount).map((candidate) => (
            <AllFeatureCandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </Row>

        {/* Load More Button */}
        {visibleCount < filteredCandidates.length && (
          <div className="text-center mt-4">
            <Button variant="outline-primary" onClick={() => setVisibleCount(visibleCount + 9)}>
              Load More
            </Button>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default AllFeaturedCandidate;

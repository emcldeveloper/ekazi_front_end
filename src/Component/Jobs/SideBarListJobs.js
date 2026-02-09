import { useEffect, useRef } from "react";
import {
  Card,
  Col,
  Row,
  Container,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";

import "../../css/Jobs/SideBarListJobs.css";
import useJob from "../../hooks/useJob";

const SideBarListJobs = ({
  setSelectedJob,
  setActiveJob,
  activeJob,
  selectedTime,
  selectedJobType,
  selectedCountry,
  selectedRegion,
  selectedSubLocation,
  selectedPositionLevel,
  selectedIndustry,
  searchKeyword,
}) => {
  const {
    jobs,
    loading,
    error,
    hasMore,
    loadMore,
    loadingMore,
    setSearchTerm,
    setSelectedIndustry,
  } = useJob();

  // Track whether user manually selected a job
  const hasUserSelected = useRef(false);

  // 🔄 Sync filters from parent (FindJobs) into hook
  useEffect(() => {
    setSearchTerm(searchKeyword || "");
  }, [searchKeyword, setSearchTerm]);

  useEffect(() => {
    setSelectedIndustry(selectedIndustry || "");
  }, [selectedIndustry, setSelectedIndustry]);

  // Client-side filters (excluding search & industry)
  const applyFilters = (jobs) => {
    return jobs.filter((job) => {
      const jobTypeId = String(job.job_type?.id || job.type_id || "");
      const positionLevelId = String(
        job.position_level?.id || job.position_level_id || "",
      );
      const publishDate = new Date(job.publish_date);
      const address = job.job_addresses?.[0] || {};
      const subLocation = address.sub_location || "";
      const regionId = String(address.region?.id || "");
      const countryId = String(address.region?.country?.id || "");

      if (selectedTime && selectedTime !== "Any Time") {
        const daysAgo = new Date();
        daysAgo.setDate(daysAgo.getDate() - parseInt(selectedTime));
        if (publishDate < daysAgo) return false;
      }

      if (
        selectedJobType &&
        selectedJobType !== "Any Type" &&
        selectedJobType !== jobTypeId
      )
        return false;

      if (
        selectedPositionLevel &&
        selectedPositionLevel !== "Any Level" &&
        selectedPositionLevel !== positionLevelId
      )
        return false;

      if (selectedCountry && selectedCountry !== countryId) return false;
      if (selectedRegion && selectedRegion !== regionId) return false;

      if (
        selectedSubLocation &&
        selectedSubLocation.toLowerCase() !== subLocation.toLowerCase()
      )
        return false;

      return true;
    });
  };

  const filteredJobs = applyFilters(jobs);

  // ✅ Auto-select first job once
  useEffect(() => {
    if (filteredJobs.length > 0 && !hasUserSelected.current) {
      const firstJob = filteredJobs[0];
      setActiveJob(firstJob);
      setSelectedJob(firstJob);
    }
  }, [filteredJobs, setActiveJob, setSelectedJob]);

  const handleJobClick = (job) => {
    hasUserSelected.current = true;
    setActiveJob(job);
    setSelectedJob(job);
  };

  const capitalizeWords = (text = "") =>
    text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading jobs. Please try again later.</div>;

  return (
    <Container>
      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <h5 className="mb-3">{filteredJobs.length} Jobs Found</h5>
              <hr className="full-width" />

              <div
                style={{
                  maxHeight: "600px",
                  overflowY: "auto",
                  marginBottom: "10px",
                  paddingRight: "10px",
                }}
              >
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className={`job-item mb-3 ${
                      activeJob?.id === job.id ? "active" : ""
                    }`}
                    onClick={() => handleJobClick(job)}
                    style={{ cursor: "pointer" }}
                  >
                    <Row className="align-items-center">
                      <Col xs={3}>
                        <img
                          src={
                            job.client?.logo
                              ? `https://api.ekazi.co.tz/${job.client.logo}`
                              : "default-image-url.jpg"
                          }
                          alt="company logo"
                          style={{
                            width: "100%",
                            height: "100px",
                            objectFit: "contain",
                          }}
                        />
                      </Col>

                      <Col xs={9}>
                        <p className="job-position">
                          <b>
                            {capitalizeWords(
                              job.job_position?.position_name ||
                                "Position not provided",
                            )}
                          </b>
                        </p>

                        <p className="job-company">
                          {capitalizeWords(job.client?.client_name)}
                        </p>

                        <p className="job-location">
                          {capitalizeWords(
                            job.job_addresses?.[0]?.sub_location &&
                              `${job.job_addresses?.[0]?.sub_location}, `,
                          )}
                          {capitalizeWords(
                            job.job_addresses?.[0]?.region?.region_name &&
                              `${job.job_addresses?.[0]?.region?.region_name}, `,
                          )}
                          {capitalizeWords(
                            job.job_addresses?.[0]?.region?.country?.name &&
                              `${job.job_addresses?.[0]?.region?.country?.name}`,
                          )}
                        </p>

                        <p className="job-posted">
                          {new Date(job.publish_date).toLocaleDateString()}
                        </p>
                      </Col>
                    </Row>
                    <hr className="full-width" />
                  </div>
                ))}

                {loadingMore && (
                  <div className="text-center my-3">
                    <Spinner animation="border" />
                  </div>
                )}

                {!loadingMore && hasMore && (
                  <div className="text-center my-4">
                    <Button onClick={loadMore}>Load More</Button>
                  </div>
                )}

                {!hasMore && (
                  <div className="text-center my-4">
                    <Alert variant="info">No more jobs to load.</Alert>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SideBarListJobs;

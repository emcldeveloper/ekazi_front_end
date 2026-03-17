import { useEffect, useRef } from "react";
import { Card, Col, Row, Container, Button, Spinner } from "react-bootstrap";

import "../../css/Jobs/SideBarListJobs.css";
import useJob from "../../hooks/useJob";

const SideBarListJobs = ({
  filters,
  setSelectedJob,
  setActiveJob,
  activeJob,
}) => {
  const { jobs, loading, error, hasMore, loadMore, loadingMore } =
    useJob(filters);

  const hasUserSelected = useRef(false);

  useEffect(() => {
    if (jobs.length > 0 && !hasUserSelected.current) {
      const firstJob = jobs[0];
      setActiveJob(firstJob);
      setSelectedJob(firstJob);
    }
  }, [jobs, setActiveJob, setSelectedJob]);

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
              {/* <h5 className="mb-3">{jobs.length} Jobs Found</h5>
              <hr className="full-width" /> */}

              <div
                style={{
                  maxHeight: "600px",
                  overflowY: "auto",
                  marginBottom: "10px",
                  paddingRight: "10px",
                }}
              >
                {jobs.map((job) => (
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
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SideBarListJobs;

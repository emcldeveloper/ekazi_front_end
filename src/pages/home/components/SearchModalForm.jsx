import { Modal, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

// Helper slugify function
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");

const SearchModalForm = ({
  showModal,
  handleClose,
  modalBodyRef,
  handleScroll,
  filteredJobs,
  loadingMore,
  hasMore,
}) => {
  const styles = {
    card: {
      transition: "all 0.3s ease-in-out",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
      border: "none",
      borderRadius: "10px",
      padding: "16px",
    },
    cardHover: {
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      transform: "translateY(-2px)",
    },
    logo: {
      width: "100%",
      height: "75px",
      objectFit: "contain",
    },
    jobTitle: {
      fontWeight: "bold",
      color: "#212529",
      textDecoration: "none",
      display: "block",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    companyName: {
      color: "#6c757d",
      fontSize: "0.9rem",
    },
    deadline: {
      fontSize: "0.85rem",
    },
  };

  return (
    <Modal show={showModal} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Search Results</Modal.Title>
      </Modal.Header>

      <Modal.Body
        ref={modalBodyRef}
        onScroll={handleScroll}
        style={{ maxHeight: "500px", overflowY: "auto" }}
      >
        <div className="row mt-3">
          {filteredJobs.length === 0 ? (
            <div className="col-12 text-center">
              <p className="text-muted">No jobs found.</p>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const jobTitle = job.job_position?.position_name || "job";
              const region = job.job_addresses?.[0]?.region?.region_name || "";
              const country =
                job.job_addresses?.[0]?.region?.country?.name || "";
              const jobId = job.id;

              const jobSlug = [
                slugify(jobTitle),
                slugify(region),
                country.toLowerCase() !== "remote" ? slugify(country) : null,
                jobId,
              ]
                .filter(Boolean)
                .join("-");

              const jobUrl = `/jobs/${jobSlug}`;

              return (
                <div className="col-md-6 mb-3" key={job.id}>
                  <div
                    className="card h-100"
                    style={styles.card}
                    onMouseEnter={(e) =>
                      Object.assign(e.currentTarget.style, styles.cardHover)
                    }
                    onMouseLeave={(e) =>
                      Object.assign(e.currentTarget.style, styles.card)
                    }
                  >
                    <div className="row g-2 align-items-center">
                      <div className="col-4 text-center">
                        <Image
                          src={
                            job.client?.logo
                              ? `https://api.ekazi.co.tz/${job.client.logo}`
                              : "/images/nodata.png"
                          }
                          alt="Company Logo"
                          style={styles.logo}
                          rounded
                        />
                      </div>
                      <div className="col-8">
                        <Link
                          to={jobUrl}
                          style={styles.jobTitle}
                          state={{ job }}
                        >
                          {job.job_position?.position_name || job.title}
                        </Link>
                        <div style={styles.companyName}>
                          {job.client?.client_name}
                        </div>
                        <div
                          style={{
                            ...styles.deadline,
                            color:
                              new Date(job.dead_line) < new Date()
                                ? "red"
                                : "green",
                          }}
                        >
                          {new Date(job.dead_line) < new Date()
                            ? `Expired: ${new Date(
                                job.dead_line
                              ).toLocaleDateString()}`
                            : `Deadline: ${new Date(
                                job.dead_line
                              ).toLocaleDateString()}`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {loadingMore && (
            <div className="col-12 text-center py-2">
              <small>Loading more jobs...</small>
            </div>
          )}

          {!hasMore && filteredJobs.length > 0 && (
            <div className="col-12 text-center py-2">
              <small className="text-muted">No more jobs to load.</small>
            </div>
          )}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SearchModalForm;

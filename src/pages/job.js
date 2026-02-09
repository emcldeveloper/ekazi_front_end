import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import "./Joblisting.css";
import {
  FaUsers,
  FaBriefcase,
  FaMoneyBillAlt,
  FaCalendar,
} from "react-icons/fa";
import { useNavigate, useParams, Link } from "react-router-dom";

const JobListing = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1); // Changed from currentPage to page
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  // Fetch jobs data
  const fetchJobs = async (pageNum) => {
    try {
      setLoading(true);
      const response = await axios.get(
        ` https://api.ekazi.co.tz/api/applicant/featuredJobs?limit=10&page=${pageNum}`
      );
      // https://api.ekazi.co.tz/api/applicant/featuredJobs
      // http://127.0.0.1:8000/api/applicant/featuredJobs

      setJobs((prevJobs) => [...prevJobs, ...response.data.data]);
      setHasMore(response.data.data.length > 0);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  // Infinite scroll observer
  const lastJobElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Filter jobs based on search term
  const filteredJobs = jobs.filter((job) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      job.job_position?.position_name?.toLowerCase().includes(searchLower) ||
      job.industry?.industry_name?.toLowerCase().includes(searchLower) ||
      job.client?.client_name?.toLowerCase().includes(searchLower) ||
      job.job_type?.type_name?.toLowerCase().includes(searchLower)
    );
  });

  // Handle view details
  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="job-listing-container">
      <h1 className="title">Featured Jobs</h1>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by position, industry, company or job type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Job Cards */}
      <div className="jobs-grid">
        {filteredJobs.map((job, index) => (
          <div
            ref={filteredJobs.length === index + 1 ? lastJobElementRef : null}
            key={`${job.id}-${index}`}
          >
            <JobCard job={job} onViewDetails={handleViewDetails} />
          </div>
        ))}
      </div>

      {loading && <div className="loading">Loading more jobs...</div>}
      {!loading && !hasMore && (
        <div className="no-more-jobs">No more jobs to load</div>
      )}

      {/* Job Details Modal */}
      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          show={showModal}
          handleClose={handleCloseModal}
        />
      )}
    </div>
  );
};

// Job Card Component (unchanged)
const JobCard = ({ job, onViewDetails }) => {
  return (
    <div className="job-card">
      <div className="job-header">
        {" "}
        {/* New container for logo and job type */}
        <img
          src={`https://api.ekazi.co.tz/${
            img || "https://via.placeholder.com/150"
          }`}
          alt="Company logo"
          className="company-logo"
        />
        <div className="job-type-with-icon">
          <i className="fas fa-briefcase"></i> {/* Font Awesome bag icon */}
          <p>{job.job_type?.type_name || "N/A"}</p>
        </div>
      </div>
      <div className="job-card-content">
        <h3 className="job-title">
          {job.job_position?.position_name || "No Position"} ({job.quantity})
        </h3>
        <p className="company-name">
          {job.client?.client_name || "No Company"}
        </p>
        <div className="job-details">
          <p>
            <span className="detail-label">Type:</span>{" "}
            {job.job_type?.type_name || "N/A"}
          </p>
          <p>
            <span className="detail-label">Location:</span>{" "}
            {job.country?.name || "N/A"} : {job.region?.region_name || "N/A"}
          </p>
          <p>
            <span className="detail-label-deadline text-orange-500">
              Deadline:
            </span>{" "}
            {new Date(job.dead_line).toLocaleDateString()}
          </p>
          <p>
            <span className="detail-label">Industry:</span>{" "}
            {job.industry?.industry_name || "N/A"}
          </p>
          {/* <p><span className="detail-label">Views:</span> {job.statistic?.job_views || 0}</p> */}
        </div>
      </div>

      <div class="card-footer bg-white">
        <div class="d-flex justify-content-between ">
          <div class="p-2">
            <a onClick={() => onViewDetails(job)}>Show</a>
          </div>

          <div className="detail-label-view">
            {" "}
            <i class="fa fa-eye" className="font-view  fa fa-eye">
              {" "}
              {job.statistic?.job_views || 0}
            </i>
          </div>
          <div class="p-2 detail-label-view ">
            <i class="fa fa-heart" title="Please Sign In">
              {" "}
              0
            </i>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobDetailsModal = ({ job, handleClose }) => {
  const navigate = useNavigate();
  const { uuid, template } = useParams();
  return (
    <div className="modal-overlay">
      <div
        className="modal-content"
        style={{ maxWidth: "900px", width: "90%" }}
      >
        <button onClick={handleClose} className="close-button">
          &times;
        </button>

        <div className="container-fluid p-3 bg-white">
          {/* CSS Styles */}
          <style jsx>{`
            .stats-container {
              width: 100%;
              margin-bottom: 1.5rem;
            }

            .stats-row {
              display: flex;
              flex-wrap: wrap;
              gap: 1rem;
              margin-bottom: 1rem;
            }

            .stat-item {
              flex: 1;
              min-width: 120px;

              padding: 0.75rem;
              border-radius: 8px;
              background: #f8f9fa;
            }

            .stat-icon {
              font-size: 1.5rem;
              margin-bottom: 0.5rem;
              text-align: center;
            }

            .stat-label {
              font-weight: bold;
              font-size: 0.9rem;
              color: #333;
              margin-bottom: 0.25rem;
            }

            .stat-value {
              font-size: 0.95rem;
              color: #555;
            }

            @media (max-width: 768px) {
              .stats-row {
                gap: 0.5rem;
              }

              .stat-item {
                min-width: calc(50% - 0.5rem);
              }
            }

            @media (max-width: 480px) {
              .stat-item {
                min-width: 100%;
              }
            }
          `}</style>
          <div className="stats-container">
            <div className="stats-row">
              {/* Views */}
              <div className="stat-item">
                <div className="stat-icon">
                  <FaEye style={{ color: "#D36314", fontSize: "1.5rem" }} />
                </div>
                <div className="stat-label">Views</div>
                <div className="stat-value">
                  {job.statistic?.job_views || 0}
                </div>
              </div>

              {/* Applicants */}
              <div className="stat-item">
                <div className="stat-icon">
                  <FaUsers style={{ color: "#D36314", fontSize: "1.5rem" }} />
                </div>
                <div className="stat-label">Applicants</div>
                <div className="stat-value">{job.applied_count || 0}</div>
              </div>

              {/* Job Type */}
              <div className="stat-item">
                <div className="stat-icon">
                  <FaBriefcase
                    style={{ color: "#D36314", fontSize: "1.5rem" }}
                  />
                </div>
                <div className="stat-label">Job Type</div>
                <div className="stat-value">
                  {job.job_type?.type_name || "N/A"}
                </div>
              </div>

              {/* Salary */}
              <div className="stat-item">
                <div className="stat-icon">
                  <FaMoneyBillAlt
                    style={{ color: "#D36314", fontSize: "1.5rem" }}
                  />
                </div>
                <div className="stat-label">Salary</div>
                <div className="stat-value">
                  {job.salaryRange
                    ? job.salaryRange
                    : job.entry_salary > 0 || job.exit_salary > 0
                    ? `${job.entry_salary || ""} ${
                        job.entry_salary && job.exit_salary ? "-" : ""
                      } 
       ${job.exit_salary || ""} ${job.currency_id === 3 ? "USD" : ""}`.trim()
                    : "Negotiable"}
                </div>
              </div>

              {/* Deadline */}
              <div className="stat-item">
                <div className="stat-icon">
                  <FaCalendar
                    style={{ color: "#D36314", fontSize: "1.5rem" }}
                  />
                </div>
                <div className="stat-label">Deadline</div>
                <div className="stat-value">
                  {new Date(job.dead_line) >= new Date() ? (
                    new Date(job.dead_line).toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  ) : (
                    <span style={{ color: "red" }}>
                      Expired: {new Date(job.dead_line).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <hr className="my-2" style={{ height: "1px", width: "100%" }} />

          {/* Company/Title Row */}
          <div
            className="job-header"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "15px",
            }}
          >
            {/* Company Logo */}
            <div style={{ flexShrink: 0, width: "120px", height: "75px" }}>
              <img
                src={`https://api.ekazi.co.tz/${
                  job.client?.logo || "img/default.png"
                }`}
                alt={job.client?.client_name}
                className="company-logo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* Job Title and Company Info */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  flexWrap: "wrap",
                }}
              >
                <h5 className="job-title" style={{ margin: 0 }}>
                  {job.job_position?.position_name || job.title}
                  {job.quantity > 0 && (
                    <span style={{ marginLeft: "5px" }}>({job.quantity})</span>
                  )}
                </h5>

                <button
                  className="btn btn-sm text-white"
                  style={{
                    backgroundColor: "#D36314",
                    borderRadius: "30px",
                    marginLeft: "auto",
                    whiteSpace: "nowrap",
                  }}
                >
                  {job.nature?.nature_name}
                </button>
              </div>

              <p className="company-name" style={{ margin: "5px 0 0" }}>
                <span style={{ fontWeight: "bold" }}>Company:</span>{" "}
                {job.show_client_name === 0
                  ? job.client?.client_name
                  : "Exact Manpower Consulting Ltd"}
              </p>
            </div>
          </div>

          <hr className="my-2" style={{ height: "1px", width: "100%" }} />

          {/* Reporting Structure */}
          {job.job_report_to && (
            <>
              <div
                className="reporting-structure"
                style={{ marginBottom: "1rem" }}
              >
                <h6
                  className="fw-bold main-colur"
                  style={{ marginBottom: "1rem" }}
                >
                  Reporting Structure
                </h6>

                <div
                  className="reporting-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "max-content 1fr",
                    gap: "0.5rem 1rem",
                    alignItems: "baseline",
                  }}
                >
                  {job.job_report_to.report_to && (
                    <>
                      <div className="fw-bold" style={{ whiteSpace: "nowrap" }}>
                        Report To:
                      </div>
                      <div>{job.job_report_to.report_to}</div>
                    </>
                  )}

                  {job.job_report_to.supervises && (
                    <>
                      <div className="fw-bold" style={{ whiteSpace: "nowrap" }}>
                        Supervision:
                      </div>
                      <div>{job.job_report_to.supervises}</div>
                    </>
                  )}

                  {job.job_report_to.interacts_with && (
                    <>
                      <div className="fw-bold" style={{ whiteSpace: "nowrap" }}>
                        Interact:
                      </div>
                      <div>{job.job_report_to.interacts_with}</div>
                    </>
                  )}
                </div>
              </div>

              <hr className="my-2" style={{ height: "1px", width: "100%" }} />
            </>
          )}
          <h6 className="fw-bold main-colur" style={{ marginBottom: "1rem" }}>
            Job Requirements
          </h6>
          {job.job_education?.length > 0 && (
            <>
              <div
                className="reporting-structure"
                style={{ marginBottom: "1rem" }}
              >
                <div
                  className="reporting-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "max-content 1fr",
                    gap: "0.5rem 1rem",
                    alignItems: "baseline",
                  }}
                >
                  <>
                    <div className="fw-bold" style={{ whiteSpace: "nowrap" }}>
                      Education:
                    </div>
                    <div>
                      {job.job_education.map((item, index) => (
                        <span key={index}>
                          {index > 0 ? ", " : ""}
                          {item.education_level?.education_level}{" "}
                          {item.course?.course_name}
                        </span>
                      ))}
                    </div>

                    <div>Specialized In:</div>
                    <div className="col-md-9">
                      {job.job_education.map((item, index) => (
                        <span key={index}>
                          {index > 0 ? ", " : ""}
                          {item.major?.name}
                        </span>
                      ))}
                    </div>
                    <div className="col-md-3 fw-bold">Job Level:</div>
                    <div className="col-md-9">
                      {job.position_level?.position_name}
                    </div>

                    <div className="col-md-3 fw-bold">Gender:</div>
                    <div className="col-md-9">
                      {job.job_gender?.gender_name}
                    </div>
                    {job.salaryRange && (
                      <>
                        <div className="col-md-3 fw-bold">Salary:</div>
                        <div className="col-md-9">{job.salaryRange}</div>
                      </>
                    )}

                    <div className="col-md-3 fw-bold">Experience:</div>
                    <div className="col-md-9">{job.years_experience} Years</div>

                    {job.job_culture?.length > 0 && (
                      <>
                        <div className="col-md-3 fw-bold">Culture:</div>
                        <div className="col-md-9">
                          {job.job_culture.map((item, index) => (
                            <span key={index}>
                              {index > 0 ? ", " : ""}
                              {item.culture?.culture_name}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                    {job.job_knowledge?.length > 0 && (
                      <>
                        <div className="requirement-label">Knowledge:</div>
                        <div className="requirement-value">
                          {job.job_knowledge.map((item, index) => (
                            <span key={index}>
                              {index > 0 ? ", " : ""}
                              {item.Knowledge?.knowledge_name}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                    {/* Personality */}
                    {job.job_personality?.length > 0 && (
                      <>
                        <div className="col-md-3 fw-bold">Personality:</div>
                        <div className="col-md-9">
                          {job.job_personality.map((item, index) => (
                            <span key={index}>
                              {index > 0 ? ", " : ""}
                              {item.personality?.personality_name}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                </div>
              </div>

              <hr className="my-2" style={{ height: "1px", width: "100%" }} />
            </>
          )}

          {/* Main Duties */}
          <div className="row mb-3">
            <div className="col-md-12">
              <h6 className="fw-bold main-colur">Main Duties</h6>
              <div
                dangerouslySetInnerHTML={{
                  __html: job.job_duties?.main_duties || "No duties provided",
                }}
              />
            </div>
          </div>

          <hr className="my-2" style={{ height: "1px", width: "100%" }} />

          {/* Other Requirements */}
          <div className="row mb-3">
            <div className="col-md-12">
              <h6 className="fw-bold">Other Requirements</h6>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    job.job_other_requirement?.other_requirement ||
                    "No requirements provided",
                }}
              />
            </div>
          </div>

          <hr className="my-2" style={{ height: "1px", width: "100%" }} />

          {/* Location/Industry */}
          <div className="row">
            <div className="col-md-12">
              <p>
                <span className="fw-bold">Location:</span>
                {job.job_addresses?.[0]?.region?.country?.name || "N/A"}:
                {job.job_addresses?.map((item, index) => (
                  <span key={index}>
                    {index > 0 ? ", " : ""}
                    {item.sub_location} {item.region?.region_name}
                  </span>
                ))}
                <br />
                <span className="fw-bold">Industry:</span>{" "}
                {job.industry?.industry_name}
                <br />
                <span className="fw-bold">Company:</span>{" "}
                {job.show_client_name === 0
                  ? job.client?.client_name
                  : "Exact Manpower Consulting Ltd"}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer mt-3">
          <button onClick={handleClose} className="btn btn-secondary me-2">
            Close
          </button>
          <button
            className="btn modal-button"
            style={{ backgroundColor: "#D36314", borderColor: "#D36314" }}
          >
            {/* <Link
              to={`/apply-job/${uuid}/${template}?jobId=${job.id}`} // ✅ Add jobId to URL
              onClick={() => localStorage.setItem('jobId', job.id)} // Backup in localStorage
              style={{ color: 'white', textDecoration: 'none' }}
            >
              Apply Now
            </Link> */}
            {job?.email ? (
              <Link
                to={
                  new Date(job.dead_line) >= new Date()
                    ? `/email/job/apply/${job.id}`
                    : "#"
                }
                onClick={() =>
                  new Date(job.dead_line) >= new Date() &&
                  localStorage.setItem("jobId", job.id)
                }
                style={{ color: "white", textDecoration: "none" }}
              >
                {new Date(job.dead_line) >= new Date()
                  ? "Apply Now"
                  : "Expired"}
              </Link>
            ) : job?.job_external_url ? (
              <a
                href={job.job_external_url.external_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  // Prevent the default link behavior
                  e.preventDefault();

                  // Store the job ID in localStorage
                  localStorage.setItem("jobId", job.id);

                  // Optionally: Add your logic to check if the URL is allowed
                  // For example, you might want to check if the domain is in your system
                  const url = new URL(job.job_external_url.external_url);
                  const allowedDomains = [
                    "yourdomain.com",
                    "yourotherdomain.com",
                  ];

                  if (allowedDomains.includes(url.hostname)) {
                    // If it's an allowed domain, proceed with navigation
                    window.open(
                      job.job_external_url.external_url,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  } else {
                    window.open(
                      job.job_external_url.external_url,
                      "_blank",
                      "noopener,noreferrer"
                    );
                    // If it's not allowed, you can:
                    // 1. Show a warning to the user
                    // alert('This link points to an external website outside our system');
                    // 2. Redirect to a safe page
                    // window.location.href = '/safe-page';
                    // 3. Or do nothing
                  }
                }}
                style={{ color: "white", textDecoration: "none" }}
              >
                Apply Now
              </a>
            ) : job ? (
              <Link
                to={
                  new Date(job.dead_line) >= new Date()
                    ? `/apply-job/${uuid}/${template}?jobId=${job.id}`
                    : "#"
                }
                onClick={() =>
                  new Date(job.dead_line) >= new Date() &&
                  localStorage.setItem("jobId", job.id)
                }
                style={{ color: "white", textDecoration: "none" }}
              >
                {new Date(job.dead_line) >= new Date()
                  ? "Apply Now"
                  : "Expired"}
              </Link>
            ) : null}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobListing;

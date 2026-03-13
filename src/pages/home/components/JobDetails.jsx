import { useState } from "react";
import Swal from "sweetalert2";
import { Card, Row, Col, Button } from "react-bootstrap";
import {
  FaEye,
  FaUsers,
  FaBriefcase,
  FaMoneyBill,
  FaCalendar,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Checkcompleteprofile from "../../../Component/Profile/Checkcomplete";
import { useSaveJob } from "../../../hooks/useCandidates";
import { DEFAULT_LOGO, IMG_BASE } from "../../../helpers/img";

const JobDetails = ({ job, appliedJobIds = [] }) => {
  const navigate = useNavigate();
  const { mutate: saveJobMutate } = useSaveJob();

  const [profileComplete, setProfileComplete] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const applicantId = localStorage.getItem("applicantId");
  const isLoggedIn = !!applicantId;

  // Use full job details if available
  const j = job;

  const hasApplied = appliedJobIds.includes(j.id);
  const isExpired = j?.dead_line ? new Date(j.dead_line) < new Date() : false;

  const shareTitle = `Job Opening: ${
    j?.job_position?.position_name ?? "Untitled Job"
  } at ${j?.client?.client_name ?? ""}`;

  const currentUrl = window.location.href;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(shareTitle);

  const handleApply = () => {
    localStorage.setItem("jobId", j.id);

    if (j.job_email) {
      navigate(isLoggedIn ? "/jobseeker/apply-job-email" : "/apply-job-email", {
        state: { jobId: j.id },
      });
      return;
    }

    if (j.job_external_url) {
      window.open(j.job_external_url?.external_url, "_blank");
      return;
    }

    if (!isLoggedIn) {
      Swal.fire({
        title: "Login Required",
        text: "Please login to apply this job.",
        icon: "warning",
        confirmButtonText: "Ok",
      });

      return;
    }

    if (!profileComplete) {
      setShowProfileModal(true);
      return;
    }

    navigate("/jobseeker/apply-job", {
      state: { jobId: j.id },
    });
  };

  const handleSaveJob = () => {
    if (!isLoggedIn) {
      Swal.fire({
        title: "Login Required",
        text: "Please login to save jobs.",
        icon: "warning",
        confirmButtonText: "Ok",
      });

      return;
    }

    saveJobMutate(
      {
        applicant_id: applicantId,
        job_id: j.id,
      },
      {
        onSuccess: () => {
          Swal.fire({
            title: "Saved!",
            text: "Job has been successfully added to your saved list.",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#3085d6",
          });
        },
      },
    );
  };

  return (
    <div>
      <Card>
        <Card.Body>
          {/* Top Info Section */}
          <div className="grid grid-cols-5 text-center mb-3 gap-2 md:gap-4">
            {/* Views */}
            <div className="flex flex-col items-center">
              <FaEye className="text-Orange" />
              <div className="text-sm mt-1">Views</div>
              <div className="text-sm">{j.statistic?.job_views ?? 0}</div>
            </div>

            {/* Applicants */}
            <div className="flex flex-col items-center">
              <FaUsers className="text-Orange" />
              <div className="text-sm mt-1">Applicants</div>
              <div className="text-sm">
                {j.applied_count > 0
                  ? j.applied_count
                  : j.indirect_applicant_count ||
                    j.indirect_applicant?.length ||
                    0}
              </div>
            </div>

            {/* Job Type */}
            <div className="flex flex-col items-center">
              <FaBriefcase className="text-Orange" />
              <div className="text-sm mt-1">Job Type</div>
              <div className="text-sm">{j.job_type?.type_name ?? "N/A"}</div>
            </div>

            {/* Salary */}
            <div className="flex flex-col items-center">
              <FaMoneyBill className="text-Orange" />
              <div className="text-sm mt-1">Salary</div>
              <div className="text-sm">
                {j.entry_salary || j.exit_salary
                  ? `${j.entry_salary ?? 0} - ${j.exit_salary}`
                  : "Negotiable"}
              </div>
            </div>

            {/* Deadline */}
            <div className="flex flex-col items-center">
              <FaCalendar className="text-Orange" />
              <div className="text-sm mt-1">Deadline</div>
              <div className="text-sm">
                {j.dead_line ? (
                  isExpired ? (
                    <span className="text-red-500">Expired</span>
                  ) : (
                    new Date(j.dead_line).toDateString()
                  )
                ) : (
                  "Not specified"
                )}
              </div>
            </div>
          </div>

          <hr />

          {/* Header */}
          <Row className="my-3">
            <Col md={3}>
              <img
                src={`${IMG_BASE}${job.client?.logo || ""}`}
                alt={job.client?.client_name || "Company Logo"}
                className="img-fluid object-fit-cover"
                style={{ maxWidth: 120, maxHeight: 75 }}
                onError={(e) => (e.target.src = DEFAULT_LOGO)}
              />
            </Col>

            <Col md={7}>
              <h6>
                <b>{j.job_position?.position_name || "Untitled"}</b>
              </h6>
              <p>{j.client?.client_name}</p>
            </Col>
          </Row>

          <hr />

          {/* Reporting Structure */}
          <h6>
            <b>Reporting Structure</b>
          </h6>

          <Row>
            {j.job_report_to?.report_to && (
              <>
                <Col md={3}>
                  <b>Report To:</b>
                </Col>
                <Col md={9}>{j.job_report_to?.report_to}</Col>
              </>
            )}
          </Row>

          <Row>
            {j.job_report_to?.supervises && (
              <>
                <Col md={3}>
                  <b>Supervision:</b>
                </Col>
                <Col md={9}>{j.job_report_to?.supervises}</Col>
              </>
            )}
          </Row>

          <Row>
            {j.job_report_to?.interacts_with && (
              <>
                <Col md={3}>
                  <b>Interacts With:</b>
                </Col>
                <Col md={9}>{j.job_report_to?.interacts_with}</Col>
              </>
            )}
          </Row>

          <hr />

          {/* Job Requirements */}
          <h6>
            <b>Job Requirements</b>
          </h6>

          <Row>
            {j.job_education && (
              <>
                <Col md={3}>
                  <b>Education:</b>
                </Col>
                <Col md={9}>
                  {(j.job_education || []).map((edu, i) => (
                    <span key={i}>
                      {i > 0 ? ", " : ""}
                      {edu.education_level?.education_level} - {edu.major?.name}
                    </span>
                  ))}
                </Col>
              </>
            )}
          </Row>

          <Row>
            {j.position_level?.position_name && (
              <>
                <Col md={3}>
                  <b>Job Level:</b>
                </Col>
                <Col md={9}>{j.position_level?.position_name}</Col>
              </>
            )}
          </Row>

          <Row>
            {j.job_gender?.gender_name && (
              <>
                <Col md={3}>
                  <b>Gender:</b>
                </Col>
                <Col md={9}>{j.job_gender?.gender_name}</Col>
              </>
            )}
          </Row>

          <Row>
            {j.applicant_min_age > 0 && j.applicant_max_age > 0 && (
              <>
                <Col md={3}>
                  <b>Age:</b>
                </Col>
                <Col md={9}>
                  {`${j.applicant_min_age} - ${j.applicant_max_age} Years`}
                </Col>
              </>
            )}
          </Row>

          <Row>
            {j.years_experience && (
              <>
                <Col md={3}>
                  <b>Experience:</b>
                </Col>
                <Col md={9}>{j.years_experience} Years</Col>
              </>
            )}
          </Row>

          <Row>
            {j.job_culture && (
              <>
                <Col md={3}>
                  <b>Culture:</b>
                </Col>
                <Col md={9}>
                  {(j.job_culture || [])
                    .map((c) => c.culture?.culture_name)
                    .join(", ")}
                </Col>
              </>
            )}
          </Row>

          <Row>
            {j.job_knowledge && (
              <>
                <Col md={3}>
                  <b>Knowledge:</b>
                </Col>
                <Col md={9}>
                  {(j.job_knowledge || [])
                    .map((k) => k.knowledge?.knowledge_name)
                    .join(", ")}
                </Col>
              </>
            )}
          </Row>

          <Row>
            {j.job_personality && (
              <>
                <Col md={3}>
                  <b>Personality:</b>
                </Col>
                <Col md={9}>
                  {(j.job_personality || [])
                    .map((p) => p.personality?.personality_name)
                    .join(", ")}
                </Col>
              </>
            )}
          </Row>

          <Row>
            {j.job_language && (
              <>
                <Col md={3}>
                  <b>Languages:</b>
                </Col>
                <Col md={9}>
                  {(j.job_language || [])
                    .map((l) => l.language?.language_name)
                    .join(", ")}
                </Col>
              </>
            )}
          </Row>

          <hr />

          {/* Duties */}
          <h6>
            <b>Main Duties</b>
          </h6>
          <div
            dangerouslySetInnerHTML={{
              __html: j.job_duties?.main_duties || "N/A",
            }}
          />

          <hr />

          <h6>
            <b>Other Requirements</b>
          </h6>
          <div
            dangerouslySetInnerHTML={{
              __html: j.job_other_requirement?.other_requirement || "N/A",
            }}
          />

          <hr />

          {/* Location */}
          {j.job_addresses?.[0]?.sub_location && (
            <p className="p-0 m-0">
              <strong>Location:</strong> {j.job_addresses?.[0]?.sub_location}
            </p>
          )}

          {j.job_addresses?.[0]?.region?.region_name && (
            <p className="p-0 m-0">
              <strong>Region:</strong>{" "}
              {j.job_addresses?.[0]?.region?.region_name}
            </p>
          )}

          {j.job_addresses?.[0]?.region?.country?.name && (
            <p className="p-0 m-0">
              <strong>Country:</strong>{" "}
              {j.job_addresses?.[0]?.region?.country?.name}
            </p>
          )}

          {j.industry?.industry_name && (
            <p className="p-0 m-0">
              <strong>Industry:</strong> {j.industry?.industry_name}{" "}
            </p>
          )}

          {j.client?.client_name && (
            <p className="p-0 m-0">
              <strong>Company:</strong>
              {j.client?.client_name}
            </p>
          )}

          {/* Social Share */}
          <Row className="mt-4 justify-content-between align-items-center">
            <Col md="auto" className="d-flex gap-3">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on Facebook"
              >
                <FaFacebook size={30} color="#3b5998" />
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on Twitter"
              >
                <FaTwitter size={30} color="#1DA1F2" />
              </a>

              <a
                href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on WhatsApp"
              >
                <FaWhatsapp size={30} color="#25D366" />
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on LinkedIn"
              >
                <FaLinkedin size={30} color="#0077b5" />
              </a>
            </Col>

            <Col md="auto">
              {isExpired ? null : hasApplied ? null : (
                <>
                  <Button
                    className="mr-2"
                    variant="primary"
                    size="md"
                    onClick={handleSaveJob}
                  >
                    Save Job
                  </Button>
                  <Button variant="primary" size="md" onClick={handleApply}>
                    Apply Now
                  </Button>
                </>
              )}

              {isLoggedIn && (
                <Checkcompleteprofile
                  showProfileCompleteModal={showProfileModal}
                  setShowProfileCompleteModal={setShowProfileModal}
                  setProfileComplete={setProfileComplete}
                />
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default JobDetails;

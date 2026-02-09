import { Card, Row, Col, Image, Button } from "react-bootstrap";
import { FaStar, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toTitleCase from "../../../utils/toTitleCase.js";
import { useCreateCandidateView } from "../../../hooks/candidates/useCandidateViews.js";
import { useRatings } from "../../../hooks/useRatings.js";

const FeatureCandidate = ({ candidate }) => {
  const navigate = useNavigate();
  const candidateId = candidate?.applicant?.id;
  const { mutate: addViewCount } = useCreateCandidateView(candidateId);

  const { data } = useRatings(candidateId);
  const ratings = data?.average;

  // -------------------------------
  // Format Applicant Name
  // -------------------------------
  const nameParts = [
    candidate?.applicant?.first_name,
    candidate?.applicant?.middle_name,
    candidate?.applicant?.last_name,
  ]
    .map((n) => n?.trim())
    .filter((n) => n && n !== "0");

  const name = nameParts.length ? nameParts.join(" ") : "No Name";

  // -------------------------------
  // Position
  // -------------------------------
  const position =
    candidate?.applicant?.positions?.[0]?.position?.position_name ??
    "No Position Records";

  // -------------------------------
  // Location
  // -------------------------------
  const location =
    [
      candidate?.applicant?.address?.sub_location,
      candidate?.applicant?.address?.region?.region_name,
      candidate?.applicant?.address?.region?.country?.name,
    ]
      .filter(Boolean)
      .join(", ") || "Location not specified";

  // -------------------------------
  // Availability
  // -------------------------------
  const availability =
    candidate?.applicant?.available === "0"
      ? "Available for Job Vacancies"
      : "Not Currently Available";

  // -------------------------------
  // Profile Image
  // -------------------------------
  const image = candidate?.applicant?.picture
    ? `https://api.ekazi.co.tz/${candidate.applicant.picture.trim()}`
    : "/default_user.jpeg";

  // -------------------------------
  // Engagement Metrics
  // -------------------------------
  const views = candidate?.applicant?.featured_views?.[0]?.view_number || 0;

  // -------------------------------
  // Handle View Profile
  // -------------------------------
  const handleViewProfile = () => {
    addViewCount();

    // Build slug
    const slug = name.toLowerCase().replace(/\s+/g, "-");

    navigate(`/job-seeker-profile/${slug}`, {
      state: { candidate },
    });
  };

  return (
    <Col md={4} className="mb-4">
      <Card className="h-100 shadow-sm border-0 rounded-lg hover-shadow">
        <Card.Body>
          <Row className="align-items-center">
            <Col xs={4} className="text-center">
              <Image
                src={image}
                alt={name}
                roundedCircle
                fluid
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                }}
              />
            </Col>

            <Col xs={8}>
              <h6 className="text-primary fw-bold text-capitalize mb-1 text-truncate">
                {toTitleCase(name)}
              </h6>

              <div className="text-muted text-truncate">
                {toTitleCase(position)}
              </div>
              <div className="text-secondary text-truncate">
                {toTitleCase(location)}
              </div>
              <div className="text-success text-truncate">{availability}</div>
            </Col>
          </Row>

          <hr className="my-3" />

          <Row className="text-center">
            <Col xs={6}>
              <Button
                onClick={handleViewProfile}
                variant="outline-primary"
                className="btn-sm w-100"
              >
                View Profile
              </Button>
            </Col>

            <Col xs={6}>
              <a
                href={`/get_featured_candidate/${candidate.id}`}
                className="btn btn-primary btn-sm w-100"
              >
                Hire Me
              </a>
            </Col>
          </Row>
          <Row className="mt-3">
            {/* Score */}
            <Col
              xs={6}
              className="d-flex justify-content-center align-items-center"
            >
              <FaStar className="me-1 text-warning" />
              <small className="text-muted">{ratings}</small>
            </Col>

            {/* Views */}
            <Col
              xs={6}
              className=" d-flex justify-content-center align-items-center"
            >
              <FaEye className="me-1 text-secondary" />
              <small className="text-muted">{views}</small>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default FeatureCandidate;

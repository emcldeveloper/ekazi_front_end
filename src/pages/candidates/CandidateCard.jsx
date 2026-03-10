import { Card, Row, Col, Image } from "react-bootstrap";
import { FaStar, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import toTitleCase from "../../utils/toTitleCase";
import { useRatings } from "../../hooks/useRatings";
import { useCreateCandidateView } from "../../hooks/candidates/useCandidateViews";

const CandidateCard = ({ candidate }) => {
  const navigate = useNavigate();
  const candidateId = candidate?.applicant?.id;

  const { mutate: addViewCount } = useCreateCandidateView(candidateId);

  const { data } = useRatings(candidateId);
  const ratings = data?.average;

  const rawNameParts = [
    candidate.applicant.first_name,
    candidate.applicant.middle_name,
    candidate.applicant.last_name,
  ];

  const name =
    rawNameParts
      .map((part) => part?.trim())
      .filter((part) => part && part !== "0")
      .join(" ") || "No Name";

  const position =
    candidate.applicant.positions?.[0]?.position?.position_name?.trim() ||
    "No Position Records";

  const locationParts = [
    candidate.applicant.address?.sub_location,
    candidate.applicant.address?.region?.region_name,
    candidate.applicant.address?.region?.country?.name,
  ];

  const location =
    locationParts
      .filter(Boolean)
      .map((part) => part.trim())
      .join(", ") || "Location not specified";

  const availability =
    candidate.applicant.available === "0"
      ? "Available for Job Vacancies"
      : "Not Currently Available";
  const image = candidate.applicant.picture
    ? `https://api.ekazi.co.tz/${candidate.applicant.picture.trim()}`
    : "/default_user.jpeg";

  const views = candidate?.applicant?.featured_views?.[0]?.view_number || 0;

  const handleViewProfile = () => {
    addViewCount();

    const slug = `${name.toLowerCase().replace(/\s+/g, "-")}`;
    navigate(`/candidates/${slug}`, {
      state: { candidate },
    });
  };

  return (
    <Card className="h-100 shadow-md rounded-lg hover-shadow">
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
                transition: "transform 0.3s ease-in-out",
              }}
              className="hover-scale"
            />
          </Col>
          <Col xs={8}>
            <h6
              className="text-primary fw-bold text-capitalize mb-1 text-truncate"
              style={{ fontSize: "16px", maxWidth: "100%" }}
            >
              {toTitleCase(name)}
            </h6>
            <div
              className="text-muted text-truncate"
              style={{ fontSize: "14px" }}
            >
              {toTitleCase(position)}
            </div>
            <div
              className="text-secondary text-truncate"
              style={{ fontSize: "13px" }}
            >
              {toTitleCase(location)}
            </div>
            <div
              className="text-success text-truncate"
              style={{ fontSize: "13px" }}
            >
              {availability}
            </div>
          </Col>
        </Row>

        <hr className="my-3" />

        <Row className="text-center">
          <Col xs={6} className="mb-2">
            <button
              onClick={handleViewProfile}
              className="btn btn-outline-primary btn-sm w-100"
            >
              View Profile
            </button>
          </Col>
          <Col xs={6} className="mb-2">
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
  );
};

export default CandidateCard;

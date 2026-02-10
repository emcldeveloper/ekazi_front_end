import { useNavigate } from "react-router-dom";

import PageLoader from "../../widgets/pageLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEyeSlash,
  faDownload,
  faMedal,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { Button, Row, Col, Card } from "react-bootstrap";
import StepProgress from "./Stepprogress";
import { useCvProfile } from "../../hooks/useCv";

const Proficiencycvcomponent = () => {
  const navigate = useNavigate();
  const applicantId = localStorage.getItem("applicantId");

  const { data: candidateDetails, isPending: isLoading } =
    useCvProfile(applicantId);

  const proficiency = candidateDetails?.data?.proficiency ?? [];

  const formatYear = (dateString) => {
    if (!dateString) return "Present";
    return moment(dateString).format("MMM YYYY");
  };

  const getFileNameFromUrl = (url) => {
    if (!url) return "";
    const parts = url.split("/");
    const fullName = parts[parts.length - 1];
    const lastDotIndex = fullName.lastIndexOf(".");
    if (lastDotIndex === -1) return fullName;

    const name = fullName.substring(0, lastDotIndex);
    const extension = fullName.substring(lastDotIndex);

    const shortenedName =
      name.length > 10 ? `${name.substring(0, 7)}...` : name;

    return `${shortenedName}${extension}`;
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div>
      {/* Header Section */}
      {/* Add the StepProgress component at the top */}
      <StepProgress
        currentStep={7}
        onStepClick={(step) => {
          // Handle navigation to different steps
          switch (step) {
            case 1:
              navigate("/jobseeker/introduction");
              break;
            case 2:
              navigate("/jobseeker/objective");
              break;
            case 3:
              navigate("/jobseeker/EducationCv");
              break;
            case 4:
              navigate("/jobseeker/ExperienceCv");
              break;
            case 5:
              navigate("/jobseeker/SkillsCv");
              break;
            case 6:
              navigate("/jobseeker/LanguageCv");
              break;
            case 7:
              navigate("/jobseeker/proficiencyCv");
              break;
            case 8:
              navigate("/jobseeker/TrainingCv");
              break;
            case 9:
              navigate("/jobseeker/RefereeCv");
              break;
            case 10:
              navigate("/jobseeker/CompleteCv");
              break;
            // ... add other cases for each step
            default:
              break;
          }
        }}
      />

      <Row>
        <Col>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-4 bg-white shadow-sm rounded mb-4">
            <div>
              <h2 className="mb-1">Proficiency</h2>
              <p className="text-muted mb-0">A List of proficiency </p>
            </div>
          </div>
        </Col>
      </Row>

      {/* Proficiency Cards */}
      <Row>
        <Col md={12} className="mb-3">
          <Card>
            {proficiency.map((item) => (
              <Card.Body>
                <div className="d-flex " key={item?.id}>
                  <div className="me-3">
                    <FontAwesomeIcon
                      icon={faMedal}
                      className="text-primary"
                      size="2x"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <Card.Title className="mb-1">
                        {item?.proficiency?.proficiency_name ||
                          "Proficiency name not available"}{" "}
                        -{" "}
                        <span className="text-muted">
                          {formatYear(item.started)} - {formatYear(item.ended)}
                        </span>
                      </Card.Title>
                      <div>
                        <Button
                          variant="link"
                          size="sm"
                          //   onClick={() => handleHide(item?.id)}
                        >
                          <FontAwesomeIcon
                            icon={faEyeSlash}
                            className="text-muted"
                          />
                        </Button>
                      </div>
                    </div>
                    <Card.Text className="text-uppercase">
                      {item.award || "Award not available"} (
                      {item?.organization?.organization_name ||
                        "Organization name not available"}
                      )
                    </Card.Text>
                    {item.attachment && (
                      <a
                        href={item.attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="small"
                      >
                        <FontAwesomeIcon icon={faDownload} className="me-1" />
                        {getFileNameFromUrl(item.attachment)}
                      </a>
                    )}
                  </div>
                </div>
              </Card.Body>
            ))}
          </Card>
        </Col>
      </Row>

      <style jsx>{`
        .divider {
          height: 1px;
          background-color: #eaeaea;
        }
      `}</style>
    </div>
  );
};

export default Proficiencycvcomponent;

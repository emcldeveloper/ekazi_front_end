import { useNavigate } from "react-router-dom";
import PageLoader from "../../widgets/pageLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEyeSlash,
  faDownload,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

import StepProgress from "./Stepprogress";
import { useCvProfile } from "../../hooks/useCv";

const Training = () => {
  const navigate = useNavigate();
  const applicantId = localStorage.getItem("applicantId");

  const { data: candidateDetails, isPending: isLoading } =
    useCvProfile(applicantId);

  console.log("Candidate Details:", candidateDetails);

  const trainings = candidateDetails?.data?.training ?? [];

  const formatDate = (dateString) => {
    if (!dateString) return "Present";
    const options = { year: "numeric", month: "short" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
    <div className="training-section mt-3">
      <StepProgress
        currentStep={8}
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
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-4 bg-white shadow-sm rounded mb-4">
        {/* Left Section: Title & Description */}
        <div className="text-center text-md-start mb-3 mb-md-0">
          <h1 className="fw-bold h2 text-dark mb-1">Training</h1>
        </div>
      </div>

      <div className="mb-3 divider" />

      {/* Training List */}
      <div className="training-list">
        {trainings.length > 0 ? (
          trainings.map((training, index) => (
            <div
              key={index}
              className="d-flex mb-3 training-item p-3 bg-white rounded-lg shadow-sm"
            >
              <div className="me-3 mt-1">
                <FontAwesomeIcon
                  icon={faChalkboardTeacher}
                  className="text-primary"
                  style={{ fontSize: "1.5rem" }}
                />
              </div>
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between">
                  <h6 className="mb-0 fw-bold">
                    {training.name} -{" "}
                    <span className="fw-light text-muted">
                      {formatDate(training.started)} -{" "}
                      {formatDate(training.ended)}
                    </span>
                  </h6>
                  {trainings?.some((e) => e.id === training?.id) && (
                    <div className="flex space-x-2">
                      <Button
                        variant="link"
                        className="p-0 text-gray-500"
                        // onClick={() => handleHide(training?.id)}
                      >
                        <FontAwesomeIcon icon={faEyeSlash} />
                      </Button>
                    </div>
                  )}
                </div>
                <p className="mb-0">{training.institution}</p>

                {training.attachment && (
                  <div className="mt-1">
                    <a
                      href={training.attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none small"
                    >
                      <FontAwesomeIcon icon={faDownload} className="me-1" />
                      {getFileNameFromUrl(training.attachment)}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-2 text-muted">
            No trainings or workshops added
          </div>
        )}
      </div>

      <style>{`
                .divider {
                    height: 1px;
                    width: 100%;
                    background-color: rgb(235, 235, 235);
                }
                .training-item {
                    transition: background-color 0.2s;
                    padding: 8px;
                    border-radius: 4px;
                }
                .training-item:hover {
                    background-color: rgba(0, 0, 0, 0.03);
                }
            `}</style>
    </div>
  );
};

export default Training;

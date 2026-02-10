import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PageLoader from "../../widgets/pageLoader";

import {
  faBuilding,
  faEyeSlash,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import StepProgress from "./Stepprogress";
import { useCvProfile } from "../../hooks/useCv";

const WorksExperiencesCv = () => {
  const navigate = useNavigate();
  const applicantId = localStorage.getItem("applicantId");

  const { data: candidateDetails, isPending: isLoading } =
    useCvProfile(applicantId);

  const experience = candidateDetails?.data?.experience ?? [];

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div>
      <StepProgress
        currentStep={4}
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
          <h1 className="fw-bold h2 text-dark mb-1">Work Experience</h1>
          <p className="text-muted mb-0">experiences here</p>
        </div>
      </div>

      <div className="row g-3">
        {experience.map((item) => {
          const employerName =
            item?.employer?.employer_name || "Employer name not available";
          const regionName =
            item?.employer?.region?.region_name || "Region not specified";
          const subLocation =
            item?.employer?.sub_location || "Sub-location not specified";

          return (
            <div key={item?.id} className="col-12">
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <FontAwesomeIcon
                    icon={faBuilding}
                    className="text-gray-500"
                    style={{ fontSize: "2rem" }}
                  />
                </div>

                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5 className="mb-1">{employerName}</h5>
                      <p className="text-muted mb-2">
                        {subLocation}, {regionName}
                      </p>
                    </div>
                  </div>

                  <ul className="list-group list-group-flush mt-1">
                    <li className="list-group-item border-0 px-0 py-1">
                      <div className="d-flex justify-content-between">
                        <div>
                          <div className="d-flex position-relative mb-2">
                            <div
                              className="position-relative me-3"
                              style={{ width: "20px" }}
                            >
                              <FontAwesomeIcon
                                icon={faCircle}
                                style={{ color: "#6c757d", fontSize: "0.7rem" }}
                              />
                            </div>

                            <div>
                              <p className="mb-1">
                                <strong>
                                  {item?.position?.position_name ??
                                    "Position not available"}
                                </strong>
                              </p>

                              <p className="text-muted small">
                                {item?.start_date
                                  ? new Date(
                                      item.start_date,
                                    ).toLocaleDateString("en-US", {
                                      month: "short",
                                      year: "numeric",
                                    })
                                  : "Not specified"}{" "}
                                -{" "}
                                {item?.end_date
                                  ? new Date(item.end_date).toLocaleDateString(
                                      "en-US",
                                      {
                                        month: "short",
                                        year: "numeric",
                                      },
                                    )
                                  : "Present"}
                              </p>

                              {item?.responsibility && (
                                <p className="mb-1 text-wrap">
                                  <strong>Responsibility:</strong>{" "}
                                  {item.responsibility}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorksExperiencesCv;

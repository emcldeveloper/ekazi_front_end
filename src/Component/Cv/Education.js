import { useNavigate } from "react-router-dom";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import StepProgress from "./Stepprogress";
import PageLoader from "../../widgets/pageLoader";
import { useCvProfile } from "../../hooks/useCv";

const EducationsCv = () => {
  const navigate = useNavigate();
  const applicantId = localStorage.getItem("applicantId");

  const { data: candidateDetails, isPending: isLoading } =
    useCvProfile(applicantId);

  const education = candidateDetails?.data?.education;

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div>
      {/* Add the StepProgress component at the top */}
      <StepProgress
        currentStep={3}
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
          <h1 className="fw-bold h2 text-dark mb-1">Education</h1>
          <p className="text-muted mb-0">Add or remove experiences here</p>
        </div>
      </div>

      <div className="education-section bg-white rounded-lg p-4 mb-4 mt-6">
        {/* Education Details Header */}
        <div className="flex justify-between items-center mb-3">
          <h6 className="text-base font-bold text-gray-800 mb-0">
            EDUCATION DETAILS
          </h6>
        </div>

        <div className="border-b border-gray-200 mb-3" />

        {/* Education Items */}
        <div className="education-list space-y-2">
          {education?.length > 0 ? (
            education.map((item) => {
              const courseName =
                item?.course?.course_name || "Course name not available";
              const educationLevel =
                item?.level?.education_level || "Level not specified";
              const collegeName =
                item?.college?.college_name || "College name not specified";
              const majorName = item?.major?.name;

              return (
                <div
                  key={item?.id}
                  className="education-item p-2 hover:bg-gray-50 rounded"
                >
                  <div className="flex">
                    {/* Education Icon */}
                    <div className="mr-3 mt-1">
                      <FontAwesomeIcon
                        icon={faGraduationCap}
                        className="text-primary"
                        style={{ fontSize: "1.75rem" }}
                      />
                    </div>

                    {/* Education Details */}
                    <div className="flex-grow-1">
                      <div className="flex justify-between items-start">
                        <h6 className="font-bold mb-1 text-gray-800">
                          {educationLevel} in {courseName}
                        </h6>
                      </div>

                      {majorName && (
                        <p className="mb-1">
                          <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                            Major: {majorName}
                          </span>
                        </p>
                      )}

                      <p className="mb-1 text-gray-700">{collegeName}</p>

                      <p className="text-gray-500 text-sm mb-1">
                        <FontAwesomeIcon
                          icon={faCalendarAlt}
                          className="mr-1"
                        />
                        {item?.started
                          ? new Date(item.started).getFullYear()
                          : "Not specified"}{" "}
                        -{" "}
                        {item?.ended
                          ? new Date(item.ended).getFullYear()
                          : "Not specified"}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-start gap-2 ml-2">
                      <button
                        // onClick={() => handleHide(item.id)}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Hide"
                      >
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          className="text-lg"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-4 text-gray-500">
              No education records found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationsCv;

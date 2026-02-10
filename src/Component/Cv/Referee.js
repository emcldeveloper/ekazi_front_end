import { useNavigate } from "react-router-dom";
import PageLoader from "../../widgets/pageLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEyeSlash,
  faPencilAlt,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import StepProgress from "./Stepprogress";
import { Button, Table } from "react-bootstrap";
import { useCvProfile } from "../../hooks/useCv";

const RefreesCvComponent = () => {
  const navigate = useNavigate();
  const applicantId = localStorage.getItem("applicantId");

  const { data: candidateDetails, isPending: isLoading } =
    useCvProfile(applicantId);

  const referees = candidateDetails?.data?.referees ?? [];

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="referees-section mt-4">
      <StepProgress
        currentStep={9}
        onStepClick={(step) => {
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
            default:
              break;
          }
        }}
      />
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-4 bg-white shadow-sm rounded mb-4">
        {/* Left Section: Title & Description */}
        <div className="text-center text-md-start mb-3 mb-md-0">
          <h1 className="fw-bold h2 text-dark mb-1"> Referee</h1>
          <p className="text-muted mb-0">Add or remove referee here</p>
        </div>
      </div>

      <div className="mb-3 divider" />

      {/* Referees List */}
      <div className="table-responsive">
        <Table hover className="info-table">
          <tbody id="refereediv-details">
            {referees.length > 0 ? (
              referees.map((referee, index) => (
                <tr key={index}>
                  <td style={{ verticalAlign: "top", width: "70px" }}>
                    <div className="referee-avatar mt-1">
                      <FontAwesomeIcon
                        icon={faUserTie}
                        className="text-primary"
                        style={{
                          fontSize: "1.25rem",
                          border: "3px solid #28a8e4",
                          borderRadius: "50%",
                          padding: "3px",
                          backgroundColor: "white",
                          width: "32px",
                          height: "32px",
                        }}
                      />
                    </div>
                  </td>
                  <td style={{ paddingLeft: "1%" }}>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="mb-1">
                          {[
                            referee.first_name,
                            referee.middle_name,
                            referee.last_name,
                          ]
                            .filter(Boolean)
                            .map(
                              (name) =>
                                name.charAt(0).toUpperCase() +
                                name.slice(1).toLowerCase(),
                            )
                            .join(" ")}
                        </h6>
                        <p className="mb-1">
                          {referee.referee_position &&
                            referee.referee_position.charAt(0).toUpperCase() +
                              referee.referee_position.slice(1).toLowerCase()}
                        </p>
                        <p className="mb-1">
                          {referee.employer &&
                            referee.employer.charAt(0).toUpperCase() +
                              referee.employer.slice(1).toLowerCase()}
                        </p>
                        <p className="mb-1 text-muted">{referee.email}</p>
                        <p className="mb-1">{referee.phone}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="link"
                          className="p-0 text-secondary"
                          //   onClick={() => openEditModal(referee)}
                        >
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </Button>
                        <Button
                          variant="link"
                          className="p-0 text-red-500"
                          //   onClick={() => handleRemove(referee?.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                        <Button
                          variant="link"
                          className="p-0 text-gray-500"
                          //   onClick={() => handleHide(referee?.id)}
                        >
                          <FontAwesomeIcon icon={faEyeSlash} />
                        </Button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-3 text-muted">
                  No referees added
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <style jsx>{`
        .divider {
          height: 1px;
          width: 100%;
          background-color: rgb(235, 235, 235);
        }
        .referee-avatar {
          margin-top: -10px;
        }
        .info-table tr:hover {
          background-color: rgba(0, 0, 0, 0.02);
        }
      `}</style>
    </div>
  );
};

export default RefreesCvComponent;

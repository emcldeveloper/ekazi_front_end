import React from "react";
import { useNavigate } from "react-router-dom";

import PageLoader from "../../widgets/pageLoader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { Table } from "react-bootstrap";
import StepProgress from "./Stepprogress";
import { useCvProfile } from "../../hooks/useCv";

const LanguagesCvComponent = () => {
  const navigate = useNavigate();
  const applicantId = localStorage.getItem("applicantId");

  const { data: candidateDetails, isPending: isLoading } =
    useCvProfile(applicantId);

  const language = candidateDetails?.data?.language ?? [];

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div>
      <StepProgress
        currentStep={6}
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
          <h1 className="fw-bold h2 text-dark mb-1">Language</h1>
          <p className="text-muted mb-0">Add or remove language here</p>
        </div>
      </div>
      {language.length > 0 ? (
        <div className="table-responsive mt-4">
          <Table borderless className="mb-0">
            <thead>
              <tr>
                <th className="text-black fw-bold">Language</th>
                <th className="text-black fw-bold">Read</th>
                <th className="text-black fw-bold">Write</th>
                <th className="text-black fw-bold">Speak</th>
                <th className="text-black fw-bold">Understand</th>
                <th className="text-black fw-bold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {language.map((item, index) => {
                const languageName =
                  item?.language?.language_name || "Not specified";
                const readAbility = item?.read?.read_ability || "Not specified";
                const writeAbility =
                  item?.write?.write_ability || "Not specified";
                const speakAbility =
                  item?.speak?.speak_ability || "Not specified";
                const understandAbility =
                  item?.understand?.understand_ability || "Not specified";

                return (
                  <React.Fragment key={item?.id || index}>
                    <tr className="language-row">
                      <td className="p-2 align-middle">{languageName}</td>
                      <td className="p-2 align-middle">{readAbility}</td>
                      <td className="p-2 align-middle">{writeAbility}</td>
                      <td className="p-2 align-middle">{speakAbility}</td>
                      <td className="p-2 align-middle">{understandAbility}</td>
                      <td className="p-2 align-middle">
                        <div className="d-flex gap-2 justify-content-end">
                          <button
                            className="btn btn-sm btn-link text-secondary p-1"
                            // onClick={() => handleHide(item?.id)}
                            title="Hide"
                          >
                            <FontAwesomeIcon icon={faEyeSlash} />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {index < language.length - 1 && (
                      <tr>
                        <td colSpan={6} className="border-top p-0">
                          {/* <div className="divider"></div> */}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </Table>

          {/* Style for the divider */}
          <style jsx>{`
            .divider {
              height: 1px;
              width: 100%;
              background-color: #eaeaea;
              margin: 4px 0;
            }
            .language-row:hover {
              background-color: #f8f9fa;
            }
          `}</style>
        </div>
      ) : (
        <p className="text-muted mt-4">No languages added</p>
      )}
    </div>
  );
};

export default LanguagesCvComponent;

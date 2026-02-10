import { useNavigate } from "react-router-dom";
import PageLoader from "../../widgets/pageLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Button } from "react-bootstrap";
import StepProgress from "./Stepprogress";
import { useCvProfile } from "../../hooks/useCv";

const SkillsCvCompnent = () => {
  const navigate = useNavigate();
  const applicantId = localStorage.getItem("applicantId");

  const { data: candidateDetails, isPending: isLoading } =
    useCvProfile(applicantId);

  const culture = candidateDetails?.data?.culture ?? [];
  const tools = candidateDetails?.data?.culture ?? [];
  const personality = candidateDetails?.data?.applicant_personality ?? [];
  const software = candidateDetails?.data?.software ?? [];
  const knowledge = candidateDetails?.data?.dknowledge ?? [];

  const sections = [
    {
      title: "Culture",
      data: culture,
      key: "culture",
    },
    {
      title: "Tools",
      data: tools,
      key: "tool",
    },
    {
      title: "Personality",
      data: personality,
      key: "personality",
    },
    {
      title: "Softwares",
      data: software,
      key: "software",
    },
    {
      title: "Skills & Knowledge",
      data: knowledge,
      key: "knowledge",
    },
  ];

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div>
      <StepProgress
        currentStep={5}
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
            // ... add other cases for each step
            default:
              break;
          }
        }}
      />

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-4 bg-white shadow-sm rounded mb-4">
        {/* Left Section: Title & Description */}
        <div className="text-center text-md-start mb-3 mb-md-0">
          <h1 className="fw-bold h2 text-dark mb-1">Skills</h1>
          <p className="text-muted mb-0">Add or remove skills here</p>
        </div>
      </div>

      <div className="skills-sections mt-4">
        {sections.map((section) => (
          <div key={section.key} className="mb-4">
            {/* Only render if section has data */}
            {section.data?.length > 0 && (
              <>
                {/* Section Header */}
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="section-title mb-0">
                      <b>{section.title.toUpperCase()}</b>
                    </h6>
                    <div className="d-flex gap-2">
                      <Button
                        variant="link"
                        className="p-0 border-0 bg-transparent"
                      ></Button>
                    </div>
                  </div>
                  <div className="mb-3 mt-2 divider"></div>
                </div>

                {/* Items List */}
                <Col md={12} className="mt-3">
                  <Row className="g-2">
                    {section.data.map((item, index) => {
                      const itemName =
                        item?.[section.key]?.[`${section.key}_name`] ||
                        `${section.title} name not available`;
                      return (
                        <Col xs="auto" key={index}>
                          <div
                            className="skill-tag p-1 d-flex align-items-center"
                            style={{ cursor: "pointer" }}
                          >
                            {itemName}
                            <FontAwesomeIcon
                              icon={faEyeSlash}
                              className="cursor-pointer text-gray-500 hover:text-gray-700 transition-all ms-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                section.handler(item?.id);
                              }}
                            />
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </Col>
              </>
            )}
          </div>
        ))}

        {/* Style */}
        <style jsx>{`
          .divider {
            height: 1px;
            width: 100%;
            background-color: rgb(235, 235, 235);
          }
          .skill-tag {
            border: 1px solid rgb(226, 226, 226);
            border-radius: 5px;
            margin-right: 8px;
            margin-bottom: 8px;
            transition: all 0.2s;
          }
          .skill-tag:hover {
            background-color: #f8f9fa;
            border-color: #dee2e6;
          }
        `}</style>
      </div>
    </div>
  );
};

export default SkillsCvCompnent;

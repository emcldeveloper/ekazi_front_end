import { Container, Row, Col, Card } from "react-bootstrap";

import JobSeekerLayout from "../../layouts/JobSeekerLayout";

// import SoftwareSection from "../../Component/Profile/SoftwareAndTools";
import ProfileSection from "../../Component/Profile/PersonalData";

import RefereesSection from "../../components/referees/RefereesSection";
import EducationSection from "../../components/education/EducationSection";
import TrainingSection from "../../components/training/TrainingSection";
import ExperienceSection from "../../components/experience/ExperienceSection";
import SkillsSection from "../../components/skills/SkillsSection";
import SoftwareSection from "../../components/softwares/SoftwareSection";
import PersonalitySection from "../../components/personality/PersonalitySection";
import CultureSection from "../../components/culture-fit/CultureSection";
import LanguageSection from "../../components/languages/LanguageSection";
import ProficiencySection from "../../components/proficiency/ProficiencySection";
import CareerObjectiveSection from "../../components/objectives/CareerObjectiveSection";
import CareerProfileSection from "../../components/career/CareerProfileSection";
import JobFitSection from "../../components/jobfit/JobfitSection";
import ToolSection from "../../components/tools/ToolSection";

import { useApplicantProfile } from "../../hooks/useCandidates";

const MyProfile = () => {
  const { data } = useApplicantProfile();

  const applicant = data?.data;

  return (
    <JobSeekerLayout>
      <Container
        fluid
        style={{
          height: "170vh",
          overflowY: "scroll",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <Row className="justify-content-center mb-3">
          <Col>
            <Card className="shadow-smy">
              <Card.Body className="p-4">
                <ProfileSection
                  profile={applicant?.applicant_profile?.[0] || null}
                  address={applicant?.address?.[0] || null}
                  phone={applicant?.phone?.phone_number || null}
                />
                <CareerProfileSection applicant={applicant} />
                <CareerObjectiveSection applicant={applicant} />
                <ExperienceSection applicant={applicant} />
                <EducationSection applicant={applicant} />
                <SkillsSection applicant={applicant} />
                <SoftwareSection applicant={applicant} />
                <ToolSection applicant={applicant} />
                <PersonalitySection applicant={applicant} />
                <JobFitSection applicant={applicant} />
                <CultureSection applicant={applicant} />
                <LanguageSection applicant={applicant} />
                <ProficiencySection applicant={applicant} />
                <TrainingSection applicant={applicant} />
                <RefereesSection applicant={applicant} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </JobSeekerLayout>
  );
};

export default MyProfile;

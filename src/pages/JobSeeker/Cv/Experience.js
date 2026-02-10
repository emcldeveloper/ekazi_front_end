import { Card } from "react-bootstrap";

import JobSeekerLayout from "../../../layouts/JobSeekerLayout";
import WorksExperiencesCv from "../../../Component/Cv/ExperienceCv";

const ExperinceCv = () => {
  return (
    <JobSeekerLayout>
      <Card>
        <Card.Body>
          <WorksExperiencesCv />
        </Card.Body>
      </Card>
    </JobSeekerLayout>
  );
};
export default ExperinceCv;

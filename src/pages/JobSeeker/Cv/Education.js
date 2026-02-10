import { Card } from "react-bootstrap";

import JobSeekerLayout from "../../../layouts/JobSeekerLayout";
import EducationsCv from "../../../Component/Cv/Education";

const EducationCv = () => {
  return (
    <JobSeekerLayout>
      <Card>
        <Card.Body>
          <EducationsCv />
        </Card.Body>
      </Card>
    </JobSeekerLayout>
  );
};
export default EducationCv;

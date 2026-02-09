import { Card } from "react-bootstrap";

import JobSeekerLayout from "../../../layouts/JobSeekerLayout";
import CoverLetterForm from "../../../Component/Jobs/Applyjob";

const Applyjob = () => {
  return (
    <JobSeekerLayout>
      <Card>
        <Card.Body>
          <CoverLetterForm />
        </Card.Body>
      </Card>
    </JobSeekerLayout>
  );
};
export default Applyjob;

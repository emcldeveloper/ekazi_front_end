import { Card } from "react-bootstrap";

import JobSeekerLayout from "../../../layouts/JobSeekerLayout";
import Training from "../../../Component/Cv/Training";

const TrainingCv = () => {
  return (
    <JobSeekerLayout>
      <Card>
        <Card.Body>
          <Training />
        </Card.Body>
      </Card>
    </JobSeekerLayout>
  );
};
export default TrainingCv;

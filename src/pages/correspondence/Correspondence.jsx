import { Card } from "react-bootstrap";

import ApplicantCorrespondence from "./ApplicantCorrespondence";
import JobSeekerLayout2 from "../../layouts/JobSeekerLayout2";

const Correspondence = () => {
  return (
    <JobSeekerLayout2>
      <Card>
        <Card.Body>
          <ApplicantCorrespondence />
        </Card.Body>
      </Card>
    </JobSeekerLayout2>
  );
};

export default Correspondence;

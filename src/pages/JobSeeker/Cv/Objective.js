import { Card } from "react-bootstrap";

import JobSeekerLayout from "../../../layouts/JobSeekerLayout";
import ProfessionalSummary from "../../../Component/Cv/Objective";

const ObjectDetail = () => {
  return (
    <JobSeekerLayout>
      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <ProfessionalSummary />
        </Card.Body>
      </Card>
    </JobSeekerLayout>
  );
};
export default ObjectDetail;

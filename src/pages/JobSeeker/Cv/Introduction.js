import { Card } from "react-bootstrap";
import JobSeekerLayout from "../../../layouts/JobSeekerLayout";
import IntroductionDetails from "../../../Component/Cv/IntroductionDeatil";

const IntroductionData = () => {
  return (
    <JobSeekerLayout>
      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <IntroductionDetails />
        </Card.Body>
      </Card>
    </JobSeekerLayout>
  );
};
export default IntroductionData;

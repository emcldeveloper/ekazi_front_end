import JobSeekerLayout from "../../../layouts/JobSeekerLayout";
import SkillsCvCompnent from "../../../Component/Cv/SkillsCv";
import { Card } from "react-bootstrap";

const SkillsCv = () => {
  return (
    <JobSeekerLayout>
      <Card>
        <Card.Body>
          <SkillsCvCompnent />
        </Card.Body>
      </Card>
    </JobSeekerLayout>
  );
};
export default SkillsCv;

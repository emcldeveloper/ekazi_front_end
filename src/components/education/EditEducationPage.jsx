import { Container, Row, Col, Card } from "react-bootstrap";

import { useApplicantProfile } from "../../hooks/useCandidates";
import JobSeekerLayout from "../../layouts/JobSeekerLayout";
import EditEducation from "./EditEducation";

const EditEducationPage = () => {
  const { data: applicantProfile } = useApplicantProfile();
  const applicant = applicantProfile?.data ?? {};

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
                <EditEducation applicant={applicant} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </JobSeekerLayout>
  );
};
export default EditEducationPage;

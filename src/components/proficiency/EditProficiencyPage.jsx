import { Container, Row, Col, Card } from "react-bootstrap";

import JobSeekerLayout from "../../layouts/JobSeekerLayout";
import EditProficiency from "./EditProficiency";
import { useApplicantProfile } from "../../hooks/useCandidates";

const EditProficiencyPage = () => {
  const { data: applicantProfile } = useApplicantProfile();
  const applicant = applicantProfile?.data ?? {};

  return (
    <JobSeekerLayout>
      <Container
        fluid
        style={{
          height: "170vh",
          overflowY: "scroll",
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* IE and Edge */,
        }}
      >
        <Row className="justify-content-center mb-3">
          <Col>
            <Card className="shadow-smy">
              <Card.Body className="p-4">
                <EditProficiency applicant={applicant} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </JobSeekerLayout>
  );
};
export default EditProficiencyPage;

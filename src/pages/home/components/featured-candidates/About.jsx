import { Container, Row, Col } from "react-bootstrap";

const About = ({ candidate }) => {
  const careerText = candidate?.applicant?.career?.career;
  const objectiveText = candidate?.applicant?.objective?.objective;

  const styles = {
    paragraph: {
      wordWrap: "break-word",
      whiteSpace: "pre-wrap",
    },
  };

  return (
    <Container className="border p-4 mb-1 bg-white ">
      {/* About Section */}
      <Row className="mb-3">
        <Col>
          <h5 className="text-primary fw-bold mb-1">About</h5>

          <hr className="border-primary mt-2 mb-3" />

          {careerText ? (
            <p style={styles.paragraph}>{careerText}</p>
          ) : (
            <p className="text-muted">No career information provided.</p>
          )}
        </Col>
      </Row>

      {/* Career Objectives Section */}
      <Row>
        <Col>
          <h5 className="text-primary fw-bold mb-1">Career Objectives</h5>

          <hr className="border-primary mt-2 mb-3" />

          {objectiveText ? (
            <p style={styles.paragraph}>{objectiveText}</p>
          ) : (
            <p className="text-muted">No career objective provided.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default About;

import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const SoftwareandTools = ({ candidate }) => {
  const softwares = candidate?.applicant?.applicant_softwares || [];
  const tools = candidate?.applicant?.applicant_tools || [];

  if (softwares.length === 0) {
    return null;
  }

  return (
    <Container className="border p-4 bg-white rounded mb-1">
      <h5 className="fw-bold text-primary">Software & Tools</h5>

      <hr className="border-primary mt-2 mb-3" />

      <Col md={12} className="mt-3">
        <Row className="g-2">
          {softwares?.map((item, index) => (
            <Col xs="auto" key={index}>
              <div
                className="software-tag capitalize p-1 px-2"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  backgroundColor: "#f8f9fa",
                  cursor: "pointer",
                }}
              >
                {item?.software.software_name?.toLowerCase()}
              </div>
            </Col>
          ))}
        </Row>
      </Col>
      <Col md={12} className="mt-3">
        <Row className="g-2">
          {tools?.map((item, index) => (
            <Col xs="auto" key={index}>
              <div
                className="software-tag capitalize p-1 px-2"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  backgroundColor: "#f8f9fa",
                  cursor: "pointer",
                }}
              >
                {item.tool?.tool_name}
              </div>
            </Col>
          ))}
        </Row>
      </Col>
    </Container>
  );
};

export default SoftwareandTools;

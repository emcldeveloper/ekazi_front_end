import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Skills = ({ candidate }) => {
  const knowledges = candidate?.applicant?.applicant_knowledges || [];

  if (knowledges.length === 0) {
    return null;
  }

  return (
    <Container className="border p-4 bg-white rounded mb-1">
      <h5 className="fw-bold text-primary">Career Skills</h5>

      <hr className="border-primary mt-2 mb-3" />

      <Row className="g-2">
        {knowledges?.map((item, index) => (
          <Col xs="auto" key={index}>
            <div
              className="p-2 text-center capitalize shadow-sm"
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                minWidth: "100px",
                backgroundColor: "#f8f9fa",
                cursor: "pointer",
              }}
            >
              {item?.knowledge?.knowledge_name?.toLowerCase()}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Skills;

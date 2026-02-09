import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Personality = ({ candidate }) => {
  const personalities = candidate?.applicant?.applicant_personalities || [];

  if (personalities.length === 0) {
    return null;
  }

  return (
    <Container className="border p-4 bg-white rounded mb-1">
      <h5 className="fw-bold text-primary">Personality Traits</h5>

      <hr className="border-primary mt-2 mb-3" />

      <Row className="g-2">
        {personalities?.map((item, index) => (
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
              {item.personality.personality_name}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Personality;

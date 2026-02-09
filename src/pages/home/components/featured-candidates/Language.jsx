import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Language = ({ candidate }) => {
  const languages = candidate?.applicant?.language_abilities || [];

  if (languages.length === 0) {
    return null;
  }

  return (
    <Container className="border p-4 bg-white rounded mb-1">
      <h5 className="fw-bold text-primary ">Language</h5>

      <hr className="border-primary mt-2 mb-3" />

      <Row className="g-2">
        {languages.map((ability) => (
          <Col key={ability.id} xs="auto">
            <div
              className="software-tag capitalize p-1 px-2"
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f8f9fa",
                cursor: "pointer",
              }}
            >
              {ability.language?.language_name || "No Record"}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Language;

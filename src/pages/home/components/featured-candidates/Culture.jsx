import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Culture = ({ candidate }) => {
  const cultures = candidate?.applicant?.applicant_cultures || [];

  if (cultures.length === 0) {
    return null;
  }

  return (
    <Container className="border p-4 bg-white rounded mb-1">
      <h5 className="fw-bold text-primary">Work Compatibility Profile</h5>

      <hr className="border-primary mt-2 mb-3" />

      <Row className="g-2">
        {cultures.map((item, index) => {
          const cultureName =
            item?.culture?.culture_name?.trim() || "Unknown Culture";

          return (
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
                {cultureName}
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Culture;

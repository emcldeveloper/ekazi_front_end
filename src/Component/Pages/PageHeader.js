import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const PageHeader = ({ title }) => {
  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
    );
  }

  return (
    <Container fluid className="m-0 p-0" style={{ backgroundColor: "#2E58A6" }}>
      <Container>
        <Row className="m-0 py-2">
          <Col>
            <p style={{ color: "#fff", margin: 0 }}>
              <Link to="/" style={{ color: "#fff" }}>
                Home
              </Link>{" "}
              → <span></span>
              {toTitleCase(title)}
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default PageHeader;

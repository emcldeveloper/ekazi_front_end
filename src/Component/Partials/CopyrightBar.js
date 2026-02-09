import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const CopyrightBar = ({ title = "All rights reserved" }) => {
  const currentYear = new Date().getFullYear();

  return (
    <section className="w-100" style={{ backgroundColor: "#1E65A6" }}>
      <Container className="py-4">
        <Row>
          <Col className="text-center">
            <b style={{ color: "#fff" }}>
              © {currentYear}. {title}
            </b>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CopyrightBar;

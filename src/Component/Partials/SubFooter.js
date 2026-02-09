import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";

const SubFooter = () => {
  return (
    <section className="w-full">
      <Container className="my-5">
        <Row>
          <Col md={4} className="text-center">
            <div className="d-flex flex-col align-items-center">
              <FaCheckCircle color="#D36314" size={32} className="mb-4" />
              <h6 className="text-primary font-bold">Hire Candidate</h6>
              <p className="text-primary">
                Find the potential candidate from eKazi
              </p>
            </div>
          </Col>

          <Col md={4} className="text-center">
            <div className="d-flex flex-col align-items-center">
              <FaCheckCircle color="#D36314" size={32} className="mb-4" />
              <h6 className="text-primary font-bold">Get Hired</h6>
              <p className="text-primary">Receive new jobs directly</p>
            </div>
          </Col>

          <Col md={4} className="text-center">
            <div className="d-flex flex-col align-items-center">
              <FaCheckCircle color="#D36314" size={32} className="mb-4" />
              <h6 className="text-primary font-bold">Explore Careers</h6>
              <p className="text-primary">
                See personalized job and career recommendations
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SubFooter;

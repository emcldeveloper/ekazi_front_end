import React from "react";
import MainLayout1 from "../../layouts/MainLayout1";

import { Col, Container, Row } from "react-bootstrap";
import TemplateSlider from "../JobSeeker/Cv/components/TemplateSlider";
import SalaryEstimation from "./Calculator";

const SalaryCalculator = () => {
  return (
    <MainLayout1>
      <Container className="my-8">
        <Row>
          <Col md={9}>
            <SalaryEstimation />
          </Col>
          <Col md={3}>
            <TemplateSlider />
          </Col>
        </Row>
      </Container>
    </MainLayout1>
  );
};
export default SalaryCalculator;

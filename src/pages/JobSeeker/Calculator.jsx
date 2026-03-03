import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SalaryEstimation from "../calculator/Calculator";
import TemplateSlider from "./Cv/components/TemplateSlider";
import MainLayout2 from "../../layouts/MainLayout2";

const Calculator = () => {
  return (
    <MainLayout2>
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
    </MainLayout2>
  );
};

export default Calculator;

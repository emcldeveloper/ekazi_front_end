import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AppHeader from "../../Component/Partials/AppHeader";
import SideBar from "../../Component/Partials/Employer/Sidebar";
import AppFooter from "../../Component/Partials/AppFooter";
import CopyrightBar from "../../Component/Partials/CopyrightBar";

const EmployerLayout = ({ children }) => {
  return (
    <>
      <AppHeader />
      <Container fluid className="mt-4">
        <Row>
          <Col md={4} lg={3}>
            <SideBar />
          </Col>
          <Col md={8} lg={9}>
            <main>
              {children}
            </main>
          </Col>
        </Row>
      </Container>
      <AppFooter />
      <CopyrightBar />
    </>
  );
};

export default EmployerLayout;

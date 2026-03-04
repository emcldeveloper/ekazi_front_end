import { Container, Row, Col } from "react-bootstrap";

import LeftSideBar from "./components/LeftSideBar";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

const JobSeekerLayout2 = ({ children }) => {
  return (
    <>
      <AppHeader />

      <Container fluid>
        <Row>
          {/* Left Sidebar */}
          <Col xs={12} md={3} className="bg-light p-3">
            <LeftSideBar />
          </Col>

          {/* Main content */}
          <Col xs={12} md={9} className="bg-light p-3">
            {children}
          </Col>
        </Row>
      </Container>

      <AppFooter />
    </>
  );
};

export default JobSeekerLayout2;

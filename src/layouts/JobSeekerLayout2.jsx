import { Container, Row, Col } from "react-bootstrap";

import LeftSideBar from "../Component/Partials/JobSeeker/LeftSideBar";
import AppFooter from "../Component/Partials/AppFooter";
import AppHeader from "../Component/Partials/AppHeader";

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

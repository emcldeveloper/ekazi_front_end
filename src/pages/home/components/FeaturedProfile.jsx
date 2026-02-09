import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import "./../../../App.css";

import MainLayout1 from "../../../layouts/MainLayout1";
import AdPlaceholder from "../../../Component/Ads/Vertical/AdPlaceholder";
import PersonalDetails from "./featured-candidates/PersonalDetails";
import About from "./featured-candidates/About";
import Experience from "./featured-candidates/Experience";
import Education from "./featured-candidates/Education";
import Language from "./featured-candidates/Language";
import Culture from "./featured-candidates/Culture";
import Personality from "./featured-candidates/Personality";
import Skills from "./featured-candidates/Skills";
import SoftwareandTools from "./featured-candidates/SoftwaerAndTools";
import Proficiency from "./featured-candidates/Proficiency";
import Training from "./featured-candidates/Training";
import JobFit from "./featured-candidates/JobFit";
import ProfileAssessment from "./featured-candidates/ProfileAsse";

const FeaturedProfile = () => {
  const { state } = useLocation();
  const candidate = state?.candidate;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout1>
      <div style={{ backgroundColor: "#cccccc", paddingBottom: "20px" }}>
        <Container className="py-4">
          <Breadcrumb className="custom-breadcrumb">
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active className="text-black">
              Candidate Profile
            </Breadcrumb.Item>
          </Breadcrumb>

          <Row className="mt-4">
            {/* Main Content */}
            <Col xs={12} lg={9}>
              <PersonalDetails candidate={candidate} />
              <About candidate={candidate} />
              <Experience candidate={candidate} />
              <Education candidate={candidate} />
              <Culture candidate={candidate} />
              <Personality candidate={candidate} />
              <Skills candidate={candidate} />
              <SoftwareandTools candidate={candidate} />
              <Language candidate={candidate} />
              <Proficiency candidate={candidate} />
              <Training candidate={candidate} />
              <JobFit candidate={candidate} />
              <ProfileAssessment candidate={candidate} />
            </Col>

            {/* Sidebar Ad */}
            <Col
              xs={12}
              lg={3}
              className="mt-4 mt-lg-0 mb-3"
              style={{
                position: "sticky",
                top: "180px",
                alignSelf: "flex-start",
              }}
            >
              <aside className="mb-2">
                <AdPlaceholder />
              </aside>
              <aside>
                <AdPlaceholder />
              </aside>
            </Col>
          </Row>
        </Container>
      </div>
    </MainLayout1>
  );
};

export default FeaturedProfile;

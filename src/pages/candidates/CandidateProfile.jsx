import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";

import MainLayout1 from "../../layouts/MainLayout1";
import AdPlaceholder from "../../components/ads/AdPlaceholder";
import PersonalDetails from "./components/PersonalDetails";
import About from "./components/About";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Language from "./components/Language";
import Culture from "./components/Culture";
import Personality from "./components/Personality";
import Skills from "./components/Skills";
import SoftwareandTools from "./components/SoftwaerAndTools";
import Proficiency from "./components/Proficiency";
import Training from "./components/Training";
import JobFit from "./components/JobFit";
import ProfileAssessment from "./components/ProfileAsse";

const CandidateProfile = () => {
  const { state } = useLocation();
  const candidate = state?.candidate;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout1>
      <div style={{ backgroundColor: "#cccccc", paddingBottom: "20px" }}>
        <Container className="py-10">
          <Breadcrumb className="custom-breadcrumb">
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/candidates">
              Featured Candidates
            </Breadcrumb.Item>
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

export default CandidateProfile;

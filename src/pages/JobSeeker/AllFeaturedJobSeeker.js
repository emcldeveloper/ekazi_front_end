import React, { useEffect } from "react";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import AllFeaturedCandidate from "../../Component/FeatureCandidate/AllFeaturedCandidate";
import MainLayout1 from "../../layouts/MainLayout1";
import PageHeader from "../../Component/Pages/PageHeader";
import AdPlaceholder from "../../components/ads/AdPlaceholder";

const AllFeaturedJobSeeker = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout1>
      <div style={{ backgroundColor: "#cccccc", paddingBottom: "20px" }}>
        {" "}
        {/* Set background color here */}
        <Container className="py-4">
          <Breadcrumb className="custom-breadcrumb">
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active className="text-black">
              Featured Candidates
            </Breadcrumb.Item>
          </Breadcrumb>

          <Row>
            {/* Main Content: Candidates list */}
            <Col md={9}>
              <AllFeaturedCandidate />
            </Col>

            {/* Right Sidebar: Ads or any content */}
            <Col
              xs={12}
              md={3}
              className="mb-3"
              style={{
                position: "sticky",
                top: "180px",
                alignSelf: "flex-start",
              }}
            >
              <AdPlaceholder />
            </Col>
          </Row>
        </Container>
      </div>
    </MainLayout1>
  );
};

export default AllFeaturedJobSeeker;

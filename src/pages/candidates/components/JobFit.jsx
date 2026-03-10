import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const JobFit = ({ candidate }) => {
  const applicant_tag = candidate?.applicant?.applicant_tags || [];

  if (applicant_tag.length === 0) {
    return null;
  }

  // ---------------------------------------------
  // SAFELY GROUP TAGS BY INDUSTRY
  // ---------------------------------------------
  const grouped = applicant_tag.reduce((acc, tag) => {
    const industryName =
      tag?.industry?.industry_name?.trim() || "Unknown Industry";

    if (!acc[industryName]) acc[industryName] = [];

    acc[industryName].push(tag);

    return acc;
  }, {});

  return (
    <Container className="border p-4 bg-white rounded mb-1">
      <h5 className="fw-bold text-primary ">Job You May Fit</h5>

      <hr className="border-primary mt-2 mb-3" />

      <Row className="g-0">
        {Object.entries(grouped).map(([industryName, tags], index) => (
          <Col md={12} key={index}>
            <Card className="border-0">
              <Card.Body className="p-1">
                <div className="d-flex flex-column flex-md-row align-items-start">
                  {/* Industry Name */}
                  <div className="me-md-2" style={{ minWidth: "150px" }}>
                    <h6 className="fw-bold mb-0">{industryName}</h6>
                  </div>

                  {/* Tags */}
                  <div className="flex-grow-1">
                    <Row className="g-0">
                      {tags.map((tag, i) => (
                        <Col xs="auto" key={i}>
                          <div className="personality-tag text-capitalize p-0 px-1">
                            {tag.tag_name}
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default JobFit;

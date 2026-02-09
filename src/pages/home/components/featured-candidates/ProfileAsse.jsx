import React, { useState } from "react";
import { FaEye, FaStar, FaRegStar } from "react-icons/fa";
import { Row, Col, Container } from "react-bootstrap";
import { useCreateRating } from "../../../../hooks/useRatings";

const ProfileAssessment = ({ candidate }) => {
  const { mutate } = useCreateRating();
  const [rating, setRating] = useState(1);

  const applicantID = candidate?.applicant?.id;

  const featured_views = candidate?.applicant?.featured_views || [];

  const maxRating = 5;

  const handleRating = (rating) => {
    setRating(rating);

    mutate({ id: applicantID, rate: rating });
  };

  return (
    <Container className="border p-4 bg-white rounded mb-1">
      <h5 className="fw-bold text-primary">Profile Assessment</h5>

      <hr className="border-primary mt-2 mb-3" />

      <Row>
        <Col md={12}>
          <Row className="align-items-center mb-3">
            <Col xs={12} md={6}>
              <p className="d-flex align-items-center mb-2 mb-md-0">
                <FaEye className="text-primary me-2" />
                {featured_views.map((view) => (
                  <span key={view.id} className="ms-1">
                    {view.view_number} views
                  </span>
                ))}
              </p>
            </Col>

            <Col xs={12} md={6}>
              <div
                className="d-flex align-items-center text-warning"
                style={{ cursor: "pointer" }}
              >
                <span className="text-black me-2">Rate Candidate:</span>

                {Array.from({ length: maxRating }, (_, index) => (
                  <div key={index} onClick={() => handleRating(index + 1)}>
                    {rating >= index + 1 ? (
                      <FaStar className="me-2" />
                    ) : (
                      <FaRegStar className="me-2" />
                    )}
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileAssessment;

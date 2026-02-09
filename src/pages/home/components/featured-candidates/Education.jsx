import React from "react";
import { Container, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

const Education = ({ candidate }) => {
  if (
    !candidate.applicant?.educations ||
    candidate.applicant.educations.length === 0
  ) {
    return null;
  }

  // Select the highest level of education based on level.id
  const higherEducation = candidate.applicant.educations.reduce(
    (prev, curr) => {
      return curr.level?.id > (prev.level?.id || 0) ? curr : prev;
    },
    {}
  );

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container className="border p-4 bg-white rounded mb-1">
      {/* Section Header */}
      <h5 className="fw-bold text-primary">Education</h5>

      <hr className="border-primary mt-2 mb-3" />

      <div className="education-list">
        <div className="education-item mb-1 p-1  ">
          <div className="d-flex">
            {/* Education Icon */}

            <div className="me-3 mt-1">
              <FontAwesomeIcon
                icon={faGraduationCap}
                className="text-primary"
                style={{ fontSize: "1.75rem" }}
              />
            </div>

            {/* Education Details */}
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start">
                <h6 className="fw-bold mb-1">
                  {higherEducation.level?.education_level} in{" "}
                  {higherEducation.course?.course_name}
                </h6>
              </div>
              {higherEducation.major?.name && (
                <p className="mb-1">
                  <Badge bg="light" text="dark" className="fw-normal">
                    Major: {higherEducation.major.name}
                  </Badge>
                </p>
              )}
              <p className="mb-1 text-dark">
                {higherEducation.college?.college_name}
              </p>

              <p className="text-muted small mb-1">
                <FontAwesomeIcon icon={faCalendarAlt} className="me-1" />
                {formatDate(higherEducation.started)} -{" "}
                {formatDate(higherEducation.ended)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Education;

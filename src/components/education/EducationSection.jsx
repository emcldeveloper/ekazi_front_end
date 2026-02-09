import { useState } from "react";
import { Container, Badge, Button } from "react-bootstrap";
import { Plus, Pencil } from "react-bootstrap-icons";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

import AddEducationModal from "./AddEducationModal";
import { Link } from "react-router-dom";

const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
  });
};

const EducationSection = ({ applicant }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const educationList = applicant?.education ?? [];

  return (
    <div className="education-section">
      <Container className="mt-8">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="section-title mb-0 fw-bold">EDUCATION DETAILS</h5>

          <div className="d-flex gap-2">
            <Button
              variant="link"
              className="p-0 border-0"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={22} className="text-muted" />
            </Button>

            <Link to="/jobseeker/Edit-Education">
              <Pencil
                style={{ cursor: "pointer", fontSize: "1.2rem" }}
                className="text-muted"
              />
            </Link>
          </div>
        </div>

        <div className="divider mb-2" />

        {/* Content */}
        {educationList.length > 0 ? (
          educationList.map((education) => (
            <div key={education.id} className="education-item mb-2 p-2">
              <div className="d-flex">
                {/* Icon */}
                <div className="me-3 mt-1">
                  <SchoolOutlinedIcon sx={{ fontSize: 40, color: "#2E58A6" }} />
                </div>

                {/* Details */}
                <div className="flex-grow-1">
                  <h6 className="fw-bold mb-1">
                    {education.level?.education_level}{" "}
                    {education.course?.course_name &&
                      `in ${education.course.course_name}`}
                  </h6>

                  {education.major?.name && (
                    <p className="mb-1">
                      <Badge bg="light" text="dark">
                        Major: {education.major.name}
                      </Badge>
                    </p>
                  )}

                  <p className="mb-1 text-dark">
                    {education.college?.college_name}
                  </p>

                  <p className="text-muted small mb-0">
                    {formatDate(education.started)} –{" "}
                    {formatDate(education.ended)}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-muted">
            No education records found
          </div>
        )}

        {/* Modal */}
        <AddEducationModal
          show={isModalOpen}
          onHide={() => setIsModalOpen(false)}
        />
      </Container>

      {/* Styles */}
      <style>{`
        .divider {
          height: 1px;
          background-color: #eaeaea;
        }

        .education-item {
          background-color: #fff;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .education-item:hover {
          background-color: #f9f9f9;
        }
      `}</style>
    </div>
  );
};

export default EducationSection;

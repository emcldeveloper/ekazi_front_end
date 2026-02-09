import { useState } from "react";
import { Button, Container, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import {
  faPlus,
  faPencilAlt,
  faCalendarAlt,
  faArrowLeft,
  faTrashAlt,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

import { useDeleteEducation } from "../../hooks/profile/useEducation";
import AddEducationModal from "./AddEducationModal";

const EditEducation = ({ applicant }) => {
  const navigate = useNavigate();
  const { mutate: deleteEducation, isLoading: deleting } = useDeleteEducation();

  /* -------------------- State -------------------- */
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* -------------------- Helpers -------------------- */
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatToYMD = (dateInput) => {
    const date = new Date(dateInput);
    if (isNaN(date)) return "";
    return date.toISOString().slice(0, 10);
  };

  /* -------------------- Handlers -------------------- */
  const handleAddEducation = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleEditEducation = (education) => {
    setEditData({
      level: education.level
        ? {
            value: education.level.id,
            label: education.level.education_level,
          }
        : null,

      college: education.college
        ? {
            value: education.college.id,
            label: education.college.college_name,
          }
        : null,

      course: education.course
        ? {
            value: education.course.id,
            label: education.course.course_name,
          }
        : null,

      major: education.major
        ? {
            value: education.major.id,
            label: education.major.name,
          }
        : null,

      started: formatToYMD(education.started),
      ended: formatToYMD(education.ended),
      attachment: education.attachment,
      id: education.id,
    });

    setIsModalOpen(true);
  };

  const handleDeleteEducation = async (educationId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the item.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      deleteEducation(educationId);
    }
  };

  /* -------------------- Render -------------------- */
  return (
    <div className="education-section mt-4">
      {/* Header */}
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="section-title mb-0">
            <b>EDUCATION DETAILS</b>
          </h6>

          <div className="d-flex gap-2">
            <Button
              variant="link"
              className="p-0 text-secondary"
              onClick={() => navigate(-1)}
              title="Back"
            >
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </Button>

            <Button
              variant="link"
              className="p-0 text-secondary"
              onClick={handleAddEducation}
              title="Add Education"
            >
              <FontAwesomeIcon icon={faPlus} size="lg" />
            </Button>
          </div>
        </div>

        <div className="mb-3 divider" />

        {/* Modal */}
        <AddEducationModal
          show={isModalOpen}
          onHide={() => setIsModalOpen(false)}
          editData={editData}
        />

        {/* Education List */}
        <div className="education-list">
          {applicant?.education?.length > 0 ? (
            applicant.education.map((education) => (
              <div key={education.id} className="education-item mb-2 p-2">
                <div className="d-flex">
                  {/* Icon */}
                  <div className="me-3 mt-1">
                    <FontAwesomeIcon
                      icon={faGraduationCap}
                      className="text-primary"
                      style={{ fontSize: "1.75rem" }}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <h6 className="fw-bold mb-1">
                        {education.level?.education_level} in{" "}
                        {education.course?.course_name}
                      </h6>

                      <div>
                        <Button
                          variant="link"
                          className="p-0 text-secondary me-2"
                          onClick={() => handleEditEducation(education)}
                          title="Edit"
                        >
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </Button>

                        <Button
                          variant="link"
                          className="p-0 text-danger"
                          disabled={deleting}
                          onClick={() => handleDeleteEducation(education.id)}
                          title="Delete"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                      </div>
                    </div>

                    {education.major?.name && (
                      <Badge bg="light" text="dark" className="mb-1">
                        Major: {education.major.name}
                      </Badge>
                    )}

                    <p className="mb-1">{education.college?.college_name}</p>

                    <p className="text-muted small mb-0">
                      <FontAwesomeIcon icon={faCalendarAlt} className="me-1" />
                      {formatDate(education.started)} -{" "}
                      {formatDate(education.ended)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted py-4">
              No education records found
            </div>
          )}
        </div>
      </Container>

      {/* Styles */}
      <style jsx>{`
        .divider {
          height: 1px;
          background-color: #ebebeb;
        }
        .education-item {
          background-color: #fff;
          transition: all 0.2s;
        }
        .education-item:hover {
          background-color: rgba(0, 0, 0, 0.02);
        }
      `}</style>
    </div>
  );
};

export default EditEducation;

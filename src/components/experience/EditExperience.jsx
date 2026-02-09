import { useState } from "react";
import { Card, Button, ListGroup, Badge, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPencilAlt,
  faTrashAlt,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";
import Swal from "sweetalert2";

import AddExperienceModal from "./AddExperienceModal";
import { useDeleteExperience } from "../../hooks/profile/useExperience";

const EditExperience = ({ applicant }) => {
  const navigate = useNavigate();

  const { mutate: deleteExperience, isPending: deleting } =
    useDeleteExperience();

  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [error, setError] = useState(null);

  /* ---------------- Helpers ---------------- */

  const formatToYMD = (dateInput) => {
    if (!dateInput) return "";
    const date = new Date(dateInput);
    return isNaN(date) ? "" : date.toISOString().slice(0, 10);
  };

  const calculateDuration = (positions = []) => {
    let totalMonths = 0;

    positions.forEach((pos) => {
      const start = moment(pos.start_date);
      const end = pos.end_date ? moment(pos.end_date) : moment();
      totalMonths += moment.duration(end.diff(start)).asMonths();
    });

    const years = Math.floor(totalMonths / 12);
    const months = Math.round(totalMonths % 12);

    return { text: `${years} yrs - ${months} mos` };
  };

  const calculateTotalExperience = () =>
    applicant?.experience?.length
      ? calculateDuration(applicant.experience)
      : { text: "0 yrs - 0 mos" };

  /* ---------------- Actions ---------------- */

  const handleOpenAddModal = () => {
    setEditData(null);
    setShowExperienceModal(true);
  };

  const handleEditExperience = (experience) => {
    setEditData({
      id: experience.id,
      experience_type_id: experience.experience_type_id,
      applicant_employer_id: experience.applicant_employer_id,
      employer_name: experience.employer?.employer_name ?? "",
      region_id: experience.employer?.region_id ?? null,
      country_id: experience.employer?.region?.country_id ?? null,
      sub_location: experience.employer?.sub_location ?? "",
      position_id: experience.position_id,
      position_name:
        experience.position?.position_name ?? experience.position_name ?? "",
      position_level_id: experience.position_level_id,
      industry_id: experience.industry_id,
      start_date: formatToYMD(experience.start_date),
      end_date: formatToYMD(experience.end_date),
      start_salary_id: experience.start_salary_id,
      end_salary_id: experience.end_salary_id,
      responsibility: experience.responsibility ?? "",
      remark: experience.remark ?? "",
    });

    setShowExperienceModal(true);
  };

  const handleDeleteExperience = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the experience.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      deleteExperience(id);
    }
  };

  /* ---------------- Data ---------------- */

  const groupedExperience = _.groupBy(
    applicant?.experience || [],
    "applicant_employer_id"
  );

  /* ---------------- Render ---------------- */

  return (
    <div className="mt-4">
      {/* Inline Timeline CSS */}
      <style>
        {`
          .timeline {
            position: relative;
            padding-left: 20px;
            margin-top: 10px;
          }
          .timeline::before {
            content: "";
            position: absolute;
            left: 6px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: #dee2e6;
          }
          .timeline-item {
            position: relative;
            margin-bottom: 20px;
          }
          .timeline-dot {
            position: absolute;
            left: -20px;
            top: 6px;
            width: 12px;
            height: 12px;
            background: #2e58a6;
            border-radius: 50%;
          }
        `}
      </style>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center">
        <Card.Title className="mb-0">
          <h6 className="card-title">
            WORK EXPERIENCE ({calculateTotalExperience().text})
          </h6>
        </Card.Title>

        <div className="d-flex gap-2">
          <Button
            variant="link"
            className="p-0 text-secondary me-2"
            onClick={() => navigate(-1)}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>

          <Button
            variant="link"
            className="p-0 text-secondary"
            onClick={handleOpenAddModal}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      </div>

      <hr className="border-primary mt-2 mb-3" />

      {/* Experience List */}
      {Object.entries(groupedExperience).map(([employerId, positions]) => {
        const employer = positions[0]?.employer;
        const hasTimeline = positions.length > 1;

        return (
          <div key={employerId} className="mb-4">
            <h5 className="mb-1">{employer?.employer_name}</h5>
            <p className="text-muted mb-2">
              {employer?.sub_location}, {employer?.region?.region_name} -{" "}
              {employer?.region?.country?.name}
            </p>
            <Badge bg="light" text="dark">
              {calculateDuration(positions).text}
            </Badge>

            {/* TIMELINE */}
            {hasTimeline ? (
              <div className="timeline mt-3">
                {positions.map((pos) => (
                  <div key={pos.id} className="timeline-item">
                    <span className="timeline-dot" />

                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="fw-bold mb-1">
                          {pos.position?.position_name}
                        </p>
                        <p className="text-muted small mb-1">
                          {moment(pos.start_date).format("MMM YYYY")} -{" "}
                          {pos.end_date
                            ? moment(pos.end_date).format("MMM YYYY")
                            : "Present"}
                        </p>
                        <p className="mb-1">
                          <strong>Responsibility:</strong>{" "}
                          <span
                            dangerouslySetInnerHTML={{
                              __html: pos.responsibility,
                            }}
                          />
                        </p>

                        {pos.remark && (
                          <p className="mb-0">
                            <strong>Reason for Leaving:</strong>{" "}
                            <span
                              dangerouslySetInnerHTML={{
                                __html: pos.remark,
                              }}
                            />
                          </p>
                        )}
                      </div>

                      <div>
                        <Button
                          variant="link"
                          className="p-0 text-secondary me-2"
                          onClick={() => handleEditExperience(pos)}
                        >
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </Button>

                        <Button
                          variant="link"
                          className="p-0 text-danger"
                          disabled={deleting}
                          onClick={() => handleDeleteExperience(pos.id)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* SINGLE POSITION (EDIT + DELETE RESTORED) */
              positions.map((pos) => (
                <ListGroup key={pos.id} variant="flush" className="mt-3">
                  <ListGroup.Item className="border-0 px-0">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="fw-bold mb-1">
                          {pos.position?.position_name}
                        </p>
                        <p className="text-muted small">
                          {moment(pos.start_date).format("MMM YYYY")} -{" "}
                          {pos.end_date
                            ? moment(pos.end_date).format("MMM YYYY")
                            : "Present"}
                        </p>
                        <p className="mb-1">
                          <strong>Responsibility:</strong>{" "}
                          <span
                            dangerouslySetInnerHTML={{
                              __html: pos.responsibility,
                            }}
                          />
                        </p>

                        {pos.remark && (
                          <p className="mb-0">
                            <strong>Reason for Leaving:</strong>{" "}
                            <span
                              dangerouslySetInnerHTML={{
                                __html: pos.remark,
                              }}
                            />
                          </p>
                        )}
                      </div>

                      <div>
                        <Button
                          variant="link"
                          className="p-0 text-secondary me-2"
                          onClick={() => handleEditExperience(pos)}
                        >
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </Button>

                        <Button
                          variant="link"
                          className="p-0 text-danger"
                          disabled={deleting}
                          onClick={() => handleDeleteExperience(pos.id)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                      </div>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              ))
            )}
          </div>
        );
      })}

      <AddExperienceModal
        show={showExperienceModal}
        onHide={() => setShowExperienceModal(false)}
        editData={editData}
      />
    </div>
  );
};

EditExperience.propTypes = {
  applicant: PropTypes.shape({
    experience: PropTypes.array,
  }),
};

export default EditExperience;

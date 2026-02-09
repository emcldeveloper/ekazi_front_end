import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPencilAlt,
  faDownload,
  faChalkboardTeacher,
  faTrashAlt,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import AddTrainingModal from "./AddTrainingModal";
import Swal from "sweetalert2";
import { useDeleteTraining } from "../../hooks/profile/useTraining";

const EditTraining = ({ applicant }) => {
  const navigate = useNavigate();

  const { mutate: deleteTraining, isLoading: deleting } = useDeleteTraining();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editData, setEditTraining] = useState(null);

  const formatDate = (dateString, fallback = "Present") => {
    if (!dateString) return fallback;
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
    });
  };

  const getFileNameFromUrl = (url) => {
    if (!url) return "";
    const cleanUrl = url.split("?")[0];
    const fullName = cleanUrl.split("/").pop();
    const lastDotIndex = fullName.lastIndexOf(".");
    if (lastDotIndex === -1) return fullName;

    const name = fullName.substring(0, lastDotIndex);
    const extension = fullName.substring(lastDotIndex);

    return name.length > 10
      ? `${name.substring(0, 7)}...${extension}`
      : fullName;
  };

  const handleOpenAddModal = () => {
    setEditTraining(null);
    setIsOpenModal(true);
  };

  const handleEditTraining = (training) => {
    setEditTraining({
      applicant_id: training.applicant_id,
      name: training.name,
      institution: training.institution,
      started: training.started,
      ended: training.ended,
      attachment: training.attachment,
      id: training.id,
    });
    setIsOpenModal(true);
  };

  const handleDeleteTraining = async (trainingId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the item.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      deleteTraining(trainingId);
    }
  };

  return (
    <div className="training-section mt-3">
      {applicant?.training && (
        <>
          {/* Header */}
          <Row className="align-items-center mb-2">
            <Col xs={8}>
              <h6 className="text-uppercase mb-0">
                <b>TRAININGS & WORKSHOPS</b>
              </h6>
            </Col>
            <Col xs={4} className="text-end">
              <Button
                variant="link"
                className="p-0 text-secondary me-2"
                onClick={() => navigate(-1)}
                title="Back"
              >
                <FontAwesomeIcon icon={faArrowLeft} size="lg" />
              </Button>

              <Button
                variant="link"
                className="p-0 text-secondary"
                onClick={handleOpenAddModal}
                title="Add Training"
              >
                <FontAwesomeIcon icon={faPlus} size="lg" />
              </Button>
            </Col>
          </Row>

          <div className="mb-3 divider" />

          {/* Training List */}
          <div className="training-list">
            {applicant.training.length > 0 ? (
              applicant.training.map((training) => (
                <div key={training.id} className="d-flex mb-3 training-item">
                  <div className="me-3 mt-1">
                    <FontAwesomeIcon
                      icon={faChalkboardTeacher}
                      className="text-primary"
                      style={{ fontSize: "1.5rem" }}
                    />
                  </div>

                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <h6 className="mb-0 fw-bold">
                        {training.name}{" "}
                        <span className="fw-light text-muted">
                          ({formatDate(training.started, "Unknown")} -{" "}
                          {formatDate(training.ended)})
                        </span>
                      </h6>

                      <div>
                        <Button
                          variant="link"
                          className="p-0 text-secondary me-2"
                          onClick={() => handleEditTraining(training)}
                          title="Edit"
                        >
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </Button>

                        <Button
                          variant="link"
                          className="p-0 text-danger"
                          disabled={deleting}
                          onClick={() => handleDeleteTraining(training.id)}
                          title="Delete"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                      </div>
                    </div>

                    <p className="mb-0">{training.institution}</p>

                    {training.attachment && (
                      <div className="mt-1">
                        <a
                          href={training.attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-none small"
                        >
                          <FontAwesomeIcon icon={faDownload} className="me-1" />
                          {getFileNameFromUrl(training.attachment)}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-2 text-muted">
                No trainings or workshops added
              </div>
            )}
          </div>

          <AddTrainingModal
            show={isOpenModal}
            editData={editData}
            onHide={() => setIsOpenModal(false)}
          />
        </>
      )}

      <style>{`
        .divider {
          height: 1px;
          width: 100%;
          background-color: rgb(235, 235, 235);
        }
        .training-item {
          transition: background-color 0.2s;
          padding: 8px;
          border-radius: 4px;
        }
        .training-item:hover {
          background-color: rgba(0, 0, 0, 0.03);
        }
      `}</style>
    </div>
  );
};

export default EditTraining;

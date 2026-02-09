import { useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import { Plus, Pencil } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

import AddTrainingModal from "./AddTrainingModal";

const formatDate = (dateString) => {
  if (!dateString) return "Present";
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
  });
};

const getFileNameFromUrl = (url) => {
  if (!url) return "";
  const file = url.split("/").pop();
  if (!file.includes(".")) return file;

  const [name, ext] = file.split(/\.(?=[^.]+$)/);
  return `${name.length > 10 ? name.slice(0, 7) + "..." : name}.${ext}`;
};

const TrainingSection = ({ applicant }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = useCallback(() => setShowModal(true), []);
  const closeModal = useCallback(() => setShowModal(false), []);

  const trainings = applicant?.training ?? [];

  return (
    <div className="training-section mt-8">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="section-title fw-bold mb-0">TRAININGS & WORKSHOPS</h5>

        <div className="d-flex gap-2">
          <Button
            variant="link"
            className="p-0 border-0 bg-transparent"
            onClick={openModal}
          >
            <Plus className="text-muted" style={{ fontSize: "1.5rem" }} />
          </Button>

          <AddTrainingModal show={showModal} onHide={closeModal} />

          <Link to="/jobseeker/Edit-Training">
            <Pencil
              className="text-muted"
              style={{ cursor: "pointer", fontSize: "1.2rem" }}
            />
          </Link>
        </div>
      </div>

      <div className="divider mb-2" />

      <div className="training-list">
        {trainings.length > 0 ? (
          trainings.map((training, index) => (
            <div key={index} className="d-flex mb-3 training-item">
              <div className="me-3 mt-1">
                <WorkspacePremiumOutlinedIcon
                  sx={{ fontSize: 40, color: "#2E58A6" }}
                />
              </div>

              <div className="flex-grow-1">
                <h6 className="mb-0 fw-bold">
                  {training.name}{" "}
                  <span className="fw-light text-muted">
                    – {formatDate(training.started)} -{" "}
                    {formatDate(training.ended)}
                  </span>
                </h6>

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

      <style>{`
        .divider {
          height: 1px;
          width: 100%;
          background-color: rgb(235, 235, 235);
        }
        .training-item {
          padding: 8px;
          border-radius: 4px;
          transition: background-color 0.2s;
        }
        .training-item:hover {
          background-color: rgba(0, 0, 0, 0.03);
        }
      `}</style>
    </div>
  );
};

export default TrainingSection;

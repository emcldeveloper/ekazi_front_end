import { useMemo, useState, useCallback } from "react";
import { Button } from "react-bootstrap";
import { Plus, Pencil } from "react-bootstrap-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

import AddProficiencyModal from "./AddProficiencyModal";

/* --------------------------------------------------
 * Helpers
 * -------------------------------------------------- */
const formatYear = (dateString) =>
  dateString
    ? new Date(dateString).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
      })
    : "";

const getFileNameFromUrl = (url) => {
  if (!url) return "";
  const fullName = url.split("/").pop();
  const dotIndex = fullName.lastIndexOf(".");
  if (dotIndex === -1) return fullName;

  const name = fullName.slice(0, dotIndex);
  const ext = fullName.slice(dotIndex);

  return name.length > 10 ? `${name.slice(0, 7)}...${ext}` : fullName;
};

const ProficiencySection = ({ applicant }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const proficiencies = useMemo(
    () => (Array.isArray(applicant?.proficiency) ? applicant.proficiency : []),
    [applicant?.proficiency],
  );

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  if (!applicant) return null;

  return (
    <div className="proficiency-section mt-8">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0 fw-bold">PROFICIENCY QUALIFICATION</h5>

        <div className="d-flex gap-2">
          <Button
            variant="link"
            className="p-0 border-0 bg-transparent"
            onClick={openModal}
          >
            <Plus className="text-muted" style={{ fontSize: "1.5rem" }} />
          </Button>

          <Link to="/jobseeker/Edit-Proficiency">
            <Pencil
              className="text-muted"
              style={{ cursor: "pointer", fontSize: "1.2rem" }}
            />
          </Link>
        </div>
      </div>

      <AddProficiencyModal show={isModalOpen} onHide={closeModal} />

      <div className="divider mb-2" />

      {/* List */}
      {proficiencies.length > 0 ? (
        <div className="proficiency-list">
          {proficiencies.map((item, index) => (
            <div
              key={index}
              className="d-flex mb-3 proficiency-item align-items-start"
            >
              <div className="me-3 mt-1">
                <StarOutlineIcon sx={{ fontSize: 40, color: "#2E58A6" }} />
              </div>

              <div className="flex-grow-1">
                <h6 className="mb-1 fw-bold">
                  {item.proficiency?.proficiency_name}
                  <span className="fw-light text-muted">
                    {" "}
                    – {formatYear(item.started)} - {formatYear(item.ended)}
                  </span>
                </h6>

                <p className="mb-1 text-uppercase">
                  {item.award}{" "}
                  {item.organization?.organization_name && (
                    <span className="text-muted">
                      ({item.organization.organization_name})
                    </span>
                  )}
                </p>

                {item.attachment && (
                  <a
                    href={item.attachment}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none small"
                  >
                    <FontAwesomeIcon icon={faDownload} className="me-1" />
                    {getFileNameFromUrl(item.attachment)}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-2 text-muted">
          No proficiency qualifications added
        </div>
      )}

      <style>{`
        .divider {
          height: 1px;
          width: 100%;
          background-color: rgb(235, 235, 235);
        }
        .proficiency-item {
          padding: 8px;
          border-radius: 4px;
          transition: background-color 0.2s;
        }
        .proficiency-item:hover {
          background-color: rgba(0, 0, 0, 0.03);
        }
      `}</style>
    </div>
  );
};

export default ProficiencySection;

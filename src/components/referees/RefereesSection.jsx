import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Pencil, Plus } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import AddRefereeModal from "./AddRefereeModal";

const RefereesSection = ({ applicant }) => {
  const [selectedReferee, setSelectedReferee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const referees = applicant?.referees ?? [];

  /* --------------------------------------------------
   * Helpers
   * -------------------------------------------------- */
  const getFileNameFromUrl = (url) => {
    if (!url) return "";
    const name = url.split("/").pop();
    return name.length > 20 ? `${name.slice(0, 15)}...` : name;
  };

  const formatName = (...parts) =>
    parts
      .filter(Boolean)
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
      .join(" ");

  /* --------------------------------------------------
   * Modal handlers
   * -------------------------------------------------- */
  const openAddModal = () => {
    setSelectedReferee(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedReferee(null);
    setShowModal(false);
  };

  /* --------------------------------------------------
   * Submit handlers (API wired later)
   * -------------------------------------------------- */
  const handleSubmit = async (data) => {
    setIsSaving(true);
    try {
      // create or update referee
    } finally {
      setIsSaving(false);
      closeModal();
    }
  };

  return (
    <div className="referees-section mt-8">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="section-title fw-bold mb-0">REFEREES</h5>

        <div className="d-flex gap-2">
          <Button
            variant="link"
            className="p-0 border-0 bg-transparent"
            onClick={openAddModal}
          >
            <Plus style={{ fontSize: "1.5rem" }} className="text-muted" />
          </Button>

          <AddRefereeModal
            isOpen={showModal}
            onClose={closeModal}
            onSubmit={handleSubmit}
            referee={selectedReferee}
            isEditMode={!!selectedReferee}
            isLoading={isSaving}
          />

          <Link to="/jobseeker/Edit-Referee">
            <Pencil
              style={{ cursor: "pointer", fontSize: "1.2rem" }}
              className="text-muted"
            />
          </Link>
        </div>
      </div>

      <div className="mb-2 divider" />

      {/* List */}
      <div className="table-responsive">
        <Table hover className="info-table">
          <tbody>
            {referees.length > 0 ? (
              referees.map((referee) => (
                <tr key={referee.id}>
                  <td style={{ width: "70px", verticalAlign: "top" }}>
                    <PersonOutlineIcon
                      sx={{ fontSize: 40, color: "#2E58A6" }}
                    />
                  </td>

                  <td>
                    <div className="d-flex justify-content-between">
                      <div>
                        <h6 className="mb-1">
                          {formatName(
                            referee.first_name,
                            referee.middle_name,
                            referee.last_name,
                          )}
                        </h6>

                        <p className="mb-1">{referee.referee_position}</p>

                        <p className="mb-1">{referee.employer}</p>

                        <p className="mb-1 text-muted">{referee.email}</p>

                        <p className="mb-1">{referee.phone}</p>
                      </div>
                    </div>

                    {referee.type === "private" && referee.attachment && (
                      <div className="mt-2">
                        <a
                          href={referee.attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-none small"
                          title={getFileNameFromUrl(referee.attachment)}
                        >
                          <FontAwesomeIcon icon={faDownload} className="me-1" />
                          {getFileNameFromUrl(referee.attachment)}
                        </a>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-3 text-muted">
                  No referees added
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <style>{`
        .divider {
          height: 1px;
          width: 100%;
          background-color: rgb(235, 235, 235);
        }
        .info-table tr:hover {
          background-color: rgba(0, 0, 0, 0.02);
        }
      `}</style>
    </div>
  );
};

export default RefereesSection;

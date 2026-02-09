import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import {
  faPlus,
  faPencilAlt,
  faDownload,
  faUserTie,
  faArrowLeft,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import AddRefereeModal from "./AddRefereeModal";
import { useDeleteReferee } from "../../hooks/profile/useReferee";

const EditReferee = ({ applicant }) => {
  const navigate = useNavigate();
  const { mutate: deleteReferee, isLoading: deleting } = useDeleteReferee();

  /* -------------------- State -------------------- */
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* -------------------- Helpers -------------------- */
  const getFileNameFromUrl = (url) => {
    if (!url) return "";
    const parts = url.split("/");
    const filename = parts[parts.length - 1];
    return filename.length > 20 ? `${filename.substring(0, 15)}...` : filename;
  };

  /* -------------------- Handlers -------------------- */
  const handleAddReferee = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleEditReferee = (referee) => {
    setEditData({
      first_name: referee.first_name ?? "",
      middle_name: referee.middle_name ?? "",
      last_name: referee.last_name ?? "",
      referee_position: referee.referee_position ?? "",
      employer: referee.employer ?? "",
      email: referee.email ?? "",
      phone: referee.phone ?? "",
      id: referee.id,
    });

    setIsModalOpen(true);
  };

  const handleDeleteReferee = async (refereeId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the item.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      deleteReferee(refereeId);
    }
  };

  /* -------------------- Render -------------------- */
  return (
    <div className="referees-section mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="section-title mb-0">
          <b>REFEREES</b>
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
            onClick={handleAddReferee}
            title="Add Referee"
          >
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </Button>
        </div>
      </div>

      <div className="mb-3 divider" />

      {/* Modal */}
      <AddRefereeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editData={editData}
      />

      {/* Table */}
      <div className="table-responsive">
        <Table hover className="info-table">
          <tbody>
            {applicant?.referees?.length > 0 ? (
              applicant.referees.map((referee) => (
                <tr key={referee.id}>
                  <td style={{ width: "70px", verticalAlign: "top" }}>
                    <FontAwesomeIcon
                      icon={faUserTie}
                      className="text-primary"
                      style={{
                        fontSize: "1.25rem",
                        border: "3px solid #28a8e4",
                        borderRadius: "50%",
                        padding: "3px",
                        backgroundColor: "#fff",
                        width: "32px",
                        height: "32px",
                      }}
                    />
                  </td>

                  <td>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="mb-1">
                          {[
                            referee.first_name,
                            referee.middle_name,
                            referee.last_name,
                          ]
                            .filter(Boolean)
                            .map(
                              (name) =>
                                name.charAt(0).toUpperCase() +
                                name.slice(1).toLowerCase()
                            )
                            .join(" ")}
                        </h6>

                        <p className="mb-1">{referee.referee_position}</p>

                        <p className="mb-1">{referee.employer}</p>

                        <p className="mb-1 text-muted">{referee.email}</p>
                        <p className="mb-1">{referee.phone}</p>
                      </div>

                      <div>
                        <Button
                          variant="link"
                          className="p-0 text-secondary me-2"
                          onClick={() => handleEditReferee(referee)}
                          title="Edit"
                        >
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </Button>

                        <Button
                          variant="link"
                          className="p-0 text-danger"
                          disabled={deleting}
                          onClick={() => handleDeleteReferee(referee.id)}
                          title="Delete"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                      </div>
                    </div>

                    {referee.type === "private" && referee.attachment && (
                      <div className="mt-2">
                        <a
                          href={referee.attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-none small"
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
                <td colSpan={2} className="text-center text-muted py-3">
                  No referees added
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Styles */}
      <style jsx>{`
        .divider {
          height: 1px;
          background-color: #ebebeb;
        }
        .info-table tr:hover {
          background-color: rgba(0, 0, 0, 0.02);
        }
      `}</style>
    </div>
  );
};

export default EditReferee;

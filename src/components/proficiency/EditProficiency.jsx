import { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPencilAlt,
  faDownload,
  faArrowLeft,
  faTrashAlt,
  faMedal,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useDeleteProficiency } from "../../hooks/profile/useProficiency";
import AddProficiencyModal from "./AddProficiencyModal";

const EditProficiency = ({ applicant }) => {
  const navigate = useNavigate();
  const { mutate: deleteProficiency } = useDeleteProficiency();

  /* -------------------- State -------------------- */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  /* -------------------- Helpers -------------------- */
  const formatYear = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
    });
  };

  const getFileNameFromUrl = (url) => {
    if (!url) return "";
    const fullName = url.split("/").pop();
    const dotIndex = fullName.lastIndexOf(".");
    if (dotIndex === -1) return fullName;

    const name = fullName.slice(0, dotIndex);
    const ext = fullName.slice(dotIndex);
    return `${name.length > 10 ? name.slice(0, 7) + "..." : name}${ext}`;
  };

  /* -------------------- Handlers -------------------- */
  const handleAddProficiency = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleEditProficiency = (proficiency) => {
    setEditData({
      id: proficiency.id,
      proficiency: {
        value: proficiency.proficiency_id,
        label: proficiency.proficiency?.proficiency_name,
      },
      award: proficiency.award,
      organization: {
        value: proficiency.organization_id,
        label: proficiency.organization?.organization_name,
      },
      started: proficiency.started,
      ended: proficiency.ended,
      attachment: proficiency.attachment,
    });

    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This proficiency qualification will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      deleteProficiency(id);
    }
  };

  /* -------------------- Render -------------------- */
  return (
    <div className="proficiency-section mt-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="section-title mb-0">
          <b>PROFICIENCY QUALIFICATION</b>
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
            onClick={handleAddProficiency}
            title="Add Proficiency"
          >
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </Button>
        </div>
      </div>

      <div className="divider mb-3" />

      {/* Modal */}
      <AddProficiencyModal
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        editData={editData}
      />

      {/* List */}
      <div className="proficiency-list">
        {applicant?.proficiency?.length > 0 ? (
          applicant.proficiency.map((item) => (
            <div key={item.id} className="d-flex mb-3 proficiency-item">
              <div className="me-3 mt-1">
                <FontAwesomeIcon
                  icon={faMedal}
                  className="text-primary"
                  style={{ fontSize: "1.5rem" }}
                />
              </div>

              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-0 fw-bold">
                    {item.proficiency?.proficiency_name}{" "}
                    <span className="fw-light text-muted">
                      ({item.started} – {item.ended})
                    </span>
                  </h6>

                  <div>
                    <Button
                      variant="link"
                      className="p-0 text-secondary me-2"
                      onClick={() => handleEditProficiency(item)}
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </Button>

                    <Button
                      variant="link"
                      className="p-0 text-danger"
                      onClick={() => handleDelete(item.id)}
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                  </div>
                </div>

                <p className="mb-0 text-uppercase">
                  {item.award} ({item.organization?.organization_name})
                </p>

                {item.attachment && (
                  <div className="mt-1">
                    <a
                      href={item.attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none small"
                    >
                      <FontAwesomeIcon icon={faDownload} className="me-1" />
                      {getFileNameFromUrl(item.attachment)}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-2 text-muted">
            No proficiency qualifications added
          </div>
        )}
      </div>

      <style>{`
        .divider {
          height: 1px;
          background-color: rgb(235, 235, 235);
        }
        .proficiency-item {
          transition: background-color 0.2s;
          padding: 8px;
          border-radius: 4px;
        }
        .proficiency-item:hover {
          background-color: rgba(0, 0, 0, 0.03);
        }
      `}</style>
    </div>
  );
};

export default EditProficiency;

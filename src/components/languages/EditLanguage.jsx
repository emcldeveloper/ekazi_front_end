import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPencilAlt,
  faArrowLeft,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDeleteLanguage } from "../../hooks/profile/useLanguage";
import AddLanguageModal from "./AddLanguageModal";

const EditLanguage = ({ applicant }) => {
  const navigate = useNavigate();
  const { mutate: deleteLanguage } = useDeleteLanguage();

  /* -------------------- State -------------------- */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  /* -------------------- Handlers -------------------- */
  const handleAddLanguage = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleEditLanguage = (language) => {
    setEditData({
      id: language.id,
      language: {
        value: language.language_id,
        label: language.language?.language_name,
      },
      read: {
        value: language.read_id,
        label: language.read?.read_ability,
      },
      write: {
        value: language.write_id,
        label: language.write?.write_ability,
      },
      speak: {
        value: language.speak_id,
        label: language.speak?.speak_ability,
      },
      understand: {
        value: language.understand_id,
        label: language.understand?.understand_ability,
      },
    });

    setIsModalOpen(true);
  };

  const handleDeleteLanguage = async (languageId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This language will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      deleteLanguage(languageId);
    }
  };

  /* -------------------- Render -------------------- */
  return (
    <div className="languages-section mb-4 mt-2">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="section-title mb-0">
          <b>LANGUAGES</b>
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
            onClick={handleAddLanguage}
            title="Add Language"
          >
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </Button>
        </div>
      </div>

      <div className="divider mb-3" />

      {/* Modal */}
      <AddLanguageModal
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        editData={editData}
      />

      {/* Table */}
      {applicant?.language?.length > 0 ? (
        <div className="table-responsive">
          <Table borderless className="mb-0">
            <thead>
              <tr>
                <th>Language</th>
                <th>Read</th>
                <th>Write</th>
                <th>Speak</th>
                <th>Understand</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              {applicant.language.map((lang) => (
                <tr key={lang.id} className="language-row">
                  <td>{lang.language?.language_name}</td>
                  <td>{lang.read?.read_ability}</td>
                  <td>{lang.write?.write_ability}</td>
                  <td>{lang.speak?.speak_ability}</td>
                  <td>{lang.understand?.understand_ability}</td>
                  <td className="text-end">
                    <Button
                      variant="link"
                      className="p-0 text-secondary me-2"
                      onClick={() => handleEditLanguage(lang)}
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faPencilAlt} size="sm" />
                    </Button>

                    <Button
                      variant="link"
                      className="p-0 text-danger"
                      onClick={() => handleDeleteLanguage(lang.id)}
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} size="sm" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <p className="text-muted">No languages added</p>
      )}

      <style jsx>{`
        .divider {
          height: 1px;
          background-color: #ebebeb;
        }
        .language-row:hover {
          background-color: rgba(0, 0, 0, 0.02);
        }
      `}</style>
    </div>
  );
};

export default EditLanguage;

import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Plus, Pencil } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import AddLanguageModal from "./AddLanguageModal";

const LanguageSection = ({ applicant }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const languages = applicant?.language ?? [];

  return (
    <div className="languages-section mt-8">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="section-title mb-0 fw-bold">LANGUAGES</h5>

        <div className="d-flex gap-2 align-items-center">
          <Button
            variant="link"
            onClick={openModal}
            className="p-0 border-0 bg-transparent"
          >
            <Plus size={22} className="text-muted" />
          </Button>

          <Link to="/jobseeker/Edit-Language">
            <Pencil size={18} className="text-muted" />
          </Link>
        </div>
      </div>

      <div className="divider mb-2" />

      {/* Table */}
      {languages.length > 0 ? (
        <div className="table-responsive">
          <Table borderless className="mb-0">
            <thead>
              <tr>
                <th>Language</th>
                <th>Read</th>
                <th>Write</th>
                <th>Speak</th>
                <th>Understand</th>
              </tr>
            </thead>

            <tbody>
              {languages.map((item, index) => (
                <React.Fragment key={item.id || index}>
                  <tr className="language-row">
                    <td>{item.language?.language_name ?? "-"}</td>
                    <td>{item.read?.read_ability ?? "-"}</td>
                    <td>{item.write?.write_ability ?? "-"}</td>
                    <td>{item.speak?.speak_ability ?? "-"}</td>
                    <td>{item.understand?.understand_ability ?? "-"}</td>
                  </tr>

                  {index < languages.length - 1 && (
                    <tr>
                      <td colSpan={5} className="border-top" />
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <p className="text-muted mb-0">No languages added</p>
      )}

      {/* Add Language Modal */}
      <AddLanguageModal show={isModalOpen} onHide={closeModal} />

      {/* Styles */}
      <style>{`
        .divider {
          height: 1px;
          background-color: #ebebeb;
          width: 100%;
        }

        .language-row:hover {
          background-color: rgba(0, 0, 0, 0.02);
        }

        th {
          font-weight: 600;
          color: #000;
        }
      `}</style>
    </div>
  );
};

export default LanguageSection;

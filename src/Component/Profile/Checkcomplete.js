import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jobcompleteprofile } from "../../Api/Jobseeker/JobSeekerProfileApi";
import { ModalSwitcher } from "./SwitchModal";

const Checkcompleteprofile = ({
  showProfileCompleteModal,
  setShowProfileCompleteModal,
  setProfileComplete,
}) => {
  const navigate = useNavigate();
  const applicant_id = localStorage.getItem("applicantId");

  const [missingFields, setMissingFields] = useState([]);
  const [completecheck, setCompletecheck] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentField, setCurrentField] = useState(null);

  // Modify your checkProfileCompletion function
  const checkProfileCompletion = () => {
    if (completecheck?.profilecheck?.length > 0) {
      setMissingFields(completecheck.profilecheck);
      setShowProfileCompleteModal(true);
      setProfileComplete(false); // Notify parent component
      return;
    }
    setProfileComplete(true); // Notify parent component
    return true;
  };

  // Call this when component mounts
  useEffect(() => {
    if (completecheck) {
      checkProfileCompletion();
    }
  }, [completecheck]);

  const [refreshTrigger, setRefreshTrigger] = useState(false);

  // Fetch profile completion status
  useEffect(() => {
    const fetchJobCompleteProfile = async () => {
      try {
        setLoading(true);
        const data = await jobcompleteprofile(applicant_id);
        setCompletecheck(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobCompleteProfile();
  }, [refreshTrigger]);

  const [activeModal, setActiveModal] = useState(null);
  const [IsOpenModel, setIsModalOpen] = useState(false);
  const handleOpenLnagugae = () => {
    setIsModalOpen(true);
  };
  const CloseModelLnaguage = () => {
    setIsModalOpen(false);
  };

  const handleModalClose = (shouldRefresh = false) => {
    setActiveModal(null);
    if (shouldRefresh) {
      setRefreshTrigger((prev) => !prev); // Trigger data refresh
    }
  };

  return (
    <Modal
      show={showProfileCompleteModal}
      onHide={() => setShowProfileCompleteModal(false)}
      centered
      size="md"
    >
      <Modal.Header closeButton className="border-bottom-0 pb-0">
        <Modal.Title
          style={{ fontSize: "clamp(14px, 3vw, 18px)", textAlign: "center" }}
        >
          Profile Completion Required
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-0">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div
            className="alert alert-warning p-3 mb-0"
            style={{
              borderRadius: "8px",
              flex: 1,
              marginRight: "20px",
            }}
          >
            <div className="d-flex">
              <div className="me-2">⚠️</div>
              <div>
                <strong className="d-block mb-1">ACTION REQUIRED:</strong>
                <p className="mb-0 small">
                  Your profile is{" "}
                  {completecheck?.sections
                    ? Math.round(
                        ((completecheck.sections.length -
                          (missingFields?.length || 0)) /
                          completecheck.sections.length) *
                          100,
                      )
                    : 0}
                  % complete. You must complete {missingFields?.length || 0}{" "}
                  essential {missingFields?.length > 1 ? "sections" : "section"}{" "}
                  before applying.
                </p>
              </div>
            </div>
          </div>

          <div style={{ minWidth: "120px" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: `conic-gradient(#2E58A6 ${
                  completecheck?.sections
                    ? ((completecheck.sections.length -
                        (missingFields?.length || 0)) /
                        completecheck.sections.length) *
                      100
                    : 0
                }%, #f0f0f0 ${
                  completecheck?.sections
                    ? ((completecheck.sections.length -
                        (missingFields?.length || 0)) /
                        completecheck.sections.length) *
                      100
                    : 0
                }%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                boxShadow: "0 2px 8px rgba(46, 88, 166, 0.1)",
              }}
            >
              <div
                style={{
                  width: "68px",
                  height: "68px",
                  borderRadius: "50%",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  color: "#2E58A6",
                }}
              >
                {completecheck?.sections
                  ? `${Math.round(
                      ((completecheck.sections.length -
                        (missingFields?.length || 0)) /
                        completecheck.sections.length) *
                        100,
                    )}%`
                  : "0%"}
              </div>
            </div>
            <h6
              className="mt-2 text-center"
              style={{
                color: "#2E58A6",
                fontSize: "0.85rem",
                fontWeight: "500",
              }}
            >
              Profile Completion
            </h6>
          </div>
        </div>

        <div className="requirements-breakdown">
          <h6 className="fw-semibold mb-3">
            <i className="fas fa-exclamation-triangle text-warning me-2"></i>
            Missing Profile Sections:
          </h6>
          <div
            className="requirement-container"
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              paddingRight: "8px",
              scrollbarWidth: "thin",
            }}
          >
            {missingFields?.map((field, index) => (
              <div
                key={index}
                className="requirement-item mb-2 p-3 d-flex align-items-start"
                style={{
                  background: "#fff8f8",
                  borderRadius: "6px",
                  borderLeft: "3px solid #dc3545",
                }}
              >
                <div className="flex-grow-1">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start">
                    <span className="mb-1 mb-md-0">
                      <i
                        className="fas fa-plus-circle text-danger me-2"
                        style={{ fontSize: "1.1rem" }}
                      ></i>
                      <strong className="text-dark">
                        {(completecheck?.sections &&
                          completecheck.sections[
                            `applicant_${field?.toLowerCase()}`
                          ]) ||
                          field}
                        :
                      </strong>
                      <span className="text-danger ms-2">Not completed</span>
                    </span>
                    {/* <button
                      className="btn btn-sm btn-outline-primary mt-1 mt-md-0"
                      onClick={() => {
                        setCurrentField(field);
                        setActiveModal(field.toLowerCase());
                      }}
                    >
                      <i className="fas fa-plus me-1"></i> Add Data
                    </button> */}
                  </div>
                  <div className="mt-2 small text-muted d-flex align-items-center">
                    <i className="fas fa-info-circle text-secondary me-2"></i>
                    Complete the{" "}
                    <span className="badge bg-warning text-dark mx-1">
                      {(completecheck?.sections &&
                        completecheck.sections[
                          `applicant_${field?.toLowerCase()}`
                        ]) ||
                        field}
                    </span>{" "}
                    section to continue
                  </div>{" "}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between border-top-0 pt-0">
        <Button
          variant="outline-secondary"
          onClick={() => setShowProfileCompleteModal(false)}
          style={{ minWidth: "100px" }}
        >
          Cancel
        </Button>
        <div className="d-flex gap-2">
          <Button
            variant="primary"
            style={{ minWidth: "140px" }}
            onClick={() => {
              setShowProfileCompleteModal(false);
              navigate("/jobseeker/profile-preview");
            }}
          >
            Go To Profile
          </Button>
        </div>
      </Modal.Footer>
      {activeModal && (
        <Modal show={true} onHide={() => handleModalClose()} centered>
          <ModalSwitcher
            activeModal={activeModal}
            onClose={handleModalClose}
            applicant={applicant_id}
            onSuccess={() => handleModalClose(true)}
          />
        </Modal>
      )}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Complete: {currentField}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {/* Render appropriate input based on the field */}
                <p>
                  Form or input for <strong>{currentField}</strong> goes here.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button className="btn btn-primary">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default Checkcompleteprofile;

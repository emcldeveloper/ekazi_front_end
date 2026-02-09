import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";
import EditCareerObjectiveModal from "./EditCareerObjectiveModal";

const CareerObjectiveSection = ({ applicant }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const objectiveText = applicant?.objective?.objective;

  return (
    <>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2 mt-8">
        <Card.Title className="mb-0">
          <h5 className="mb-0 fw-bold">CAREER OBJECTIVES</h5>
        </Card.Title>

        <Button
          variant="link"
          className="text-dark p-0"
          onClick={() => setIsModalOpen(true)}
        >
          <Pencil size={18} />
        </Button>
      </div>
      <hr className="border-primary" />
      {/* Content */}
      <div className="mb-3">
        {objectiveText ? (
          <p style={{ whiteSpace: "pre-line" }}>{objectiveText}</p>
        ) : (
          <p className="text-muted">No career objective added yet</p>
        )}
      </div>
      {/* Edit Modal */}
      <EditCareerObjectiveModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        applicant={applicant}
      />
    </>
  );
};

export default CareerObjectiveSection;

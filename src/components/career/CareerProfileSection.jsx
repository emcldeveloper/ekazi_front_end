import { useMemo, useState, useCallback } from "react";
import { Pencil } from "react-bootstrap-icons";
import { Card, Badge } from "react-bootstrap";
import EditCareerProfileModal from "./EditCareerProfileModal";

const CareerProfileSection = ({ applicant }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const careerData = useMemo(
    () => applicant?.careers?.[0] ?? null,
    [applicant?.careers],
  );

  const skills = useMemo(
    () => (Array.isArray(applicant?.knowledge) ? applicant.knowledge : []),
    [applicant?.knowledge],
  );

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0 fw-bold">CAREER PROFILE (ABOUT)</h5>
        <Pencil
          role="button"
          className="text-muted"
          style={{ fontSize: "1.2rem" }}
          onClick={openModal}
        />
      </div>

      <EditCareerProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        applicant={applicant}
      />

      <div className="divider mb-2" />

      {/* Career Summary */}
      {careerData?.career ? (
        <p style={{ fontSize: "1.05rem", whiteSpace: "pre-line" }}>
          {careerData.career}
        </p>
      ) : (
        <p className="text-muted">No career profile added yet</p>
      )}

      {/* Top Skills */}
      {skills.length > 0 && (
        <Card
          className="border-0 mt-4"
          style={{ backgroundColor: "#f8f9fa", borderRadius: 10 }}
        >
          <Card.Body>
            <Card.Subtitle className="text-primary mb-2">
              <strong>Top Skills</strong>
            </Card.Subtitle>

            <div className="d-flex flex-wrap gap-2">
              {skills.slice(0, 4).map((item, index) => (
                <Badge
                  key={index}
                  bg="light"
                  text="dark"
                  className="px-3 py-2 rounded-pill"
                >
                  {item?.knowledge?.knowledge_name}
                </Badge>
              ))}

              {skills.length > 4 && (
                <Badge bg="secondary" className="px-3 py-2 rounded-pill">
                  +{skills.length - 4} more
                </Badge>
              )}
            </div>
          </Card.Body>
        </Card>
      )}

      <style>{`
        .divider {
          height: 1px;
          width: 100%;
          background-color: rgb(235, 235, 235);
        }
      `}</style>
    </div>
  );
};

export default CareerProfileSection;

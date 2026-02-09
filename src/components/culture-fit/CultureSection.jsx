import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";
import EditCultureModal from "./EditCultureModal";

const CultureSection = ({ applicant }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cultures = applicant?.culture ?? [];

  return (
    <div className="cultures-section mt-8">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="section-title mb-0 fw-bold uppercase">Culture Fit</h5>

        <Button
          variant="link"
          className="p-0 border-0"
          onClick={() => setIsModalOpen(true)}
        >
          <Pencil size={18} className="text-muted" />
        </Button>
      </div>

      <div className="divider mb-2" />

      {/* Content */}
      {cultures.length > 0 ? (
        <Row className="g-2">
          {cultures.map((item, index) => {
            const cultureName =
              item.culture?.culture_name || item.culture_name || "-";

            return (
              <Col xs="auto" key={item.id || index}>
                <div className="personality-tag p-1">{cultureName}</div>
              </Col>
            );
          })}
        </Row>
      ) : (
        <p className="text-muted mb-0">
          No work compatibility profile added yet
        </p>
      )}

      {/* Modal */}
      <EditCultureModal
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
      />

      {/* Styles */}
      <style>{`
        .divider {
          height: 1px;
          width: 100%;
          background-color: rgb(235, 235, 235);
        }

        .personality-tag {
          background: #f5f7fa;
          border-radius: 6px;
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
};

export default CultureSection;

import { useState, useMemo } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";
import EditSoftwareModal from "../Forms/JobSeeker/Software";

const SoftwareSection = ({ applicant }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const softwareList = useMemo(
    () => applicant?.software ?? [],
    [applicant?.software]
  );

  const toolsList = useMemo(() => applicant?.tools ?? [], [applicant?.tools]);

  return (
    <div className="software-section mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="section-title mb-0 fw-bold">SOFTWARE & TOOLS</h6>

        <Button
          variant="link"
          className="p-0 border-0"
          onClick={() => setIsModalOpen(true)}
        >
          <Pencil size={18} className="text-muted" />
        </Button>
      </div>

      <div className="divider mb-3" />

      {/* Content */}
      {softwareList.length > 0 || toolsList.length > 0 ? (
        <>
          {softwareList.length > 0 && (
            <Row className="g-2 mb-2">
              {softwareList.map((item) => (
                <Col xs="auto" key={item.id || item.software_id}>
                  <div className="software-tag p-1">
                    {item.software?.software_name ?? "-"}
                  </div>
                </Col>
              ))}
            </Row>
          )}

          {toolsList.length > 0 && (
            <Row className="g-2">
              {toolsList.map((item) => (
                <Col xs="auto" key={item.id || item.tool_id}>
                  <div className="software-tag p-1">
                    {item.tool?.tool_name ?? "-"}
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </>
      ) : (
        <p className="text-muted mb-0">No software or tools added yet</p>
      )}

      {/* Modal */}
      <EditSoftwareModal
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

        .software-tag {
          border: 1px solid rgb(226, 226, 226);
          border-radius: 5px;
          margin-right: 8px;
          margin-bottom: 8px;
          font-size: 0.85rem;
          transition: all 0.2s;
        }

        .software-tag:hover {
          background-color: #f8f9fa;
          border-color: #dee2e6;
        }
      `}</style>
    </div>
  );
};

export default SoftwareSection;

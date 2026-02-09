import { useMemo, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Plus, Pencil } from "react-bootstrap-icons";
import EditJobfitModal from "../Forms/JobSeeker/JobFity";

const JobsFitSection = ({ applicant }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const applicantTags = useMemo(() => {
    return Array.isArray(applicant?.applicant_tag)
      ? applicant.applicant_tag
      : [];
  }, [applicant?.applicant_tag]);

  /* --------------------------------------------------
   * Group jobs by industry
   * -------------------------------------------------- */
  const groupedByIndustry = useMemo(() => {
    return applicantTags.reduce((acc, tag) => {
      const industry = tag.industry_name || "Other";
      if (!acc[industry]) acc[industry] = [];
      acc[industry].push(tag);
      return acc;
    }, {});
  }, [applicantTags]);

  return (
    <div className="jobs-fit-section mb-4 mt-2">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="section-title mb-0 fw-bold">LIST OF JOBS I MAY FIT</h6>

        <div className="d-flex gap-2">
          <Button
            variant="link"
            className="p-0 border-0"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={22} className="text-muted" />
          </Button>

          <Button
            variant="link"
            className="p-0 border-0"
            onClick={() => setIsModalOpen(true)}
          >
            <Pencil size={18} className="text-muted" />
          </Button>
        </div>
      </div>

      <div className="divider mb-3" />

      {/* Content */}
      {Object.keys(groupedByIndustry).length > 0 ? (
        <Row className="g-2">
          {Object.entries(groupedByIndustry).map(([industryName, tags]) => (
            <Col md={12} key={industryName}>
              <Card className="border-0">
                <Card.Body className="p-1">
                  <div className="d-flex flex-column flex-md-row align-items-start">
                    <div className="me-md-3" style={{ minWidth: "200px" }}>
                      <h6 className="fw-bold mb-1">{industryName}</h6>
                    </div>

                    <div className="flex-grow-1">
                      <Row className="g-1">
                        {tags.map((tag) => (
                          <Col xs="auto" key={tag.id}>
                            <div className="personality-tag px-2 py-1">
                              {tag.tag_name}
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-muted mb-0">No job matches added yet</p>
      )}

      {/* Modal */}
      <EditJobfitModal
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

export default JobsFitSection;

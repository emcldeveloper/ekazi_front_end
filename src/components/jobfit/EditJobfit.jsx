import { useMemo, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import { useDeleteJobFit } from "../../hooks/profile/useJobFit";
import EditJobfitModal from "./EditJobfitModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPencilAlt,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const JobFit = ({ applicant }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: deleteJobFit, isLoading: deleting } = useDeleteJobFit();

  const [editData, setEditData] = useState(null);

  /* --------------------------------------------------
   * Normalize applicant tags
   * -------------------------------------------------- */
  const applicantTags = useMemo(() => {
    return Array.isArray(applicant?.applicant_tag)
      ? applicant.applicant_tag
      : [];
  }, [applicant?.applicant_tag]);

  /* --------------------------------------------------
   * Group by industry
   * -------------------------------------------------- */
  const groupedByIndustry = useMemo(() => {
    return applicantTags.reduce((acc, tag) => {
      const industry = tag.industry_name || "Other";
      if (!acc[industry]) acc[industry] = [];
      acc[industry].push(tag);
      return acc;
    }, {});
  }, [applicantTags]);

  /* --------------------------------------------------
   * Open modal
   * -------------------------------------------------- */
  const handleOpenAddModal = () => {
    setIsModalOpen(true);
  };

  //
  const handleEditJobFit = (tag) => {
    setEditData({
      industry: {
        value: tag.industry_id,
        label: tag.industry_name,
      },
      jobs: [
        {
          label: tag.tag_name,
          value: tag.tag_name,
        },
      ],
    });

    setIsModalOpen(true);
  };

  /* --------------------------------------------------
   * Delete
   * -------------------------------------------------- */
  const handleDelete = async (tag) => {
    const result = await Swal.fire({
      title: "Remove job fit?",
      text: "This job will be removed from your job fit list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it",
    });

    if (result.isConfirmed) {
      deleteJobFit({
        applicant_id: applicant.applicant_id,
        industry_id: tag.industry_id,
      });
    }
  };

  return (
    <div className="job-fit-section mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="fw-bold mb-0">LIST OF JOBS I MAY FIT</h6>

        <div className="d-flex gap-2">
          <Button
            variant="link"
            className="p-0 text-secondary me-2"
            onClick={() => navigate(-1)}
            title="Back"
          >
            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          </Button>

          <Button
            variant="link"
            className="p-0 text-secondary"
            onClick={handleOpenAddModal}
            title="Add Job Fit"
          >
            <FontAwesomeIcon icon={faPlus} size="lg" />
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
                  <Row className="g-1">
                    <Col>
                      <h6 className="fw-bold mb-2">{industryName}</h6>
                    </Col>
                    <Col xs="auto">
                      {tags.map((tag) => (
                        <div
                          key={tag.id}
                          className="d-flex align-items-center gap-1"
                        >
                          <div className="jobfit-tag px-2 py-1 ">
                            {tag.tag_name}
                          </div>

                          <div>
                            <Button
                              variant="link"
                              className="p-0 text-secondary me-2"
                              onClick={() => handleEditJobFit(tag)}
                              title="Edit"
                            >
                              <FontAwesomeIcon icon={faPencilAlt} size="sm" />
                            </Button>

                            <Button
                              variant="link"
                              className="p-0 text-danger"
                              disabled={deleting}
                              onClick={() => handleDelete(tag)}
                              title="Delete"
                            >
                              <FontAwesomeIcon icon={faTrashAlt} size="sm" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-muted mb-0">No job fits added yet</p>
      )}

      <EditJobfitModal
        show={isModalOpen}
        onHide={() => {
          setIsModalOpen(false);
          setEditData(null);
        }}
        editData={editData}
      />

      {/* Styles */}
      <style>{`
        .divider {
          height: 1px;
          background-color: #ebebeb;
        }

        .jobfit-tag {
          background: #f5f7fa;
          border-radius: 6px;
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
};

export default JobFit;

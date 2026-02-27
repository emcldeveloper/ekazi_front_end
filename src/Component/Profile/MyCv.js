import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Card,
  Image,
  Badge,
  Alert,
} from "react-bootstrap";
import Swal from "sweetalert2";

import { useDeleteCv, useMyCv } from "../../hooks/useCv";
import { FaEye, FaTrash } from "react-icons/fa";
import { TEMPLATES } from "../../pages/JobSeeker/Cv/data/templates";

const MyCv = () => {
  const applicant_id = localStorage.getItem("applicantId");

  // Fetching cvs
  const { data, isPending: isLoading } = useMyCv(applicant_id);
  const downloadedCvs = data?.mycv || [];

  // Deleting cvs
  const { mutate: deleteCv, isPending } = useDeleteCv();

  const [showModal, setShowModal] = useState(false);
  const [selectedCv, setSelectedCv] = useState(null);

  const openModal = (cv) => {
    setSelectedCv(cv);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCv(null);
  };

  const matchedTemplate = TEMPLATES.find((t) => t.key === selectedCv?.template);

  const PreviewComponent = matchedTemplate?.component;

  // Handlers
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the item.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCv(id, {
          onSuccess: () => {
            Swal.fire("Deleted!", "CV removed successfully.", "success");
          },
          onError: () => {
            Swal.fire("Error!", "Failed to delete CV.", "error");
          },
        });
      }
    });
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h5 className="fw-bold">My Downloaded CV</h5>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>CV Name</th>
                  <th>Template No</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="text-center">
                      Loading CVs...
                    </td>
                  </tr>
                ) : downloadedCvs.length > 0 ? (
                  downloadedCvs.map((sub) => {
                    const cvTemplate = TEMPLATES.find(
                      (t) => t.key === sub.template,
                    );

                    return (
                      <tr key={sub.id}>
                        <td>
                          {cvTemplate ? (
                            <Image
                              src={cvTemplate.image}
                              alt="template"
                              fluid
                              style={{ height: "64px" }}
                            />
                          ) : (
                            "No Image"
                          )}
                        </td>
                        <td>
                          {sub.applicant.first_name} {sub.applicant.last_name}
                        </td>
                        <td>{sub.cv_name}</td>
                        <td>
                          <Badge bg="primary">{cvTemplate.name}</Badge>
                        </td>
                        <td>{new Date(sub.created_at).toLocaleDateString()}</td>
                        <td>
                          <div className="d-flex align-items-center gap-1">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => openModal(sub)}
                            >
                              <FaEye />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              disabled={isPending}
                              onClick={() => handleDelete(sub.id)}
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center">
                      No CVs found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={closeModal} size="lg" centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>
            Viewing CV - Template {selectedCv?.template_no}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {PreviewComponent ? (
            <PreviewComponent id={selectedCv?.id} />
          ) : (
            <Alert variant="warning">Unknown Template</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyCv;

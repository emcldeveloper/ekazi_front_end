import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
  Modal,
  Pagination,
  Card,
  Image,
  Badge,
  Alert,
} from "react-bootstrap";
import Swal from "sweetalert2";
import Template1 from "../../downloadtemplate/template1";
import Template2 from "../../downloadtemplate/template2";
import Template3 from "../../downloadtemplate/template3";
import Template4 from "../../downloadtemplate/template4";
import Template5 from "../../downloadtemplate/template5";
import Template6 from "../../downloadtemplate/template6";
import Template7 from "../../downloadtemplate/template7";
import Template8 from "../../downloadtemplate/template8";
import Template9 from "../../downloadtemplate/template9";
import Template10 from "../../downloadtemplate/template10";

const MyCv = () => {
  const templates = [
    { id: 1, name: "Template 1", image: "/cv1.png", component: <Template1 /> },
    { id: 2, name: "Template 2", image: "/cv2.png", component: <Template2 /> },
    { id: 3, name: "Template 3", image: "/cv3.png", component: <Template3 /> },
    { id: 4, name: "Template 4", image: "/cv4.png", component: <Template4 /> },
    { id: 5, name: "Template 5", image: "/cv5.png", component: <Template5 /> },
    { id: 6, name: "Template 6", image: "/cv6.png", component: <Template6 /> },
    { id: 7, name: "Template 7", image: "/cv7.png", component: <Template7 /> },
    { id: 8, name: "Template 8", image: "/cv8.png", component: <Template8 /> },
    { id: 9, name: "Template 9", image: "/cv9.png", component: <Template9 /> },
    {
      id: 10,
      name: "Template 10",
      image: "/cv10.png",
      component: <Template10 />,
    },
  ];

  const [subscription, setSubscription] = useState([]);
  const uuid = 48;
  const [showModal, setShowModal] = useState(false);
  const [selectedCv, setSelectedCv] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const filteredData = subscription.filter((sub) => {
    const applicantName = `${sub.applicant.first_name} ${sub.applicant.last_name}`;
    const cvName = sub.cv_name.toLowerCase();
    const templateNo = sub.template_no.toString();
    const created_at = sub.created_at.toString();

    return (
      applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cvName.includes(searchTerm.toLowerCase()) ||
      templateNo.includes(searchTerm.toLowerCase()) ||
      created_at.includes(searchTerm.toLowerCase())
    );
  });

  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/applicant/mycv/${uuid}`)
      .then((response) => {
        if (response) {
          console.log("cv yangu ipo", response.data);
          setSubscription(response.data.mycv);
        }
      })
      .catch((error) => {
        console.error("Error fetching CV Subscription data:", error.message);
      });
  }, [uuid]);

  const openModal = (cv) => {
    setSelectedCv(cv);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCv(null);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the item. Do you want to proceed? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://127.0.0.1:8000/api/applicant/deletecv/${id}`
          );
          if (response.status === 200) {
            Swal.fire({
              title: "Success!",
              text: "Data has been deleted permanently.",
              icon: "success",
              confirmButtonText: "OK",
            });
          }
          setSubscription((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to remove referee. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h5 className="fw-bold">My Downloaded CV</h5>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
          </Row>

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
                {paginatedData.length > 0 ? (
                  paginatedData.map((sub) => {
                    const matchedTemplate = templates.find(
                      (t) => t.id === sub.template_no
                    );
                    return (
                      <tr key={sub.id}>
                        <td>
                          {matchedTemplate ? (
                            <Image
                              src={matchedTemplate.image}
                              alt={`Template ${sub.template_no}`}
                              fluid
                              style={{ height: "64px", width: "auto" }}
                            />
                          ) : (
                            <span>No image available</span>
                          )}
                        </td>
                        <td>{`${sub.applicant.first_name} ${sub.applicant.last_name}`}</td>
                        <td>{sub.cv_name}</td>
                        <td>
                          <Badge bg="primary">Template {sub.template_no}</Badge>
                        </td>
                        <td>{new Date(sub.created_at).toLocaleDateString()}</td>
                        <td>
                          <Button
                            variant="primary"
                            size="sm"
                            className="me-2"
                            onClick={() => openModal(sub)}
                          >
                            View
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(sub.id)}
                          >
                            Delete
                          </Button>
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

          <Row className="align-items-center mt-3">
            <Col md={6}>
              <p className="mb-0">
                Showing <strong>{currentPage * itemsPerPage + 1}</strong> to{" "}
                <strong>
                  {Math.min(
                    (currentPage + 1) * itemsPerPage,
                    filteredData.length
                  )}
                </strong>{" "}
                of <strong>{filteredData.length}</strong> results
              </p>
            </Col>
            <Col md={6} className="d-flex justify-content-end">
              <Pagination>
                <Pagination.Prev
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 0))
                  }
                  disabled={currentPage === 0}
                />
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Pagination.Item
                    key={index}
                    active={index === currentPage}
                    onClick={() => setCurrentPage(index)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={
                    (currentPage + 1) * itemsPerPage >= filteredData.length
                  }
                />
              </Pagination>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Modal for View CV */}
      <Modal show={showModal} onHide={closeModal} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Viewing CV - Template {selectedCv?.template_no}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "80vh", overflowY: "auto" }}>
          {selectedCv && (
            <>
              {selectedCv.template_no === 1 && <Template1 id={selectedCv.id} />}
              {selectedCv.template_no === 2 && <Template2 id={selectedCv.id} />}
              {selectedCv.template_no === 3 && <Template3 id={selectedCv.id} />}
              {selectedCv.template_no === 4 && <Template4 id={selectedCv.id} />}
              {selectedCv.template_no === 5 && <Template5 id={selectedCv.id} />}
              {selectedCv.template_no === 6 && <Template6 id={selectedCv.id} />}
              {selectedCv.template_no === 7 && <Template7 id={selectedCv.id} />}
              {selectedCv.template_no === 8 && <Template8 id={selectedCv.id} />}
              {selectedCv.template_no === 9 && <Template9 id={selectedCv.id} />}
              {selectedCv.template_no === 10 && (
                <Template10 id={selectedCv.id} />
              )}
              {![1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(
                selectedCv.template_no
              ) && <Alert variant="warning">Unknown Template</Alert>}
            </>
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

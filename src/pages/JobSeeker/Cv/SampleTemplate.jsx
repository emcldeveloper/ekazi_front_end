import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Modal,
  Button,
  Badge,
  Form,
} from "react-bootstrap";
import { FaFileAlt, FaEye, FaCrown, FaWhatsapp } from "react-icons/fa";
import Swal from "sweetalert2";

import JobSeekerLayout from "../../../layouts/JobSeekerLayout";
import {
  useCreateSubscription,
  useCvCount,
  useIncrementCvCount,
  useSubscriptionPlan,
} from "../../../hooks/useCv";
import { TEMPLATES } from "./data/templates";

const SampleTemplate = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const navigate = useNavigate();
  const { mutate: incrementCvCount } = useIncrementCvCount();
  const { mutate: createSubscription, isPending: isSubmitting } =
    useCreateSubscription();

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setSelectedTemplate(null);
  };

  const selectedTemplateData = TEMPLATES.find((t) => t.id === selectedTemplate);

  const PreviewComponent = selectedTemplateData?.component;

  const [showModal, setShowModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [codeNumber, setCodeNumber] = useState("");
  const [countedTemplates, setCountedTemplates] = useState(new Set());

  // Subscriptions
  const { data: subscriptions } = useSubscriptionPlan();
  const subscriptionPlans = subscriptions?.cv_plan_subscription || [];

  // CV counts
  const { data } = useCvCount();
  const totalCount = data?.count;
  const viewCounts = data?.view_count || [];

  const getTemplateViewCount = (templateId) => {
    if (!Array.isArray(viewCounts)) return 0;

    const found = viewCounts.find(
      (item) => Number(item.template_no) === Number(templateId),
    );

    return Number(found?.view ?? 0);
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowModal(false);
    setShowInvoiceModal(true);
  };

  const applicant_id = localStorage.getItem("applicantId");

  const paymentData = {
    referenceNumber: codeNumber,
    applicantId: applicant_id,
    subscriptionId: selectedPlan?.id,
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    createSubscription(paymentData, {
      onSuccess: (data) => {
        Swal.fire({
          title: "Success!",
          text: data?.success || "Subscription created successfully",
          icon: "success",
          confirmButtonText: "OK",
        });

        setShowInvoiceModal(false);
        setCodeNumber("");
      },
      onError: (error) => {
        Swal.fire({
          title: "Error",
          text: error?.message || "Payment verification failed",
          icon: "error",
        });
      },
    });
  };

  const handlecvincrementSubmit = (templateId) => {
    const applicant_id = localStorage.getItem("applicantId");

    if (!templateId || !applicant_id) return;

    // 🚫 Prevent duplicate increments
    if (countedTemplates.has(templateId)) return;

    const formData = new FormData();
    formData.append("template_id", templateId);
    formData.append("view_count", 1);
    formData.append("applicant_id", applicant_id);

    incrementCvCount(formData);

    // ✅ mark as counted
    setCountedTemplates((prev) => new Set(prev).add(templateId));
  };

  return (
    <JobSeekerLayout>
      <Container className="py-4">
        <Row className="mb-3">
          <Col xs={12}>
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center">
              {/* Title and badge */}
              <h5 className="d-flex align-items-center gap-2 mb-2 mb-sm-0">
                <FaFileAlt
                  className="text-primary"
                  style={{ fontSize: "1.2rem" }}
                />
                <span className="fw-semibold">CV Templates</span>
                <Badge
                  bg="light"
                  text="dark"
                  className="ms-1 d-flex align-items-center"
                  style={{ fontSize: "0.9rem", padding: "0.35em 0.6em" }}
                >
                  <FaEye className="me-1" style={{ fontSize: "0.9rem" }} />
                  {totalCount || 0} Views
                </Badge>
              </h5>

              {/* CV Subscription Button */}
              <Button
                variant="outline-primary"
                className="d-flex align-items-center gap-1 px-2 py-1"
                style={{
                  fontSize: "0.8rem",
                  borderRadius: "15px",
                  whiteSpace: "nowrap",
                }}
                onClick={() => setShowModal(true)}
              >
                <FaCrown
                  className="text-warning"
                  style={{ fontSize: "1rem" }}
                />
                Subscription
              </Button>
            </div>
          </Col>
        </Row>

        {/* Modal for CV Subscription */}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          size="lg"
          centered
        >
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="d-flex align-items-center gap-3">
              <FaCrown className="text-warning" />
              <span className="fw-bold">CV Subscription Plans</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-0">
            <div className="text-center mb-4">
              <h5 className="text-muted">Choose the plan that works for you</h5>
            </div>

            <div className="row g-4 justify-content-center">
              {subscriptionPlans?.map((subscription, index) => (
                <div key={index} className="col-md-6 col-lg-4">
                  <Card
                    className={`h-100 border-${
                      index === 1 ? "primary" : "light"
                    } shadow-sm`}
                  >
                    <Card.Header
                      className={`bg-${
                        index === 1 ? "primary" : "light"
                      } text-${index === 1 ? "white" : "dark"} py-3`}
                    >
                      <h5 className="mb-0 fw-bold">
                        {subscription.name} Subscription
                      </h5>
                      {index === 1 && (
                        <span className="badge bg-warning text-dark mt-2">
                          Most Popular
                        </span>
                      )}
                    </Card.Header>
                    <Card.Body className="py-4">
                      <div className="mb-4">
                        <span className="fs-4 fw-bold">
                          {subscription.price?.toLocaleString("en-US")} Tsh
                        </span>
                        <span className="text-muted">/month</span>
                        <p className="small text-muted mb-0">
                          {subscription.duration}-day billing cycle
                        </p>
                      </div>

                      <ul className="list-unstyled text-start mb-4">
                        <li className="mb-3 d-flex align-items-start">
                          <span className="me-2 text-success">✓</span>
                          <span>Manage up to {subscription.cv_limit} CVs</span>
                        </li>
                        <li className="mb-3 d-flex align-items-start">
                          <span className="me-2 text-success">✓</span>
                          <span>{subscription.description}</span>
                        </li>
                        <li className="mb-3 d-flex align-items-start">
                          <span className="me-2 text-success">✓</span>
                          <span>{subscription.name} templates</span>
                        </li>
                        <li className="mb-3 d-flex align-items-start">
                          <span className="me-2 text-success">✓</span>
                          <span>{subscription.cv_limit} PDF downloads</span>
                        </li>
                        <li className="d-flex align-items-start">
                          <span className="me-2 text-success">✓</span>
                          <span>Priority support</span>
                        </li>
                      </ul>

                      <Button
                        variant={index === 1 ? "primary" : "outline-primary"}
                        size="lg"
                        className="w-100 mt-auto"
                        onClick={() => handleSelectPlan(subscription)}
                      >
                        {index === 1 ? "Get Premium" : "Get Started"}
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <small className="text-muted me-auto">
              * Cancel anytime with 30-day money back guarantee
            </small>
            <Button variant="light" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Invoice/Payment Modal */}
        <Modal
          show={showInvoiceModal}
          onHide={() => setShowInvoiceModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Payment Instructions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedPlan && (
              <>
                <div className="mb-4">
                  <h5>Invoice for {selectedPlan.name} Plan</h5>
                  <p className="mb-1">
                    Amount:{" "}
                    <strong>
                      {selectedPlan.price?.toLocaleString("en-US")} Tsh
                    </strong>
                  </p>
                  <p className="mb-1">Duration: {selectedPlan.duration} days</p>
                  <p>CV Limit: {selectedPlan.cv_limit}</p>
                </div>

                <div className="payment-instructions mb-4 p-3 bg-light rounded">
                  <h6 className="mb-3">Pay via Tigo Pesa:</h6>

                  {/* Tigo Lipa Number Image */}
                  <div className="payment-images-container mb-4">
                    <div className="d-flex flex-wrap justify-content-center align-items-center gap-4">
                      {/* First Image - Larger Size */}
                      <div className="text-center">
                        <img
                          src="/lipa_no/lipa1.jpg"
                          alt="Tigo Pesa Lipa Number"
                          className="img-fluid rounded border shadow-sm"
                          style={{ maxHeight: "250px", width: "auto" }}
                        />
                        <p className="mt-2 small text-muted">Payment Number</p>
                      </div>

                      {/* Second Image - Larger Size */}
                      <div className="text-center">
                        <img
                          src="/lipa_no/jinsi_ya_kulipa.jpg"
                          alt="How to Pay via Tigo Pesa"
                          className="img-fluid rounded border shadow-sm"
                          style={{ maxHeight: "250px", width: "auto" }}
                        />
                        <p className="mt-2 small text-muted">
                          Payment Instructions
                        </p>
                      </div>
                    </div>

                    <p className="text-center mt-3 small text-muted">
                      Scan or enter manually
                    </p>
                  </div>

                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <FaWhatsapp className="text-success me-2" size={20} />
                    <span>
                      Send payment code via WhatsApp: +255 714 059 160
                    </span>
                  </div>

                  <Form onSubmit={handlePaymentSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter Payment Code:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter code from payment"
                        value={codeNumber}
                        onChange={(e) => setCodeNumber(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? "Submitting..."
                        : "Submit Payment Verification"}
                    </Button>
                  </Form>
                </div>
              </>
            )}
          </Modal.Body>
        </Modal>

        <Row xs={2} md={3} lg={4} className="g-4">
          {TEMPLATES.map((template) => {
            const viewCount = getTemplateViewCount(template.id);

            return (
              <Col key={template.id} xs={6} md={4} lg={3} className="mb-4">
                <Card
                  className={`h-100 cursor-pointer ${
                    selectedTemplate === template.id
                      ? "border-primary border-2"
                      : ""
                  }`}
                  onClick={() => {
                    handleTemplateSelect(template.id);
                    handlecvincrementSubmit(template.id);
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={template.image}
                    className="p-3 bg-light object-fit-contain"
                    style={{ height: "200px" }}
                  />
                  <Card.Body className="text-center p-2">
                    <Card.Title className="fs-6 mb-1">
                      {template.name}
                    </Card.Title>
                    <div
                      className="d-flex justify-content-center align-items-center text-muted"
                      style={{ fontSize: "0.75rem" }}
                    >
                      <FaEye className="me-1" size={12} />
                      <span>{viewCount}</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        {/* Preview Modal */}
        <Modal
          show={showPreview}
          onHide={handleClosePreview}
          size="lg"
          centered
          scrollable
        >
          <Modal.Header closeButton>
            <Modal.Title>Preview Selected Template</Modal.Title>
          </Modal.Header>

          <Modal.Body
            style={{
              backgroundColor: "#f8f9fa",
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              padding: "1rem",
            }}
          >
            {PreviewComponent && <PreviewComponent />}
          </Modal.Body>

          <Modal.Footer>
            <div>
              <Button
                variant="outline-danger"
                onClick={handleClosePreview}
                className="me-2"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() =>
                  navigate("/jobseeker/home-cv", {
                    state: { template: selectedTemplateData.key },
                  })
                }
              >
                View
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </Container>
    </JobSeekerLayout>
  );
};

export default SampleTemplate;

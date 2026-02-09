import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";

const SubscriptionPaymentModal = ({
  selectedPlan,
  showInvoiceModal,
  setShowInvoiceModal,
}) => {
  const [codeNumber, setCodeNumber] = useState("");

  const applicant_id = localStorage.getItem("applicantId");

  const paymentData = {
    referenceNumber: codeNumber,
    applicantId: applicant_id,
    subscriptionId: selectedPlan?.id,
  };

  const handlePaymentSubmit = () => {};

  return (
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
                <span>Send payment code via WhatsApp: +255 714 059 160</span>
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
                <Button variant="primary" type="submit" className="w-100">
                  Submit Payment Verification
                </Button>
              </Form>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default SubscriptionPaymentModal;

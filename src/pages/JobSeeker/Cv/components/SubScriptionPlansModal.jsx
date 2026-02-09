import React from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { FaCrown } from "react-icons/fa";
import { useSubscriptionPlan } from "../../../../hooks/useCv";

const SubScriptionPlansModal = ({
  showModal,
  setShowModal,
  handleSelectPlan,
}) => {
  const { data: subscriptions } = useSubscriptionPlan();
  const subscriptionPlans = subscriptions?.cv_plan_subscription || [];

  return (
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
                  className={`bg-${index === 1 ? "primary" : "light"} text-${
                    index === 1 ? "white" : "dark"
                  } py-3`}
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
  );
};

export default SubScriptionPlansModal;

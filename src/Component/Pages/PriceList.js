import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Alert, Badge } from "react-bootstrap";
import { getPackagePrice } from "../../Api/Universal/UniversalApi";
import { usePackagePrice } from "../../hooks/useUniversal";

const styles = {
  section: { padding: "20px 0" },
  heading: {
    fontWeight: 600,
    fontSize: "1.75rem",
    marginBottom: "1.5rem",
    color: "#212529",
  },
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
    transition: "0.3s ease",
  },
  cardHeader: {
    backgroundColor: "#fff",
    borderBottom: "1px solid #f0f0f0",
    textAlign: "center",
    padding: "24px 16px",
  },
  planName: {
    fontSize: "1.25rem",
    fontWeight: 600,
    marginBottom: 4,
    color: "#343a40",
  },
  planPrice: {
    fontSize: "1.1rem",
    color: "#6c757d",
  },
  planFor: {
    fontSize: "0.9rem",
    color: "#999",
    marginTop: 4,
  },
  body: { padding: 24 },
  featureItem: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.95rem",
    color: "#444",
    marginBottom: 10,
  },
  checkIcon: {
    color: "#0d6efd",
    marginRight: 8,
    fontSize: "0.9rem",
  },
  footer: {
    borderTop: "1px solid #f0f0f0",
    padding: 16,
    backgroundColor: "#fafafa",
    textAlign: "center",
  },
  button: {
    width: "100%",
    borderRadius: 6,
  },
};

const PriceList = () => {
  const { data: plans = [], error, isLoading } = usePackagePrice();

  return (
    <section style={styles.section}>
      <Row className="mb-4">
        <Col>
          <h2 style={styles.heading}>Employer Subscription Plans</h2>

          {error && (
            <Alert
              variant="danger"
              className="d-flex justify-content-between align-items-center"
            >
              <div>{error.message || "Failed to load subscription plans."}</div>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </Alert>
          )}
        </Col>
      </Row>

      <Row>
        {/* Loading state */}
        {isLoading && (
          <Col>
            <Alert variant="info">Loading subscription plans...</Alert>
          </Col>
        )}

        {/* No plans found */}
        {!isLoading && plans.length === 0 && !error && (
          <Col>
            <Alert variant="info">
              No subscription plans available at the moment.
            </Alert>
          </Col>
        )}

        {/* Render plans */}
        {plans.map((plan) => (
          <Col md={4} className="mb-4" key={plan?.id}>
            <Card style={styles.card} className="h-100">
              <div style={styles.cardHeader}>
                <div style={styles.planName}>
                  {plan?.name ?? "Unnamed Plan"}
                </div>
                <div style={styles.planPrice}>
                  {plan?.plan_price?.price === 0 ? (
                    <Badge bg="light" text="dark">
                      Free
                    </Badge>
                  ) : (
                    `${plan?.plan_price?.price?.toLocaleString() ?? "N/A"}/mo`
                  )}
                </div>
                <div style={styles.planFor}>{plan?.plan_for ?? "N/A"}</div>
              </div>

              <Card.Body style={styles.body}>
                {plan?.plan_features?.length > 0 ? (
                  plan.plan_features.map((pf, index) => (
                    <div key={pf.id} style={styles.featureItem}>
                      <i className="fa fa-check" style={styles.checkIcon}></i>
                      <span>{index + 1}. </span>&nbsp;
                      {pf?.features?.name || "Unnamed Feature"}
                    </div>
                  ))
                ) : (
                  <div style={styles.featureItem}>No features listed.</div>
                )}
              </Card.Body>

              <div style={styles.footer}>
                {plan?.is_trial ? (
                  <Button variant="outline-secondary" style={styles.button}>
                    Start Trial
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    href="https://api.ekazi.co.tz/employer/subscription/plan/show"
                    style={styles.button}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buy Now
                  </Button>
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default PriceList;

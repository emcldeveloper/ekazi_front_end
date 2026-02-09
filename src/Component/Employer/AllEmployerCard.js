import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const AllEmployerCard = ({ jobCompanies }) => {
  const renderLocation = (client) => {
    const locationParts = [];

    if (
      client.client_location?.sub_location &&
      client.client_location.sub_location !== "1"
    ) {
      locationParts.push(client.client_location.sub_location);
    }
    if (client.client_location?.region?.region_name) {
      locationParts.push(client.client_location.region.region_name);
    }
    if (client.client_location?.region?.country?.name) {
      locationParts.push(client.client_location.region.country.name);
    }

    return locationParts.join(", ") || "Location not available";
  };

  return (
    <Container className="py-4">
      <Row>
        {jobCompanies.map((client) => (
          <Col key={client.id} xs={12} className="mb-4">
            <Card className="border-0 shadow-sm rounded-3">
              <Card.Body>
                <Row className="align-items-center g-3">
                  {/* Logo */}
                  <Col xs={3} md={2} className="text-center">
                    <Link to={`/employer/details`} state={{ client }}>
                      <img
                        src={
                          client.logo
                            ? `https://api.ekazi.co.tz/${client.logo}`
                            : "/img/default.png"
                        }
                        alt={client.client_name}
                        className="img-fluid border rounded"
                        style={{
                          height: "70px",
                          width: "70px",
                          objectFit: "contain",
                        }}
                      />
                    </Link>
                  </Col>

                  {/* Info */}
                  <Col xs={6} md={8}>
                    <h6 className="mb-1 text-primary text-truncate">
                      {client.client_name}
                    </h6>

                    <p className="mb-1 text-muted small">
                      {client.industry?.industry_name ||
                        "Industry not available"}
                    </p>

                    <p className="mb-0 text-muted small">
                      {renderLocation(client)}
                    </p>
                  </Col>

                  {/* View Button */}
                  <Col xs={3} md={2} className="text-end">
                    <Link
                      to={`/employer/details`}
                      state={{ client }}
                      className="btn btn-outline-primary btn-sm"
                    >
                      View
                    </Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AllEmployerCard;

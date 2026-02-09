import { useState } from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import {
  FaIndustry,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";
import JoinModal from "../Forms/Employer/Contants/JoinModal";
import MessageModal from "../Forms/Employer/Contants/MessageModal";
import RateModal from "../Forms/Employer/Contants/RateModal";
import { DEFAULT_LOGO, IMG_BASE } from "../../helpers/img";

const EmployerProfileCard = ({ client, isAuthenticated }) => {
  const [showJoin, setShowJoin] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showRate, setShowRate] = useState(false);

  if (!client) return null;

  const logoUrl = client.logo ? `${IMG_BASE}${client.logo}` : `${DEFAULT_LOGO}`;

  const createdAt = client.created_at
    ? new Date(client.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const region = client.client_location?.region?.region_name;
  const country = client.client_location?.region?.country?.name;
  const location = client.client_location?.sub_location;

  const phone = client.client_phones?.[0]?.phone_number;
  const email = client.client_emails?.[0]?.client_email;
  const website = client.client_description?.website;

  return (
    <>
      <Card className="shadow-sm p-4 mb-4">
        <Row className="align-items-center g-4">
          {/* Logo */}
          <Col xs={12} md={2} className="text-md-start text-center">
            <Image
              src={logoUrl}
              alt="Client Logo"
              fluid
              roundedCircle
              style={{ maxWidth: "80px", height: "auto" }}
            />
          </Col>

          {/* Info */}
          <Col xs={12} md={6}>
            <h5 className="fw-bold text-uppercase text-primary mb-2">
              {client.client_name}
            </h5>
            <p className="mb-1 text-muted d-flex align-items-center">
              <FaIndustry className="me-2 text-primary" />
              {client.industry?.industry_name || "Industry not available"}
            </p>
            <p className="mb-0 text-muted d-flex align-items-center">
              <FaClock className="me-2 text-primary" />
              {createdAt}
            </p>
          </Col>

          {/* Contact */}
          <Col xs={12} md={4}>
            <p className="mb-1 text-muted d-flex align-items-center">
              <FaMapMarkerAlt className="me-2 text-primary" />
              {location}, {region}, {country}
            </p>

            {client.client_name === "Exact Manpower Consulting Ltd" && (
              <>
                {phone && (
                  <p className="mb-1 text-muted d-flex align-items-center">
                    <FaPhone className="me-2 text-primary" />
                    {phone}
                  </p>
                )}
                {email && (
                  <p className="mb-1 text-muted d-flex align-items-center">
                    <FaEnvelope className="me-2 text-primary" />
                    {email}
                  </p>
                )}
              </>
            )}

            {website && (
              <p className="mb-0 text-muted d-flex align-items-center">
                <FaGlobe className="me-2 text-primary" />
                <a
                  href={`https://${website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-decoration-none"
                >
                  {website}
                </a>
              </p>
            )}
          </Col>
        </Row>

        {/* Action Buttons */}
        <Row className="mt-4">
          <Col xs={12} md={4} className="mb-2">
            <div
              className="border rounded text-center fw-semibold py-2"
              style={{ cursor: "pointer" }}
              onClick={() => setShowJoin(true)}
            >
              Join Us
            </div>
          </Col>
          <Col xs={12} md={4} className="mb-2">
            <div
              className="border rounded text-center fw-semibold py-2"
              style={{ cursor: "pointer" }}
              onClick={() => setShowMessage(true)}
            >
              Send Message
            </div>
          </Col>
          <Col xs={12} md={4} className="mb-2">
            <div
              className="border rounded text-center fw-semibold py-2"
              style={{ cursor: "pointer" }}
              onClick={() => setShowRate(true)}
            >
              {isAuthenticated ? "Rate" : "Rate"}
            </div>
          </Col>
        </Row>
      </Card>

      {/* Modals */}
      <JoinModal
        show={showJoin}
        onHide={() => setShowJoin(false)}
        client={client}
      />
      <MessageModal
        show={showMessage}
        onHide={() => setShowMessage(false)}
        clientId={client.id}
      />
      <RateModal
        show={showRate}
        onHide={() => setShowRate(false)}
        clientId={client.id}
      />
    </>
  );
};

export default EmployerProfileCard;

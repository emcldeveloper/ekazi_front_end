import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { PencilFill } from "react-bootstrap-icons";
import { Pencil } from "react-bootstrap-icons";

const PersonalInfo = ({
  profile,
  address,
  setShowContactModal,
  setShowBasicInfoModal,
}) => {
  return (
    <Container fluid className="mt-16">
      <Row>
        <Col md={12}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="mb-0 fw-bold">PERSONAL INFORMATION</h5>

            <Pencil
              role="button"
              className="text-muted"
              style={{ fontSize: "1.2rem" }}
              onClick={() => setShowBasicInfoModal(true)}
            />
          </div>

          <div className="divider mb-2" />

          <p className="text-lg mb-0">
            {profile?.first_name} {profile?.middle_name} {profile?.last_name}
          </p>

          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
            <span>
              {address?.region_name} {address?.name || "Tanzania"}
            </span>
            <span className="mx-2">|</span>
            <Button
              variant="link"
              className="small"
              onClick={() => setShowContactModal(true)}
            >
              View Contacts
            </Button>
          </div>

          {profile?.created_at && (
            <small className="text-muted">
              Member since {moment(profile.created_at).format("YYYY")}
            </small>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PersonalInfo;

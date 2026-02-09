import { Modal, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const ContactModal = ({ profile, address, phone, show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Contact Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={1}>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </Col>
          <Col xs={11}>
            {address?.region_name}, {address?.name}
          </Col>
        </Row>

        <Row className="mt-2">
          <Col xs={1}>
            <FontAwesomeIcon icon={faPhone} />
          </Col>
          {/* <Col xs={11}>{`${address?.country_code} ${phone}`}</Col> */}
          <Col xs={11}>{phone}</Col>
        </Row>

        <Row className="mt-2">
          <Col xs={1}>
            <FontAwesomeIcon icon={faEnvelope} />
          </Col>
          <Col xs={11}>{profile?.email}</Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ContactModal;

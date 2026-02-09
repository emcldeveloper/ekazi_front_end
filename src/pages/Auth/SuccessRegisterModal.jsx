import { Modal, Button } from "react-bootstrap";

const SuccessModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registration Successful</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-success fw-bold">
          Your registration was successful. Check your email for a confirmation
          link.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;

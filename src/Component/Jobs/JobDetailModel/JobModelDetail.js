import { Modal } from "react-bootstrap";
import JobDetails from "../../../pages/home/components/JobDetails";

const JobDetailModal = ({ job, show, onHide, appliedJobIds }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      {/* Modal content same as above */}
      <Modal.Header closeButton>
        <Modal.Title> Job Description</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <JobDetails job={job} appliedJobIds={appliedJobIds} />
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default JobDetailModal;

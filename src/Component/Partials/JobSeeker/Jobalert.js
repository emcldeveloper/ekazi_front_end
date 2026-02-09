import { Card, Button } from "react-bootstrap";
import { useState } from "react";
import CreateJobAlertModal from "../../Forms/JobSeeker/Jobalertmodel";

const JobAlertsSection = ({ subscription }) => {
  const [showAlertModal, setShowAlertModal] = useState(false);

  const handleOpen = () => setShowAlertModal(true);
  const handleClose = () => setShowAlertModal(false);

  return (
    <>
      {/* Job Alerts Section */}
      <Card className="shadow-sm">
        <Card.Body>
          <h6 className="fw-bold mb-2">Job Alerts</h6>
          <p className="text-muted small mb-3">
            Get notified when new jobs match your profile.
          </p>
       <Button
          
            className="w-100"
            onClick={handleOpen}
            style={{ backgroundColor: "rgb(211, 99, 20)", color: "rgb(255, 255, 255)" }}
            >
            Create Job Alert
            </Button>

        </Card.Body>
      </Card>

      {/* Job Alert Modal */}
      <CreateJobAlertModal
        show={showAlertModal}
        onHide={handleClose}
        subscription={subscription}
      />
    </>
  );
};

export default JobAlertsSection;

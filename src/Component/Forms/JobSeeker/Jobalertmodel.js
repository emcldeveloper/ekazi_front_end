import { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import Select from "react-select";
import Swal from "sweetalert2";
import axios from "axios";

const CreateJobAlertModal = ({ show, onHide, subscription }) => {
  const applicant_id = localStorage.getItem("applicantId");

  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [frequency, setFrequency] = useState("daily");

  const categoryOptions = [
    { value: "IT", label: "Information Technology" },
    { value: "Finance", label: "Finance" },
    { value: "Engineering", label: "Engineering" },
    { value: "Healthcare", label: "Healthcare" },
  ];

  const regionOptions = [
    { value: "Dar es Salaam", label: "Dar es Salaam" },
    { value: "Arusha", label: "Arusha" },
    { value: "Dodoma", label: "Dodoma" },
    { value: "Mwanza", label: "Mwanza" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const sendData = {
        applicant_id,
        alert_type: alertType,
        category,
        region,
        frequency,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}applicant/store-job-alert`,
        sendData
      );

      if (response.status === 200) {
        Swal.fire("Success!", "Job alert created successfully!", "success");
        onHide();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to create job alert.", "error");
    } finally {
      setLoading(false);
    }
  };

  const isPremium = subscription?.verify === 1;
  

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Job Alert</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Subscription info */}
          {!isPremium && (
            <Alert variant="info">
              Upgrade your subscription to access personalized job alerts.
            </Alert>
          )}

          {/* Alert Type */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={4}>
              Alert Type
            </Form.Label>
            <Col sm={8}>
              <Form.Select
                value={alertType}
                onChange={(e) => setAlertType(e.target.value)}
                required
              >
                <option value="">-- Select Type --</option>
                <option value="match">Job Match (Recommended)</option>
                <option value="general">General Job Category</option>
              </Form.Select>
            </Col>
          </Form.Group>

          {/* Show filters if "general" selected */}
          {alertType === "general" && (
            <>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4}>
                  Category
                </Form.Label>
                <Col sm={8}>
                  <Select
                    options={categoryOptions}
                    value={
                      categoryOptions.find((opt) => opt.value === category) ||
                      null
                    }
                    onChange={(selected) => setCategory(selected?.value || "")}
                    placeholder="Select category..."
                    isClearable
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4}>
                  Region
                </Form.Label>
                <Col sm={8}>
                  <Select
                    options={regionOptions}
                    value={
                      regionOptions.find((opt) => opt.value === region) || null
                    }
                    onChange={(selected) => setRegion(selected?.value || "")}
                    placeholder="Select region..."
                    isClearable
                  />
                </Col>
              </Form.Group>
            </>
          )}

          {/* Frequency */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={4}>
              Frequency
            </Form.Label>
            <Col sm={8}>
              <Form.Select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </Form.Select>
            </Col>
          </Form.Group>

          {/* Footer */}
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Saving...
                </>
              ) : (
                "Save Alert"
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateJobAlertModal;

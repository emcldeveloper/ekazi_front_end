import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Card, Form, Button, ListGroup } from "react-bootstrap";
import {
  FaUser,
  FaPaperclip,
  FaEnvelope,
  FaFileAlt,
  FaPhone,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useApplicationByEmail, useJobDetail } from "../../hooks/useJobs";

const CompactCoverLetterForm = () => {
  const { state } = useLocation();
  const jobId = state?.jobId;

  const { data: job } = useJobDetail(jobId);
  const { mutate: applyByEmail, isPending: isLoading } =
    useApplicationByEmail();

  const [filePreviews, setFilePreviews] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      from: "",
      notes: "",
      attachments: [],
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("job_id", jobId);
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("from", data.from);
    formData.append("notes", data.notes);

    if (data.attachments?.length) {
      data.attachments.forEach((file) => {
        formData.append("attachments[]", file); // Correct format for Laravel
      });
    }

    applyByEmail(formData, {
      onSuccess: (res) => {
        const message = res?.success || "";
        if (message.toLowerCase().includes("already applied")) {
          Swal.fire({
            icon: "info",
            title: "Already Applied",
            text: message,
          });
          return;
        }
        Swal.fire({
          icon: "success",
          title: "Application Sent",
          text: message || "Your application has been submitted successfully.",
        });
      },
      onError: (error) => {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text:
            error?.response?.data?.message ||
            "Something went wrong. Please try again.",
        });
      },
    });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setValue("attachments", files); // Update react-hook-form
    setFilePreviews(files.map((file) => file.name)); // Preview names
  };

  return (
    <Row className="justify-content-center">
      <Col lg={12} xl={12}>
        <Card className="rounded-2">
          <Card.Header
            className="text-white border-0 rounded-top-2 py-2"
            style={{ backgroundColor: "#2E58A6" }}
          >
            <h5 className="mb-0 p-2 d-flex align-items-center justify-content-center">
              <FaFileAlt className="me-1" />
              Professional Cover Letter
            </h5>
          </Card.Header>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Card.Body className="p-3">
              {/* Sender Info */}
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">
                  YOUR INFO
                </Form.Label>

                <div className="d-flex align-items-center mb-2">
                  <FaUser className="me-1 text-primary" />
                  <Form.Control
                    {...register("name", { required: "Full name is required" })}
                    type="text"
                    placeholder="Full Name"
                    className="border-0 border-bottom rounded-0 ps-0"
                  />
                </div>
                {errors.name && (
                  <small className="text-danger">{errors.name.message}</small>
                )}

                <div className="d-flex align-items-center mb-2">
                  <FaPhone className="me-1 text-primary" />
                  <Form.Control
                    {...register("phone", {
                      required: "Phone number is required",
                    })}
                    type="text"
                    placeholder="Your Phone"
                    className="border-0 border-bottom rounded-0 ps-0"
                  />
                </div>
                {errors.phone && (
                  <small className="text-danger">{errors.phone.message}</small>
                )}

                <div className="d-flex align-items-center mb-2">
                  <FaEnvelope className="me-1 text-primary" />
                  <Form.Control
                    {...register("from", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email",
                      },
                    })}
                    type="email"
                    placeholder="Your Email"
                    className="border-0 border-bottom rounded-0 ps-0"
                  />
                </div>
                {errors.from && (
                  <small className="text-danger">{errors.from.message}</small>
                )}
              </Form.Group>

              {/* Recipient Info */}
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">
                  RECIPIENT INFO
                </Form.Label>
                <div className="d-flex align-items-center">
                  <FaEnvelope className="me-1 text-primary" />
                  <Form.Control
                    value={job?.[0]?.job_email?.email || ""}
                    readOnly
                    className="border-0 border-bottom rounded-0 ps-0 bg-light"
                  />
                </div>
              </Form.Group>

              {/* Cover Letter */}
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">
                  COVER LETTER
                </Form.Label>
                <Form.Control
                  as="textarea"
                  {...register("notes", {
                    required: "Cover letter is required",
                  })}
                  placeholder="Write your cover letter here..."
                  className="border rounded-1"
                  style={{ minHeight: "200px" }}
                />
                {errors.notes && (
                  <small className="text-danger">{errors.notes.message}</small>
                )}
              </Form.Group>

              {/* Attachments */}
              <Form.Group className="mb-3 mt-2 p-2 bg-light rounded-2">
                <h5 className="mb-1 d-flex align-items-center small">
                  <FaPaperclip className="me-1 text-primary" />
                  Attachments
                </h5>
                <Form.Label className="small fw-bold">
                  Attach resume (PDF/DOCX)
                  <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="border-dashed small"
                  size="sm"
                />
                <Form.Text className="d-block small text-muted">
                  Max 5MB each. You can select multiple files.
                </Form.Text>

                {filePreviews.length > 0 && (
                  <ListGroup className="mt-2">
                    {filePreviews.map((name, i) => (
                      <ListGroup.Item key={i}>{name}</ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Form.Group>

              {/* Signature Preview */}
              <div>
                <p className="mb-1 small">Thank you for your consideration.</p>
                <p className="mb-1 small">Best regards,</p>
                <p className="mb-0 fw-bold small">
                  {getValues("name") || "Your Name"}
                </p>
                <p className="small text-muted mb-0">
                  {getValues("from") || "your@email.com"}
                </p>
              </div>
            </Card.Body>

            <Card.Footer className="bg-light border-0 rounded-bottom-2 py-2">
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  Will be sent to hiring manager
                </small>
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </Card.Footer>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default CompactCoverLetterForm;

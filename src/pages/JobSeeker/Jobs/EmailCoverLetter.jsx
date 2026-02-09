import React from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import {
  FaUser,
  FaPaperclip,
  FaEnvelope,
  FaFileAlt,
  FaPhone,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useApplicationByEmail, useJobDetail } from "../../../hooks/useJobs";
import Swal from "sweetalert2";

const EmailCoverLetter = () => {
  const { state } = useLocation();
  const jobId = state?.jobId;

  const { data: job } = useJobDetail(jobId);

  const { mutate: applyByEmail, isPending: isLoading } =
    useApplicationByEmail();

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
      attachment: [],
    },
  });

  // Watch for live updates (signature preview)
  watch();

  const onSubmit = (data) => {
    // Convert FileList to array
    const files =
      data.attachments instanceof FileList
        ? Array.from(data.attachments)
        : data.attachments;

    applyByEmail(
      {
        job_id: jobId,
        name: data.name,
        phone: data.phone,
        from: data.from,
        notes: data.notes,
        attachments: files,
      },
      {
        onSuccess: (res) => {
          Swal.fire({
            icon: "success",
            title: "Application Sent",
            text: res?.message || "Submitted successfully",
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
      }
    );
  };

  return (
    <Row className="justify-content-center">
      <Col lg={8} xl={8}>
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
              <Form.Group className="mb-2">
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
              <Form.Group className="mb-2">
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
              <div className="py-2">
                <p className="small text-muted mb-1">
                  RE: {job?.[0]?.job_position?.position_name}
                </p>
                <Form.Group className="mb-2">
                  <Form.Control
                    as="textarea"
                    {...register("notes", {
                      required: "Cover letter is required",
                    })}
                    placeholder="Write your cover letter here..."
                    className="border rounded-1"
                    style={{ minHeight: "200px" }}
                  />
                </Form.Group>
                {errors.notes && (
                  <small className="text-danger">{errors.notes.message}</small>
                )}
              </div>

              {/* Attachments */}
              <div className="mt-2 p-2 bg-light rounded-2">
                <h5 className="mb-1 d-flex align-items-center small">
                  <FaPaperclip className="me-1 text-primary" />
                  Attachments (PDF / DOC / DOCX)
                </h5>
                <Form.Group>
                  <Form.Control
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setValue("attachments", e.target.files)}
                    className="border-dashed small"
                  />
                  <Form.Text className="d-block small text-muted">
                    Max 5MB each. Combine files if needed.
                  </Form.Text>
                </Form.Group>
              </div>
            </Card.Body>

            <Card.Footer className="bg-light border-0 rounded-bottom-2 py-2">
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  Will be sent to hiring manager
                </small>
                <Button variant="primary" size="sm" type="submit">
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

export default EmailCoverLetter;

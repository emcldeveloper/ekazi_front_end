import Swal from "sweetalert2";
import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import { BsTelephoneFill, BsEnvelopeFill, BsGeoAltFill } from "react-icons/bs";
import { useForm } from "react-hook-form";

import { useContactUs } from "../../hooks/useContactUs";

const ContactModal = ({ show, handleClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useContactUs();

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        Swal.fire("Success", "Message sent successfully!", "success");
        reset();
        handleClose();
      },
      onError: (error) => {
        Swal.fire(
          "Error",
          error?.response?.data?.message ||
            "Failed to send message. Please try again later.",
          "error",
        );
      },
    });
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Contact Us</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          {/* LEFT SIDE - CONTACT INFO */}
          <Col md={6} className="mb-3">
            <h6 className="mb-3">Get in Touch</h6>

            <div className="d-flex align-items-start mb-3">
              <BsTelephoneFill className="me-2 text-success mt-1" />
              <div>
                <strong>Hotline:</strong>
                <ul className="mb-0 ps-3">
                  <li>+255 677 400 206</li>
                  <li>+255 677 400 205</li>
                  <li>+255 677 014 718</li>
                </ul>
              </div>
            </div>

            <div className="d-flex align-items-start mb-3">
              <BsEnvelopeFill className="me-2 text-primary mt-1" />
              <div>
                <strong>Email:</strong>
                <br />
                <a
                  href="mailto:info@ekazi.co.tz"
                  className="text-decoration-none text-dark"
                >
                  info@ekazi.co.tz
                </a>
              </div>
            </div>

            <div className="d-flex align-items-start">
              <BsGeoAltFill className="me-2 text-danger mt-1" />
              <div>
                <strong>Address:</strong>
                <br />
                3rd Floor, The Arcade,
                <br />
                Mwai Kibaki Rd, Mikocheni,
                <br />
                P.O.Box 105061,
                <br />
                Dar es Salaam, Tanzania.
              </div>
            </div>
          </Col>

          {/* RIGHT SIDE - FORM */}
          <Col md={6}>
            <h6 className="mb-3">Send Us a Message</h6>

            <Form onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Your Name"
                  isInvalid={!!errors.name}
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Your Email"
                  isInvalid={!!errors.email}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Message */}
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Your Message"
                  isInvalid={!!errors.message}
                  {...register("message", {
                    required: "Message is required",
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.message?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                variant="success"
                type="submit"
                className="w-100"
                disabled={isPending}
              >
                {isPending ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Send Message"
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ContactModal;

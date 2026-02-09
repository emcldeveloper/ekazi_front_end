import React from 'react';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { BsTelephoneFill, BsEnvelopeFill, BsGeoAltFill } from 'react-icons/bs';
import useContactForm from '../../hooks/pages/useContactForm';

const ContactModal = ({ show, handleClose }) => {
  

  const { formData, handleChange, handleSubmit, loading } = useContactForm(
    () => {
      alert('Message sent successfully!');
      handleClose();
    },
    () => {
      alert('Failed to send message. Please try again later.');
    }
  );

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Contact Us</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
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
                <strong>Email:</strong><br />
                <a href="mailto:info@ekazi.co.tz" className="text-decoration-none text-dark">
                  info@ekazi.co.tz
                </a>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <BsGeoAltFill className="me-2 text-danger mt-1" />
              <div>
                <strong>Address:</strong><br />
                3rd Floor, The Arcade,<br />
                Mwai Kibaki Rd, Mikocheni,<br />
                P.O.Box 105061,<br />
                Dar es Salaam, Tanzania.
              </div>
            </div>
          </Col>

          <Col md={6}>
            <h6 className="mb-3">Send Us a Message</h6>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formMessage" className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Send Message'}
              </Button>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ContactModal;

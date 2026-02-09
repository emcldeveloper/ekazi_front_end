import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const MessageModal = ({ show, onHide, onSubmit, clientId }) => {
  const [formData, setFormData] = useState({
    client_id: clientId || '',
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass form data to parent or handle API submission
    onSubmit(formData);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Send Us a Message</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Modal.Body>
          <Form.Control type="hidden" name="client_id" value={formData.client_id} />

          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Your Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="subject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              name="subject"
              placeholder="Enter subject"
              required
              value={formData.subject}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="message">
            <Form.Label>Your Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="message"
              placeholder="Type your message here"
              required
              value={formData.message}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button type="submit" style={{ backgroundColor: '#D36323', color: '#fff' }}>Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default MessageModal;

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const RateModal = ({ show, onHide, onSubmit, clientId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      client_id: clientId,
      rating,
      comment,
    };
    onSubmit(payload);
    onHide();
  };

  const starStyle = {
    cursor: 'pointer',
    fontSize: '24px',
    color: '#ccc',
    marginRight: '10px',
    transition: 'color 0.2s',
  };

  const selectedStyle = {
    color: '#D36323',
  };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Modal.Header closeButton>
          <Modal.Title>Rate Your Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="hidden" value={clientId} />

          {/* Star Rating */}
          <div className="form-group mb-4">
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {[1, 2, 3, 4, 5].map((val) => (
                <label
                  key={val}
                  style={{
                    ...starStyle,
                    ...(rating === val ? selectedStyle : {}),
                  }}
                >
                  <input
                    type="radio"
                    name="rating"
                    value={val}
                    onChange={() => setRating(val)}
                    style={{ display: 'none' }}
                  />
                  {'★'.repeat(val)}
                </label>
              ))}
            </div>
          </div>

          {/* Comment */}
          <Form.Group controlId="comment">
            <Form.Label>Your Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter your feedback..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button type="submit" style={{ backgroundColor: '#D36323', color: '#fff' }}>
            Submit Rating
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RateModal;

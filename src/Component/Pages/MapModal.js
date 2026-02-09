import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MapModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Our Location</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: '450px', padding: 0 }}>
        <iframe
          title="Ekazi Map"
          src="https://www.google.com/maps?q=The%20Arcade%2C%20Mwai%20Kibaki%20Road%2C%20Mikocheni%2C%20Dar%20es%20Salaam%2C%20Tanzania&output=embed"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </Modal.Body>
    </Modal>
  );
};

export default MapModal;

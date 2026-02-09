import React from "react";
import { Modal } from "react-bootstrap";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaLinkedin,
  FaInstagramSquare,
  FaYoutube,
} from "react-icons/fa";

const iconMap = {
  1: FaFacebookSquare,
  2: FaInstagramSquare,
  3: FaLinkedin,
  4: FaYoutube,
  5: FaTwitterSquare,
};

const JoinModal = ({ show, onHide, client }) => {
  if (!client || !client.clientSocialMedia) return null;

  return (
    <Modal show={show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Follow Us</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul className="list-inline text-center">
          {client.clientSocialMedia.map(({ social_id, url_media, id }) => {
            const IconComponent = iconMap[social_id];
            if (!IconComponent) return null;

            // Ensure URL has protocol (http/https)
            let href = url_media;
            if (!/^https?:\/\//i.test(href)) {
              href = "https://" + href;
            }

            return (
              <li className="list-inline-item" key={id}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <IconComponent style={{ fontSize: 40, color: "#D36323" }} />
                </a>
              </li>
            );
          })}
        </ul>
      </Modal.Body>
    </Modal>
  );
};

export default JoinModal;

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaFilePdf, FaFileUpload, FaTimes } from 'react-icons/fa';

const ContractCell = ({ job, onUpload }) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(job.id, selectedFile);
      setShowUploadModal(false);
      setSelectedFile(null);
    }
  };

  return (
    <>
      <td className="text-center align-middle">
        {job.applicant_contract ? (
          <a
            href={`/applicant/view/contract/${job.applicant_contract.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary btn-sm"
            title="View Contract"
          >
            <FaFilePdf className="me-1" /> View
          </a>
        ) : (
          <Button 
            variant="outline-secondary" 
            size="sm"
            onClick={() => setShowUploadModal(true)}
          >
            <FaFileUpload className="me-1" /> Contract
          </Button>
        )}
      </td>

      {/* Upload Modal */}
      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Contract</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Select PDF File</Form.Label>
            <Form.Control 
              type="file" 
              accept=".pdf" 
              onChange={handleFileChange}
            />
            {selectedFile && (
              <div className="mt-2 d-flex align-items-center">
                <FaFilePdf className="me-2" />
                <span>{selectedFile.name}</span>
                <Button 
                  variant="link" 
                  size="sm" 
                  onClick={() => setSelectedFile(null)}
                  className="ms-2 text-danger"
                >
                  <FaTimes />
                </Button>
              </div>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowUploadModal(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContractCell;
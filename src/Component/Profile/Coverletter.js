import React, { useState } from "react";
import { jsPDF } from "jspdf";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
  Accordion,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CoverLetterCreator = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    yourAddress: "",
    email: "",
    phone: "",
    date: "",
    hiringManagerName: "",
    position: "",
    companyName: "",
    companyAddress: "",
    letterContent: "",
  });

  const [errors, setErrors] = useState({});
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.position) newErrors.position = "Position is required";
    if (!formData.hiringManagerName)
      newErrors.hiringManagerName = "Hiring manager name is required";
    if (!formData.letterContent)
      newErrors.letterContent = "Letter content is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleDownload = () => {
    if (!validateForm()) {
      setIsPreviewVisible(true);
      return;
    }

    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const marginLeft = 20;
      const marginTop = 20;
      const lineHeight = 10;
      const pageWidth = 210 - marginLeft * 2;
      const pageHeight = 297;

      // Position header
      const positionHeader = `RE: APPLICATION FOR ${formData.position.toUpperCase()} POSITION`;

      // Prepare the content before the position header
      const content = `
        ${formData.firstName} ${formData.lastName}
        ${formData.yourAddress}
        ${formData.email}
        ${formData.phone}
        ${formData.date}
  
        ${formData.hiringManagerName}
        ${formData.companyName}
        ${formData.companyAddress}
  
        Dear Mr/Mrs ${formData.hiringManagerName},
      `;

      const lines = doc.splitTextToSize(content, pageWidth);

      let cursorY = marginTop;

      // Set font to normal for the content before the position header
      doc.setFont("helvetica", "normal");
      lines.forEach((line) => {
        if (cursorY + lineHeight > pageHeight - marginTop) {
          doc.addPage();
          cursorY = marginTop;
        }
        doc.text(line, marginLeft, cursorY);
        cursorY += lineHeight;
      });

      // Add space after sender info before the recipient's greeting and position header
      cursorY += 2;

      // Add position header as bold and underlined
      doc.setFont("helvetica", "bold");
      doc.text(positionHeader, marginLeft, cursorY);

      // Add underline for the position header
      const positionHeaderWidth = doc.getTextWidth(positionHeader);
      doc.setDrawColor(0, 0, 0);
      doc.line(
        marginLeft,
        cursorY + 1,
        marginLeft + positionHeaderWidth,
        cursorY + 1,
      );

      cursorY += lineHeight + 2;

      // Set font back to normal for the letter content
      doc.setFont("helvetica", "normal");

      // Continue with the letter content
      const letterContent = `${formData.letterContent}\n\nSincerely,\n${formData.firstName} ${formData.lastName}`;
      const letterLines = doc.splitTextToSize(letterContent, pageWidth);

      letterLines.forEach((line) => {
        if (cursorY + lineHeight > pageHeight - marginTop) {
          doc.addPage();
          cursorY = marginTop;
        }
        doc.text(line, marginLeft, cursorY);
        cursorY += lineHeight;
      });

      doc.save("Cover_Letter.pdf");
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (error) {}
  };

  const togglePreview = () => {
    setIsPreviewVisible(!isPreviewVisible);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={12}>
          <Card>
            <Card.Header
              className="  text-white"
              style={{ backgroundColor: "#D36314" }}
            >
              <h2 className="mb-0">Cover Letter Creator</h2>
              <small className="text-white">
                Fill in the form to generate your professional cover letter
              </small>
            </Card.Header>

            <Card.Body>
              {downloadSuccess && (
                <Alert
                  variant="success"
                  onClose={() => setDownloadSuccess(false)}
                  dismissible
                >
                  Cover letter downloaded successfully!
                </Alert>
              )}

              <Accordion defaultActiveKey="personal-info">
                {/* Personal Information Section */}
                <Accordion.Item eventKey="personal-info">
                  <Accordion.Header>Your Information</Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>First Name*</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            isInvalid={!!errors.firstName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Last Name*</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            isInvalid={!!errors.lastName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Address</Form.Label>
                          <Form.Control
                            type="text"
                            name="yourAddress"
                            value={formData.yourAddress}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Date</Form.Label>
                          <Form.Control
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>

                {/* Recipient Information Section */}
                <Accordion.Item eventKey="recipient-info">
                  <Accordion.Header>Recipient Information</Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Hiring Manager Name*</Form.Label>
                          <Form.Control
                            type="text"
                            name="hiringManagerName"
                            value={formData.hiringManagerName}
                            onChange={handleInputChange}
                            isInvalid={!!errors.hiringManagerName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.hiringManagerName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Position Applying For*</Form.Label>
                          <Form.Control
                            type="text"
                            name="position"
                            value={formData.position}
                            onChange={handleInputChange}
                            isInvalid={!!errors.position}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.position}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Company Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Company Address</Form.Label>
                          <Form.Control
                            type="text"
                            name="companyAddress"
                            value={formData.companyAddress}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>

                {/* Letter Content Section */}
                <Accordion.Item eventKey="letter-content">
                  <Accordion.Header>Letter Content</Accordion.Header>
                  <Accordion.Body>
                    <Form.Group className="mb-3">
                      <Form.Label>Your Cover Letter*</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={8}
                        name="letterContent"
                        value={formData.letterContent}
                        onChange={handleInputChange}
                        isInvalid={!!errors.letterContent}
                        placeholder="Write your professional cover letter here. Include why you're interested in the position and how your skills match the requirements."
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.letterContent}
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                        Tip: Keep it concise (3-4 paragraphs) and tailored to
                        the specific job.
                      </Form.Text>
                    </Form.Group>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <div className="d-flex justify-content-between mt-4">
                <Button
                  variant="outline-secondary"
                  onClick={togglePreview}
                  className="me-2"
                >
                  {isPreviewVisible ? "Hide Preview" : "Show Preview"}
                </Button>
                <Button variant="primary" onClick={handleDownload}>
                  Download Cover Letter
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Preview Section */}
          {isPreviewVisible && (
            <Card className="mt-4 shadow">
              <Card.Header className="bg-light">
                <h3 className="mb-0">Cover Letter Preview</h3>
              </Card.Header>
              <Card.Body>
                <div className="p-4 border rounded bg-white">
                  <div className="mb-4">
                    <p className="mb-1">
                      <strong>
                        {formData.firstName} {formData.lastName}
                      </strong>
                    </p>
                    <p className="mb-1">{formData.yourAddress}</p>
                    <p className="mb-1">{formData.email}</p>
                    <p className="mb-1">{formData.phone}</p>
                    <p className="mb-1">{formData.date}</p>
                  </div>

                  <div className="mb-4">
                    <p className="mb-1">{formData.hiringManagerName}</p>
                    <p className="mb-1">{formData.companyName}</p>
                    <p className="mb-1">{formData.companyAddress}</p>
                  </div>

                  <p className="mb-1">
                    Dear Mr/Mrs {formData.hiringManagerName},
                  </p>

                  <h5 className="my-3">
                    <u>
                      RE: APPLICATION FOR {formData.position.toUpperCase()}{" "}
                      POSITION
                    </u>
                  </h5>

                  <div className="mb-4" style={{ whiteSpace: "pre-wrap" }}>
                    {formData.letterContent}
                  </div>

                  <p>Sincerely,</p>
                  <p>
                    {formData.firstName} {formData.lastName}
                  </p>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CoverLetterCreator;

import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Badge,
  Modal,
  Form,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";

const ApplicantSkillsSection = ({ applicant, isApplicant }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    cultures: [],
    personalities: [],
    knowledges: [],
    softwares: [],
    tools: [],
  });
  // const profile = applicant?.applicant_profile?.[0];
  // const address = applicant?.address?.[0];
  // console.log("first_name",profile.first_name)
  // Extract unique values from applicant data
  const uniqueCultures = [
    ...new Set(applicant?.culture?.map((item) => item.culture?.culture_name)),
  ].filter(Boolean);
  const uniquePersonalities = [
    ...new Set(
      applicant?.applicant_personality?.map(
        (item) => item.personality?.personality_name
      )
    ),
  ].filter(Boolean);
  const uniqueKnowledges = [
    ...new Set(
      applicant?.knowledge?.map((item) => item.knowledge?.knowledge_name)
    ),
  ].filter(Boolean);
  const uniqueSoftwares = [
    ...new Set(
      applicant?.software?.map((item) => item.software?.software_name)
    ),
  ].filter(Boolean);
  const uniqueTools = [
    ...new Set(applicant?.tools?.map((item) => item.tool?.tool_name)),
  ].filter(Boolean);

  const handleShowEdit = () => setShowEditModal(true);
  const handleCloseEdit = () => setShowEditModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    handleCloseEdit();
  };

  const handleChange = (field, values) => {
    setFormData((prev) => ({
      ...prev,
      [field]: values,
    }));
  };

  return (
    <>
      <Row className="justify-content-center mb-3">
        <Col>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <div
                className="d-flex justify-content-between align-items-center mb-3"
                onClick={handleShowEdit}
                style={{ cursor: "pointer" }}
              >
                <Card.Title className="text-primary mb-0">
                  <h5>Career Skills</h5>
                </Card.Title>

                <Pencil style={{ cursor: "pointer" }} className="text-muted" />
              </div>

              <hr className="border-primary" />
              {/* Skills List */}
              <ListGroup variant="flush">
                {/* Culture */}
                {uniqueCultures.length > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col xs={3} className="text-muted">
                        <strong>Culture:</strong>
                      </Col>
                      <Col xs={9}>
                        {uniqueCultures.map((name, i) => (
                          <React.Fragment key={i}>
                            {i > 0 && ", "}
                            {name}
                          </React.Fragment>
                        ))}
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}

                {/* Personality */}
                {uniquePersonalities.length > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col xs={3} className="text-muted">
                        <strong>Personality:</strong>
                      </Col>
                      <Col xs={9}>
                        {uniquePersonalities.map((name, i) => (
                          <React.Fragment key={i}>
                            {i > 0 && ", "}
                            {name}
                          </React.Fragment>
                        ))}
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}

                {/* Knowledge/Skills */}
                {uniqueKnowledges.length > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col xs={3} className="text-muted">
                        <strong>Skills:</strong>
                      </Col>
                      <Col xs={9}>
                        {uniqueKnowledges.map((name, i) => (
                          <React.Fragment key={i}>
                            {i > 0 && ", "}
                            <Badge bg="primary" className="me-1">
                              {name}
                            </Badge>
                          </React.Fragment>
                        ))}
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}

                {/* Software */}
                {uniqueSoftwares.length > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col xs={3} className="text-muted">
                        <strong>Software:</strong>
                      </Col>
                      <Col xs={9}>
                        {uniqueSoftwares.map((name, i) => (
                          <React.Fragment key={i}>
                            {i > 0 && ", "}
                            <Badge bg="info" className="me-1">
                              {name}
                            </Badge>
                          </React.Fragment>
                        ))}
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}

                {/* Tools */}
                {uniqueTools.length > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col xs={3} className="text-muted">
                        <strong>Tools:</strong>
                      </Col>
                      <Col xs={9}>
                        {uniqueTools.map((name, i) => (
                          <React.Fragment key={i}>
                            {i > 0 && ", "}
                            {name}
                          </React.Fragment>
                        ))}
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
          {/* Edit Skills Modal */}
          <Modal show={showEditModal} onHide={handleCloseEdit} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Edit Skills</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <input type="hidden" name="id" value={applicant?.id} />

                {/* Culture */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Culture
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      multiple
                      value={formData.cultures}
                      onChange={(e) =>
                        handleChange(
                          "cultures",
                          Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                          )
                        )
                      }
                    >
                      {/* You would map through your cultures options here */}
                      <option value="1">Culture 1</option>
                      <option value="2">Culture 2</option>
                    </Form.Select>
                  </Col>
                </Form.Group>

                {/* Personality */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Personalities
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      multiple
                      value={formData.personalities}
                      onChange={(e) =>
                        handleChange(
                          "personalities",
                          Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                          )
                        )
                      }
                    >
                      {/* You would map through your personalities options here */}
                      <option value="1">Personality 1</option>
                      <option value="2">Personality 2</option>
                    </Form.Select>
                  </Col>
                </Form.Group>

                {/* Knowledge/Skills */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Skills & Knowledge
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      multiple
                      value={formData.knowledges}
                      onChange={(e) =>
                        handleChange(
                          "knowledges",
                          Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                          )
                        )
                      }
                    >
                      {/* You would map through your knowledges options here */}
                      <option value="1">Skill 1</option>
                      <option value="2">Skill 2</option>
                    </Form.Select>
                  </Col>
                </Form.Group>

                {/* Software */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Software
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      multiple
                      value={formData.softwares}
                      onChange={(e) =>
                        handleChange(
                          "softwares",
                          Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                          )
                        )
                      }
                    >
                      {/* You would map through your softwares options here */}
                      <option value="1">Software 1</option>
                      <option value="2">Software 2</option>
                    </Form.Select>
                  </Col>
                </Form.Group>

                {/* Tools */}
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Tools
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      multiple
                      value={formData.tools}
                      onChange={(e) =>
                        handleChange(
                          "tools",
                          Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                          )
                        )
                      }
                    >
                      {/* You would map through your tools options here */}
                      <option value="1">Tool 1</option>
                      <option value="2">Tool 2</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEdit}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </Col>
      </Row>
    </>
  );
};

export default ApplicantSkillsSection;

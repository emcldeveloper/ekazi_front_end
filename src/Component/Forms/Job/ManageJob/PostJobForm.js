import React, { useState } from 'react';
import {
  Container, Row, Col, Card, Form, Button
} from 'react-bootstrap';

const JobPostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    quantity: '',
    industry_id: '',
    type_id: '',
    position_level_id: '',
    from_salary_id: '',
    to_salary_id: '',
    currency_id: '',
    country_id: '',
    region: '',
    sub_location: '',
    category_id: '',
    contact_id: '',
    dead_line: '',
    position_level: 1,
    education_id: 1
  });

  // Static dropdown data
  const titles = ['Software Engineer', 'Project Manager', 'UI/UX Designer'];
  const industries = ['Technology', 'Finance', 'Healthcare'];
  const jobTypes = ['Full-time', 'Part-time', 'Contract'];
  const positionLevels = ['Entry', 'Mid', 'Senior'];
  const salaryRanges = ['1000', '2000', '3000', '4000'];
  const currencies = ['USD', 'EUR', 'GBP'];
  const countries = ['USA', 'Canada', 'UK'];
  const regions = ['New York', 'Toronto', 'London'];
  const categories = ['Development', 'Management', 'Design'];
  const contacts = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <Container >
      <Card>
        <Card.Body>
          <h5 style={{ color: '#D36314' }}>Basic Details</h5>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={9}>
                <Form.Group>
                  <Form.Label>Position/Title Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control as="select" name="title" onChange={handleChange} required>
                    <option value="">Select Title</option>
                    {titles.map((t, idx) => (
                      <option key={idx} value={t}>{t}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Position Number</Form.Label>
                  <Form.Control type="number" name="quantity" onChange={handleChange} placeholder="example 1" min="1" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Industry <span className="text-danger">*</span></Form.Label>
                  <Form.Control as="select" name="industry_id" onChange={handleChange} required>
                    <option value="">Select Industry</option>
                    {industries.map((i, idx) => (
                      <option key={idx} value={i}>{i}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Job Type <span className="text-danger">*</span></Form.Label>
                  <Form.Control as="select" name="type_id" onChange={handleChange} required>
                    <option value="">Select Type</option>
                    {jobTypes.map((j, idx) => (
                      <option key={idx} value={j}>{j}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Position Level <span className="text-danger">*</span></Form.Label>
                  <Form.Control as="select" name="position_level_id" onChange={handleChange} required>
                    <option value="">Select Level</option>
                    {positionLevels.map((p, idx) => (
                      <option key={idx} value={p}>{p}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Salary Range</Form.Label>
                  <Form.Control as="select" name="from_salary_id" onChange={handleChange}>
                    <option value="">From</option>
                    {salaryRanges.map((s, idx) => (
                      <option key={idx} value={s}>{s}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>To</Form.Label>
                  <Form.Control as="select" name="to_salary_id" onChange={handleChange}>
                    <option value="">To</option>
                    {salaryRanges.map((s, idx) => (
                      <option key={idx} value={s}>{s}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Currency</Form.Label>
                  <Form.Control as="select" name="currency_id" onChange={handleChange}>
                    <option value="">--Select Currency--</option>
                    {currencies.map((c, idx) => (
                      <option key={idx} value={c}>{c}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Country <span className="text-danger">*</span></Form.Label>
                  <Form.Control as="select" name="country_id" onChange={handleChange} required>
                    <option value="">Select Country</option>
                    {countries.map((c, idx) => (
                      <option key={idx} value={c}>{c}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Region/City <span className="text-danger">*</span></Form.Label>
                  <Form.Control as="select" name="region" onChange={handleChange} required>
                    <option value="">Select Region</option>
                    {regions.map((r, idx) => (
                      <option key={idx} value={r}>{r}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Sub-Location <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" name="sub_location" onChange={handleChange} placeholder="e.g. District or Street" required />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Job Category <span className="text-danger">*</span></Form.Label>
                  <Form.Control as="select" name="category_id" onChange={handleChange} required>
                    <option value="">Select Category</option>
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Contact Person (From Client) <span className="text-danger">*</span></Form.Label>
                  <Form.Control as="select" name="contact_id" onChange={handleChange} required>
                    <option value="">Select Contact</option>
                    {contacts.map((con) => (
                      <option key={con.id} value={con.id}>{con.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Application Deadline <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="date" name="dead_line" onChange={handleChange} min={new Date().toISOString().split('T')[0]} required />
                </Form.Group>
              </Col>
            </Row>

            <input type="hidden" name="position_level" value="1" />
            <input type="hidden" name="education_id" value="1" />

            <hr />
            <Row className="mb-3">
              <Col md={12}>
                <span id="expensive"></span>
              </Col>
            </Row>

            <Row>
              <Col sm={6}>
                <Button variant="primary" href="/">Back</Button>
              </Col>
              <Col sm={6} className="text-end">
                <Button type="submit" variant="primary">Next</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default JobPostForm;

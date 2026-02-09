import React, { useContext } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { UniversalContext } from "../../context/UniversalContext";
import toTitleCase from "../../utils/toTitleCase";

const JobSeekerFilterForm = ({
  filters,
  setFilters,
  handleInputChange,
  clearFilters
}) => {
  const {
    countries = [],
    regions = [],
    industries = [],
    positionLevels = [],
    educationLevels = [],
  } = useContext(UniversalContext);

  return (
    <div
      className="bg-white p-3 mt-4"
      style={{ borderRadius: 8, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="text-primary fw-bold">Filters</h6>
        <span
          style={{ cursor: "pointer", color: "#007bff" }}
          onClick={clearFilters}
        >
          Clear All
        </span>
      </div>
      <hr />

      <Form>
        {/* First Row */}
        <Row className="g-3">
          {/* Knowledges */}
          <Col md={4} sm={6}>
            <Form.Group controlId="formKnowledges" className="mb-3">
              <Form.Control
                type="text"
                name="knowledges"
                value={filters.knowledges}
                onChange={handleInputChange}
                placeholder="Type knowledge/skills"
              />
            </Form.Group>
          </Col>

          {/* Position Level */}
          <Col md={4} sm={6}>
            <Form.Group controlId="formLevel" className="mb-3">
              <Form.Select
                name="level"
                value={filters.level}
                onChange={handleInputChange}
              >
                <option value="">Select Level</option>
                {positionLevels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {toTitleCase(level.position_name)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Experience */}
          <Col md={4} sm={6}>
            <Form.Group controlId="formExperience" className="mb-3">
              <Form.Select
                name="experience"
                value={filters.experience}
                onChange={handleInputChange}
              >
                <option value="">Select Experience</option>
                <option value="1">1 year</option>
                <option value="2">2 years</option>
                <option value="3">3+ years</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Second Row */}
        <Row className="g-3">
          {/* Industry */}
          <Col md={4} sm={6}>
            <Form.Group controlId="formIndustry" className="mb-3">
              <Form.Select
                name="industry"
                value={filters.industry}
                onChange={handleInputChange}
              >
                <option value="">Select Industry</option>
                {industries.map((item) => (
                  <option key={item.id} value={item.id}>
                    {toTitleCase(item.industry_name)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Title */}
          <Col md={4} sm={6}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Control
                type="text"
                name="title"
                value={filters.title}
                onChange={handleInputChange}
                placeholder="Type position title"
              />
            </Form.Group>
          </Col>

          {/* Education */}
          <Col md={4} sm={6}>
            <Form.Group controlId="formEducation" className="mb-3">
              <Form.Select
                name="education"
                value={filters.education}
                onChange={handleInputChange}
              >
                <option value="">Select Education</option>
                {educationLevels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {toTitleCase(level.education_level)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Third Row */}
        <Row className="g-3">
          {/* Gender */}
          <Col md={4} sm={6}>
            <Form.Group controlId="formGender" className="mb-3">
              <Form.Select
                name="gender"
                value={filters.gender}
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                <option value="2">Male</option>
                <option value="1">Female</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Region */}
          <Col md={4} sm={6}>
            <Form.Group controlId="formRegion" className="mb-3">
              <Form.Select
                name="region"
                value={filters.region}
                onChange={handleInputChange}
              >
                <option value="">Select Region</option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {toTitleCase(region.region_name)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Country */}
          <Col md={4} sm={6}>
            <Form.Group controlId="formCountry" className="mb-3">
              <Form.Select
                name="country"
                value={filters.country}
                onChange={handleInputChange}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {toTitleCase(country.name)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default JobSeekerFilterForm;

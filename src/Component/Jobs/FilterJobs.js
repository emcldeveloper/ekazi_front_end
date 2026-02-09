import { Dropdown, Form, Row, Col, Container } from "react-bootstrap";
import {
  useCountries,
  useIndustry,
  useJobTypes,
  usePosition,
  useRegions,
} from "../../hooks/useUniversal";

const normalizeArray = (data, key) => {
  if (Array.isArray(data)) return data;
  if (data?.data && Array.isArray(data.data)) return data.data;
  if (data?.[key] && Array.isArray(data[key])) return data[key];
  return [];
};

const DropdownSelect = ({ label, options, selected, onSelect }) => (
  <Dropdown>
    <Dropdown.Toggle variant="outline-primary" className="w-100">
      {options.find((o) => o.value === selected)?.label || label}
    </Dropdown.Toggle>

    <Dropdown.Menu className="py-3 px-3 shadow-lg">
      {options.map((option) => (
        <Dropdown.Item
          key={option.value}
          onClick={() => onSelect(option.value)}
        >
          <span className="text-dark">{option.label}</span>
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
);

const FilterJobs = ({
  searchKeyword,
  setSearchKeyword,
  selectedTime,
  setSelectedTime,
  selectedJobType,
  setSelectedJobType,
  selectedCountry,
  setSelectedCountry,
  selectedRegion,
  setSelectedRegion,
  selectedSubLocation,
  setSelectedSubLocation,
  selectedPositionLevel,
  setSelectedPositionLevel,
  selectedIndustry,
  setSelectedIndustry,
}) => {
  const { data: rawCountries } = useCountries();
  const { data: rawRegions } = useRegions();
  const { data: rawIndustries } = useIndustry();
  const { data: rawPositions } = usePosition();
  const { data: rawTypes } = useJobTypes();

  const countries = normalizeArray(rawCountries);
  const regions = normalizeArray(rawRegions);
  const industries = normalizeArray(rawIndustries);
  const positionLevels = normalizeArray(rawPositions, "position_levels");
  const types = normalizeArray(rawTypes, "job_types");

  // Options
  const timeOptions = [
    { label: "Any Time", value: "" },
    { label: "Past 24 Hours", value: "1" },
    { label: "Past Week", value: "7" },
  ];

  const jobTypeOptions = [
    { label: "Any Type", value: "" },
    ...types.map((t) => ({ label: t?.type_name, value: String(t?.id) })),
  ];

  const positionLevelOptions = [
    { label: "Any Level", value: "" },
    ...positionLevels.map((p) => ({
      label: p?.position_name,
      value: String(p?.id),
    })),
  ];

  const industryOptions = [
    { label: "All Industries", value: "" },
    ...industries.map((i) => ({
      label: i?.industry_name,
      value: String(i?.id),
    })),
  ];

  const countryOptions = countries.map((c) => ({
    label: c?.name,
    value: String(c?.id),
  }));

  const regionOptions = regions
    .filter((r) => String(r.country_id) === String(selectedCountry))
    .map((r) => ({
      label: r.region_name,
      value: String(r.id),
      sub_locations: r.sub_locations || [],
    }));

  const selectedRegionObj = regionOptions.find(
    (r) => r.value === selectedRegion
  );
  const subLocationOptions = selectedRegionObj?.sub_locations || [];

  return (
    <Container>
      <Row className="d-flex align-items-center">
        <Col md={3} className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search jobs"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </Col>

        <Col md={3} className="mb-3">
          <DropdownSelect
            label="Any Time"
            options={timeOptions}
            selected={selectedTime}
            onSelect={setSelectedTime}
          />
        </Col>

        <Col md={3} className="mb-3">
          <DropdownSelect
            label="Job Type"
            options={jobTypeOptions}
            selected={selectedJobType}
            onSelect={setSelectedJobType}
          />
        </Col>

        <Col md={3} className="mb-3">
          <DropdownSelect
            label="Select Position Level"
            options={positionLevelOptions}
            selected={selectedPositionLevel}
            onSelect={setSelectedPositionLevel}
          />
        </Col>
      </Row>

      <Row className="d-flex align-items-center">
        <Col md={3} className="mb-3">
          <DropdownSelect
            label="Select Country"
            options={countryOptions}
            selected={selectedCountry}
            onSelect={(value) => {
              setSelectedCountry(value);
              setSelectedRegion("");
              setSelectedSubLocation("");
            }}
          />
        </Col>

        <Col md={3} className="mb-3">
          <DropdownSelect
            label="Select Region"
            options={regionOptions}
            selected={selectedRegion}
            onSelect={(value) => {
              setSelectedRegion(value);
              setSelectedSubLocation("");
            }}
          />
        </Col>

        <Col md={3} className="mb-3">
          <DropdownSelect
            label="Select Industry"
            options={industryOptions}
            selected={selectedIndustry}
            onSelect={setSelectedIndustry}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default FilterJobs;

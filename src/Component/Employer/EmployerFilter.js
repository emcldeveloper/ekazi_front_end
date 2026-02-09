import { Card, Form, Button } from "react-bootstrap";
import toTitleCase from "../../utils/toTitleCase";
import { useCountries, useIndustry } from "../../hooks/useUniversal";
import { useJobCountByRegion } from "../../hooks/useJobCategories";

const EmployerFilter = ({ filters, onChange, onReset }) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const { data: industries = [] } = useIndustry() || {};
  const { data: countries = [] } = useCountries() || {};
  const { data: regions = [] } = useJobCountByRegion() || {};

  const renderSelect = (label, value, arr, valueKey, labelKey, filterName) => (
    <div className="mb-3">
      <Form.Label className="text-primary">{label}</Form.Label>
      <Form.Select
        value={value}
        onChange={(e) => onChange(filterName, e.target.value)}
      >
        <option value="">Select {label}</option>

        {arr?.map((item) => (
          <option key={item.id} value={item[valueKey]}>
            {toTitleCase(item[labelKey])}
          </option>
        ))}
      </Form.Select>
    </div>
  );

  return (
    <Card className="shadow-sm border-light">
      <Card.Header
        className="text-white d-flex justify-content-between align-items-center"
        style={{ backgroundColor: "#2E58A6" }}
      >
        <h6 className="mb-0">Filters</h6>

        <Button
          variant="link"
          className="text-white text-decoration-underline p-0"
          onClick={onReset}
        >
          Reset All
        </Button>
      </Card.Header>

      <Card.Body>
        {renderSelect(
          "Industry",
          filters.industry,
          industries,
          "name",
          "industry_name",
          "industry"
        )}

        {renderSelect(
          "Country",
          filters.country,
          countries,
          "name",
          "name",
          "country"
        )}

        {renderSelect(
          "Region",
          filters.region,
          regions,
          "name",
          "region_name",
          "region"
        )}

        <div className="mb-3">
          <Form.Label className="text-primary">Series (A to Z)</Form.Label>
          <Form.Select
            value={filters.character}
            onChange={(e) => onChange("character", e.target.value)}
          >
            <option value="">Select Character</option>
            {alphabet.map((letter) => (
              <option key={letter} value={letter}>
                {letter}
              </option>
            ))}
          </Form.Select>
        </div>
      </Card.Body>
    </Card>
  );
};

export default EmployerFilter;

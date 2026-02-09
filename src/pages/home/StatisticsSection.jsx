import { Col, Container, Row } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";

import { useSiteStatistics } from "../../hooks/useUniversal.js";

const StatItem = ({ value, label }) => (
  <Col md={4}>
    <div className="d-flex flex-column align-items-center text-center">
      <FaCheckCircle size="2em" className="mb-2" style={{ color: "#D36314" }} />
      <strong style={{ color: "#2E58A6" }} className="fs-4 fw-bold">
        {value ?? 0}
      </strong>
      <p style={{ color: "#2E58A6" }}>{label}</p>
    </div>
  </Col>
);

const StatisticsSection = () => {
  const { data: siteStatistics, isLoading } = useSiteStatistics();

  if (isLoading || !siteStatistics) return null;

  const stats = [
    {
      value: siteStatistics.employers,
      label: "Employers have recruited with us",
    },
    { value: siteStatistics.job_seekers, label: "Job Seekers" },
    { value: siteStatistics.job_posts, label: "Job Posts" },
  ];

  return (
    <Container className="my-5" style={{ backgroundColor: "#DFE3E2" }}>
      <Row className="row">
        {stats.map((item, index) => (
          <StatItem key={index} value={item.value} label={item.label} />
        ))}
      </Row>
    </Container>
  );
};

export default StatisticsSection;

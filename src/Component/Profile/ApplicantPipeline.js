import { useState, useMemo } from "react";
import { Row, Col, Form, Card, Button, Modal } from "react-bootstrap";
import { BsCalendar, BsChevronDown } from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useApplicantPipeline } from "../../hooks/useCandidates";

/* -----------------------------------------------------
 * Utility: Build default 30-day range
 * ---------------------------------------------------- */
const buildDefaultRange = () => {
  const today = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 30);

  return {
    start: start.toISOString().split("T")[0],
    end: today.toISOString().split("T")[0],
    display: "Last 30 days",
  };
};

const presetRanges = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 days", value: "last7" },
  { label: "Last 30 days", value: "lastMonth" },
  { label: "Last 90 days", value: "last90" },
  { label: "Last 12 months", value: "lastYear" },
  { label: "Custom", value: "custom" },
];

const COLORS = [
  "#4285F4",
  "#34A853",
  "#FBBC05",
  "#EA4335",
  "#673AB7",
  "#FF9800",
  "#9E9E9E",
];

const ApplicantPipeline = () => {
  const { data: jobseekerpipeline = [] } = useApplicantPipeline();

  const [filterType, setFilterType] = useState("lastMonth");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [dateRange, setDateRange] = useState(buildDefaultRange());
  const [tempDateRange, setTempDateRange] = useState({
    start: "",
    end: "",
  });

  const handlePresetRange = (range) => {
    const today = new Date();
    let start = new Date();
    let displayText = "";

    switch (range) {
      case "today":
        displayText = "Today";
        break;

      case "yesterday":
        start.setDate(start.getDate() - 1);
        displayText = "Yesterday";
        break;

      case "last7":
        start.setDate(start.getDate() - 7);
        displayText = "Last 7 days";
        break;

      case "lastMonth":
        start.setDate(start.getDate() - 30);
        displayText = "Last 30 days";
        break;

      case "last90":
        start.setDate(start.getDate() - 90);
        displayText = "Last 90 days";
        break;

      case "lastYear":
        start.setFullYear(start.getFullYear() - 1);
        displayText = "Last 12 months";
        break;

      case "custom":
        setFilterType("custom");
        setShowDatePicker(true);
        return;

      default:
        break;
    }

    setFilterType(range);

    setDateRange({
      start: start.toISOString().split("T")[0],
      end: today.toISOString().split("T")[0],
      display: displayText,
    });
  };

  const handleCustomRangeApply = () => {
    if (!tempDateRange.start || !tempDateRange.end) return;

    const sDate = new Date(tempDateRange.start);
    const eDate = new Date(tempDateRange.end);

    setDateRange({
      start: tempDateRange.start,
      end: tempDateRange.end,
      display: `${sDate.toLocaleDateString()} - ${eDate.toLocaleDateString()}`,
    });

    setShowDatePicker(false);
  };

  const filteredData = useMemo(() => {
    if (!dateRange.start || !dateRange.end) return [];

    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);
    endDate.setHours(23, 59, 59, 999);

    return jobseekerpipeline.filter((item) => {
      const created = new Date(item.created_at);
      return created >= startDate && created <= endDate;
    });
  }, [jobseekerpipeline, dateRange]);

  const chartData = useMemo(() => {
    const totals = {
      Applied: 0,
      Shortlisted: 0,
      Screening: 0,
      Interview: 0,
      Selected: 0,
      Employee: 0,
      Decline: 0,
    };

    filteredData.forEach((item) => {
      const name = item.stage?.stage_name;
      if (totals[name] !== undefined) totals[name]++;
    });

    return Object.keys(totals).map((stage) => ({
      name: stage,
      value: totals[stage],
    }));
  }, [filteredData]);

  const totalCount = chartData.reduce((a, b) => a + b.value, 0);

  return (
    <div className="p-2">
      {/* Header */}
      <Row className="d-flex align-items-center justify-content-between mb-4">
        <Col>
          <div className="text-muted small">
            Showing data for: {dateRange.display}
          </div>
        </Col>

        <Col className="text-end">
          <Button
            variant="outline-primary"
            onClick={() => setShowDatePicker(true)}
            className="d-flex align-items-center"
          >
            <BsCalendar className="me-2" />
            {dateRange.display}
            <BsChevronDown className="ms-2" />
          </Button>
        </Col>
      </Row>

      {/* Date Picker Modal */}
      <Modal
        show={showDatePicker}
        onHide={() => setShowDatePicker(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Date Range</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            {/* Preset Buttons */}
            <Col md={4} className="border-end pe-3">
              <h6 className="mb-3">Preset Ranges</h6>
              <div className="d-grid gap-2">
                {presetRanges.map((p) => (
                  <Button
                    key={p.value}
                    variant={
                      filterType === p.value ? "primary" : "outline-secondary"
                    }
                    onClick={() => handlePresetRange(p.value)}
                    className="text-start"
                  >
                    {p.label}
                  </Button>
                ))}
              </div>
            </Col>

            {/* Custom Range */}
            <Col md={8}>
              <h6 className="mb-3">Custom Range</h6>

              <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={tempDateRange.start}
                  onChange={(e) =>
                    setTempDateRange({
                      ...tempDateRange,
                      start: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={tempDateRange.end}
                  onChange={(e) =>
                    setTempDateRange({ ...tempDateRange, end: e.target.value })
                  }
                />
              </Form.Group>

              <Button variant="primary" onClick={handleCustomRangeApply}>
                Apply
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      {/* Chart */}
      <Card className="mt-4 p-4">
        <h5 className="mb-4">Applicant Pipeline Overview</h5>

        {totalCount === 0 ? (
          <div className="text-center py-5">
            <img
              src="/blanckgraph.jpg"
              alt="No Data"
              style={{ width: "180px", opacity: 0.7 }}
            />
            <h6 className="mt-3 text-muted">
              No applicant activity found for the selected date range.
            </h6>
            <p className="small text-muted">Try another date range.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar dataKey="value">
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>
    </div>
  );
};

export default ApplicantPipeline;

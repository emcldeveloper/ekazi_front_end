import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import MainLayout2 from "../../../layouts/MainLayout2";
import SideBarListJobs from "../../../Component/Jobs/SideBarListJobs";
import JobDetails from "../../home/components/JobDetails";
import JobSearchFilter from "../../../components/jobs/JobSearchFilter";

const Jobs = () => {
  const location = useLocation();

  const [selectedJob, setSelectedJob] = useState(null);
  const [activeJob, setActiveJob] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    industry: "",
  });

  // read URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const industryParam = params.get("industry");

    if (industryParam) {
      setFilters((prev) => ({
        ...prev,
        industry: industryParam,
      }));
    }
  }, [location.search]);

  return (
    <MainLayout2>
      <Container className="my-10" style={{ minHeight: "100vh" }}>
        <JobSearchFilter onFilterChange={setFilters} initialFilters={filters} />

        <Row>
          <Col md={5}>
            <SideBarListJobs
              filters={filters}
              setSelectedJob={setSelectedJob}
              setActiveJob={setActiveJob}
              activeJob={activeJob}
            />
          </Col>

          <Col md={7}>
            <div className="job-preview">
              {selectedJob ? (
                <JobDetails job={selectedJob} />
              ) : (
                <div>Select a job to view its details</div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </MainLayout2>
  );
};

export default Jobs;

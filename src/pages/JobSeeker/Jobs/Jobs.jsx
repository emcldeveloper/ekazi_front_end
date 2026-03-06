import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import MainLayout2 from "../../../layouts/MainLayout2";
import FilterJobs from "../../../Component/Jobs/FilterJobs";
import SideBarListJobs from "../../../Component/Jobs/SideBarListJobs";
import JobDetails from "../../home/components/JobDetails";
import JobSearchFilter from "../../../components/jobs/JobSearchFilter";

const Jobs = () => {
  const location = useLocation();

  const [selectedJob, setSelectedJob] = useState(null);
  const [activeJob, setActiveJob] = useState(null);

  // Filter states
  const [selectedTime, setSelectedTime] = useState("Any Time");
  const [selectedJobType, setSelectedJobType] = useState("Any Type");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSubLocation, setSelectedSubLocation] = useState("");
  const [selectedPositionLevel, setSelectedPositionLevel] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  // ✅ Read query params for region & industry
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const regionParam = params.get("region");
    const industryParam = params.get("industry");

    if (regionParam) setSelectedRegion(regionParam);
    if (industryParam) setSelectedIndustry(industryParam);
  }, [location.search]);

  return (
    <MainLayout2>
      <Container className="mt-4" style={{ minHeight: "100vh" }}>
        <JobSearchFilter />
        {/* Filters */}
        <Row className="mb-4">
          <Col>
            <FilterJobs
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              selectedJobType={selectedJobType}
              setSelectedJobType={setSelectedJobType}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              selectedSubLocation={selectedSubLocation}
              setSelectedSubLocation={setSelectedSubLocation}
              selectedPositionLevel={selectedPositionLevel}
              setSelectedPositionLevel={setSelectedPositionLevel}
              selectedIndustry={selectedIndustry}
              setSelectedIndustry={setSelectedIndustry}
            />
          </Col>
        </Row>

        {/* Job List & Details */}
        <Row>
          <Col md={5}>
            <SideBarListJobs
              setSelectedJob={setSelectedJob}
              setActiveJob={setActiveJob}
              activeJob={activeJob}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              selectedJobType={selectedJobType}
              setSelectedJobType={setSelectedJobType}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              selectedSubLocation={selectedSubLocation}
              setSelectedSubLocation={setSelectedSubLocation}
              selectedPositionLevel={selectedPositionLevel}
              setSelectedPositionLevel={setSelectedPositionLevel}
              selectedIndustry={selectedIndustry}
              setSelectedIndustry={setSelectedIndustry}
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
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

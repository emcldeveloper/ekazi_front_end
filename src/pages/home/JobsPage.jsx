import { Alert, Button, Container, Row, Spinner } from "react-bootstrap";
import MainLayout1 from "../../layouts/MainLayout1";
import useJob from "../../hooks/useJob";
import JobCard from "./components/jobs/JobCard";
import { useState } from "react";
import JobFilters from "../../components/jobs/JobSearchFilter";

const JobsPage = () => {
  const { jobs, loading, error, hasMore, loadMore, loadingMore } = useJob();
  console.log("JobsPage:", jobs);

  const [filters, setFilters] = useState({});

  const handleFilterChange = (filterValues) => {
    setFilters(filterValues);
  };

  const filteredJobs = jobs.filter((job) => {
    const search = filters.search?.toLowerCase() || "";

    const position = job.job_position?.position_name?.toLowerCase() || "";
    const industry = job.industry?.industry_name?.toLowerCase() || "";

    if (search && !position.includes(search) && !industry.includes(search)) {
      return false;
    }

    if (
      filters.category &&
      filters.category !== "All" &&
      job.industry?.industry_name !== filters.category
    ) {
      return false;
    }

    if (
      filters.jobTypes?.length &&
      !filters.jobTypes.includes(job.job_type?.type_name)
    ) {
      return false;
    }

    if (
      filters.positionLevels?.length &&
      !filters.positionLevels.includes(job.position_level?.id)
    ) {
      return false;
    }

    if (filters.location) {
      const location =
        job.job_addresses?.[0]?.region?.region_name?.toLowerCase() || "";

      if (!location.includes(filters.location.toLowerCase())) {
        return false;
      }
    }

    return true;
  });

  return (
    <MainLayout1>
      <Container className="my-5">
        <JobFilters onFilterChange={handleFilterChange} />{" "}
        {error && <Alert variant="danger">{error.message}</Alert>}
        <Row>
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </Row>
        {/* Initial Loading */}
        {loading && (
          <div className="text-center my-3">
            <Spinner animation="border" />
          </div>
        )}
        {/* Load More Button */}
        {!loading && hasMore && !loadingMore && (
          <div className="text-center my-4">
            <Button onClick={loadMore}>Load More</Button>
          </div>
        )}
        {/* Loading More Spinner */}
        {loadingMore && (
          <div className="text-center my-3">
            <Spinner animation="border" />
          </div>
        )}
        {/* No More Jobs */}
        {!loading && !hasMore && jobs.length > 0 && (
          <div className="text-center my-4">
            <Alert variant="info">No more jobs to load.</Alert>
          </div>
        )}
      </Container>
    </MainLayout1>
  );
};

export default JobsPage;

import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import MainLayout1 from "../../layouts/MainLayout1";
import useJob from "../../hooks/useJob";
import JobCard from "./components/jobs/JobCard";
import { useEffect, useState } from "react";
import JobFilters from "../../components/jobs/JobSearchFilter";
import { useSearchParams } from "react-router-dom";
import { ArrowDown } from "lucide-react";

const JobsPage = () => {
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    industry: searchParams.get("industry") || "",
    region: searchParams.get("region") || "",
  });

  // jobs fetch
  const { jobs, loading, error, hasMore, loadMore, loadingMore } =
    useJob(filters);

  // update filters when URL search params change
  useEffect(() => {
    const industry = searchParams.get("industry");
    const region = searchParams.get("region");

    setFilters((prev) => ({
      ...prev,
      industry: industry || "All",
      location: region || "",
    }));
  }, [searchParams]);

  // handle filter changes from the JobFilters component
  const handleFilterChange = (filterValues) => {
    setFilters(filterValues);
  };

  return (
    <MainLayout1>
      <Container className="my-10">
        <JobFilters
          onFilterChange={handleFilterChange}
          initialFilters={filters}
        />

        {error && <Alert variant="danger">{error.message}</Alert>}

        <Row>
          {jobs.map((job) => (
            <Col key={job.id} md={4} className="mb-4">
              <JobCard job={job} />
            </Col>
          ))}
        </Row>
        {!loading && jobs.length === 0 && (
          <div className="text-center my-4">
            <Alert variant="info">No jobs match the selected filters.</Alert>
          </div>
        )}
        {/* Initial Loading */}
        {loading && (
          <div className="text-center my-3">
            <Spinner animation="border" />
          </div>
        )}
        {/* Load More Button */}
        {!loading && hasMore && !loadingMore && (
          <div className="flex justify-center my-4">
            <button
              onClick={loadMore}
              className="flex items-center gap-2 px-4 py-2 bg-Blue text-white rounded-lg hover:bg-blue-700 transition"
            >
              Load More <ArrowDown size={18} />
            </button>
          </div>
        )}
        {/* Loading More Spinner */}
        {loadingMore && (
          <div className="text-center my-3">
            <Spinner animation="border" />
          </div>
        )}
        {/* No More Jobs */}
        {/* {!loading && !hasMore && jobs.length > 0 && (
          <div className="text-center my-4">
            <Alert variant="info">No more jobs to load.</Alert>
          </div>
        )} */}
      </Container>
    </MainLayout1>
  );
};

export default JobsPage;

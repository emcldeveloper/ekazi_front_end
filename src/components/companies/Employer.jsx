import { useState, useCallback } from "react";
import MainLayout1 from "../../layouts/MainLayout1";
import { Row, Col, Container } from "react-bootstrap";
import EmployerFilter from "./components/EmployerFilter.jsx";
import AllEmployerList from "./components/AllEmployerList.jsx";
import AdPlaceholder from "../ads/AdPlaceholder.jsx";
import { useEmployers } from "../../hooks/useEmployer.js";

const Employer = () => {
  const [filters, setFilters] = useState({
    industry: "",
    country: "",
    region: "",
    character: "",
  });

  const [page, setPage] = useState(1);
  const perPage = 10;

  // ----------------------------
  // React Query: Fetch employers
  // ----------------------------
  const { data, isLoading, isFetching } = useEmployers({
    page,
    perPage,
    filters,
  });

  const employers = data || [];
  const hasMore = (data?.length || 0) === perPage; // simple hasMore logic

  // Reset page to 1 when filters change
  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }, []);

  const handleResetFilters = () => {
    setFilters({
      industry: "",
      country: "",
      region: "",
      character: "",
    });
    setPage(1);
  };

  // Load more
  const handleLoadMore = () => setPage((prev) => prev + 1);

  return (
    <MainLayout1>
      <Container className="my-4">
        <Row>
          {/* FILTER SIDEBAR */}
          {/* <Col
            xs={12}
            md={3}
            className="mb-3"
            style={{
              position: "sticky",
              top: "180px",
              alignSelf: "flex-start",
            }}
          >
            <EmployerFilter
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </Col> */}

          {/* EMPLOYER LIST */}
          <Col xs={12} md={9}>
            <AllEmployerList
              employers={employers}
              loading={isLoading || isFetching}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
            />
          </Col>

          {/* ADS */}
          <Col
            xs={12}
            md={3}
            className="mb-3"
            style={{
              position: "sticky",
              top: "180px",
              alignSelf: "flex-start",
            }}
          >
            <AdPlaceholder />
          </Col>
        </Row>
      </Container>
    </MainLayout1>
  );
};

export default Employer;

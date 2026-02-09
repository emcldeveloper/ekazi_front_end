import React from "react";
import { Container, Row, Spinner, Alert, Button } from "react-bootstrap";
import AllEmployerCard from "./AllEmployerCard";

const AllEmployerList = ({
  employers,
  loading,
  error,
  hasMore,
  onLoadMore,
}) => {
  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}

      {loading && employers.length === 0 ? (
        <div className="text-center my-3">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
          <AllEmployerCard jobCompanies={employers} />
        </Row>
      )}

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="text-center mt-3">
          <Button onClick={onLoadMore} variant="primary">
            Load More
          </Button>
        </div>
      )}

      {/* Loading More Indicator */}
      {loading && employers.length > 0 && (
        <div className="text-center my-3">
          <Spinner animation="border" />
        </div>
      )}
    </Container>
  );
};

export default AllEmployerList;

import { Container, Row, Spinner, Alert } from "react-bootstrap";

import FeaturedEmployers from "./components/FeaturedEmployers.jsx";
import { useEmployers } from "../../hooks/useEmployer.js";

const FeaturedEmployerSection = () => {
  const { data: jobCompanies, isLoading, isError, error } = useEmployers(1, 20);

  return (
    <Container className="my-5">
      {isError && <Alert variant="danger">{error?.message}</Alert>}

      {isLoading ? (
        <div className="text-center my-3">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
          <FeaturedEmployers jobCompanies={jobCompanies} />
        </Row>
      )}
    </Container>
  );
};

export default FeaturedEmployerSection;

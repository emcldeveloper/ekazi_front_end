import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Partials/Header";
import AppFooter from "./Partials/AppFooter";

const ApplicantLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ marginTop: "80px" }}></div>

      <Container fluid className="my-4">
        {children}
      </Container>

      <AppFooter />
    </>
  );
};

export default ApplicantLayout;

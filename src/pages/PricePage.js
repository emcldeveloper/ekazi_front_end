import React from "react";

import MainLayout1 from "../layouts/MainLayout1";
import PageHeader from "../Component/Pages/PageHeader";
import { Container } from "react-bootstrap";
import PriceList from "../Component/Pages/PriceList";
const PricePage = () => {
  return (
    <MainLayout1>
      <PageHeader title="Price List"></PageHeader>

      <Container>
        <PriceList />
      </Container>
    </MainLayout1>
  );
};

export default PricePage;

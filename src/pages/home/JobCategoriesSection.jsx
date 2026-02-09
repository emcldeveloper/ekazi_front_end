// JobCategoriesSection.js
import React from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import Industry from "./components/categories/Industry";
import Category from "./components/categories/Category";
import Locations from "./components/categories/Locations";

const JobCategoriesSection = () => {
  return (
    <Container fluid className="my-5 p-4 bg-white">
      <h2 className="text-center fw-bold" style={{ color: "#2E58A6" }}>
        Job Categories
      </h2>
      <br />

      <Container>
        <Tabs
          defaultActiveKey="industry"
          id="job-category-tabs"
          className="mb-3 justify-content-center"
          mountOnEnter
          unmountOnExit
        >
          <Tab eventKey="industry" title="By Job Categories">
            <Industry />
          </Tab>
          <Tab eventKey="byindustry" title="By Companies Industry">
            <Category />
          </Tab>
          <Tab eventKey="location" title="By Locations">
            <Locations />
          </Tab>
        </Tabs>
      </Container>
    </Container>
  );
};

export default JobCategoriesSection;

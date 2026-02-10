import React from "react";
import JobSeekerLayout from "../../../layouts/JobSeekerLayout";
import RefreesCvComponent from "../../../Component/Cv/Referee";
import { Card } from "react-bootstrap";
const RefereeCv = () => {
  return (
    <JobSeekerLayout>
      <Card>
        <Card.Body>
          <RefreesCvComponent />
        </Card.Body>
      </Card>
    </JobSeekerLayout>
  );
};
export default RefereeCv;

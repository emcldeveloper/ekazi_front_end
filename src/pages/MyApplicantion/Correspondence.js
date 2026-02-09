import React, { useState } from "react";
import ApplicantCorrespondence from "../../Component/Profile/ApplicantCorrespondence";
import JobSeekerLayout2 from "../../layouts/JobSeekerLayout2";
import { Card } from "react-bootstrap";

const Correspondence = () => {
  const [correspondences, setCorrespondences] = useState([]);

  return (
    <JobSeekerLayout2 correspondences={correspondences}>
      <Card>
        <Card.Body>
          <ApplicantCorrespondence setCorrespondences={setCorrespondences} />
        </Card.Body>
      </Card>
    </JobSeekerLayout2>
  );
};

export default Correspondence;

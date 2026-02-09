import React, { useState } from "react";
import ApplicantCorrespondence from "../../Component/Profile/ApplicantCorrespondence";
import JobSeekerLayout2 from "../../layouts/JobSeekerLayout2";
import { Card, ListGroup, Badge } from "react-bootstrap";

const SentCorrespondence = () => {
  const [correspondences, setCorrespondences] = useState([]);

  // Filter only rejected correspondences
  const rejectedCorrespondences = correspondences.filter(
    (c) => c.status === "rejected"
  );

  return (
    <JobSeekerLayout2 correspondences={correspondences}>
      <Card>
        <Card.Body>
          {rejectedCorrespondences.length > 0 ? (
            <ListGroup variant="flush">
              {rejectedCorrespondences.map((c) => (
                <ListGroup.Item key={c.id}>
                  <div className="d-flex justify-content-between align-items-start">
                    <h6 className="mb-1">{c.subject}</h6>
                    {c.status === "rejected" && (
                      <Badge bg="danger" style={{ fontSize: "0.75rem" }}>
                        Rejected
                      </Badge>
                    )}
                  </div>
                  <p className="mb-1">{c.message}</p>
                  {c.rejection_reason && (
                    <small className="text-muted">
                      Reason: {c.rejection_reason}
                    </small>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p className="text-muted">No rejected correspondences.</p>
          )}

          {/* Keep the ApplicantCorrespondence hook to fetch all correspondences */}
          <ApplicantCorrespondence setCorrespondences={setCorrespondences} />
        </Card.Body>
      </Card>
    </JobSeekerLayout2>
  );
};

export default SentCorrespondence;

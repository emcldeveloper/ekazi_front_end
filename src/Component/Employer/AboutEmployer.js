import React from "react";
import { Card } from "react-bootstrap";

const AboutEmployer = ({ client }) => {
  if (!client) return null;

  const additionalInfo = client.additional_info || "No additional info provided.";
  const description = client.client_description?.description || "No description available.";

  return (
    <Card className="shadow-sm p-4 rounded mb-3">
      <h3 className="mb-3" style={{ color: "#D36314", fontSize: "20px" }}>
        About Company
      </h3>

      <p className="fw-bold text-primary mb-3">
        {additionalInfo}
      </p>

      <p className="text-muted">
        {description}
      </p>
    </Card>
  );
};

export default AboutEmployer;

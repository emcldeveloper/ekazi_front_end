import { useMemo, useState } from "react";
import { Card, Button, ListGroup, Badge, Alert } from "react-bootstrap";
import { Plus, Pencil } from "react-bootstrap-icons";
import moment from "moment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import AddExperienceModal from "./AddExperienceModal";

/* --------------------------------------------------
 * Helpers
 * -------------------------------------------------- */
const calculateDuration = (positions = []) => {
  let totalMonths = 0;

  positions.forEach((pos) => {
    const start = moment(pos.start_date);
    const end = pos.end_date ? moment(pos.end_date) : moment();
    totalMonths += moment.duration(end.diff(start)).asMonths();
  });

  const years = Math.floor(totalMonths / 12);
  const months = Math.round(totalMonths % 12);

  return {
    years,
    months,
    text: `${years} yrs - ${months} mos`,
  };
};

const ExperienceSection = ({ applicant }) => {
  const [showExperienceModal, setShowExperienceModal] = useState(false);

  /* --------------------------------------------------
   * Derived data
   * -------------------------------------------------- */
  const experiences = useMemo(
    () => applicant?.experience ?? [],
    [applicant?.experience],
  );

  const totalExperience = useMemo(
    () => calculateDuration(experiences),
    [experiences],
  );

  const groupedExperience = useMemo(
    () => _.groupBy(experiences, "applicant_employer_id"),
    [experiences],
  );

  return (
    <div className="mt-8">
      {/* Inline CSS for Timeline */}
      <style>
        {`
          .timeline {
            position: relative;
            margin-left: 12px;
            padding-left: 20px;
          }

          .timeline::before {
            content: "";
            position: absolute;
            left: 6px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: #dee2e6;
          }

          .timeline-item {
            position: relative;
            margin-bottom: 20px;
          }

          .timeline-dot {
            position: absolute;
            left: -20px;
            top: 6px;
            width: 12px;
            height: 12px;
            background: #2e58a6;
            border-radius: 50%;
          }
        `}
      </style>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center">
        <Card.Title className="mb-0">
          <h5 className="card-title fw-bold">
            WORK EXPERIENCE ({totalExperience.text})
          </h5>
        </Card.Title>

        <div className="d-flex gap-2">
          <Button
            variant="link"
            className="p-0 border-0 bg-transparent"
            onClick={() => setShowExperienceModal(true)}
          >
            <Plus style={{ fontSize: "1.5rem" }} className="text-muted" />
          </Button>

          <AddExperienceModal
            show={showExperienceModal}
            onHide={() => setShowExperienceModal(false)}
          />

          <Link to="/jobseeker/Edit-Experience">
            <Pencil
              style={{ cursor: "pointer", fontSize: "1.2rem" }}
              className="text-muted"
            />
          </Link>
        </div>
      </div>

      <hr className="border-primary mt-2 mb-2" />

      {/* Content */}
      {Object.keys(groupedExperience).length === 0 ? (
        <Alert variant="light" className="text-muted">
          No work experience added yet
        </Alert>
      ) : (
        <div className="row g-2">
          {Object.entries(groupedExperience).map(([employerId, positions]) => {
            const employer = positions[0]?.employer;
            const duration = calculateDuration(positions);
            const hasTimeline = positions.length > 1;

            return (
              <div key={employerId} className="col-12">
                <div className="d-flex">
                  {/* Icon */}
                  <div className="flex-shrink-0 me-3">
                    <BusinessOutlinedIcon
                      sx={{ fontSize: 40, color: "#2E58A6" }}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-grow-1">
                    <h5 className="mb-1">{employer?.employer_name}</h5>

                    <p className="text-muted mb-2">
                      {employer?.sub_location}, {employer?.region?.region_name}{" "}
                      - {employer?.region?.country?.name}
                    </p>

                    <Badge bg="light" text="dark" className="mb-3">
                      {duration.text}
                    </Badge>

                    {/* Positions */}
                    {hasTimeline ? (
                      <div className="timeline">
                        {positions.map((position, idx) => (
                          <div
                            key={position.id || idx}
                            className="timeline-item"
                          >
                            <span className="timeline-dot" />

                            <div>
                              <p className="mb-1">
                                <strong>
                                  {position.position?.position_name}
                                </strong>
                              </p>

                              {position.industry?.industry_name && (
                                <p className="mb-1">
                                  {position.industry.industry_name} Industry
                                </p>
                              )}

                              <p className="text-muted small mb-2">
                                {moment(position.start_date).format("MMM YYYY")}{" "}
                                -{" "}
                                {position.end_date
                                  ? moment(position.end_date).format("MMM YYYY")
                                  : "Present"}
                              </p>

                              <p className="mb-1">
                                <strong>Responsibility:</strong>{" "}
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: position.responsibility,
                                  }}
                                />
                              </p>

                              {position.remark && (
                                <p className="mb-0">
                                  <strong>Reason for Leaving:</strong>{" "}
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: position.remark,
                                    }}
                                  />
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ListGroup variant="flush">
                        {positions.map((position, idx) => (
                          <ListGroup.Item
                            key={position.id || idx}
                            className="border-0 px-0 py-2"
                          >
                            <p className="mb-1">
                              <strong>
                                {position.position?.position_name}
                              </strong>
                            </p>

                            <p className="text-muted small mb-2">
                              {moment(position.start_date).format("MMM YYYY")} -{" "}
                              {position.end_date
                                ? moment(position.end_date).format("MMM YYYY")
                                : "Present"}
                            </p>

                            <p className="mb-1">
                              <strong>Responsibility:</strong>{" "}
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: position.responsibility,
                                }}
                              />
                            </p>

                            {position.remark && (
                              <p className="mb-0">
                                <strong>Reason for Leaving:</strong>{" "}
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: position.remark,
                                  }}
                                />
                              </p>
                            )}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

ExperienceSection.propTypes = {
  applicant: PropTypes.shape({
    experience: PropTypes.array,
  }),
};

export default ExperienceSection;

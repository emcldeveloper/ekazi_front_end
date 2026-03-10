import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";

const Training = ({ candidate }) => {
  const trainings = candidate?.applicant?.trainings || [];

  const formatDate = (dateString) => {
    if (!dateString) return "Present";
    const options = { year: "numeric", month: "short" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const getFileNameFromUrl = (url) => {
    if (!url) return "";
    const parts = url.split("/");
    const fullName = parts[parts.length - 1];
    const lastDotIndex = fullName.lastIndexOf(".");
    if (lastDotIndex === -1) return fullName;

    const name = fullName.substring(0, lastDotIndex);
    const extension = fullName.substring(lastDotIndex);

    const shortenedName =
      name.length > 10 ? `${name.substring(0, 7)}...` : name;

    return `${shortenedName}${extension}`;
  };

  if (trainings.length === 0) {
    return null;
  }

  return (
    <Container className="border p-4 bg-white rounded mb-1">
      <h5 className="fw-bold text-primary">Trainings & Workshops</h5>

      <hr className="border-primary mt-2 mb-3" />

      {trainings?.map((training, index) => (
        <div key={index} className="d-flex mb-3 training-item">
          <div className="me-3 mt-1">
            <FontAwesomeIcon
              icon={faChalkboardTeacher}
              className="text-primary"
              style={{ fontSize: "1.5rem" }}
            />
          </div>
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between">
              <h6 className="mb-0 fw-bold">
                {training.name} -{" "}
                <span className="fw-light text-muted">
                  {formatDate(training.started)} - {formatDate(training.ended)}
                </span>
              </h6>
            </div>
            <p className="mb-0">{training.institution}</p>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default Training;

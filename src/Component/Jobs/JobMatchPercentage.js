import { Modal, Button } from "react-bootstrap";
import { useJobMatchData } from "../../hooks/useJobs";

const MatchModalButton = ({
  matchCount = 4,
  totalRequirements = 5,
  handleSubmit,
  show,
  setShow,
  isSubmitting,
}) => {
  const { data, isPending: isLoading, isError } = useJobMatchData();

  const percentage = data?.requirements?.percentage ?? 0;
  const categories = data?.requirements?.categories ?? [];

  const totalRequired = data?.total_required;
  const totalMatch = data?.total_match;

  const missing = totalRequired - totalMatch;

  if (isLoading)
    return <div className="text-center">Loading match data...</div>;

  if (isError)
    return (
      <div className="text-danger text-center">Failed to load match data</div>
    );

  return (
    <>
      <div className="text-center mt-1 mb-1">
        <button
          type="button"
          className="btn btn-primary px-5 py-1 fw-bold"
          onClick={() => setShow(true)}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </div>

      <Modal size="lg" show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "clamp(14px, 3vw, 18px)" }}>
            Application Match Status
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Notes + Circular Graph */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div
              className="alert alert-warning p-3 mb-0"
              style={{
                borderRadius: "8px",
                flex: 1,
                marginRight: "20px",
              }}
            >
              <div className="d-flex">
                <div className="me-2">⚠️</div>
                <div>
                  <strong className="d-block mb-1">NOTES:</strong>
                  <p className="mb-0 small">
                    You matched <strong>{totalMatch}</strong> out of{" "}
                    <strong>{totalRequired}</strong> requirements.
                    <br />
                    You are missing <strong>{missing}</strong> requirements.
                    {percentage < 80 &&
                      " Improve your profile to increase your match score."}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ minWidth: "120px" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: `conic-gradient(#2E58A6 ${percentage}%, #f0f0f0 ${percentage}%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                  boxShadow: "0 2px 8px rgba(46, 88, 166, 0.1)",
                }}
              >
                <div
                  style={{
                    width: "68px",
                    height: "68px",
                    borderRadius: "50%",
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: "#2E58A6",
                  }}
                >
                  {percentage}%
                </div>
              </div>
              <h6
                className="mt-2 text-center"
                style={{
                  color: "#2E58A6",
                  fontSize: "0.85rem",
                  fontWeight: "500",
                }}
              >
                {percentage >= 80 ? "Strong Match" : "Partial Match"}
              </h6>
            </div>
          </div>

          {/* Requirements Breakdown */}
          <div className="requirements-breakdown">
            <h6 className="fw-semibold mb-3">Requirements Analysis:</h6>

            <div
              className="requirement-container"
              style={{
                maxHeight: "300px",
                overflowY: "auto",
                paddingRight: "8px",
                scrollbarWidth: "thin",
              }}
            >
              {categories.map((cat, i) => (
                <div key={i} className="mb-3">
                  <h6 className="fw-bold mb-2">{cat.category}</h6>

                  {cat.item.map((req, idx) => (
                    <div
                      key={idx}
                      className="requirement-item mb-2 p-2"
                      style={{
                        background: req.status ? "#f8fff8" : "#fff8f8",
                        borderRadius: "6px",
                        borderLeft: `3px solid ${
                          req.status ? "#28a745" : "#dc3545"
                        }`,
                      }}
                    >
                      <div className="d-flex flex-column flex-md-row justify-content-between">
                        <span className="mb-1 mb-md-0">
                          {req.status ? "✔️" : "❌"} <strong>{req.name}</strong>
                        </span>
                        <span
                          className={
                            req.status ? "text-success" : "text-danger"
                          }
                        >
                          {req.status ? "Matched" : "Not Matched"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between border-top-0 pt-0">
          <Button
            variant="outline-secondary"
            onClick={() => setShow(false)}
            style={{ minWidth: "100px" }}
          >
            Cancel
          </Button>

          <Button
            variant={percentage >= 70 ? "primary" : "outline-danger"}
            style={{ minWidth: "140px" }}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Applying..." : "Apply Anyway"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MatchModalButton;

import { useState } from "react";
import Swal from "sweetalert2";

import { Badge, Col, Modal, Row } from "react-bootstrap";
import { useInterviewResponse } from "../../hooks/useJobs";

const InterviewDetailsModal = ({ interviewDetails, show, onHide }) => {
  const { mutate: respondInterview, isPending } = useInterviewResponse();

  const [showRescheduleForm, setShowRescheduleForm] = useState(false);
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [rescheduleReason, setRescheduleReason] = useState("");

  const [rescheduleDate, setRescheduleDate] = useState("");
  const [cancelReason, setCancelReason] = useState("");

  const isFinalStatus = ["Interested", "Not Interested"].includes(
    interviewDetails?.status,
  );

  const handleInterested = async () => {
    const result = await Swal.fire({
      title: "Confirm Attendance?",
      text: "Are you sure you are interested in attending this interview?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Confirm",
    });

    if (!result.isConfirmed) return;

    respondInterview(
      {
        id: interviewDetails.id,
        status: "Interested",
        reason: null,
        reschedule_date: null,
      },
      {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: "Confirmed!",
            text: "You have confirmed your interview attendance.",
            timer: 2000,
            showConfirmButton: false,
          });

          onHide();
        },
        onError: () => {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Something went wrong. Please try again.",
          });
        },
      },
    );
  };

  const handleReschedule = async () => {
    if (!rescheduleDate) {
      Swal.fire({
        icon: "warning",
        title: "Date Required",
        text: "Please select a new interview date.",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Reschedule Interview?",
      text: "Are you sure you want to reschedule this interview?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0d6efd",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Reschedule",
    });

    if (!result.isConfirmed) return;

    respondInterview(
      {
        id: interviewDetails.id,
        status: "Reschedule",
        reason: rescheduleReason || null,
        reschedule_date: rescheduleDate,
      },
      {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: "Rescheduled!",
            text: "Your reschedule request has been sent.",
            timer: 2000,
            showConfirmButton: false,
          });

          setShowRescheduleForm(false);
          setRescheduleDate("");
          setRescheduleReason("");
          onHide();
        },
        onError: () => {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Something went wrong. Please try again.",
          });
        },
      },
    );
  };

  const handleNotInterested = async () => {
    const result = await Swal.fire({
      title: "Cancel Interview?",
      text: "Are you sure you are not interested in this interview?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Cancel",
    });

    if (!result.isConfirmed) return;

    respondInterview(
      {
        id: interviewDetails.id,
        status: "Not Interested",
        reason: cancelReason || null,
        reschedule_date: null,
      },
      {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: "Cancelled",
            text: "You have declined the interview.",
            timer: 2000,
            showConfirmButton: false,
          });

          setShowCancelForm(false);
          setCancelReason("");
          onHide();
        },
        onError: () => {
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Something went wrong. Please try again.",
          });
        },
      },
    );
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        {interviewDetails && (
          <Row className="g-3">
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h5 className="mb-1 fw-bold">Interview Details</h5>
              <Badge
                bg={
                  interviewDetails?.status === "Pending"
                    ? "warning"
                    : interviewDetails?.status === "Interested"
                      ? "success"
                      : interviewDetails?.status === "Reschedule"
                        ? "primary"
                        : "danger"
                }
                className="px-3 py-2 rounded-pill"
              >
                {interviewDetails?.status || "Unknown"}
              </Badge>
            </div>

            {/* LEFT LABELS */}
            <Col md={6} className="fw-bold text-muted">
              <p>Type</p>
              <p>Duration</p>
              <p>Link</p>
              <p>Interview Date</p>

              {interviewDetails?.reschedule_date && <p>Reschedule Date</p>}
              {interviewDetails?.reason && <p>Reason</p>}
            </Col>

            {/* RIGHT VALUES */}
            <Col md={6} className="text-end">
              <p>{interviewDetails?.interview_type || "-"}</p>
              <p>
                {interviewDetails?.duration
                  ? `${interviewDetails.duration} mins`
                  : "-"}
              </p>

              <p>
                {interviewDetails?.url ? (
                  <a
                    href={interviewDetails.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Join Interview
                  </a>
                ) : (
                  "-"
                )}
              </p>

              <p>{interviewDetails?.interview_date || "Not scheduled"}</p>

              {interviewDetails?.reschedule_date && (
                <p className="text-warning fw-semibold">
                  {interviewDetails.reschedule_date}
                </p>
              )}

              {interviewDetails?.reason && (
                <p className="text-danger">{interviewDetails.reason}</p>
              )}
            </Col>

            {/* RESCHEDULE FORM */}
            {showRescheduleForm && (
              <Col xs={12}>
                <div className="border rounded-3 p-3 bg-light">
                  <h6 className="fw-semibold mb-2">Reschedule Interview</h6>

                  <div className="mb-3">
                    <label className="form-label small text-muted">
                      New Interview Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={rescheduleDate}
                      onChange={(e) => setRescheduleDate(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small text-muted">
                      Reason (optional)
                    </label>
                    <textarea
                      rows={3}
                      className="form-control"
                      placeholder="Why are you rescheduling?"
                      value={rescheduleReason}
                      onChange={(e) => setRescheduleReason(e.target.value)}
                    />
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-primary btn-sm"
                      disabled={isPending}
                      onClick={handleReschedule}
                    >
                      {isPending ? "Submitting..." : "Submit"}
                    </button>

                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => setShowRescheduleForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Col>
            )}

            {/* CANCEL FORM */}
            {showCancelForm && (
              <Col xs={12}>
                <div className="border rounded-3 p-3 bg-light">
                  <h6 className="fw-semibold mb-2">Cancel Interview</h6>

                  <textarea
                    rows={3}
                    className="form-control mb-3"
                    placeholder="Reason (optional)"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-danger btn-sm"
                      disabled={isPending}
                      onClick={handleNotInterested}
                    >
                      {isPending ? "Submitting..." : "Submit"}
                    </button>

                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => setShowCancelForm(false)}
                    >
                      Back
                    </button>
                  </div>
                </div>
              </Col>
            )}
          </Row>
        )}
      </Modal.Body>

      <Modal.Footer>
        {/* {!isFinalStatus && (
        
        )} */}

        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-outline-danger"
            disabled={isPending}
            onClick={() => {
              setShowRescheduleForm(false);
              setShowCancelForm(true);
            }}
          >
            Not interested
          </button>

          <button
            className="btn btn-outline-primary"
            disabled={isPending}
            onClick={() => {
              setShowCancelForm(false);
              setShowRescheduleForm(true);
            }}
          >
            Reschedule
          </button>

          <button
            className="btn btn-success"
            disabled={isPending}
            onClick={handleInterested}
          >
            {isPending ? "Submitting..." : "Interested"}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default InterviewDetailsModal;

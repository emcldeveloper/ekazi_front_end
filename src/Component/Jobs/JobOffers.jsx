import { Badge, Card, Col, Container, Modal, Table } from "react-bootstrap";
import JobSeekerLayout2 from "../../layouts/JobSeekerLayout2";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { Eye } from "react-bootstrap-icons";
import { useRef, useState } from "react";
import { useOfferResponse } from "../../hooks/useJobs";

const JobOffers = () => {
  const location = useLocation();
  const rejectFormRef = useRef(null);

  const { mutate: respondOffer, isPending } = useOfferResponse();

  const [isModalOpen, setIsOpenModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showRejectForm, setShowRejectOffer] = useState(false);
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [isNegotiable, setIsNegotiable] = useState(false);

  const offers = Array.isArray(location.state?.offers)
    ? location.state.offers
    : [];

  const sortedOffers = [...offers].sort((a, b) => b.round - a.round);

  const isActionable =
    selectedOffer?.status !== "Accepted" &&
    selectedOffer?.status !== "Rejected";

  const handleViewOffer = (offer) => {
    setSelectedOffer(offer);
    setIsOpenModal(true);
  };

  const handleAcceptOffer = async () => {
    if (!selectedOffer) return;

    const result = await Swal.fire({
      title: "Accept Offer?",
      text: "Are you sure you want to accept this job offer?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Accept",
    });

    if (!result.isConfirmed) return;

    respondOffer(
      {
        id: selectedOffer?.id,
        status: "Accepted",
        reason: null,
        negotiable: "",
      },
      {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: "Offer Accepted!",
            text: "You have successfully accepted the offer.",
            timer: 2000,
            showConfirmButton: false,
          });

          setIsOpenModal(false);
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

  const handleRejectOffer = async () => {
    if (!selectedOffer) return;

    if (!rescheduleReason && !isNegotiable) {
      Swal.fire({
        icon: "warning",
        title: "Reason Required",
        text: "Please provide a reason before submitting.",
      });
      return;
    }

    const result = await Swal.fire({
      title: isNegotiable ? "Negotiate Offer?" : "Reject Offer?",
      text: isNegotiable
        ? "Are you sure you want to negotiate this offer?"
        : "Are you sure you want to reject this offer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isNegotiable ? "#0dcaf0" : "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: isNegotiable ? "Yes, Negotiate" : "Yes, Reject",
    });

    if (!result.isConfirmed) return;

    respondOffer(
      {
        id: selectedOffer?.id,
        status: isNegotiable ? "Negotiable" : "Rejected",
        reason: rescheduleReason || null,
      },
      {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: isNegotiable ? "Negotiation Submitted" : "Offer Rejected",
            text: isNegotiable
              ? "Your negotiation request has been sent."
              : "You have rejected the offer.",
            timer: 2000,
            showConfirmButton: false,
          });

          setIsOpenModal(false);
          setShowRejectOffer(false);
          setRescheduleReason("");
          setIsNegotiable(false);
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

  if (offers.length === 0) {
    return (
      <JobSeekerLayout2>
        <Container className="py-5 text-center">
          <h5>No offers found.</h5>
        </Container>
      </JobSeekerLayout2>
    );
  }

  return (
    <JobSeekerLayout2>
      <Container>
        <Card>
          <Card.Body>
            <Table bordered hover responsive>
              <thead className="table-light">
                <tr>
                  <th>Description</th>
                  <th>Location</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedOffers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No offers available.
                    </td>
                  </tr>
                ) : (
                  sortedOffers.map((offer) => {
                    const status = offer?.status;

                    return (
                      <tr key={offer.id}>
                        <td>{offer.description}</td>
                        <td>
                          {offer.working_sub_location}, Region ID:{" "}
                          {offer.working_region_id}
                        </td>
                        <td>{offer.deadline}</td>
                        <td>
                          <Badge
                            bg={
                              status === "Accepted"
                                ? "success"
                                : status === "Negotiable"
                                  ? "info"
                                  : status === "Rejected"
                                    ? "danger"
                                    : "warning"
                            }
                          >
                            {status === "Accepted"
                              ? "Accepted"
                              : status === "Negotiable"
                                ? "Negotiable"
                                : status === "Rejected"
                                  ? "Rejected"
                                  : "Pending"}
                          </Badge>
                        </td>
                        <td>
                          <div
                            onClick={() => handleViewOffer(offer)}
                            className="d-flex gap-1 align-items-center justify-content-center cursor-pointer"
                          >
                            <Eye />
                            <p className="small m-0 p-0"> View</p>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        <Modal
          show={isModalOpen}
          onHide={() => {
            setShowRejectOffer(false);
            setIsOpenModal(false);
          }}
          size="lg"
          centered
          scrollable
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            {selectedOffer && (
              <>
                <Table bordered hover responsive>
                  <tbody>
                    <tr>
                      <th>Offer Description</th>
                      <td>{selectedOffer.description}</td>
                    </tr>

                    <tr>
                      <th>Offered Salary</th>
                      <td>TZS {selectedOffer.salary?.toLocaleString()}</td>
                    </tr>

                    <tr>
                      <th>Benefits</th>
                      <td>
                        {selectedOffer.benefits
                          ?.map((b) => b?.benefit?.name)
                          .join(" , ")}
                      </td>
                    </tr>

                    <tr>
                      <th>Location</th>
                      <td>
                        {selectedOffer.working_sub_location}{" "}
                        {selectedOffer.region_of_working?.region_name},{" "}
                        {selectedOffer.region_of_working?.country?.name}
                      </td>
                    </tr>

                    <tr>
                      <th>Starting Date</th>
                      <td> {selectedOffer.starting_date}</td>
                    </tr>

                    <tr>
                      <th>Duration</th>
                      <td>{selectedOffer.duration} Months</td>
                    </tr>

                    <tr>
                      <th>Working Days</th>
                      <td>{selectedOffer.working_day} Days</td>
                    </tr>

                    <tr>
                      <th>Working Hours</th>
                      <td>{selectedOffer.working_hour} Hours</td>
                    </tr>

                    <tr>
                      <th>Probation Period</th>
                      <td>{selectedOffer.probabition} Months</td>
                    </tr>

                    <tr>
                      <th>Recruitment Location</th>
                      <td>
                        {selectedOffer.region_of_recruitment?.region_name},{" "}
                        {selectedOffer.region_of_recruitment?.country?.name}
                      </td>
                    </tr>

                    <tr>
                      <th>Response Deadline</th>
                      <td>{selectedOffer.deadline}</td>
                    </tr>
                  </tbody>
                </Table>
              </>
            )}

            {/* Reject form */}
            {showRejectForm && (
              <Col xs={12} ref={rejectFormRef}>
                <div className="border rounded-3 p-3 bg-light">
                  <div className="mb-3">
                    <label className="form-label ">
                      Reason <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      className="form-control small text-muted"
                      placeholder="Why are you rejecting offer?"
                      value={rescheduleReason}
                      onChange={(e) => setRescheduleReason(e.target.value)}
                    />
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-primary btn-sm"
                      disabled={isPending}
                      onClick={() => {
                        handleRejectOffer();
                        setShowRejectOffer(false);
                        setRescheduleReason("");
                      }}
                    >
                      {isPending ? "Submitting..." : "Submit"}
                    </button>

                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => setShowRejectOffer(false)}
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="renegotiateCheck"
                      checked={isNegotiable}
                      onChange={(e) => setIsNegotiable(e.target.checked)}
                    />
                    <label
                      className="form-check-label small text-muted"
                      htmlFor="renegotiateCheck"
                    >
                      I want to negotiate this offer
                    </label>
                  </div>
                </div>
              </Col>
            )}
          </Modal.Body>
          <Modal.Footer>
            {isActionable ? (
              <div className="d-flex align-items-center gap-2">
                <button
                  disabled={isPending}
                  onClick={() => {
                    setShowRejectOffer(true);
                    setTimeout(() => {
                      rejectFormRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }, 100);
                  }}
                  className="btn btn-outline-danger"
                >
                  Reject
                </button>
                <button
                  disabled={isPending}
                  onClick={handleAcceptOffer}
                  className="btn btn-success"
                >
                  {isPending ? "Accepting..." : "Accept"}
                </button>
              </div>
            ) : (
              <div className="w-100 text-center text-muted small">
                This offer has already been {selectedOffer?.status}.
              </div>
            )}
          </Modal.Footer>
        </Modal>
      </Container>
    </JobSeekerLayout2>
  );
};

export default JobOffers;

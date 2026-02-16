import { Badge, Card, Col, Container, Modal, Table } from "react-bootstrap";
import JobSeekerLayout2 from "../../layouts/JobSeekerLayout2";
import { useLocation } from "react-router-dom";
import { Eye } from "react-bootstrap-icons";
import { useState } from "react";
import { useOfferResponse } from "../../hooks/useJobs";

const JobOffers = () => {
  const location = useLocation();

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

  const handleViewOffer = (offer) => {
    setSelectedOffer(offer);
    setIsOpenModal(true);
  };

  const handleAcceptOffer = () => {
    setIsOpenModal(false);

    if (!selectedOffer) return;

    respondOffer({
      id: selectedOffer?.id,
      status: "Accepted",
      reason: null,
      negotiable: "",
    });
  };

  const handleRejectOffer = () => {
    if (!selectedOffer) return;

    respondOffer({
      id: selectedOffer?.id,
      status: isNegotiable ? "Negotiable" : "Rejected",
      reason: rescheduleReason || null,
    });

    setIsOpenModal(false);
    setShowRejectOffer(false);
    setRescheduleReason("");
    setIsNegotiable(false);
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

                    console.log("STATE:", offers);
                    console.log("LOCATION STATE:", location.state?.offers);

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
          onHide={() => setIsOpenModal(false)}
          size="lg"
          centered
          scrollable
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            {selectedOffer && (
              <>
                <p>
                  <strong>Offer Round:</strong> {selectedOffer.round}
                </p>
                <p>
                  <strong>Offer Description:</strong>{" "}
                  {selectedOffer.description}
                </p>
                <p>
                  <strong>Offered Salary:</strong> TZS{" "}
                  {selectedOffer.salary?.toLocaleString()}
                </p>
                <p>
                  <strong>Starting Date:</strong> {selectedOffer.starting_date}
                </p>
                <p>
                  <strong>Duration:</strong> {selectedOffer.duration} Months
                </p>
                <p>
                  <strong>Working Days:</strong> {selectedOffer.working_day}
                </p>
                <p>
                  <strong>Working Hours:</strong> {selectedOffer.working_hour}
                </p>
                <p>
                  <strong>Probation Period:</strong> {selectedOffer.probabition}{" "}
                  Months
                </p>
                <p>
                  <strong>Location:</strong>{" "}
                  {selectedOffer.working_sub_location}
                </p>
                <p>
                  <strong>Response Deadline:</strong> {selectedOffer.deadline}
                </p>
              </>
            )}

            {/* Reject form */}
            {showRejectForm && (
              <Col xs={12}>
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
            <div className="d-flex align-items-center gap-2">
              <button
                disabled={isPending}
                onClick={() => setShowRejectOffer(true)}
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
          </Modal.Footer>
        </Modal>
      </Container>
    </JobSeekerLayout2>
  );
};

export default JobOffers;

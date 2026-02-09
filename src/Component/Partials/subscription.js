import React, { useState } from "react";
import { Nav, Modal, Button, Form, Table } from "react-bootstrap";
import { FaWhatsapp, FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { createProfileSubscription } from "../../Api/Jobseeker/JobSeekerProfileApi";
import useSubscriptionStatus from "../../hooks/Candidate/SubscriptionStatus";

// import MySubscriptionStatus from "../../hooks/Candidate/SubscriptionStatus";
const SubscriptionSection = ({ isLoggedIn }) => {
    const [showSubscription, setShowSubscription] = useState(false);
    const applicant_id = localStorage.getItem("applicantId");
    const [showInvoice, setShowInvoice] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState("free");
    const [paymentCode, setPaymentCode] = useState("");
    const fullName = "Halidi Selemani";

    const { subscriptionData, loading, error } = useSubscriptionStatus();



    const handleSubscriptionOpen = () => setShowSubscription(true);
    const handleSubscriptionClose = () => setShowSubscription(false);
    const handleInvoiceOpen = () => {
        setShowSubscription(false);
        setShowInvoice(true);
    };
    const handleInvoiceClose = () => setShowInvoice(false);
    // const {subscriptionVerification} =MySubscriptionStatus();
    // console.log("my scubscription is available",subscriptionVerification);

    const handlePaymentSubmit = async () => {

        try {
            const sendData = {
                code_number: paymentCode,
                applicant_id: applicant_id,
            }
            const response = await createProfileSubscription(sendData);
            if (response.status === 200) {
                console.log("code data", paymentCode)
                Swal.fire({
                    title: "Success!",
                    text: response.data.success,
                    icon: "success",
                });
                setPaymentCode("");
                setShowInvoice(false);
            } else {
                Swal.fire({
                    title: "Error!",
                    text: response.data.error,
                    icon: "success",
                });
            }
        } catch (error) {
            console.log("error on inser data ", error)

        }

    };

    return (
        <>
            {isLoggedIn && (
                <Nav.Link
                    onClick={handleSubscriptionOpen}
                    className="upgrade-btn ms-lg-3 my-2 my-lg-0"
                    style={{
                        background: "linear-gradient(90deg, #D36314, #FF8C00)",
                        color: "#fff",
                        fontWeight: "500",
                        borderRadius: "18px",
                        padding: "6px 14px",
                        fontSize: "12px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
                        textTransform: "capitalize",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        transition: "all 0.3s ease",
                        
                    }}
                    onMouseOver={(e) => (e.target.style.opacity = "0.9")}
                    onMouseOut={(e) => (e.target.style.opacity = "1")}
                >
                    <FaUserCircle style={{ fontSize: "13px" }} />
                    Upgrade
                </Nav.Link>


            )}

            {/* Subscription Modal */}
            <Modal show={showSubscription} onHide={handleSubscriptionClose} centered>
                <Modal.Header
                    closeButton
                    style={{
                        background: "linear-gradient(90deg, #D36314, #FF8C00)",
                        borderBottom: "2px solid #FF8C00",
                    }}
                >
                    <Modal.Title className="fw-bold text-white" >
                        Choose Your Plan
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Why Choose Subscription */}
                    <div
                        style={{
                            backgroundColor: "#FFF8F3",
                            borderRadius: "10px",
                            padding: "10px 15px",
                            marginBottom: "20px",
                            borderLeft: "4px solid #FF8C00",
                        }}
                    >
                        <h6
                            style={{
                                color: "#D36314",
                                fontWeight: "700",
                                marginBottom: "6px",
                            }}
                        >
                            Why Choose eKazi Subscription?
                        </h6>
                        <ul style={{ paddingLeft: "20px", color: "#444" }}>
                            <li>Your profile will be promoted on the eKazi homepage!</li>
                            <li>Share your profile directly with employers — no hassle!</li>
                            <li>Enjoy unbeatable prices and exclusive discounts!</li>
                            <li>Upgrade today and grow your career faster!</li>
                        </ul>
                    </div>

                    {/* Plan Options */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            gap: "20px",
                        }}
                    >
                        {/* Free Plan */}
                        <div
                            onClick={() => setSelectedPlan("free")}
                            style={{
                                border:
                                    selectedPlan === "free"
                                        ? "2px solid #28a745"
                                        : "1px solid #ccc",
                                borderRadius: "10px",
                                padding: "20px",
                                width: "45%",
                                textAlign: "center",
                                cursor: "pointer",
                                backgroundColor:
                                    selectedPlan === "free" ? "#E8F5E9" : "#f9f9f9",
                                transition: "0.3s",
                            }}
                        >
                            <h5 className="fw-bold text-success mb-2">Free Plan</h5>
                            <p className="text-muted mb-1">Basic features</p>
                            <small>Cost: 0 TZS</small>
                        </div>

                        {/* Premium Plan */}
                        <div
                            onClick={() => setSelectedPlan("premium")}
                            style={{
                                border:
                                    selectedPlan === "premium"
                                        ? "2px solid #D36314"
                                        : "1px solid #ccc",
                                borderRadius: "10px",
                                padding: "20px",
                                width: "45%",
                                textAlign: "center",
                                cursor: "pointer",
                                backgroundColor:
                                    selectedPlan === "premium" ? "#FFF5EE" : "#f9f9f9",
                                transition: "0.3s",
                            }}
                        >
                            <h5
                                className="fw-bold mb-2"
                                style={{ color: "#FF8C00", fontWeight: "700" }}
                            >
                                Premium Plan
                            </h5>
                            <p className="text-muted mb-1">Unlock all features</p>
                            <small>Cost: 10,000 TZS / Year</small>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {selectedPlan === "premium" ? (
                        <Button
                            style={{
                                background: "linear-gradient(90deg, #D36314, #FF8C00)",
                                border: "none",
                                padding: "8px 20px",
                                fontWeight: "600",
                            }}
                            onClick={handleInvoiceOpen}
                        >
                            Continue to Payment
                        </Button>
                    ) : (
                        <Button variant="success" onClick={handleSubscriptionClose}>
                            Continue with Free
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>

            {/* Invoice Modal */}
            <Modal show={showInvoice} onHide={handleInvoiceClose} centered>
                <Modal.Header closeButton style={{ background: "linear-gradient(90deg, #D36314, #FF8C00)", }}>
                    <Modal.Title className="fw-bold text-warning">
                        Premium Subscription Invoice
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mt-4">
                        {subscriptionData?.verify === 1 ? (
                            <>

                                <p className="text-muted">
                                    Pay <strong>10,000 TZS</strong> to the{" "}
                                    <strong>Tigo Pesa Lipa number</strong> below, then paste your payment
                                    code and send to WhatsApp and system.
                                </p>

                                <Table bordered hover responsive className="mt-3">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Invoice No.</th>
                                            <th>Date</th>
                                            <th>Amount (TZS)</th>
                                            <th>Payment Method</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>#INV-2025-001</td>
                                            <td>22 Oct 2025</td>
                                            <td>10,000</td>
                                            <td>Mixx by Yas (Lipa Number)</td>
                                            <td>
                                                <span className="badge bg-warning text-dark">Pending</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>

                            </>


                        ) : (
                            <Table bordered hover responsive className="mt-3">
                                <thead className="table-light">
                                    <tr>
                                        <th>Invoice No.</th>
                                        <th>Date</th>
                                        <th>Amount (TZS)</th>
                                        <th>Payment Method</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>#INV-2025-001</td>
                                        <td>22 Oct 2025</td>
                                        <td>10,000</td>
                                        <td>Mixx by Yas (Lipa Number)</td>
                                        <td>
                                            <span className="badge bg-warning text-dark">Active</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        )}
                    </div>


                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            marginBottom: "20px",
                        }}
                    >
                        <img
                            src="/lipa_no/lipa1.jpg"
                            alt="Tigo Pesa Front"
                            style={{ width: "45%", borderRadius: "10px" }}
                        />
                        <img
                            src="/lipa_no/jinsi_ya_kulipa.jpg"
                            alt="Tigo Pesa Back"
                            style={{ width: "45%", borderRadius: "10px" }}
                        />
                    </div>

                    <Form.Group controlId="paymentCode">
                        <Form.Label className="fw-semibold">Enter Payment Code:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Paste your payment code here..."
                            value={paymentCode}
                            onChange={(e) => setPaymentCode(e.target.value)}
                        />
                    </Form.Group>
                    {/* WhatsApp Section */}
                    <div
                        style={{
                            marginTop: "20px",
                            textAlign: "center",
                            backgroundColor: "#E9F5EE",
                            borderRadius: "10px",
                            padding: "10px",
                            border: "1px solid #25D366",
                        }}
                    >
                        <p style={{ marginBottom: "5px" }}>
                            <strong>Send your payment code via WhatsApp:</strong>
                        </p>
                        <a
                            href={`https://wa.me/255677975251?text=Hello%20Ekazi%2C%20I%20have%20paid%20for%20the%20Premium%20Plan.%20My%20name%20is%3A%20${encodeURIComponent(
                                fullName
                            )}%20and%20my%20payment%20code%20is%3A%20${encodeURIComponent(
                                paymentCode
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                textDecoration: "none",
                                color: "#25D366",
                                fontWeight: "600",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                fontSize: "15px",
                            }}
                        >
                            <FaWhatsapp size={22} /> +255 677 975 251
                        </a>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleInvoiceClose}
                        style={{ borderRadius: "20px" }}
                    >
                        Cancel
                    </Button>
                    <Button
                        style={{
                            background: "linear-gradient(90deg, #D36314, #FF8C00)",
                            border: "none",
                            borderRadius: "20px",
                        }}
                        onClick={handlePaymentSubmit}
                    >
                        Send Payment Code
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SubscriptionSection;

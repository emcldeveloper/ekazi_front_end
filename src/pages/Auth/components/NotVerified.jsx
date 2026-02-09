import React, { useState } from "react";
import { Button, Container, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NotVerified = () => {
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_URL; 

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // User email (stored after login)
  const userEmail = localStorage.getItem("email"); 
  const token = localStorage.getItem("token");      // JWT token

  const handleResend = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    if (!userEmail) {
      setError("User email missing. Please login again.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}auth/resend-verification`,
        { email: userEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message || "Verification email sent successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend verification email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="text-center mt-5">
      <Alert variant="warning">
        <h3>Your Account Is Not Verified</h3>
        <p>Please check your email inbox for the verification link.</p>

        <p>
          Didn’t receive the email?{" "}
          <Button
            variant="link"
            onClick={handleResend}
            disabled={loading}
            style={{ padding: 0, fontWeight: "bold" }}
          >
            {loading ? (
              <>
                <Spinner
                  animation="border"
                  size="sm"
                  role="status"
                  className="me-1"
                />
                Sending...
              </>
            ) : (
              "Click here to resend"
            )}
          </Button>
        </p>

        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
      </Alert>

      <Button variant="primary" onClick={() => navigate("/")}>
        Go to Homepage
      </Button>
    </Container>
  );
};

export default NotVerified;

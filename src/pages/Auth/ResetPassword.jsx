import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Spinner, Form, Button, Container, Alert } from "react-bootstrap";

import { useResetPassword } from "../../hooks/useResetPassword";
import MainLayout1 from "../../layouts/MainLayout1";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { resetPassword, loading, errorMsg, successMsg } = useResetPassword();

  useEffect(() => {
    if (!token || !email) {
      alert("Invalid password reset link.");
      navigate("/");
    }
  }, [token, email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const success = await resetPassword({
      token,
      email,
      password,
      password_confirmation: confirmPassword,
    });
    if (success) {
      setTimeout(() => navigate("/"), 2000);
    }
  };

  return (
    <MainLayout1>
      {" "}
      <Container style={{ maxWidth: "500px", marginTop: "50px" }}>
        <h3 className="text-center mb-4">Reset Password</h3>

        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        {successMsg && <Alert variant="success">{successMsg}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            type="submit"
            className="w-100 py-2"
            style={{ backgroundColor: "#D36314", border: "none" }}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </Form>
      </Container>
    </MainLayout1>
  );
};

export default ResetPassword;

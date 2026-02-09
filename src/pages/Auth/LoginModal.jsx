import React from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Spinner,
  Container,
} from "react-bootstrap";
import { FaGoogle, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useLogin, useResetPassword } from "../../hooks/useAuth.js";

import { useNavigate } from "react-router-dom";

const LoginModal = ({ show, onHide }) => {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const [showCandidateForm, setShowCandidateForm] = React.useState(false);
  const resetMutation = useResetPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUserChoice = (type) => {
    if (type === "candidate") setShowCandidateForm(true);

    if (type === "employer")
      window.location.href = "https://api.ekazi.co.tz/login";
  };

  const handleResetPassword = (email) => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }

    resetMutation.mutate(email, {
      onSuccess: () => {
        alert("Password reset link sent to your email.");
      },
      onError: (err) => {
        alert(err.message || "Reset failed.");
      },
    });
  };
  const onSubmit = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        localStorage.setItem("auth_token", res.access_token);
        localStorage.setItem("user_id", res.user_id);
        localStorage.setItem("role_id", res.role_id);
        localStorage.setItem("verified", res.verified);
        localStorage.setItem("applicantId", res.applicant_id);
        localStorage.setItem("email", res.email);
        localStorage.setItem("verify_key", res.verify_key);

        const role = res?.role_id;

        // Role-based navigation
        if (role === 12) {
          navigate("/jobseeker/dashboard");
        } else if (role === 9) {
          navigate("/employer/dashboard");
        } else {
          alert("Unknown role. Please contact support.");
        }

        setShowCandidateForm(false);
        onHide();
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  return (
    <>
      {/* ────────────────────────────────────────────────
            SELECT LOGIN TYPE MODAL
         ──────────────────────────────────────────────── */}
      <Modal show={show && !showCandidateForm} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title as="h5" className="modal-title">
            Select Login Type
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          <Button
            variant="primary"
            onClick={() => handleUserChoice("candidate")}
            className="me-2"
          >
            Login as JobSeeker
          </Button>

          <Button
            variant="secondary"
            onClick={() => handleUserChoice("employer")}
          >
            Login as Employer
          </Button>
        </Modal.Body>
      </Modal>

      {/* ────────────────────────────────────────────────
            CANDIDATE LOGIN FORM MODAL
         ──────────────────────────────────────────────── */}
      <Modal
        show={showCandidateForm}
        onHide={() => setShowCandidateForm(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title as="h5" className="modal-title">
            JobSeeker Login
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container className="d-flex justify-content-center mb-3">
            <span
              className="bg-light text-dark text-center px-4 py-2"
              style={{ fontSize: "20px", borderRadius: "5px" }}
            >
              Welcome to eKazi Portal
            </span>
          </Container>

          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Global Login Error */}
            {loginMutation.isError && (
              <div className="text-danger text-center mb-3">
                {loginMutation.error.message}
              </div>
            )}

            {/* EMAIL FIELD */}
            <Form.Group controlId="email" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email Address"
                className="form-lg"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
            </Form.Group>

            {/* PASSWORD FIELD */}
            <Form.Group controlId="password" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                className="form-lg"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <small className="text-danger">{errors.password.message}</small>
              )}
            </Form.Group>

            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              className="text-light form-lg bntLogin mb-3 w-100"
              style={{ backgroundColor: "#D36314" }}
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>

            <hr />

            {/* SOCIAL LOGIN */}
            <div className="text-center mb-3">
              <span className="d-block mb-2">Sign in with:</span>

              <Button
                href="/login/linkedin-openid"
                className="btn-sm me-2 text-white"
                style={{ backgroundColor: "#00acee" }}
              >
                <FaLinkedin />
              </Button>

              <Button
                href="/login/google"
                className="btn-sm me-2 text-white"
                style={{ backgroundColor: "#db4437" }}
              >
                <FaGoogle />
              </Button>

              <Button
                href="/login/twitter"
                className="btn-sm text-white"
                style={{ backgroundColor: "#1da1f2" }}
              >
                <FaTwitter />
              </Button>
            </div>

            <hr />

            {/* BOTTOM OPTIONS */}
            <Row className="text-center py-3">
              <Col md={6} className="mb-3">
                <p className="mb-2 text-muted">Forgot your password?</p>
                <Button
                  variant="outline-primary"
                  className="px-3 py-1 rounded-pill"
                  onClick={() =>
                    handleResetPassword(
                      document.querySelector('input[type="email"]').value
                    )
                  }
                >
                  Reset Password
                </Button>
              </Col>

              <Col md={6} className="mb-3">
                <p className="mb-2 text-muted">
                  New to <strong>eKazi</strong>?
                </p>

                <Button
                  variant="outline-primary"
                  className="px-3 py-1 rounded-pill"
                  onClick={() => setShowCandidateForm(false)}
                >
                  Register
                </Button>
              </Col>
            </Row>

            <hr />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;

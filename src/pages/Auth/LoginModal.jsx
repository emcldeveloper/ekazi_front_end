import { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useLogin, useResetPassword } from "../../hooks/useAuth.js";

const LoginModal = ({ show, onHide }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // login
  const { mutate: loginUser, isPending, isError, error } = useLogin();

  // reset password
  const resetMutation = useResetPassword();

  // Handlers
  const [showCandidateForm, setShowCandidateForm] = useState(false);

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
    loginUser(data, {
      onSuccess: () => {
        setShowCandidateForm(false);
        reset();
        onHide();
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
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title as="h5" className="modal-title">
            Login as job seeker
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="d-flex justify-content-center mb-3">
            <p
              className=" text-Blue text-center font-semibold"
              style={{ fontSize: "20px", borderRadius: "5px" }}
            >
              Welcome back to ekazi portal
            </p>
          </div>

          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Global Login Error */}
            {isError && (
              <div className="text-danger text-center mb-3">
                {error.message}
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

            <div className="text-right">
              <p
                className="text-Blue font-semibold text-sm cursor-pointer hover:text-underline"
                onClick={() =>
                  handleResetPassword(
                    document.querySelector('input[type="email"]').value,
                  )
                }
              >
                Forgot your password?
              </p>
            </div>

            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              className="text-white font-semibold mb-3 w-100"
              style={{ backgroundColor: "#D36314", border: "none" }}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </Form>

          {/* SOCIAL LOGIN */}
          <p className="d-block text-center text-muted mb-4">
            or continue with
          </p>
          <div className="flex items-center gap-4 mb-3">
            <button className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-blue-100 text-Blue hover:bg-blue-100 transition">
              <FaLinkedin size={18} /> Linkedin
            </button>

            <button className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-blue-100 text-Blue hover:bg-blue-100 transition">
              <FaGoogle size={18} /> Google
            </button>
          </div>

          {/* BOTTOM OPTIONS */}
          <div className="text-center py-3">
            <p className="mb-2 text-muted">
              Don't have ekazi account?{" "}
              <span
                onClick={() => setShowCandidateForm(false)}
                className="text-Blue font-semibold underline cursor-pointer"
              >
                register
              </span>
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;

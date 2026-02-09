import { useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSaveReferee } from "../../hooks/profile/useReferee";

const AddRefereeModal = ({ isOpen, onClose, editData }) => {
  const applicant_id = localStorage.getItem("applicantId");

  const { mutate, isPending: isLoading } = useSaveReferee({
    onSuccess: () => {
      onClose();
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      referee_position: "",
      employer: "",
      email: "",
      phone: "",
    },
  });

  /* --------------------------------------------------
   * Prefill when editing
   * -------------------------------------------------- */
  useEffect(() => {
    if (!isOpen) return;

    if (editData) {
      reset({
        first_name: editData.first_name || "",
        middle_name: editData.middle_name || "",
        last_name: editData.last_name || "",
        referee_position: editData.referee_position || "",
        employer: editData.employer || "",
        email: editData.email || "",
        phone: editData.phone || "",
      });
    } else {
      reset();
    }
  }, [isOpen, editData, reset]);

  /* --------------------------------------------------
   * Submit
   * -------------------------------------------------- */
  const submitHandler = (data) => {
    const payload = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value?.trim?.() ?? value,
      ])
    );

    mutate({
      ...payload,
      applicant_id,
      id: editData?.id,
    });
  };

  return (
    <Modal show={isOpen} onHide={onClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">
          {editData ? "Edit Referee" : "Add Referee"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <div className="row g-2 mb-3">
            {/* First Name */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                First Name <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  size="sm"
                  {...register("first_name", {
                    required: "First name is required",
                  })}
                  isInvalid={!!errors.first_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.first_name?.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* Middle Name */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Middle Name <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  size="sm"
                  {...register("middle_name", {
                    required: "Middle name is required",
                  })}
                  isInvalid={!!errors.middle_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.middle_name?.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* Last Name */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Last Name <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  size="sm"
                  {...register("last_name", {
                    required: "Last name is required",
                  })}
                  isInvalid={!!errors.last_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.last_name?.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* Position */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Position <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  size="sm"
                  {...register("referee_position", {
                    required: "Position is required",
                  })}
                  isInvalid={!!errors.referee_position}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.referee_position?.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* Employer */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Employer <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  size="sm"
                  {...register("employer", {
                    required: "Employer is required",
                  })}
                  isInvalid={!!errors.employer}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.employer?.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* Email */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Email <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="email"
                  size="sm"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email address",
                    },
                  })}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {/* Phone */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Phone <span className="text-danger">*</span>
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  size="sm"
                  {...register("phone", {
                    required: "Phone is required",
                  })}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone?.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
          </div>

          {/* Footer */}
          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="outline-secondary"
              className="me-2"
              onClick={onClose}
              disabled={isLoading}
            >
              Close
            </Button>

            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddRefereeModal;

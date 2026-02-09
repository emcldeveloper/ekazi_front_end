import { useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useSaveCareerProfile } from "../../hooks/useUniversal";

const EditCareerProfileModal = ({ isOpen, onClose, applicant }) => {
  const applicant_id = localStorage.getItem("applicantId");

  const { mutate, isPending: isLoading } = useSaveCareerProfile({
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Career profile updated successfully",
        icon: "success",
      });
      onClose();
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      career: "",
    },
  });

  /* --------------------------------------------------
   * Prefill on modal open
   * -------------------------------------------------- */
  useEffect(() => {
    if (!isOpen) return;

    reset({
      career: applicant?.careers?.[0]?.career || "",
    });
  }, [isOpen, applicant, reset]);

  const careerValue = watch("career", "");
  const charCount = careerValue.length;

  const onSubmit = (data) => {
    mutate({
      applicant_id,
      career: data.career,
    });
  };

  return (
    <Modal show={isOpen} onHide={onClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">Career Profile</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group controlId="careerTextarea">
            <Form.Label>
              Career Profile <span className="text-danger">*</span>
            </Form.Label>

            <Form.Control
              as="textarea"
              rows={8}
              placeholder="Start typing..."
              maxLength={1000}
              style={{
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxShadow: "inset 0 0 0.25rem #ddd",
              }}
              {...register("career", {
                required: "Career profile is required",
                minLength: {
                  value: 20,
                  message: "Career profile should be at least 20 characters",
                },
              })}
            />

            <div className="d-flex justify-content-between mt-2">
              {errors.career ? (
                <small className="text-danger">{errors.career.message}</small>
              ) : (
                <span />
              )}

              <small className="text-muted">{charCount} / 1000</small>
            </div>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="outline-primary" type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditCareerProfileModal;

import { useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useSaveObjective } from "../../hooks/profile/useObjective";

const EditCareerObjectiveModal = ({ isOpen, onClose, applicant }) => {
  const applicant_id = localStorage.getItem("applicantId");

  const { mutate, isPending: isLoading } = useSaveObjective({
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Career objective updated successfully",
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
      objective: "",
    },
  });

  const objectiveValue = watch("objective", "");
  const charCount = objectiveValue.length;

  /* --------------------------------------------------
   * Prefill when modal opens
   * -------------------------------------------------- */
  useEffect(() => {
    if (!isOpen) return;

    reset({
      objective: applicant?.objective?.objective || "",
    });
  }, [isOpen, applicant, reset]);

  const onSubmit = (data) => {
    mutate({
      applicant_id,
      objective: data.objective,
    });
  };

  return (
    <Modal show={isOpen} onHide={onClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">Career Objectives</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group controlId="objectiveTextarea">
            <Form.Label>
              Career Objective <span className="text-danger">*</span>
            </Form.Label>

            <Form.Control
              as="textarea"
              rows={8}
              placeholder="Start typing..."
              maxLength={300}
              style={{
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxShadow: "inset 0 0 0.25rem #ddd",
              }}
              {...register("objective", {
                required: "Career objective is required",
                minLength: {
                  value: 10,
                  message: "Objective should be at least 10 characters",
                },
              })}
            />

            <div className="d-flex justify-content-between mt-2">
              {errors.objective ? (
                <small className="text-danger">
                  {errors.objective.message}
                </small>
              ) : (
                <span />
              )}

              <small className="text-muted">{charCount} / 300</small>
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

export default EditCareerObjectiveModal;

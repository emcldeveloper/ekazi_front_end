import { useEffect, useMemo, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

import {
  useGetTraining,
  useSaveTraining,
} from "../../hooks/profile/useTraining";

const AddTrainingModal = ({ show, onHide, editData }) => {
  const applicant_id = localStorage.getItem("applicantId");

  const { data: training } = useGetTraining();

  const { mutate, isPending: isLoading } = useSaveTraining({
    onSuccess: () => {
      onHide();
    },
  });

  /* --------------------------------------------------
   * Build select options
   * -------------------------------------------------- */
  const allTrainingOptions = useMemo(
    () =>
      training?.map((t) => ({
        value: t.name,
        label: t.name,
      })) ?? [],
    [training]
  );

  const allInstitutionOptions = useMemo(
    () =>
      training?.map((t) => ({
        value: t.institution,
        label: t.institution,
      })) ?? [],
    [training]
  );

  const [trainingCount, setTrainingCount] = useState(10);
  const [institutionCount, setInstitutionCount] = useState(10);

  const trainingOptions = useMemo(
    () => allTrainingOptions.slice(0, trainingCount),
    [allTrainingOptions, trainingCount]
  );

  const institutionOptions = useMemo(
    () => allInstitutionOptions.slice(0, institutionCount),
    [allInstitutionOptions, institutionCount]
  );

  /* --------------------------------------------------
   * React Hook Form
   * -------------------------------------------------- */
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    shouldUnregister: false,
    defaultValues: {
      name: null,
      institution: null,
      started: "",
      ended: "",
      attachment: null,
    },
  });

  /* --------------------------------------------------
   * Prefill on edit
   * -------------------------------------------------- */
  useEffect(() => {
    if (show && editData) {
      // Small delay to ensure form is ready
      setTimeout(() => {
        reset({
          name: { value: editData.name, label: editData.name },
          institution: {
            value: editData.institution,
            label: editData.institution,
          },
          started: editData.started?.slice(0, 10) || "",
          ended: editData.ended?.slice(0, 10) || "",
          attachment: null,
        });
      }, 0);
    } else if (show && !editData) {
      reset({
        name: null,
        institution: null,
        started: "",
        ended: "",
        attachment: null,
      });
    }
  }, [show, editData, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("applicant_id", applicant_id);
    if (editData?.id) formData.append("id", editData.id);

    // Get the actual value, checking both data and editData
    let trainingName = "";
    if (data.name) {
      trainingName =
        typeof data.name === "string" ? data.name : data.name?.value || "";
    } else if (editData?.name) {
      trainingName = editData.name;
    }

    let institutionName = "";
    if (data.institution) {
      institutionName =
        typeof data.institution === "string"
          ? data.institution
          : data.institution?.value || "";
    } else if (editData?.institution) {
      institutionName = editData.institution;
    }

    formData.append("name", trainingName);
    formData.append("institution", institutionName);
    formData.append("started", data.started || editData?.started || "");
    formData.append("ended", data.ended || editData?.ended || "");

    // Only append attachment if a new file was selected
    if (data.attachment?.[0] instanceof File) {
      formData.append("attachment", data.attachment[0]);
    }

    // Debug logging
    console.log("Submitting:", {
      name: trainingName,
      institution: institutionName,
      started: data.started,
      ended: data.ended,
      editData,
    });

    mutate(formData);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">
          {editData ? "Edit Training & Workshop" : "Add Training & Workshop"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          {/* Training name */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Training Name<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Training name is required" }}
                render={({ field }) => (
                  <CreatableSelect
                    options={trainingOptions}
                    value={field.value}
                    onChange={(option) => field.onChange(option)}
                    placeholder="Select training..."
                  />
                )}
              />

              {errors.name && (
                <small className="text-danger">{errors.name.message}</small>
              )}
            </Col>
          </Form.Group>

          {/* Institution */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Institution<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Controller
                name="institution"
                control={control}
                rules={{ required: "Institution is required" }}
                render={({ field }) => (
                  <CreatableSelect
                    options={institutionOptions}
                    value={field.value}
                    onChange={(option) => field.onChange(option)}
                    placeholder="Select institution..."
                  />
                )}
              />

              {errors.institution && (
                <small className="text-danger">
                  {errors.institution.message}
                </small>
              )}
            </Col>
          </Form.Group>

          {/* Dates */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Started<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="date"
                {...register("started", { required: true })}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Ended<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="date"
                {...register("ended", { required: true })}
              />
            </Col>
          </Form.Group>

          {/* Attachment */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Attach Certificate
              {!editData && <span className="text-danger">*</span>}
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="file"
                accept=".pdf"
                {...register("attachment", {
                  required: !editData,
                })}
              />
            </Col>
          </Form.Group>

          <Modal.Footer>
            <Button variant="outline-secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? " Saving..." : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTrainingModal;

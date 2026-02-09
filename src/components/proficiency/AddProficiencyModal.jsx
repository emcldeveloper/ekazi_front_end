import { useEffect, useMemo, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

import { useOrganization } from "../../hooks/useUniversal";
import {
  useProficiency,
  useSaveProficiency,
} from "../../hooks/profile/useProficiency";

const AddProficiencyModal = ({ show, onHide, editData }) => {
  const applicant_id = localStorage.getItem("applicantId");

  /* -------------------- Data hooks -------------------- */
  const { data: organizations } = useOrganization();
  const { data: proficiencies } = useProficiency();

  const { mutate, isPending: isLoading } = useSaveProficiency({
    onSuccess: onHide,
  });

  /* -------------------- Options -------------------- */
  const allOrganizationOptions = useMemo(
    () =>
      organizations?.map((o) => ({
        value: o.id,
        label: o.organization_name,
      })) ?? [],
    [organizations]
  );

  const allProficiencyOptions = useMemo(
    () =>
      proficiencies?.map((p) => ({
        value: p.id,
        label: p.proficiency_name,
      })) ?? [],
    [proficiencies]
  );

  const [orgCount, setOrgCount] = useState(10);
  const [profCount, setProfCount] = useState(10);

  const organizationOptions = useMemo(
    () => allOrganizationOptions.slice(0, orgCount),
    [allOrganizationOptions, orgCount]
  );

  const proficiencyOptions = useMemo(
    () => allProficiencyOptions.slice(0, profCount),
    [allProficiencyOptions, profCount]
  );

  /* -------------------- React Hook Form -------------------- */
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    shouldUnregister: false,
    defaultValues: {
      organization: null,
      proficiency: null,
      started: "",
      ended: "",
      award: "",
      attachment: null,
    },
  });

  /* -------------------- Prefill on edit (Training-style) -------------------- */
  useEffect(() => {
    if (show && editData) {
      reset({
        organization: editData.organization ?? null,
        proficiency: editData.proficiency ?? null,
        started: editData.started || "",
        ended: editData.ended || "",
        award: editData.award || "",
        attachment: null,
      });
    } else if (show && !editData) {
      reset({
        organization: null,
        proficiency: null,
        started: "",
        ended: "",
        award: "",
        attachment: null,
      });
    }
  }, [show, editData, reset]);

  /* -------------------- Submit -------------------- */
  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("applicant_id", applicant_id);
    if (editData?.id) formData.append("id", editData.id);

    formData.append("organization", data.organization.value);
    formData.append("proficiency", data.proficiency.value);
    formData.append("started", data.started);
    formData.append("ended", data.ended);
    formData.append("award", data.award);

    if (data.attachment?.[0]) {
      formData.append("attachment", data.attachment[0]);
    }

    mutate(formData);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">
          {editData ? "Edit Proficiency" : "Add Proficiency"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          {/* Organization */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Organization<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Controller
                name="organization"
                control={control}
                rules={{ required: "Organization is required" }}
                render={({ field }) => (
                  <CreatableSelect
                    options={organizationOptions}
                    value={field.value}
                    onChange={(option) => field.onChange(option)}
                    onMenuScrollToBottom={() => setOrgCount((c) => c + 10)}
                    placeholder="Select organization..."
                  />
                )}
              />
              {errors.organization && (
                <small className="text-danger">
                  {errors.organization.message}
                </small>
              )}
            </Col>
          </Form.Group>

          {/* Proficiency */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Proficiency<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Controller
                name="proficiency"
                control={control}
                rules={{ required: "Proficiency is required" }}
                render={({ field }) => (
                  <CreatableSelect
                    options={proficiencyOptions}
                    value={field.value}
                    onChange={(option) => field.onChange(option)}
                    onMenuScrollToBottom={() => setProfCount((c) => c + 10)}
                    placeholder="Select proficiency..."
                  />
                )}
              />
              {errors.proficiency && (
                <small className="text-danger">
                  {errors.proficiency.message}
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
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                placeholder="YYYY"
                {...register("started", {
                  required: true,
                  min: 1900,
                  max: new Date().getFullYear(),
                })}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Ended<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                placeholder="YYYY"
                {...register("ended", {
                  required: true,
                  min: 1900,
                  max: new Date().getFullYear(),
                })}
              />
            </Col>
          </Form.Group>

          {/* Award */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Award<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control {...register("award", { required: true })} />
            </Col>
          </Form.Group>

          {/* Attachment */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Attachment{!editData && <span className="text-danger">*</span>}
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="file"
                accept=".pdf,.jpg,.png"
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
              {isLoading
                ? editData
                  ? "Updating..."
                  : "Saving..."
                : editData
                  ? "Update"
                  : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProficiencyModal;

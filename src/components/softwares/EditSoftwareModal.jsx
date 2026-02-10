import { useEffect, useMemo, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { useApplicantProfile } from "../../hooks/useCandidates";
import { useSaveSoftware, useSoftware } from "../../hooks/profile/useSoftware";

const EditSoftwareModal = ({ show, onHide }) => {
  const applicant_id = localStorage.getItem("applicantId");

  const { data: applicant } = useApplicantProfile();
  const { data: software } = useSoftware();

  const { mutate, isPending: isLoading } = useSaveSoftware({
    onSuccess: onHide,
  });

  /* ---------------- Existing applicant software ---------------- */
  const softwareData = useMemo(
    () =>
      Array.isArray(applicant?.data?.software) ? applicant?.data?.software : [],
    [applicant?.data?.software],
  );

  /* ---------------- Software options ---------------- */
  const allSoftwareOptions = useMemo(
    () =>
      software?.map((s) => ({
        value: s.id,
        label: s.software_name,
      })) ?? [],
    [software],
  );

  const [visibleCount, setVisibleCount] = useState(10);

  const softwareOptions = useMemo(
    () => allSoftwareOptions.slice(0, visibleCount),
    [allSoftwareOptions, visibleCount],
  );

  const loadMoreSoftware = () => setVisibleCount((prev) => prev + 10);

  /* ---------------- Selected software (from profile) ---------------- */
  const selectedSoftware = useMemo(
    () =>
      softwareData.map((item) => ({
        value: item.software?.id || item.software_id,
        label: item.software?.software_name || item.software_name,
      })),
    [softwareData],
  );

  /* ---------------- Merge options + selected (CRITICAL FIX) ---------------- */
  const mergedSoftwareOptions = useMemo(() => {
    const map = new Map();

    softwareOptions.forEach((opt) => {
      map.set(opt.value, opt);
    });

    selectedSoftware.forEach((opt) => {
      if (!map.has(opt.value)) {
        map.set(opt.value, opt);
      }
    });

    return Array.from(map.values());
  }, [softwareOptions, selectedSoftware]);

  /* ---------------- Form ---------------- */
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { software: [] },
    shouldUnregister: false,
  });

  /* ---------------- Populate form on open ---------------- */
  useEffect(() => {
    if (!show) return;
    reset({ software: selectedSoftware });
  }, [show, selectedSoftware, reset]);

  /* ---------------- Submit ---------------- */
  const onSubmit = (data) => {
    mutate({
      applicant_id,
      software: data.software.map((s) => s.value),
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">Software Application</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Software<span className="text-danger">*</span>
            </Form.Label>

            <Col sm={10}>
              <Controller
                name="software"
                control={control}
                rules={{
                  validate: (value) =>
                    value?.length > 0 || "Please select at least one software",
                }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    options={mergedSoftwareOptions}
                    isMulti
                    isSearchable
                    isClearable
                    placeholder="Select or create software..."
                    onMenuScrollToBottom={loadMoreSoftware}
                    onChange={(selected) => field.onChange(selected ?? [])}
                  />
                )}
              />

              {errors.software && (
                <small className="text-danger">{errors.software.message}</small>
              )}
            </Col>
          </Form.Group>

          <Modal.Footer>
            <Button variant="outline-secondary" onClick={onHide}>
              Close
            </Button>
            <Button
              variant="outline-primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditSoftwareModal;

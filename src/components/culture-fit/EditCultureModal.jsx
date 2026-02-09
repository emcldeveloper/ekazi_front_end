import { useEffect, useMemo, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { useApplicantProfile } from "../../hooks/useCandidates";
import { useCulture, useSaveCulture } from "../../hooks/profile/useCulture";

const EditCultureModal = ({ show, onHide }) => {
  const applicant_id = localStorage.getItem("applicantId");

  const { data: applicant } = useApplicantProfile();
  const { data: culture } = useCulture();

  const { mutate, isPending: isLoading } = useSaveCulture({
    onSuccess: onHide,
  });

  /* ---------------- Existing applicant culture ---------------- */
  const cultureData = useMemo(
    () =>
      Array.isArray(applicant?.data?.culture) ? applicant?.data?.culture : [],
    [applicant?.data?.culture],
  );

  /* ---------------- Culture options ---------------- */
  const allCultureOptions = useMemo(
    () =>
      culture?.map((c) => ({
        value: c.id,
        label: c.culture_name,
      })) ?? [],
    [culture],
  );

  const [visibleCount, setVisibleCount] = useState(10);

  const cultureOptions = useMemo(
    () => allCultureOptions.slice(0, visibleCount),
    [allCultureOptions, visibleCount],
  );

  const loadMoreCulture = () => setVisibleCount((prev) => prev + 10);

  /* ---------------- Selected culture (from profile) ---------------- */
  const selectedCulture = useMemo(
    () =>
      cultureData.map((item) => ({
        value: item.culture?.id || item.culture_id,
        label: item.culture?.culture_name || item.culture_name,
      })),
    [cultureData],
  );

  /* ---------------- Merge options + selected (CRITICAL FIX) ---------------- */
  const mergedCultureOptions = useMemo(() => {
    const map = new Map();

    cultureOptions.forEach((opt) => {
      map.set(opt.value, opt);
    });

    selectedCulture.forEach((opt) => {
      if (!map.has(opt.value)) {
        map.set(opt.value, opt);
      }
    });

    return Array.from(map.values());
  }, [cultureOptions, selectedCulture]);

  /* ---------------- Form ---------------- */

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { culture: [] },
    shouldUnregister: false,
  });

  /* ---------------- Populate form on open ---------------- */
  useEffect(() => {
    if (!show) return;
    reset({ culture: selectedCulture });
  }, [show, selectedCulture, reset]);

  /* ---------------- Submit ---------------- */
  const onSubmit = (data) => {
    mutate({
      applicant_id,
      culture: data.culture.map((c) => c.value), // IDs or strings
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">Work Compatibility Profile</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Culture<span className="text-danger">*</span>
            </Form.Label>

            <Col sm={9}>
              <Controller
                name="culture"
                control={control}
                rules={{
                  validate: (value) =>
                    value?.length > 0 || "Please select at least one culture",
                }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    options={mergedCultureOptions}
                    isMulti
                    isSearchable
                    isClearable
                    placeholder="Select or create culture..."
                    value={field.value}
                    onMenuScrollToBottom={loadMoreCulture}
                    onChange={(selected) => field.onChange(selected ?? [])}
                  />
                )}
              />

              {errors.culture && (
                <small className="text-danger">{errors.culture.message}</small>
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

export default EditCultureModal;

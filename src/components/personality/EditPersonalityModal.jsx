import { useEffect, useMemo, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

import { useApplicantProfile } from "../../hooks/useCandidates";
import {
  usePersonality,
  useSavePersonality,
} from "../../hooks/profile/usePersonality";

const EditPersonalityModal = ({ show, onHide }) => {
  const applicant_id = localStorage.getItem("applicantId");

  const { data: applicant } = useApplicantProfile();
  const { data: personality } = usePersonality();

  const { mutate, isPending: isLoading } = useSavePersonality({
    onSuccess: onHide,
  });

  /* ---------------- Existing applicant personalities ---------------- */
  const personalityData = useMemo(
    () =>
      Array.isArray(applicant?.data?.applicant_personality)
        ? applicant?.data?.applicant_personality
        : [],
    [applicant?.data?.applicant_personality],
  );

  /* ---------------- Personality options ---------------- */
  const allPersonalityOptions = useMemo(
    () =>
      Array.isArray(personality)
        ? personality.map((p) => ({
            value: p.id,
            label: p.personality_name,
          }))
        : [],
    [personality],
  );

  /* ---------------- Load more ---------------- */
  const [visibleCount, setVisibleCount] = useState(10);

  const personalityOptions = useMemo(
    () => allPersonalityOptions.slice(0, visibleCount),
    [allPersonalityOptions, visibleCount],
  );

  const loadMorePersonality = () => setVisibleCount((prev) => prev + 10);

  /* ---------------- Selected personalities ---------------- */
  const selectedPersonality = useMemo(
    () =>
      personalityData.map((item) => ({
        value: item.personality?.id || item.personality_id,
        label: item.personality?.personality_name || item.personality_name,
      })),
    [personalityData],
  );

  /* ---------------- Merge options + selected ---------------- */
  const mergedPersonalityOptions = useMemo(() => {
    const map = new Map();

    personalityOptions.forEach((opt) => map.set(opt.value, opt));
    selectedPersonality.forEach((opt) => {
      if (!map.has(opt.value)) map.set(opt.value, opt);
    });

    return Array.from(map.values());
  }, [personalityOptions, selectedPersonality]);

  /* ---------------- Form ---------------- */
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { personality: [] },
    shouldUnregister: false,
  });

  /* ---------------- Populate on open ---------------- */
  useEffect(() => {
    if (!show) return;
    reset({ personality: selectedPersonality });
  }, [show, selectedPersonality, reset]);

  /* ---------------- Submit ---------------- */
  const onSubmit = (data) => {
    mutate({
      applicant_id,
      personality: data.personality.map((p) => p.value),
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">Personality Traits</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Personality<span className="text-danger">*</span>
            </Form.Label>

            <Col sm={9}>
              <Controller
                name="personality"
                control={control}
                rules={{
                  validate: (value) =>
                    value?.length > 0 ||
                    "Please select at least one personality",
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={mergedPersonalityOptions}
                    isMulti
                    isSearchable
                    isClearable
                    placeholder="Select personalities..."
                    onMenuScrollToBottom={loadMorePersonality}
                    onChange={(selected) => field.onChange(selected ?? [])}
                  />
                )}
              />

              {errors.personality && (
                <small className="text-danger">
                  {errors.personality.message}
                </small>
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

export default EditPersonalityModal;

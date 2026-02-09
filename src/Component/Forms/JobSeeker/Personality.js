import { useEffect, useMemo, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import {
  usePersonality,
  useSavePersonality,
} from "../../../hooks/profile/usePersonality";

const EditPersonalityModal = ({ show, onHide }) => {
  const { data: personality } = usePersonality();
  const { mutate, isLoading } = useSavePersonality();

  const allPersonalityOptions = useMemo(
    () =>
      personality?.map((p) => ({
        value: p.id,
        label: p.personality_name,
      })) ?? [],
    [personality]
  );

  /* --------------------------------------------------
   * Load-more logic
   * -------------------------------------------------- */
  const [visibleCount, setVisibleCount] = useState(10);

  const personalityOptions = useMemo(
    () => allPersonalityOptions.slice(0, visibleCount),
    [allPersonalityOptions, visibleCount]
  );

  const loadMorePersonality = () => setVisibleCount((prev) => prev + 10);

  /* --------------------------------------------------
   * React Hook Form
   * -------------------------------------------------- */
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      personality: null,
    },
  });

  /* --------------------------------------------------
   * Reset form when modal closes
   * -------------------------------------------------- */
  useEffect(() => {
    if (!show) reset();
  }, [show, reset]);

  /* --------------------------------------------------
   * Submit
   * -------------------------------------------------- */
  const onSubmit = (data) => {
    const payload = {
      personality_id: data.personality.value,
    };

    mutate(payload, {
      onSuccess: () => {
        onHide();
      },
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
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
                rules={{ required: "Please select a personality" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={personalityOptions}
                    onMenuScrollToBottom={loadMorePersonality}
                    placeholder="Select personality..."
                    isSearchable
                    isClearable
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
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPersonalityModal;

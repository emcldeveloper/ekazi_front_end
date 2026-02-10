import { useEffect, useMemo, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { useApplicantProfile } from "../../hooks/useCandidates";
import {
  useKnowledge,
  useSaveKnowledge,
} from "../../hooks/profile/useKnowledge";

const EditSkillsModal = ({ show, onHide }) => {
  const applicant_id = localStorage.getItem("applicantId");

  const { data: applicant } = useApplicantProfile();
  const { data: knowledge } = useKnowledge();

  const { mutate, isPending: isLoading } = useSaveKnowledge({
    onSuccess: onHide,
  });

  const knowledgeData = useMemo(
    () =>
      Array.isArray(applicant?.data?.knowledge)
        ? applicant?.data?.knowledge
        : [],
    [applicant?.data?.knowledge],
  );

  const allKnowledgeOptions = useMemo(
    () =>
      knowledge?.map((k) => ({
        value: k.id,
        label: k.knowledge_name.trim(),
      })) ?? [],
    [knowledge],
  );

  const [visibleCount, setVisibleCount] = useState(10);

  const knowledgeOptions = useMemo(
    () => allKnowledgeOptions.slice(0, visibleCount),
    [allKnowledgeOptions, visibleCount],
  );

  const loadMoreKnowledge = () => setVisibleCount((prev) => prev + 10);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!show) return;

    const mapped = knowledgeData.map((item) => ({
      value: item.knowledge?.id || item.knowledge_id,
      label: item.knowledge?.knowledge_name || item.knowledge_name,
    }));

    reset({ knowledge: mapped });
  }, [show, knowledgeData, reset]);

  const onSubmit = (data) => {
    mutate({
      applicant_id,
      knowledge: data.knowledge.map((k) => k.value),
    });
  };

  return (
    <Modal key={applicant_id} show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">Key Skills & Competencies</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Skills<span className="text-danger">*</span>
            </Form.Label>

            <Col sm={9}>
              <Controller
                name="knowledge"
                control={control}
                rules={{
                  validate: (value) =>
                    value.length > 0 || "Please select at least one skill",
                }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    options={knowledgeOptions}
                    onMenuScrollToBottom={loadMoreKnowledge}
                    placeholder="Select skills..."
                    isMulti
                    isSearchable
                    isClearable
                    value={field.value}
                    onChange={(selected) => {
                      field.onChange(selected ? selected : []); // updates form values
                    }}
                  />
                )}
              />
              {errors.knowledge && (
                <small className="text-danger">
                  {errors.knowledge.message}
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

export default EditSkillsModal;

import { useEffect, useMemo, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

import { useApplicantProfile } from "../../hooks/useCandidates";
import { useSaveTool, useTools } from "../../hooks/profile/useTools";

const EditToolModal = ({ show, onHide }) => {
  const applicant_id = localStorage.getItem("applicantId");

  const { data: applicant } = useApplicantProfile();
  const { data: tools } = useTools();

  const { mutate, isPending: isLoading } = useSaveTool({
    onSuccess: onHide,
  });

  const toolsList = useMemo(
    () => (Array.isArray(tools?.tool) ? tools.tool : []),
    [tools?.tool]
  );

  /* ---------------- Existing applicant tools ---------------- */
  const toolData = useMemo(
    () => (Array.isArray(applicant?.data?.tools) ? applicant.data.tools : []),
    [applicant?.data?.tools]
  );

  /* ---------------- Tool options ---------------- */
  const allToolOptions = useMemo(
    () =>
      toolsList.map((t) => ({
        value: t.id,
        label: t.tool_name,
      })),
    [toolsList]
  );

  const [visibleCount, setVisibleCount] = useState(10);

  const toolOptions = useMemo(
    () => allToolOptions.slice(0, visibleCount),
    [allToolOptions, visibleCount]
  );

  const loadMoreTools = () => setVisibleCount((prev) => prev + 10);

  /* ---------------- Selected tools (from profile) ---------------- */
  const selectedTools = useMemo(
    () =>
      toolData.map((item) => ({
        value: item.tool?.id || item.tool_id,
        label: item.tool?.tool_name,
      })),
    [toolData]
  );

  /* ---------------- Merge options + selected (CRITICAL FIX) ---------------- */
  const mergedToolOptions = useMemo(() => {
    const map = new Map();

    toolOptions.forEach((opt) => {
      map.set(opt.value, opt);
    });

    selectedTools.forEach((opt) => {
      if (!map.has(opt.value)) {
        map.set(opt.value, opt);
      }
    });

    return Array.from(map.values());
  }, [toolOptions, selectedTools]);

  /* ---------------- Form ---------------- */
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { tools: [] },
    shouldUnregister: false,
  });

  /* ---------------- Populate form on open ---------------- */
  useEffect(() => {
    if (!show) return;
    reset({ tools: selectedTools });
  }, [show, selectedTools, reset]);

  /* ---------------- Submit ---------------- */
  const onSubmit = (data) => {
    mutate({
      applicant_id,
      tool: data.tools.map((t) => t.value),
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">Tools & Technologies</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Tools<span className="text-danger">*</span>
            </Form.Label>

            <Col sm={10}>
              <Controller
                name="tools"
                control={control}
                rules={{
                  validate: (value) =>
                    value?.length > 0 || "Please select at least one tool",
                }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    options={mergedToolOptions}
                    isMulti
                    isSearchable
                    isClearable
                    placeholder="Select or create tools..."
                    onMenuScrollToBottom={loadMoreTools}
                    onChange={(selected) => field.onChange(selected ?? [])}
                  />
                )}
              />

              {errors.tools && (
                <small className="text-danger">{errors.tools.message}</small>
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

export default EditToolModal;

import { useEffect, useMemo, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useIndustry } from "../../../hooks/useUniversal";

const EditJobfitModal = ({ show, onHide }) => {
  /* --------------------------------------------------
   * Load industry options
   * -------------------------------------------------- */
  const { data: industry } = useIndustry();

  const allIndustryOptions = useMemo(
    () =>
      industry?.map((i) => ({
        value: i.id,
        label: i.industry_name,
      })) ?? [],
    [industry]
  );

  /* --------------------------------------------------
   * Load-more logic
   * -------------------------------------------------- */
  const [visibleCount, setVisibleCount] = useState(10);

  const industryOptions = useMemo(
    () => allIndustryOptions.slice(0, visibleCount),
    [allIndustryOptions, visibleCount]
  );

  const loadMoreIndustry = () => setVisibleCount((prev) => prev + 10);

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
      industry: null,
      jobs: [],
    },
  });

  /* --------------------------------------------------
   * Reset form when modal opens/closes
   * -------------------------------------------------- */
  useEffect(() => {
    if (!show) {
      reset();
    }
  }, [show, reset]);

  /* --------------------------------------------------
   * Submit
   * -------------------------------------------------- */
  const onSubmit = (data) => {
    const payload = {
      industry_id: data.industry?.value,
      jobs: data.jobs.map((j) => j.label), // free-text jobs
    };

    console.log("Submit payload:", payload);

    // later → replace with React Query mutation
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">List Of Jobs I May Fit</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Industry */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Industry<span className="text-danger">*</span>
            </Form.Label>

            <Col sm={10}>
              <Controller
                name="industry"
                control={control}
                rules={{ required: "Industry is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={industryOptions}
                    onMenuScrollToBottom={loadMoreIndustry}
                    placeholder="Select industry..."
                    isSearchable
                    isClearable
                  />
                )}
              />
              {errors.industry && (
                <small className="text-danger">{errors.industry.message}</small>
              )}
            </Col>
          </Form.Group>

          {/* Jobs */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Job<span className="text-danger">*</span>
            </Form.Label>

            <Col sm={10}>
              <Controller
                name="jobs"
                control={control}
                rules={{
                  validate: (value) =>
                    value.length > 0 || "Please add at least one job",
                }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    isClearable
                    placeholder="Write job(s) you may fit..."
                    components={{
                      DropdownIndicator: () => null,
                      IndicatorSeparator: () => null,
                    }}
                  />
                )}
              />
              {errors.jobs && (
                <small className="text-danger">{errors.jobs.message}</small>
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
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditJobfitModal;

import { useEffect, useMemo, useRef, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import {
  useCountries,
  useEmployer,
  useIndustry,
  usePosition,
  usePositionLevel,
  useRegions,
  useSalaryRange,
} from "../../hooks/useUniversal";
import {
  useExperienceType,
  useSaveExperience,
} from "../../hooks/profile/useExperience";

const AddWorkExperienceModal = ({ show, onHide, editData }) => {
  const applicant_id = localStorage.getItem("applicantId");
  const [currentRole, setCurrentRole] = useState(false);

  /* ---------------- Master data ---------------- */
  const { data: employers } = useEmployer();
  const { data: countries } = useCountries();
  const { data: regions } = useRegions();
  const { data: positions } = usePosition();
  const { data: industries } = useIndustry();
  const { data: positionLevels } = usePositionLevel();
  const { data: salaryRanges } = useSalaryRange();
  const { data: experienceTypes } = useExperienceType();

  const { mutate, isPending: isLoading } = useSaveExperience({
    onSuccess: onHide,
  });

  /* ---------------- Option mappers ---------------- */
  const mapOptions = (list, labelKey) =>
    Array.isArray(list)
      ? list.map((i) => ({ value: i.id, label: i[labelKey] }))
      : [];

  const employerOptions = useMemo(
    () => mapOptions(employers, "employer_name"),
    [employers]
  );
  const countryOptions = mapOptions(countries, "name");
  const regionOptions = mapOptions(regions, "region_name");
  const positionOptions = mapOptions(positions?.data, "position_name");
  const industryOptions = mapOptions(industries, "industry_name");
  const positionLevelOptions = mapOptions(positionLevels, "position_name");

  const salaryOptions =
    salaryRanges?.map((s) => ({
      value: s.id,
      label: s.low,
    })) ?? [];

  const experienceTypeOptions =
    experienceTypes?.map((e) => ({
      value: e.id,
      label: e.name,
    })) ?? [];

  /* ---------------- Helpers ---------------- */
  const findOption = (options, value) =>
    options.find((o) => o.value === value) ?? null;

  const creatableValue = (value, label) => (value ? { value, label } : null);

  /* ---------------- Form ---------------- */
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      experiencetype: null,
      employer: null,
      country: null,
      region: null,
      sub_location: "",
      position: null,
      positionlevel: null,
      industry: null,
      started: "",
      ended: "",
      startsalaryRange: null,
      endsalaryRange: null,
      responsibility: "",
      remark: "",
    },
  });

  /* ---------------- Prefill edit data ---------------- */

  const lastEditIdRef = useRef(null);

  useEffect(() => {
    if (!show || !editData) return;

    if (lastEditIdRef.current === editData.id) return;

    reset({
      experiencetype: findOption(
        experienceTypeOptions,
        editData.experience_type_id
      ),
      employer: creatableValue(
        editData.applicant_employer_id,
        editData.employer_name
      ),
      country: findOption(countryOptions, editData.country_id),
      region: findOption(regionOptions, editData.region_id),
      sub_location: editData.sub_location ?? "",

      position:
        findOption(positionOptions, Number(editData.position_id)) ??
        (editData.position_name
          ? {
              value: editData.position_id || editData.position_name,
              label: editData.position_name,
            }
          : null),

      positionlevel: findOption(
        positionLevelOptions,
        Number(editData.position_level_id)
      ),

      industry: findOption(industryOptions, editData.industry_id),

      started: editData.start_date ?? "",
      ended: editData.end_date ?? "",

      startsalaryRange: salaryOptions.find(
        (s) => s.value === Number(editData.start_salary_id)
      ),

      endsalaryRange: salaryOptions.find(
        (s) => s.value === Number(editData.end_salary_id)
      ),

      responsibility: editData.responsibility ?? "",
      remark: editData.remark ?? "",
    });

    setCurrentRole(!editData.end_date);
    lastEditIdRef.current = editData.id;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, editData?.id]);

  useEffect(() => {
    if (show && !editData) {
      reset({
        experiencetype: null,
        employer: null,
        country: null,
        region: null,
        sub_location: "",
        position: null,
        positionlevel: null,
        industry: null,
        started: "",
        ended: "",
        startsalaryRange: null,
        endsalaryRange: null,
        responsibility: "",
        remark: "",
      });

      setCurrentRole(false);
      lastEditIdRef.current = null;
    }
  }, [show, editData]);

  /* ---------------- Submit ---------------- */
  const onSubmit = (data) => {
    if (
      data.startsalaryRange &&
      data.endsalaryRange &&
      data.startsalaryRange.value > data.endsalaryRange.value
    ) {
      alert("Salary range is invalid");
      return;
    }

    const payload = {
      applicant_id,
      experiencetype: data.experiencetype?.value ?? "",
      employer: data.employer?.value ?? data.employer?.label ?? "",
      country: data.country?.value ?? "",
      region: data.region?.value ?? "",
      sub_location: data.sub_location ?? "",
      position: data.position?.value ?? "",
      level: data.positionlevel?.value ?? "",
      industry: data.industry?.value ?? "",
      started: data.started ?? "",
      ended: currentRole ? null : (data.ended ?? ""),
      start_salary: data.startsalaryRange?.value ?? "",
      end_salary: data.endsalaryRange?.value ?? "",
      responsibility: data.responsibility ?? "",
      remark: data.remark ?? "",
    };

    if (editData?.id) payload.id = editData.id;

    mutate(payload);
    reset();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">
          {editData ? "Edit Experience" : "Add Experience"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Experience type + Employer */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Experience Type *
            </Form.Label>
            <Col sm={3}>
              <Controller
                name="experiencetype"
                control={control}
                rules={{ required: "Field is required" }}
                render={({ field }) => (
                  <>
                    <Select {...field} options={experienceTypeOptions} />
                    {errors.experiencetype && (
                      <small className="text-danger">
                        {errors.experiencetype.message}
                      </small>
                    )}
                  </>
                )}
              />
            </Col>

            <Form.Label column sm={1}>
              Employer *
            </Form.Label>
            <Col sm={5}>
              <Controller
                name="employer"
                control={control}
                rules={{ required: "Field is required" }}
                render={({ field }) => (
                  <>
                    <CreatableSelect {...field} options={employerOptions} />
                    {errors.employer && (
                      <small className="text-danger">
                        {errors.employer.message}
                      </small>
                    )}
                  </>
                )}
              />
            </Col>
          </Form.Group>

          {/* Location */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Location *
            </Form.Label>
            <Col sm={9}>
              <Row>
                <Col md={4}>
                  <Controller
                    name="country"
                    control={control}
                    rules={{ required: "Field is required" }}
                    render={({ field }) => (
                      <>
                        <Select {...field} options={countryOptions} />
                        {errors.country && (
                          <small className="text-danger">
                            {errors.country.message}
                          </small>
                        )}
                      </>
                    )}
                  />
                </Col>
                <Col md={4}>
                  <Controller
                    name="region"
                    control={control}
                    rules={{ required: "Field is required" }}
                    render={({ field }) => (
                      <>
                        <Select {...field} options={regionOptions} />
                        {errors.region && (
                          <small className="text-danger">
                            {errors.region.message}
                          </small>
                        )}
                      </>
                    )}
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    placeholder="Sub location"
                    {...register("sub_location", {
                      required: "Field is required",
                    })}
                  />
                  {errors.sub_location && (
                    <small className="text-danger">
                      {errors.sub_location.message}
                    </small>
                  )}
                </Col>
              </Row>
            </Col>
          </Form.Group>

          {/* Position */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Position *
            </Form.Label>
            <Col sm={9}>
              <Row>
                <Col md={7}>
                  <Controller
                    name="position"
                    control={control}
                    rules={{ required: "Field is required" }}
                    render={({ field }) => (
                      <>
                        <CreatableSelect {...field} options={positionOptions} />
                        {errors.position && (
                          <small className="text-danger">
                            {errors.position.message}
                          </small>
                        )}
                      </>
                    )}
                  />
                </Col>
                <Col md={5}>
                  <Controller
                    name="positionlevel"
                    control={control}
                    rules={{ required: "Field is required" }}
                    render={({ field }) => (
                      <>
                        <Select {...field} options={positionLevelOptions} />
                        {errors.positionlevel && (
                          <small className="text-danger">
                            {errors.positionlevel.message}
                          </small>
                        )}
                      </>
                    )}
                  />
                </Col>
              </Row>
            </Col>
          </Form.Group>

          {/* Industry */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Industry *
            </Form.Label>
            <Col sm={9}>
              <Controller
                name="industry"
                control={control}
                rules={{ required: "Field is required" }}
                render={({ field }) => (
                  <>
                    {" "}
                    <Select {...field} options={industryOptions} />
                    {errors.industry && (
                      <small className="text-danger">
                        {errors.industry.message}
                      </small>
                    )}
                  </>
                )}
              />
            </Col>
          </Form.Group>

          {/* Dates */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Duration *
            </Form.Label>
            <Col sm={9}>
              <Form.Check
                label="I am currently working in this role"
                checked={currentRole}
                onChange={() => setCurrentRole((v) => !v)}
              />
              <Row>
                <Col md={6}>
                  <Form.Control
                    type="date"
                    {...register("started", { required: "Field is required" })}
                  />
                  {errors.started && (
                    <small className="text-danger">
                      {errors.started.message}
                    </small>
                  )}
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="date"
                    {...register("ended", {
                      validate: (value) =>
                        currentRole || value ? true : "Field is required",
                    })}
                    disabled={currentRole}
                  />
                </Col>
              </Row>
            </Col>
          </Form.Group>

          {/* Salary */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Salary Range *
            </Form.Label>
            <Col sm={4}>
              <Controller
                name="startsalaryRange"
                control={control}
                rules={{ required: "Field is required" }}
                render={({ field }) => (
                  <>
                    <Select
                      options={salaryOptions}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {errors.startsalaryRange && (
                      <small className="text-danger">
                        {errors.startsalaryRange.message}
                      </small>
                    )}
                  </>
                )}
              />
            </Col>
            <Col sm={4}>
              <Controller
                name="endsalaryRange"
                control={control}
                rules={{ required: "Field is required" }}
                render={({ field }) => (
                  <>
                    <Select
                      options={salaryOptions}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {errors.endsalaryRange && (
                      <small className="text-danger">
                        {errors.endsalaryRange.message}
                      </small>
                    )}
                  </>
                )}
              />
            </Col>
          </Form.Group>

          {/* Text areas */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Responsibility *
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                as="textarea"
                rows={3}
                {...register("responsibility", {
                  required: "Field is required",
                })}
              />
              {errors.responsibility && (
                <small className="text-danger">
                  {errors.responsibility.message}
                </small>
              )}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Reason for Leaving
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                as="textarea"
                rows={3}
                {...register("remark", { required: "Field is required" })}
              />
              {errors.responsibility && (
                <small className="text-danger">
                  {errors.responsibility.message}
                </small>
              )}
            </Col>
          </Form.Group>

          <Modal.Footer>
            <Button variant="outline-secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddWorkExperienceModal;

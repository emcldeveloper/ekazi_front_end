import { useEffect, useMemo, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import {
  useCollege,
  useCourses,
  useEducationLevels,
  useMajors,
  useSaveEducation,
} from "../../hooks/profile/useEducation";

const AddEducationModal = ({ show, onHide, editData }) => {
  const applicant_id = localStorage.getItem("applicantId");

  const { data: educationLevel } = useEducationLevels();
  const { data: course } = useCourses();
  const { data: major } = useMajors();
  const { data: college } = useCollege();

  const { mutate: saveEducation, isPending: isLoading } = useSaveEducation({
    onSuccess: onHide,
  });

  const levelOptions = useMemo(
    () =>
      educationLevel?.map((l) => ({
        value: l.id,
        label: l.education_level,
      })) ?? [],
    [educationLevel]
  );

  const allCourseOptions = useMemo(
    () =>
      course?.map((c) => ({
        value: c.id,
        label: c.course_name,
      })) ?? [],
    [course]
  );

  const allMajorOptions = useMemo(
    () =>
      major?.map((m) => ({
        value: m.id,
        label: m.name,
      })) ?? [],
    [major]
  );

  const allCollegeOptions = useMemo(
    () =>
      college?.map((c) => ({
        value: c.id,
        label: c.college_name,
      })) ?? [],
    [college]
  );

  const [courseCount, setCourseCount] = useState(10);
  const [majorCount, setMajorCount] = useState(10);
  const [collegeCount, setCollegeCount] = useState(10);

  const courseOptions = useMemo(
    () => allCourseOptions.slice(0, courseCount),
    [allCourseOptions, courseCount]
  );

  const majorOptions = useMemo(
    () => allMajorOptions.slice(0, majorCount),
    [allMajorOptions, majorCount]
  );

  const collegeOptions = useMemo(
    () => allCollegeOptions.slice(0, collegeCount),
    [allCollegeOptions, collegeCount]
  );

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      level: null,
      college: null,
      course: null,
      major: null,
      started: "",
      ended: "",
      attachment: null,
    },
  });

  useEffect(() => {
    if (!show) return;

    if (editData) {
      reset({
        level: editData.level,
        college: editData.college,
        course: editData.course,
        major: editData.major,
        started: editData.started,
        ended: editData.ended,
        attachment: null,
      });
    } else {
      reset({
        level: null,
        college: null,
        course: null,
        major: null,
        started: "",
        ended: "",
        attachment: null,
      });
    }
  }, [show, editData, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("applicant_id", applicant_id);

    // 🔑 THIS IS THE KEY PART (edit vs create)
    if (editData?.id) {
      formData.append("id", editData.id);
    }

    formData.append("level", data.level.value);
    formData.append("college", data.college.value);
    formData.append("course", data.course.value);
    formData.append("major", data.major.value);
    formData.append("started", data.started);
    formData.append("ended", data.ended);

    if (data.attachment?.[0]) {
      formData.append("attachment", data.attachment[0]);
    }

    saveEducation(formData);
  };

  return (
    <Modal show={show} onHide={onHide} scrollable centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">
          {editData ? "Edit Education" : "Add Education"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          {/* Level */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Level<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Controller
                name="level"
                control={control}
                rules={{ required: "Education level is required" }}
                render={({ field }) => (
                  <Select {...field} options={levelOptions} />
                )}
              />
              {errors.level && (
                <small className="text-danger">{errors.level.message}</small>
              )}
            </Col>
          </Form.Group>

          {/* College */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              College<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Controller
                name="college"
                control={control}
                rules={{ required: "College is required" }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    options={collegeOptions}
                    onMenuScrollToBottom={() => setCollegeCount((p) => p + 10)}
                  />
                )}
              />
              {errors.college && (
                <small className="text-danger">{errors.college.message}</small>
              )}
            </Col>
          </Form.Group>

          {/* Course */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Course<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Controller
                name="course"
                control={control}
                rules={{ required: "Course is required" }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    options={courseOptions}
                    onMenuScrollToBottom={() => setCourseCount((p) => p + 10)}
                  />
                )}
              />
              {errors.course && (
                <small className="text-danger">{errors.course.message}</small>
              )}
            </Col>
          </Form.Group>

          {/* Major */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Specialized In<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Controller
                name="major"
                control={control}
                rules={{ required: "Major is required" }}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    options={majorOptions}
                    onMenuScrollToBottom={() => setMajorCount((p) => p + 10)}
                  />
                )}
              />
              {errors.major && (
                <small className="text-danger">{errors.major.message}</small>
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
                {...register("started", {
                  required: "Started date is required",
                })}
              />
              {errors.started && (
                <small className="text-danger">{errors.started.message}</small>
              )}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Ended<span className="text-danger">*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="date"
                {...register("ended", { required: "Finish date is required" })}
              />
              {errors.ended && (
                <small className="text-danger">{errors.ended.message}</small>
              )}
            </Col>
          </Form.Group>

          {/* Attachment */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Certificate
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="file"
                accept=".pdf"
                {...register("attachment", {
                  required: editData?.id ? false : "Certificate is required",
                  validate: (files) => {
                    if (!files || files.length === 0) return true;

                    const file = files[0];
                    const maxSize = 10 * 1024 * 1024; // 10 MB

                    if (file.size > maxSize) {
                      return "Certificate size must not exceed 10 MB";
                    }

                    return true;
                  },
                })}
              />

              {errors.attachment && (
                <Form.Control.Feedback className="text-danger d-block">
                  {errors.attachment.message}
                </Form.Control.Feedback>
              )}

              {editData && (
                <small className="text-muted">
                  Leave empty to keep existing certificate
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

export default AddEducationModal;

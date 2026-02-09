import { useState, useMemo } from "react";
import { Modal, Button, Form, Col, Row, InputGroup } from "react-bootstrap";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";

import SocialLogin from "./SocialLogin";
import SuccessModal from "./SuccessRegisterModal";
import { useRegister } from "../../hooks/useAuth.js";

// Universal hooks
import {
  useGenders,
  useMaritalStatuses,
  useCountries,
  useRegions,
} from "../../hooks/useUniversal.js";
import {
  useCourses,
  useEducationLevels,
  useMajors,
} from "../../hooks/profile/useEducation.js";

const RegisterModal = ({ show, onHide }) => {
  /* ----------------------------------------------
    UI STATE
  ------------------------------------------------*/
  const [showCandidateForm, setShowCandidateForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [localCourseOptions, setLocalCourseOptions] = useState([]);
  const [localMajorOptions, setLocalMajorOptions] = useState([]);

  /* ----------------------------------------------
    UNIVERSAL BACKEND DATA
  ------------------------------------------------*/
  const { data: genders = [] } = useGenders();
  const { data: maritalStatuses = [] } = useMaritalStatuses();
  const { data: countries = [] } = useCountries();
  const { data: regions = [] } = useRegions();
  const { data: courses = [] } = useCourses();
  const { data: majors = [] } = useMajors();
  const { data: educationLevels = [] } = useEducationLevels();

  /* ----------------------------------------------
    MAP BACKEND TO SELECT OPTIONS
  ------------------------------------------------*/
  const mapOptions = (arr, valueKey = "id", labelKey = "name") =>
    arr?.map((item) => ({
      value: item[valueKey],
      label: item[labelKey],
    })) || [];

  const genderOptions = mapOptions(genders, "id", "gender_name");
  const maritalStatusOptions = mapOptions(
    maritalStatuses,
    "id",
    "marital_status"
  );
  const countryOptions = mapOptions(countries);
  const educationLevelOptions = mapOptions(
    educationLevels,
    "id",
    "education_level"
  );
  const courseOptions = mapOptions(courses, "id", "course_name");
  const majorOptions = mapOptions(majors);

  /* ----------------------------------------------
    REACT HOOK FORM SETUP
  ------------------------------------------------*/
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "",
      middlename: "",
      lastname: "",
      dob: "",
      gender: "",
      maritalStatus: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      education_level: "",
      course_id: "",
      major: "",
      country: "",
      region_id: "",
      address: "",
    },
  });

  const selectedCountry = watch("country");
  const password = watch("password");

  /* ----------------------------------------------
    FILTER REGIONS BY SELECTED COUNTRY
  ------------------------------------------------*/
  const regionOptions = useMemo(() => {
    return regions
      ?.filter((r) => r.country_id === selectedCountry)
      .map((r) => ({ value: r.id, label: r.region_name }));
  }, [regions, selectedCountry]);

  /* ----------------------------------------------
    REGISTER MUTATION
  ------------------------------------------------*/
  const registerMutation = useRegister();

  const handleUserChoice = (type) => {
    if (type === "employer") {
      window.location.href = "https://api.ekazi.co.tz";
    } else {
      setShowCandidateForm(true);
    }
  };

  /* ----------------------------------------------
    FORM SUBMISSION
  ------------------------------------------------*/
  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "validate",
        message: "Passwords do not match.",
      });
      return;
    }

    clearErrors("confirmPassword");

    const payload = {
      firstname: data.firstname,
      middlename: data.middlename,
      lastname: data.lastname,
      dob: data.dob,

      gender_id: data.gender,
      marital_status_id: data.maritalStatus,

      email: data.email,
      phone: data.phone,

      password: data.password,
      password_confirmation: data.confirmPassword,

      education_level_id: data.education_level,
      course_id: data.course_id,
      major_id: data.major,

      country_id: data.country,
      region_id: data.region_id,

      address: data.address,
    };

    registerMutation.mutate(payload, {
      onSuccess: () => {
        setShowCandidateForm(false);
        setShowSuccessModal(true);
        onHide();
      },
      onError: (err) => {
        if (err && typeof err === "object" && !("message" in err)) {
          Object.entries(err).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              setError(field, { type: "server", message: messages[0] });
            }
          });
        }
      },
    });
  };

  /* ----------------------------------------------
    UI RENDER
  ------------------------------------------------*/
  return (
    <>
      {/* Select Registration Type Modal */}
      <Modal show={show && !showCandidateForm} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Registration Type</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Button
            variant="primary"
            onClick={() => handleUserChoice("candidate")}
            className="me-2"
          >
            Register as Candidate
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleUserChoice("employer")}
          >
            Register as Employer
          </Button>
        </Modal.Body>
      </Modal>

      {/* Candidate Registration Modal */}
      <Modal
        show={showCandidateForm}
        onHide={() => setShowCandidateForm(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Candidate Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* API Error */}
            {registerMutation.isError && registerMutation.error?.message && (
              <div className="text-danger mb-3">
                {registerMutation.error.message}
              </div>
            )}

            {/* ------------------------------------------------
              PERSONAL INFORMATION
            ------------------------------------------------*/}
            <section className="mb-4">
              <h5>Personal Information</h5>
              <Row>
                {/* First Name */}
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="firstname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("firstname", {
                        required: "First name is required",
                      })}
                      isInvalid={!!errors.firstname}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstname?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Middle Name */}
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="middlename">
                    <Form.Label>Middle Name</Form.Label>
                    <Form.Control type="text" {...register("middlename")} />
                  </Form.Group>
                </Col>

                {/* Last Name */}
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="lastname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("lastname", {
                        required: "Last name is required",
                      })}
                      isInvalid={!!errors.lastname}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastname?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              {/* DOB, Gender, Marital Status */}
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="dob">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      {...register("dob", {
                        required: "Date of birth is required",
                      })}
                      isInvalid={!!errors.dob}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.dob?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Gender */}
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Controller
                      name="gender"
                      control={control}
                      rules={{ required: "Gender is required" }}
                      render={({ field }) => (
                        <>
                          <Select
                            options={genderOptions}
                            value={
                              genderOptions.find(
                                (o) => o.value === field.value
                              ) || null
                            }
                            onChange={(opt) => field.onChange(opt?.value || "")}
                          />
                          {errors.gender && (
                            <div className="text-danger small">
                              {errors.gender.message}
                            </div>
                          )}
                        </>
                      )}
                    />
                  </Form.Group>
                </Col>

                {/* Marital Status */}
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Marital Status</Form.Label>
                    <Controller
                      name="maritalStatus"
                      control={control}
                      render={({ field }) => (
                        <>
                          <Select
                            options={maritalStatusOptions}
                            value={
                              maritalStatusOptions.find(
                                (o) => o.value === field.value
                              ) || null
                            }
                            onChange={(opt) => field.onChange(opt?.value || "")}
                          />
                        </>
                      )}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </section>

            {/* ------------------------------------------------
              CONTACT
            ------------------------------------------------*/}
            <section className="mb-4">
              <h5>Contact Details</h5>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="+255 123 456 789"
                      {...register("phone", {
                        required: "Phone number is required",
                      })}
                      isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phone?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              {/* Password / Confirm Password */}
              <Row>
                {/* Password */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Minimum 6 characters",
                          },
                        })}
                        isInvalid={!!errors.password}
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                      <Form.Control.Feedback type="invalid">
                        {errors.password?.message}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>

                {/* Confirm Password */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showConfirmPassword ? "text" : "password"}
                        {...register("confirmPassword", {
                          required: "Please confirm your password",
                          validate: (value) =>
                            value.trim() === getValues("password").trim() ||
                            "Passwords do not match.",
                        })}
                        isInvalid={!!errors.confirmPassword}
                      />

                      <Button
                        variant="outline-secondary"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword?.message}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
            </section>

            {/* ------------------------------------------------
              EDUCATION
            ------------------------------------------------*/}
            <section className="mb-4">
              <h5>Education</h5>
              <Row>
                {/* Education Level */}
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Education Level</Form.Label>
                    <Controller
                      name="education_level"
                      control={control}
                      render={({ field }) => (
                        <Select
                          options={educationLevelOptions}
                          value={
                            educationLevelOptions.find(
                              (o) => o.value === field.value
                            ) || null
                          }
                          onChange={(opt) => field.onChange(opt?.value || "")}
                        />
                      )}
                    />
                  </Form.Group>
                </Col>

                {/* Course */}
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Course</Form.Label>
                    <Controller
                      name="course_id"
                      control={control}
                      render={({ field }) => {
                        const allCourseOptions = [
                          ...courseOptions,
                          ...localCourseOptions,
                        ];

                        return (
                          <CreatableSelect
                            isClearable
                            options={allCourseOptions}
                            value={
                              field.value
                                ? allCourseOptions.find(
                                    (o) => o.value === field.value
                                  ) || {
                                    label: field.value,
                                    value: field.value,
                                  }
                                : null
                            }
                            onChange={(opt) => {
                              if (
                                opt &&
                                !courseOptions.find(
                                  (o) => o.value === opt.value
                                )
                              ) {
                                setLocalCourseOptions((prev) => [...prev, opt]);
                              }
                              field.onChange(opt?.value || "");
                            }}
                          />
                        );
                      }}
                    />
                  </Form.Group>
                </Col>

                {/* Major */}
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Major</Form.Label>
                    <Controller
                      name="major"
                      control={control}
                      render={({ field }) => {
                        const allMajorOptions = [
                          ...majorOptions,
                          ...localMajorOptions,
                        ];

                        return (
                          <CreatableSelect
                            isClearable
                            options={allMajorOptions}
                            value={
                              field.value
                                ? allMajorOptions.find(
                                    (o) => o.value === field.value
                                  ) || {
                                    label: field.value,
                                    value: field.value,
                                  }
                                : null
                            }
                            onChange={(opt) => {
                              if (
                                opt &&
                                !majorOptions.find((o) => o.value === opt.value)
                              ) {
                                setLocalMajorOptions((prev) => [...prev, opt]);
                              }
                              field.onChange(opt?.value || "");
                            }}
                          />
                        );
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </section>

            {/* ------------------------------------------------
              ADDRESS
            ------------------------------------------------*/}
            <section className="mb-4">
              <h5>Address</h5>
              <Row>
                {/* Country */}
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Controller
                      name="country"
                      control={control}
                      render={({ field }) => (
                        <Select
                          options={countryOptions}
                          value={
                            countryOptions.find(
                              (o) => o.value === field.value
                            ) || null
                          }
                          onChange={(opt) => {
                            field.onChange(opt?.value || "");
                            setValue("region_id", ""); // reset region
                          }}
                        />
                      )}
                    />
                  </Form.Group>
                </Col>

                {/* Region */}
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Region</Form.Label>
                    <Controller
                      name="region_id"
                      control={control}
                      render={({ field }) => (
                        <Select
                          isDisabled={!selectedCountry}
                          options={regionOptions}
                          value={
                            regionOptions.find(
                              (o) => o.value === field.value
                            ) || null
                          }
                          onChange={(opt) => field.onChange(opt?.value || "")}
                        />
                      )}
                    />
                  </Form.Group>
                </Col>

                {/* Address */}
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" {...register("address")} />
                  </Form.Group>
                </Col>
              </Row>
            </section>

            {/* ------------------------------------------------
              SOCIAL LOGIN
            ------------------------------------------------*/}
            <SocialLogin />

            {/* ------------------------------------------------
              FOOTER BUTTONS
            ------------------------------------------------*/}
            <Row className="mt-4">
              <Col className="text-end">
                <Button
                  variant="secondary"
                  type="button"
                  className="me-2"
                  onClick={() => setShowCandidateForm(false)}
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? "Registering..." : "Register"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Success Registration Modal */}
      <SuccessModal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
      />
    </>
  );
};

export default RegisterModal;

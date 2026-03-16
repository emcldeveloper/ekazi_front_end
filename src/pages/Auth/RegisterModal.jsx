import { useState, useMemo } from "react";
import { Modal, Button, Form, Col, Row, InputGroup } from "react-bootstrap";
import Select from "react-select";
import { FaEye, FaEyeSlash, FaGoogle, FaLinkedin } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";

import SuccessModal from "./SuccessRegisterModal";
import { useRegister } from "../../hooks/useAuth.js";

// Universal hooks
import {
  useGenders,
  useMaritalStatuses,
  useCountries,
  useRegions,
} from "../../hooks/useUniversal.js";

const RegisterModal = ({ show, onHide }) => {
  /* ----------------------------------------------
    UI STATE
  ------------------------------------------------*/
  const [showCandidateForm, setShowCandidateForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  /* ----------------------------------------------
    UNIVERSAL BACKEND DATA
  ------------------------------------------------*/
  const { data: genders = [] } = useGenders();
  const { data: maritalStatuses = [] } = useMaritalStatuses();
  const { data: countries = [] } = useCountries();
  const { data: regions = [] } = useRegions();

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
    "marital_status",
  );
  const countryOptions = mapOptions(countries);

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
    reset,
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
      country: "",
      region_id: "",
      address: "",
    },
  });

  const selectedCountry = watch("country");

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

      country_id: data.country,
      region_id: data.region_id,

      address: data.address,
    };

    registerMutation.mutate(payload, {
      onSuccess: () => {
        setShowCandidateForm(false);
        setShowSuccessModal(true);
        onHide();
        reset();
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
        scrollable
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title as={"h5"}>Register as Job Seeker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center mb-3">
            <p
              className=" text-Blue text-center font-semibold"
              style={{ fontSize: "20px", borderRadius: "5px" }}
            >
              Welcome to ekazi portal
            </p>
          </div>

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
              <Row>
                {/* First Name */}
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="firstname">
                    <Form.Label className="text-sm text-Blue font-semibold">
                      First Name
                    </Form.Label>
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

                <Col md={4}>
                  <Form.Group className="mb-3" controlId="middlename">
                    <Form.Label className="text-sm text-Blue font-semibold">
                      Middle Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      {...register("middlename", {
                        required: "Middle name is required",
                      })}
                      isInvalid={!!errors.middlename}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.middlename?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                {/* Last Name */}
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="lastname">
                    <Form.Label className="text-sm text-Blue font-semibold">
                      Last Name
                    </Form.Label>
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
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="dob">
                    <Form.Label className="text-sm text-Blue font-semibold">
                      Date of Birth
                    </Form.Label>
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
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-sm text-Blue font-semibold">
                      Gender
                    </Form.Label>
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
                                (o) => o.value === field.value,
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
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-sm text-Blue font-semibold">
                      Marital Status
                    </Form.Label>
                    <Controller
                      name="maritalStatus"
                      control={control}
                      render={({ field }) => (
                        <>
                          <Select
                            options={maritalStatusOptions}
                            value={
                              maritalStatusOptions.find(
                                (o) => o.value === field.value,
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
              ADDRESS
            ------------------------------------------------*/}
            <section className="mb-4">
              <Row>
                {/* Country */}
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-sm text-Blue font-semibold">
                      Country
                    </Form.Label>
                    <Controller
                      name="country"
                      control={control}
                      render={({ field }) => (
                        <Select
                          options={countryOptions}
                          value={
                            countryOptions.find(
                              (o) => o.value === field.value,
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
                    <Form.Label className="text-sm text-Blue font-semibold">
                      Region
                    </Form.Label>
                    <Controller
                      name="region_id"
                      control={control}
                      render={({ field }) => (
                        <Select
                          isDisabled={!selectedCountry}
                          options={regionOptions}
                          value={
                            regionOptions.find(
                              (o) => o.value === field.value,
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
                    <Form.Label className="text-sm text-Blue font-semibold">
                      Address
                    </Form.Label>
                    <Form.Control type="text" {...register("address")} />
                  </Form.Group>
                </Col>
              </Row>
            </section>

            {/* ------------------------------------------------
              CONTACT
            ------------------------------------------------*/}
            <section className="mb-4">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-sm text-Blue font-semibold">
                      Email
                    </Form.Label>
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
                    <Form.Label className="text-sm text-Blue font-semibold">
                      Phone
                    </Form.Label>
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
                    <Form.Label className="text-sm text-Blue font-semibold">
                      Password
                    </Form.Label>
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
                    <Form.Label className="text-sm text-Blue font-semibold">
                      Confirm Password
                    </Form.Label>
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
              FOOTER BUTTONS
            ------------------------------------------------*/}
            <Row className="items-center justify-content-center">
              <Col md={6}>
                <Button
                  type="submit"
                  variant="primary"
                  className="text-white font-semibold mb-3 w-100"
                  style={{ backgroundColor: "#D36314", border: "none" }}
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? "Registering..." : "Register"}
                </Button>
              </Col>
            </Row>
          </Form>

          {/* SOCIAL LOGIN */}
          <p className="d-block text-center text-muted mb-4">
            or continue with
          </p>
          <div className="flex items-center gap-4 mb-3">
            <button className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-blue-100 text-Blue hover:bg-blue-100 transition">
              <FaLinkedin size={18} /> Linkedin
            </button>

            <button className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-blue-100 text-Blue hover:bg-blue-100 transition">
              <FaGoogle size={18} /> Google
            </button>
          </div>

          {/* BOTTOM OPTIONS */}
          <div className="text-center py-3">
            <p className="mb-2 text-muted">
              Already have ekazi account?{" "}
              <span
                onClick={() => setShowCandidateForm(false)}
                className="text-Blue font-semibold underline cursor-pointer"
              >
                login
              </span>
            </p>
          </div>
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

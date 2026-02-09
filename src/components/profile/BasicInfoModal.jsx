import { useEffect, useMemo, useState } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

import {
  useCitizenship,
  useCountries,
  useGenders,
  useMaritalStatuses,
  useRegions,
} from "../../hooks/useUniversal";
import { useSavePersonalInfo } from "../../hooks/profile/usePersonalInfo";

const BasicInfoModal = ({ profile, address, phone, show, onHide }) => {
  const { data: genders = [] } = useGenders();
  const { data: maritalStatuses = [] } = useMaritalStatuses();
  const { data: countries = [] } = useCountries();
  const { data: regions = [] } = useRegions();
  const { data: citizenships = [] } = useCitizenship();

  const { mutate: savePersonalInfo, isPending: isLoading } =
    useSavePersonalInfo({
      onSuccess: onHide,
    });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      gender: null,
      marital_status: null,
      country: null,
      region: null,
      nationality: null,
    },
  });

  const genderOptions = useMemo(
    () => genders.map((g) => ({ value: g.id, label: g.gender_name })),
    [genders]
  );

  const maritalStatusOptions = useMemo(
    () =>
      maritalStatuses.map((m) => ({ value: m.id, label: m.marital_status })),
    [maritalStatuses]
  );

  const countryOptions = useMemo(
    () => countries.map((c) => ({ value: c.id, label: c.name })),
    [countries]
  );

  const regionOptions = useMemo(
    () => regions.map((r) => ({ value: r.id, label: r.region_name })),
    [regions]
  );

  const citizenshipOptions = useMemo(
    () => citizenships.map((c) => ({ value: c.id, label: c.citizenship })),
    [citizenships]
  );

  useEffect(() => {
    if (!profile || !address) return;

    reset({
      first_name: profile.first_name || "",
      middle_name: profile.middle_name || "",
      last_name: profile.last_name || "",
      date_of_birth: profile?.dob || "",
      phone: phone || "",
      phone2: profile?.phone2 || "",
      sub_location: address?.sub_location || "",
      postal_address: address?.postal || "",

      gender: genderOptions.find((o) => o.value === profile.gender_id) || null,
      marital_status:
        maritalStatusOptions.find((o) => o.value === profile.marital_id) ||
        null,
      country:
        countryOptions.find((o) => o.value === address.country_id) || null,
      region: regionOptions.find((o) => o.value === address.region_id) || null,
      nationality:
        citizenshipOptions.find(
          (o) => o.label.toLowerCase() === address.citizenship?.toLowerCase()
        ) || null,
    });
  }, [
    profile,
    address,
    phone,
    reset,
    genderOptions,
    maritalStatusOptions,
    countryOptions,
    regionOptions,
    citizenshipOptions,
  ]);

  const onSubmit = (data) => {
    const payload = {
      applicant_id: profile.id,

      // text fields
      first_name: data.first_name,
      middle_name: data.middle_name,
      last_name: data.last_name,
      date_of_birth: data.date_of_birth,
      phone: data.phone,
      phone2: data.phone2,
      sub_location: data.sub_location,
      postal_address: data.postal_address,

      // selects
      gender: data.gender.value,
      marital: data.marital_status.value,
      country: data.country.value,
      region: data.region.value,

      // backend wants STRING
      nationality: data.nationality.label,
    };

    savePersonalInfo(payload);
  };

  return (
    <Modal size="lg" show={show} onHide={onHide} scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Personal Information</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Names */}
          <Row className="g-3">
            <Col md={4}>
              <Form.Label>
                First Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                {...register("first_name", {
                  required: "First name is required",
                })}
              />
              {errors.first_name && (
                <small className="text-danger">
                  {errors.first_name.message}
                </small>
              )}
            </Col>
            <Col md={4}>
              <Form.Label>Middle Name</Form.Label>
              <Form.Control {...register("middle_name")} />
            </Col>
            <Col md={4}>
              <Form.Label>
                Last Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                {...register("last_name", {
                  required: "Last name is required",
                })}
              />
              {errors.last_name && (
                <small className="text-danger">
                  {errors.last_name.message}
                </small>
              )}
            </Col>
          </Row>

          {/* Gender / Marital / DOB */}
          <Row className="mt-3">
            <Col md={4}>
              <Form.Label>
                Gender <span className="text-danger">*</span>
              </Form.Label>
              <Controller
                name="gender"
                control={control}
                rules={{ required: "Gender is required" }}
                render={({ field }) => (
                  <Select {...field} options={genderOptions} />
                )}
              />
              {errors.gender && (
                <small className="text-danger">{errors.gender.message}</small>
              )}
            </Col>
            <Col md={4}>
              <Form.Label>
                Marital Status <span className="text-danger">*</span>
              </Form.Label>
              <Controller
                name="marital_status"
                control={control}
                rules={{ required: "Marital status is required" }}
                render={({ field }) => (
                  <Select {...field} options={maritalStatusOptions} />
                )}
              />
              {errors.marital_status && (
                <small className="text-danger">
                  {errors.marital_status.message}
                </small>
              )}
            </Col>
            <Col md={4}>
              <Form.Label>
                Date of Birth <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="date"
                {...register("date_of_birth", {
                  required: "Date of birth is required",
                })}
              />
              {errors.date_of_birth && (
                <small className="text-danger">
                  {errors.date_of_birth.message}
                </small>
              )}
            </Col>
          </Row>

          {/* Phone */}
          <Row className="mt-3">
            <Col md={6}>
              <Form.Label>
                Phone <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                {...register("phone", { required: "Phone is required" })}
              />
              {errors.phone && (
                <small className="text-danger">{errors.phone.message}</small>
              )}
            </Col>
            <Col md={6}>
              <Form.Label>Extra Phone</Form.Label>
              <Form.Control {...register("phone2")} />
            </Col>
          </Row>

          {/* Country / Nationality */}
          <Row className="mt-3">
            <Col md={6}>
              <Form.Label>
                Country <span className="text-danger">*</span>
              </Form.Label>
              <Controller
                name="country"
                control={control}
                rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <Select {...field} options={countryOptions} />
                )}
              />
              {errors.country && (
                <small className="text-danger">{errors.country.message}</small>
              )}
            </Col>
            <Col md={6}>
              <Form.Label>
                Nationality <span className="text-danger">*</span>
              </Form.Label>
              <Controller
                name="nationality"
                control={control}
                rules={{ required: "Nationality is required" }}
                render={({ field }) => (
                  <Select {...field} options={citizenshipOptions} />
                )}
              />
              {errors.nationality && (
                <small className="text-danger">
                  {errors.nationality.message}
                </small>
              )}
            </Col>
          </Row>

          {/* Region */}
          <Row className="mt-3">
            <Col md={4}>
              <Form.Label>
                Region <span className="text-danger">*</span>
              </Form.Label>
              <Controller
                name="region"
                control={control}
                rules={{ required: "Region is required" }}
                render={({ field }) => (
                  <Select {...field} options={regionOptions} />
                )}
              />
              {errors.region && (
                <small className="text-danger">{errors.region.message}</small>
              )}
            </Col>
            <Col md={4}>
              <Form.Label>
                Sub Location <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                {...register("sub_location", {
                  required: "Sub location is required",
                })}
              />
              {errors.sub_location && (
                <small className="text-danger">
                  {errors.sub_location.message}
                </small>
              )}
            </Col>
            <Col md={4}>
              <Form.Label>Postal</Form.Label>
              <Form.Control {...register("postal_address")} />
            </Col>
          </Row>

          <Modal.Footer className="mt-4">
            <Button variant="outline-secondary" onClick={onHide}>
              Close
            </Button>
            <Button type="submit" disabled={isSubmitting || isLoading}>
              {isSubmitting || isLoading ? "Saving..." : "Save changes"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BasicInfoModal;

// src/hooks/Candidate/useTrainingForm.js
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createExperience } from "../../Api/Jobseeker/JobSeekerProfileApi";

const useExperinceForm = (applicant_id, editData) => {
  const [formData, setFormData] = useState({
    industry: "",
    position: "",
    experiencetype: "",
    employer: "",
    sub_location: "",
    country: "",
    region: "",
    started: "",
    ended: "",
    responsibility: "",
    remark: "",
    positionlevel: "",
    startsalaryRange: "",
    endsalaryRange: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    if (typeof value === "string") {
      // input, textarea, date inputs
      setFormData((prev) => ({ ...prev, [field]: value }));
    } else if (value && typeof value === "object") {
      // react-select
      setFormData((prev) => ({ ...prev, [field]: value.value }));
    } else {
      // cleared
      setFormData((prev) => ({ ...prev, [field]: "" }));
    }
  };

  useEffect(() => {
    if (editData) {
      setFormData({
        id: editData.id,
        industry: editData.industry,
        position: editData.position,
        experiencetype: editData.experiencetypes,
        employer: editData.employer,
        sub_location: editData.sub_location,
        country: editData.country,
        region: editData.region,
        started: editData.started,
        ended: editData.ended,
        responsibility: editData.responsibility,
        remark: editData.remark,
        positionlevel: editData.positionlevel,
        startsalaryRange: editData.start_salary_id,
        endsalaryRange: editData.end_salary_id,
      });
    } else {
      setFormData({
        industry: "",
        position: "",
        experiencetype: "",
        employer: "",
        sub_location: "",
        country: "",
        region: "",
        started: "",
        ended: "",
        responsibility: "",
        remark: "",
        positionlevel: "",
        startsalaryRange: "",
        endsalaryRange: "",
      });
    }
  }, [editData]);

  console.log("edit yes ");
  console.log("form data for edit experience2303", formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading 🕐

    try {
      const sendData = {
        applicant_id: applicant_id,
        id: formData.id,
        industry: formData.industry,
        position: formData.position,
        employer: formData.employer,
        experiencetype: formData.experiencetype,
        started: formData.started,
        ended: formData.ended,
        country: formData.country,
        region: formData.region,
        sub_location: formData.sub_location,
        responsibility: formData.responsibility,
        remark: formData.remark,
        level: formData.positionlevel,
        start_salary: formData.startsalaryRange,
        end_salary: formData.endsalaryRange,
      };

      let response = await createExperience(sendData);

      if (response && response.status === 200) {
        Swal.fire({
          title: "Success!",
          text:
            response.data?.success || "Experince record saved successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        //  window.location.reload(); // Reloads the entire page
      } else {
        console.log("database error", response);
        Swal.fire({
          title: "Error!",
          text: response?.data?.error || "Failed to save Experince record.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      // Handle Laravel 422 validation errors
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.error;

        // Convert object to readable message
        const messages = Object.values(validationErrors).flat().join("\n");

        Swal.fire({
          title: "Validation Error",
          text: messages,
          icon: "warning",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    loading,
  };
};

export default useExperinceForm;

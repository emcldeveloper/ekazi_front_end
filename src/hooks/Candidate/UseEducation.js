// src/hooks/Candidate/useTrainingForm.js
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createEducation } from "../../Api/Jobseeker/JobSeekerProfileApi";
import { UpdateEducation } from "../../Api/Jobseeker/JobSeekerProfileApi";

const useEducationForm = (applicant_id, editData) => {
    const [formData, setFormData] = useState({
        level: "",
        major: "",
        course: "",
        started: "",
        ended: "",
        college: "",
        attachment: null,
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, attachment: file }));
    };
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
  useEffect(() => {
    if (editData) {
        setFormData({
            id: editData.id || "",
            level: editData.level || "",
            college: editData.college || "",
            course: editData.course || "",
            major: editData.major || "",
            started: editData.started || "",
            ended: editData.ended || "",
            attachment: "",
        });
    } else {
        
        setFormData({
            id: "",
            level: "",
            college: "",
            course: "",
            major: "",
            started: "",
            ended: "",
            attachment: "",
        });
    }
}, [editData]);


    console.log("education test edit available".editData)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // start loading 🕐

        try {
            const sendData = {
                applicant_id:applicant_id,
                id:formData.id,
                level: formData.level,
                major: formData.major,
                course: formData.course,
                started: formData.started,
                ended: formData.ended,
                college: formData.college,
                attachment: formData.attachment,
            };

              let response;
            if (formData.id) {
              
                response =await UpdateEducation(sendData);
            } else { 
                 response = await createEducation(sendData) 
            }

            if (response && response.status === 200) {
                Swal.fire({
                    title: "Success!",
                    text: response.data?.success || "Education record saved successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                });

                window.location.reload();
            } else {
                Swal.fire({
                    title: "Error!",
                    text: response?.data?.error || "Failed to save Education record.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }

        } catch (error) {
            // Handle Laravel 422 validation errors
            if (error.response && error.response.status === 422) {
                const validationErrors = error.response.data.error;

                // Convert object to readable message
                const messages = Object.values(validationErrors)
                    .flat()
                    .join("\n");

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
        handleFileChange,
        handleSubmit,
        loading
    };
};

export default useEducationForm;

import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { InternalapplyJob } from "../../Api/Jobseeker/JobSeekerProfileApi";

const useJobApplicationForm = (applicant_id, job_id) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        notes: "",
    });

    // Handle input change
    const handleChange = (value) => {
        setFormData({ notes: value });
    };

    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                applicant_id:applicant_id,
                jobId:job_id,
                notes: formData.notes,
            };

            const response = await InternalapplyJob(payload);

            if (response.status === 200) {
                Swal.fire({
                    title: "Application Sent!",
                    text: "Your job application was submitted successfully.",
                    icon: "success",
                    confirmButtonText: "OK"
                });

                // Optional: Reload or redirect
                // window.location.reload();
            } else {
                Swal.fire({
                    title: "Error!",
                    text: response.data?.error || "Failed to send application.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
            }

        } catch (error) {
            console.error("Error submitting application:", error);

            Swal.fire({
                title: "Error!",
                text: error.response?.data?.error || "Something went wrong. Try again.",
                icon: "error",
                confirmButtonText: "OK"
            });
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
        loading
    };
};

export default useJobApplicationForm;

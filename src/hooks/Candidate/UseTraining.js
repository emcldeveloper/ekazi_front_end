// src/hooks/Candidate/useTrainingForm.js
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createTraining } from "../../Api/Jobseeker/JobSeekerProfileApi";
import { UpdateTraining } from "../../Api/Jobseeker/JobSeekerProfileApi";

const useTrainingForm = (applicant_id ,editData) => {
    const [loading, setLoading] = useState(false); // 🟢 Loading stat
    const [formData, setFormData] = useState({
        started: "",
        ended: "",
        name: "",
        institution: "",
        attachment: null,
        id: null,
    });
  useEffect(() => {
        if (editData) {
            setFormData({
                name: editData.name || "",
                institution: editData.institution || "",
                started: editData.started?.split(" ")[0] || "",
                ended: editData.ended?.split(" ")[0] || "",
                attachment: null,
                id: editData.id || null,
            });
        }
    }, [editData]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, attachment: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // start loading 🕐

        try {
            const sendData = {
                applicant_id,
                name: formData.name,
                started: formData.started,
                ended: formData.ended,
                institution: formData.institution,
                attachment: formData.attachment,
                id:formData.id,
            };
            let response;
            if (formData.id) {
                response=await UpdateTraining(sendData);
            } else {
                 response = await createTraining(sendData);  
            }

            if (response && response.status === 200) {
                Swal.fire({
                    title: "Success!",
                    text: response.data?.success || "Training record saved successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                });
                   window.location.reload(); // Reloads the entire page
            } else {
                Swal.fire({
                    title: "Error!",
                    text: response?.data?.error || "Failed to save training record.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }

        } catch (error) {
            console.error("Error saving training:", error);
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.error || "Something went wrong. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
        finally {
            setLoading(false); // stop loading 🔚
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

export default useTrainingForm;

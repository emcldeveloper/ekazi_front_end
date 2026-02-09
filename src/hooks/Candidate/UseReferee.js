// src/hooks/Candidate/useTrainingForm.js
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createreferee } from "../../Api/Jobseeker/JobSeekerProfileApi";
import { UpdateReferee } from "../../Api/Jobseeker/JobSeekerProfileApi";

const useRefereeForm = (applicant_id, editData) => {
    const [loading, setLoading] = useState(false); // 🟢 Loading stat
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        position: '',
        employer: '',
        email: '',
        phone: '',
    });

    useEffect(() => {

        if (editData) {
            setFormData({
                id: editData.id,
                first_name: editData.first_name,
                middle_name: editData.middle_name,
                last_name: editData.last_name,
                referee_position: editData.referee_position,
                employer: editData.employer,
                email: editData.email,
                phone: editData.phone,
            });
        } else {
            setFormData({
                first_name: '',
                middle_name: '',
                last_name: '',
                position: '',
                employer: '',
                email: '',
                phone: '',
            });
        }
    }, [editData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: null
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // start loading 🕐

        try {
            const sendData = {
                applicant_id:applicant_id,
                first_name: formData.first_name,
                middle_name: formData.middle_name,
                last_name: formData.last_name,
                referee_position: formData.referee_position,
                employer: formData.employer,
                email: formData.email,
                phone:formData.phone,
                id: formData.id,
            };
            let response;
            if (formData.id) {

                 response = await UpdateReferee(sendData);
                
            } else {
                console.log("save data",sendData);
                response = await createreferee(sendData);
            }

            if (response && response.status === 200) {
                Swal.fire({
                    title: "Success!",
                    text: response.data?.success || "Referee record saved successfully!",
                    icon: "success",
                    confirmButtonText: "OK",
                });
                window.location.reload(); // Reloads the entire page
            } else {
                Swal.fire({
                    title: "Error!",
                    text: response?.data?.error || "Failed to save Referee record.",
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
        handleSubmit,
        loading
    };
};

export default useRefereeForm;

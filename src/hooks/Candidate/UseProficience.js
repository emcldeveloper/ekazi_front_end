import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { createProficience, UpdateProficiency } from "../../Api/Jobseeker/JobSeekerProfileApi";

const useProficienceForm = (applicant_id, editData) => {

    const [formData, setFormData] = useState({
        id: "",
        started: "",
        ended: "",
        award: "",
        proficiency: "",
        organization: "",
        attachment: null,
    });

    const [loading, setLoading] = useState(false);
    // useEffect(() => {
    //     if (editData) {
    //         setFormData({
    //             id: editData.id || "",
    //             started: editData.started?.split(" ")[0] || "",
    //             ended: editData.ended?.split(" ")[0] || "",
    //             award: editData.award || "",
    //             proficiency: editData.proficiency?.value || "",
    //             organization: editData.organization?.value || "",
    //             attachment: null, 
    //         });
    //     } else {
    //         setFormData({
    //             id: "",
    //             started: "",
    //             ended: "",
    //             award: "",
    //             proficiency: "",
    //             organization: "",
    //             attachment: null,
    //         });
    //     }
    // }, [editData]);
    useEffect(() => {
        if (!editData) return;

        setFormData({
            id: editData.id || "",
            started: editData.started?.split(" ")[0] || "",
            ended: editData.ended?.split(" ")[0] || "",
            award: editData.award || "",

            proficiency:
                typeof editData.proficiency === "object"
                    ? editData.proficiency.value
                    : editData.proficiency || "",

            organization:
                typeof editData.organization === "object"
                    ? editData.organization.value
                    : editData.organization || "",

            attachment: null,
        });
    }, [editData]);


    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, attachment: e.target.files[0] }));
    };

    // -------------------------------
    // SAVE / UPDATE LOGIC
    // -------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Use FormData for file uploads

            const sendData = {
                id: formData.id,
                award: formData.award,
                proficiency: formData.proficiency,
                organization: formData.organization,
                started: formData.started,
                ended: formData.ended,
                applicant_id: applicant_id,
                attachment: formData.attachment,
            };



            let response;
            if (formData.id) {

                console.log("updte proficinecy", sendData);
                response = await UpdateProficiency(sendData);
            }
            else {
                response = await createProficience(sendData);
            }

            if (response.status === 200) {
                Swal.fire({
                    title: "Success!",
                    text: response.data.success,
                    icon: "success",
                });
                // window.location.reload();
            }

        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.error || "Something went wrong",
                icon: "error",
            });

        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        handleChange,
        handleFileChange,
        handleSubmit,
        loading,
    };
};

export default useProficienceForm;

import { useState } from "react";
import Swal from "sweetalert2";

const useAddressForm = (applicant_id) => {
  const [formData, setFormData] = useState({
    phone: "",
    extraphone: "",
    first_name: "",
    middel_name: "",
    last_name: "",
    country: "",
    region: "",
    citizenship: "",
    dob: "",
    gender: "",
    marital_status: "",
    sub_location: "",
    postal: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading 🕐

    try {
      const sendData = {
        applicant_id,
        country: formData.country,
        region: formData.region,
        citizenship: formData.citizenship,
        phone: formData.phone,
        first_name: formData.first_name,
        last_name: formData.last_name,
        middel_name: formData.middel_name,
        sub_location: formData.sub_location,
        gender: formData.gender,
        dob: formData.dob,
        extraphone: formData.extraphone,
        postal: formData.postal,
        marital_status: formData.marital_status,
      };
      console.log("Address data is availbel 2026", sendData);
      // const response = await createProficience(sendData);
      const response = 200;

      if (response && response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: response.data?.success || "Address record saved successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        window.location.reload(); // Reloads the entire page
      } else {
        Swal.fire({
          title: "Error!",
          text: response?.data?.error || "Failed to save address record.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error saving training:", error);
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.error ||
          "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false); // stop loading 🔚
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    loading,
  };
};

export default useAddressForm;

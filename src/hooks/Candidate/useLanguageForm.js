// src/hooks/JobSeeker/useLanguageForm.js
import { useEffect, useState } from "react";
import useLanguage from "../Universal/Language";
import useReadLanguage from "../Universal/ReadLanguage";
import useWriteLanguage from "../Universal/Writeanguage";
import useSpeakLanguage from "../Universal/Speak";
import useUnderstandLanguage from "../Universal/Undertsand";
import { createlanguage } from "../../Api/Jobseeker/JobSeekerProfileApi";
import Swal from "sweetalert2";
import { deleteLanguage } from "../../Api/Jobseeker/JobSeekerProfileApi";
import { UpdateLanguage } from "../../Api/Jobseeker/JobSeekerProfileApi";

const useLanguageForm = (editData, applicant_id, onSuccess) => {
  const { languages } = useLanguage();
  const { readlanguage } = useReadLanguage();
  const { writelanguage } = useWriteLanguage();
  const { speaklanguage } = useSpeakLanguage();
  const { understandlanguage } = useUnderstandLanguage();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    language: null,
    read: null,
    write: null,
    speak: null,
    understand: null,
  });

  // Build react-select options
  const AllLanguageOptions =
    languages?.map((l) => ({ value: l.id, label: l.language_name })) || [];

  const AllReadLanguageOptions =
    readlanguage?.map((r) => ({ value: r.id, label: r.read_ability })) || [];

  const AllWriteLanguageOptions =
    writelanguage?.map((w) => ({ value: w.id, label: w.write_ability })) || [];

  const AllSpeakLanguageOptions =
    speaklanguage?.map((s) => ({ value: s.id, label: s.speak_ability })) || [];

  const AllUnderstandLanguageOptions =
    understandlanguage?.map((u) => ({
      value: u.id,
      label: u.understand_ability,
    })) || [];

  // Handle select change
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Populate form when editing
  useEffect(() => {
    if (editData) {
      setFormData({
        id: editData.id || null,
        language: editData.language || null,
        read: editData.read || null,
        write: editData.write || null,
        speak: editData.speak || null,
        understand: editData.understand || null,
      });
    } else {
      setFormData({
        id: null,
        language: null,
        read: null,
        write: null,
        speak: null,
        understand: null,
      });
    }
  }, [editData]);

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const sendData = {
      id: formData.id,
      language: formData.language?.value || null,
      read: formData.read?.value || null,
      write: formData.write?.value || null,
      speak: formData.speak?.value || null,
      understand: formData.understand?.value || null,
      applicant_id,
    };
    

    try {

      if (formData.id) {
        console.log("current langue solve",sendData);
        const response = await UpdateLanguage(sendData);
        if (response.status === 200) {
          Swal.fire({
            title: "Success!",
            text: response.data.success,
            icon: "success",
            confirmButtonText: "OK",
          });
          if (onSuccess) onSuccess(); // refresh parent data
        }
      } else {
        const response = await createlanguage(sendData);
        if (response.status === 200) {
          Swal.fire({
            title: "Success!",
            text: response.data.success,
            icon: "success",
            confirmButtonText: "OK",
          });
          if (onSuccess) onSuccess(); // refresh parent data
        }

      }

    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleRemove = (id) => {
    {
      Swal.fire({
        title: 'Are you sure?',
        text: "This action will permanently delete the item. Do you want to proceed? ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {

            const response = await deleteLanguage(id)


            if (response.status === 200) {
              Swal.fire({
                title: 'Success!',
                text: 'Data has been deleted permanently.',
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(() => {
                window.location.reload(); // Reloads the entire page after the success message
              });
            }

          } catch (error) {
            console.error('There was an error removing the referee:', error);

            Swal.fire({
              title: 'Error!',
              text: 'Failed to remove referee. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        }
      });
    };
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    handleRemove,
    loading,
    AllLanguageOptions,
    AllReadLanguageOptions,
    AllWriteLanguageOptions,
    AllSpeakLanguageOptions,
    AllUnderstandLanguageOptions,
  };
};

export default useLanguageForm;

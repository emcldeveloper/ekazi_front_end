// src/hooks/JobSeeker/useLanguageForm.js
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { deleteProficiency } from "../../Api/Jobseeker/JobSeekerProfileApi";
 
const useDeleteProficiency= () => {
  const handleDeleteproficiency = async (ProficiencyId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the item. Do you want to proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteProficiency(ProficiencyId)

          if (response?.status === 200) {
            Swal.fire({
              title: "Success!",
              text: "Data has been deleted permanently.",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              window.location.reload(); // refresh after deletion
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete language. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  return handleDeleteproficiency
};


export default useDeleteProficiency;

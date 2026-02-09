import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  deleteJobFitApi,
  saveJobFitApi,
} from "../../services/profile/jobfit.service.js";

export const useSaveJobFit = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => saveJobFitApi(payload),
    retry: false,

    onSuccess: (data, variables) => {
      const applicantId =
        variables instanceof FormData
          ? variables.get("applicant_id")
          : variables?.applicant_id;

      Swal.fire(
        "Success",
        applicantId
          ? "Job fit updated successfully"
          : "Job fit created successfully",
        "success"
      );

      queryClient.invalidateQueries({
        queryKey: ["applicant_profile"],
      });

      options.onSuccess?.(data);
    },

    onError: (error) => {
      Swal.fire(
        "Error",
        error?.response?.data?.message ||
          error?.message ||
          "Failed to save job fit",
        "error"
      );
    },
  });
};

export const useDeleteJobFit = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ applicant_id, industry_id }) =>
      deleteJobFitApi(applicant_id, industry_id),
    retry: false,

    onSuccess: (res) => {
      Swal.fire(
        "Deleted!",
        res?.message || "Job fit deleted successfully.",
        "success"
      );

      queryClient.invalidateQueries({
        queryKey: ["applicant_profile"],
      });

      options.onSuccess?.(res);
    },

    onError: (error) => {
      Swal.fire(
        "Error",
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete job fit",
        "error"
      );
    },
  });
};

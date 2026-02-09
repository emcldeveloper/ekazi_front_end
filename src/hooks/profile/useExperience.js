import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteExperienceApi,
  getExperienceTypeApi,
  saveExperienceApi,
} from "../../services/profile/experience.service";
import Swal from "sweetalert2";

export const defaultOptions = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60 * 2,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  retry: false,
};

export const useExperienceType = () =>
  useQuery({
    queryKey: ["experienceType"],
    queryFn: getExperienceTypeApi,
    ...defaultOptions,
  });

export const useSaveExperience = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => saveExperienceApi(formData),
    retry: false,

    onSuccess: (data, variables) => {
      Swal.fire(
        "Success",
        variables?.id
          ? "Experience updated successfully"
          : "Experience added successfully",
        "success"
      );

      queryClient.invalidateQueries(["applicant_profile"]);
      options.onSuccess?.(data);
    },

    onError: (error) => {
      Swal.fire("Error", error?.message || "Failed to save education", "error");
    },
  });
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (experienceId) => deleteExperienceApi(experienceId),

    retry: false,

    onSuccess: () => {
      Swal.fire("Deleted!", "Experience deleted successfully.", "success");
      queryClient.invalidateQueries(["applicant-profile"]);
    },

    onError: (error) => {
      Swal.fire(
        "Error",
        error?.message || "Failed to delete experience",
        "error"
      );
    },
  });
};

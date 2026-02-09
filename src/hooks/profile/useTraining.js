import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteTrainingApi,
  getTrainingApi,
  saveTrainingApi,
} from "../../services/profile/training.service";
import Swal from "sweetalert2";

export const defaultOptions = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60 * 2,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  retry: false,
};

export const useGetTraining = () =>
  useQuery({
    queryKey: ["training"],
    queryFn: getTrainingApi,
    ...defaultOptions,
  });

export const useDeleteTraining = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (trainingId) => deleteTrainingApi(trainingId),

    retry: false,

    onSuccess: () => {
      Swal.fire("Deleted!", "Training deleted successfully.", "success");
      queryClient.invalidateQueries(["applicant-profile"]);
    },

    onError: (error) => {
      Swal.fire(
        "Error",
        error?.message || "Failed to delete training",
        "error"
      );
    },
  });
};

export const useSaveTraining = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => saveTrainingApi(formData),
    retry: false,

    onSuccess: (data, variables) => {
      Swal.fire(
        "Success",
        variables.get("id")
          ? "Training updated successfully"
          : "Training added successfully",
        "success"
      );

      queryClient.invalidateQueries(["applicant-profile"]);
      options.onSuccess?.(data);
    },

    onError: (error) => {
      Swal.fire("Error", error?.message || "Failed to save training", "error");
    },
  });
};

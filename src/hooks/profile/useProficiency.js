import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProficiencyApi,
  saveProficiencyApi,
} from "../../services/profile/proficiency.service";
import Swal from "sweetalert2";
import { deleteProficiency } from "../../services/employee.service";

export const defaultOptions = {
  staleTime: 1000 * 60 * 60, // 1 hour
  cacheTime: 1000 * 60 * 60 * 2, // 2 hours
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  retry: false, // IMPORTANT for 429
};

export const useProficiency = () =>
  useQuery({
    queryKey: ["proficiency"],
    queryFn: getProficiencyApi,
    ...defaultOptions,
  });

export const useSaveProficiency = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => saveProficiencyApi(payload),
    retry: false,

    onSuccess: (data, variables) => {
      Swal.fire(
        "Success",
        variables.get("id")
          ? "Proficiency updated successfully"
          : "Proficiency added successfully",
        "success"
      );

      queryClient.invalidateQueries(["applicant-profile"]);
      options.onSuccess?.(data);
    },

    onError: (error) => {
      Swal.fire(
        "Error",
        error?.message || "Failed to save proficiency",
        "error"
      );
    },
  });
};

export const useDeleteProficiency = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (refereeId) => deleteProficiency(refereeId),

    retry: false,

    onSuccess: () => {
      Swal.fire("Deleted!", "Proficiency deleted successfully.", "success");
      queryClient.invalidateQueries(["applicant-profile"]);
    },

    onError: (error) => {
      Swal.fire("Error", error?.message || "Failed to delete referee", "error");
    },
  });
};

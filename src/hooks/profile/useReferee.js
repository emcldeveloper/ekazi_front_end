import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteRefereeApi,
  saveRefereeApi,
} from "../../services/profile/referee.service";
import Swal from "sweetalert2";

export const useSaveReferee = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => saveRefereeApi(payload),
    retry: false,

    onSuccess: (data, variables) => {
      Swal.fire(
        "Success",
        variables.id
          ? "Referee updated successfully"
          : "Referee added successfully",
        "success"
      );

      queryClient.invalidateQueries(["applicant-profile"]);
      options.onSuccess?.(data);
    },

    onError: (error) => {
      Swal.fire("Error", error?.message || "Failed to save referee", "error");
    },
  });
};

export const useDeleteReferee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (refereeId) => deleteRefereeApi(refereeId),

    retry: false,

    onSuccess: () => {
      Swal.fire("Deleted!", "Referee deleted successfully.", "success");
      queryClient.invalidateQueries(["applicant-profile"]);
    },

    onError: (error) => {
      Swal.fire("Error", error?.message || "Failed to delete referee", "error");
    },
  });
};

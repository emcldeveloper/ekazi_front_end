import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { getPersonalInfoApi } from "../../services/profile/personalinfo.service";

export const useSavePersonalInfo = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => getPersonalInfoApi(payload),

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["applicant-profile"]);
      queryClient.invalidateQueries(["personal-info"]);

      Swal.fire("Success!", "Personal information updated", "success");

      // allow caller override
      options?.onSuccess?.(data, variables);
    },

    onError: (error) => {
      Swal.fire(
        "Error!",
        error?.response?.data?.message ||
          "Failed to update personal information",
        "error"
      );

      options?.onError?.(error);
    },
  });
};

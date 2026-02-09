import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveObjectiveApi } from "../../services/profile/objective.service";

export const useSaveObjective = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveObjectiveApi,

    onSuccess: (data, variables, context) => {
      // 🔄 Refresh applicant profile after save
      queryClient.invalidateQueries(["applicant-profile"]);

      options?.onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },
  });
};

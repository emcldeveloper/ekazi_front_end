import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCandidateViewApi } from "../../services/candidates/featured.service";

export const useCreateCandidateView = (applicant_id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createCandidateViewApi(applicant_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["candidate-view", applicant_id],
      });
    },
  });
};

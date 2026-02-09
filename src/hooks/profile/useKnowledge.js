import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getKnowledgeApi,
  saveKnowledgeApi,
} from "../../services/profile/knowledge.service";
import Swal from "sweetalert2";

export const defaultOptions = {
  staleTime: 1000 * 60 * 60, // 1 hour
  cacheTime: 1000 * 60 * 60 * 2, // 2 hours
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  retry: false, // IMPORTANT for 429
};

export const useKnowledge = () =>
  useQuery({
    queryKey: ["knowledge"],
    queryFn: getKnowledgeApi,
    ...defaultOptions,
  });

export const useSaveKnowledge = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveKnowledgeApi,

    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: data?.success || "Skills saved successfully",
      });

      // Refresh applicant profile
      queryClient.invalidateQueries(["applicant-profile"]);

      options.onSuccess?.(data);
    },

    onError: (error) => {
      // Laravel validation errors (422)
      if (error?.response?.status === 422) {
        const messages = Object.values(error.response.data.error || {})
          .flat()
          .join("\n");

        Swal.fire({
          icon: "warning",
          title: "Validation Error",
          text: messages,
        });
        return;
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    },
  });
};

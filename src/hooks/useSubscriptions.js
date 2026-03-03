import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSubscriptionApi,
  getSubscriptionApi,
} from "../services/subscription.service";

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSubscriptionApi,

    onSuccess: (data, variables) => {
      if (variables?.applicant_id) {
        queryClient.invalidateQueries({
          queryKey: ["subscription-status", variables.applicant_id],
        });
      }
    },

    onError: (error) => {
      console.error("Subscription creation failed:", error);
    },
  });
};

export const useSubscriptionStatus = (applicant_id) => {
  return useQuery({
    queryKey: ["subscription-status", applicant_id],
    queryFn: () => getSubscriptionApi(applicant_id),
    enabled: !!applicant_id, // prevents running if undefined
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};

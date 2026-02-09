import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createRatingApi, fetchRatingsApi } from "../services/ratings.service";

export const useRatings = (id) => {
  return useQuery({
    queryKey: ["ratings", id],
    queryFn: () => fetchRatingsApi(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateRating = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRatingApi,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["ratings", variables.id],
      });
    },
  });
};

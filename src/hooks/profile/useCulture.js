import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCultureApi,
  saveCultureApi,
} from "../../services/profile/culture.service";
import Swal from "sweetalert2";

export const defaultOptions = {
  staleTime: 1000 * 60 * 60, // 1 hour
  cacheTime: 1000 * 60 * 60 * 2, // 2 hours
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  retry: false, // IMPORTANT for 429
};

export const useCulture = () =>
  useQuery({
    queryKey: ["culture"],
    queryFn: getCultureApi,
    ...defaultOptions,
  });

export const useSaveCulture = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveCultureApi,

    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: data?.success || "Culture saved successfully",
      });

      queryClient.invalidateQueries(["applicant_profile"]);

      options.onSuccess?.(data);
    },

    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again.",
      });
    },
  });
};

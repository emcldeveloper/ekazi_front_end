import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteLanguageApi,
  getLanguage,
  getReadLanguage,
  getSpeakLanguage,
  getUnderstandLanguage,
  getWriteLanguage,
  saveApplicantLanguage,
  saveLanguageApi,
} from "../../services/profile/language.service";
import Swal from "sweetalert2";

export const defaultOptions = {
  staleTime: 1000 * 60 * 60, // 1 hour
  cacheTime: 1000 * 60 * 60 * 2, // 2 hours
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  retry: false, // IMPORTANT for 429
};

export const useLanguage = () =>
  useQuery({
    queryKey: ["language"],
    queryFn: getLanguage,
    ...defaultOptions,
  });

export const useLanguageRead = () =>
  useQuery({
    queryKey: ["languageRead"],
    queryFn: getReadLanguage,
    ...defaultOptions,
  });

export const useLanguageWrite = () =>
  useQuery({
    queryKey: ["languageWrite"],
    queryFn: getWriteLanguage,
    ...defaultOptions,
  });

export const useLanguageSpeak = () =>
  useQuery({
    queryKey: ["languageSpeak"],
    queryFn: getSpeakLanguage,
    ...defaultOptions,
  });

export const useLanguageUnderstand = () =>
  useQuery({
    queryKey: ["languageUnderstand"],
    queryFn: getUnderstandLanguage,
    ...defaultOptions,
  });

export const useSaveLanguage = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => saveLanguageApi(payload),
    retry: false,

    onSuccess: (data, variables) => {
      Swal.fire(
        "Success",
        variables.get("id")
          ? "Language updated successfully"
          : "Language added successfully",
        "success"
      );

      queryClient.invalidateQueries(["applicant-profile"]);
      options.onSuccess?.(data);
    },

    onError: (error) => {
      Swal.fire(
        "Error",
        error?.response?.data?.message ||
          error?.message ||
          "Failed to save language",
        "error"
      );
    },
  });
};

export const useDeleteLanguage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (languageId) => deleteLanguageApi(languageId),

    retry: false,

    onSuccess: () => {
      Swal.fire("Deleted!", "Language deleted successfully.", "success");
      queryClient.invalidateQueries(["applicant-profile"]);
    },

    onError: (error) => {
      Swal.fire("Error", error?.message || "Failed to delete referee", "error");
    },
  });
};

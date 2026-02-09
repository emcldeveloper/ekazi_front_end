import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getGenders,
  getMaritalStatuses,
  getCountries,
  getCitizenship,
  getRegions,
  getIndustry,
  getPosition,
  getPositionLevel,
  getJobTypes,
  getPackagePrice,
  getTool,
  getEmployer,
  getSalaryRange,
  getSiteStatistics,
  saveCareerProfile,
  uploadBackgroundImage,
  uploadProfileImage,
  getOrganizationApi,
} from "../services/universal.service.js";
import Swal from "sweetalert2";

/* ------------------------------------------------
   Default query settings for all universal hooks
---------------------------------------------------*/
export const defaultOptions = {
  staleTime: 1000 * 60 * 60, // 1 hour
  cacheTime: 1000 * 60 * 60 * 2, // 2 hours
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  retry: false, // IMPORTANT for 429
};

/* ------------------------------------------------
   BASIC UNIVERSAL DATA
---------------------------------------------------*/

export const useGenders = () =>
  useQuery({
    queryKey: ["genders"],
    queryFn: getGenders,
    ...defaultOptions,
  });

export const useMaritalStatuses = () =>
  useQuery({
    queryKey: ["maritalStatuses"],
    queryFn: getMaritalStatuses,
    ...defaultOptions,
  });

export const useCountries = () =>
  useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
    ...defaultOptions,
  });

export const useCitizenship = () =>
  useQuery({
    queryKey: ["citizenship"],
    queryFn: getCitizenship,
    ...defaultOptions,
  });

export const useRegions = () =>
  useQuery({
    queryKey: ["regions"],
    queryFn: getRegions,
    ...defaultOptions,
  });

export const useIndustry = () =>
  useQuery({
    queryKey: ["industry"],
    queryFn: getIndustry,
    ...defaultOptions,
  });

export const usePosition = () =>
  useQuery({
    queryKey: ["position"],
    queryFn: getPosition,
    ...defaultOptions,
  });

export const usePositionLevel = () =>
  useQuery({
    queryKey: ["positionLevel"],
    queryFn: getPositionLevel,
    ...defaultOptions,
  });

export const useJobTypes = () =>
  useQuery({
    queryKey: ["jobTypes"],
    queryFn: getJobTypes,
    ...defaultOptions,
  });

export const usePackagePrice = () =>
  useQuery({
    queryKey: ["packagePrice"],
    queryFn: getPackagePrice,
    ...defaultOptions,
  });

/* ------------------------------------------------
   SKILLS & TOOLS
---------------------------------------------------*/

export const useTool = () =>
  useQuery({
    queryKey: ["tool"],
    queryFn: getTool,
    ...defaultOptions,
  });

export const useOrganization = () => {
  return useQuery({
    queryKey: ["organization"],
    queryFn: getOrganizationApi,
    ...defaultOptions,
  });
};
/* ------------------------------------------------
   EXPERIENCE / EMPLOYMENT
---------------------------------------------------*/

export const useEmployer = () =>
  useQuery({
    queryKey: ["employer"],
    queryFn: getEmployer,
    ...defaultOptions,
  });

/* ------------------------------------------------
   SALARY & STATISTICS
---------------------------------------------------*/

export const useSalaryRange = () =>
  useQuery({
    queryKey: ["salaryRange"],
    queryFn: getSalaryRange,
    ...defaultOptions,
  });

export const useSiteStatistics = () =>
  useQuery({
    queryKey: ["siteStatistics"],
    queryFn: getSiteStatistics,
    ...defaultOptions,
  });

export const useSaveCareerProfile = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveCareerProfile,

    onSuccess: (data, variables, context) => {
      // refresh applicant profile
      queryClient.invalidateQueries(["applicant-profile"]);

      options.onSuccess?.(data, variables, context);
    },

    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again.",
        icon: "error",
      });
    },
  });
};

export const useSaveBackgroundImage = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadBackgroundImage,
    onSuccess: (data, variables, context) => {
      // Refresh profile-related data if needed
      queryClient.invalidateQueries({ queryKey: ["applicantProfile"] });

      options.onSuccess?.(data, variables, context);
    },
    onError: (error) => {
      options.onError?.(error);
    },
  });
};

export const useSaveProfileImage = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: (data, variables, context) => {
      // Refresh applicant profile after image update
      queryClient.invalidateQueries({ queryKey: ["applicantProfile"] });

      options.onSuccess?.(data, variables, context);
    },
    onError: (error) => {
      options.onError?.(error);
    },
  });
};

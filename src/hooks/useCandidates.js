import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  // ========= FETCHERS =========
  fetchCvProfile,
  fetchApplicantProfile,
  fetchApplicantPipeline,
  fetchCompleteProfile,
  fetchJobCompleteProfile,
  fetchPrimaryData,
  fetchFeaturedJobSeeker,
  fetchSubscriptionStatus,
  fetchDashboardStatistics,
  fetchSavedJobs,

  // ========= MUTATIONS =========
  applyJobInternal,
  createSubscription,
  uploadProfileImage,
  uploadBackgroundImage,

  // ========= DELETES =========

  // extra endpoint you already had
  trackViewCount,
  saveJob,
  welcomeNoteApi,
  updateWelcomeNoteApi,
} from "../services/employee.service.js";

// ===============================
//            QUERIES
// ===============================

export const useCvProfile = (uuid) =>
  useQuery({
    queryKey: ["cv_profile", uuid],
    queryFn: () => fetchCvProfile(uuid),
    enabled: !!uuid,
    staleTime: 5 * 60 * 1000,
  });

export const useApplicantProfile = () => {
  const applicant_id = localStorage.getItem("applicantId");

  return useQuery({
    queryKey: ["applicant_profile", applicant_id],
    queryFn: () => fetchApplicantProfile(applicant_id),
    enabled: !!applicant_id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useApplicantPipeline = () => {
  const applicant_id = localStorage.getItem("applicantId");

  return useQuery({
    queryKey: ["applicant_pipeline", applicant_id],
    queryFn: () => fetchApplicantPipeline(applicant_id),
    enabled: !!applicant_id,
  });
};

export const useCompleteProfile = () => {
  const applicant_id = localStorage.getItem("applicantId");

  return useQuery({
    queryKey: ["complete_profile", applicant_id],
    queryFn: () => fetchCompleteProfile(applicant_id),
    enabled: !!applicant_id,
  });
};

export const useJobCompleteProfile = () => {
  const applicant_id = localStorage.getItem("applicantId");

  return useQuery({
    queryKey: ["job_complete_profile", applicant_id],
    queryFn: () => fetchJobCompleteProfile(applicant_id),
    enabled: !!applicant_id,
  });
};

export const usePrimaryData = () => {
  const applicant_id = localStorage.getItem("applicantId");

  return useQuery({
    queryKey: ["primary_data", applicant_id],
    queryFn: () => fetchPrimaryData(applicant_id),
    enabled: !!applicant_id,
  });
};

export const useFeaturedJobSeeker = () =>
  useQuery({
    queryKey: ["featured_job_seekers"],
    queryFn: fetchFeaturedJobSeeker,
    staleTime: 10 * 60 * 1000,
  });

export const useSubscriptionStatus = () => {
  const applicant_id = localStorage.getItem("applicantId");

  return useQuery({
    queryKey: ["subscription_status", applicant_id],
    queryFn: () => fetchSubscriptionStatus(applicant_id),
    enabled: !!applicant_id,
  });
};

export const useDashboardStatistics = () => {
  const applicant_id = localStorage.getItem("applicantId");

  return useQuery({
    queryKey: ["dashboardStatistics", applicant_id],
    queryFn: () => fetchDashboardStatistics(applicant_id),
    enabled: !!applicant_id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetSavedJobs = () => {
  const applicant_id = localStorage.getItem("applicantId");

  return useQuery({
    queryKey: ["saved_jobs", applicant_id],
    queryFn: () => fetchSavedJobs(applicant_id),
    enabled: !!applicant_id,
    staleTime: 1000 * 60 * 3,
  });
};

export const useWelcomeNote = () => {
  const applicant_id = localStorage.getItem("applicantId");

  return useQuery({
    queryKey: ["welcome_note", applicant_id],
    queryFn: () => welcomeNoteApi(applicant_id),
    enabled: !!applicant_id,
  });
};

// ===============================
//           MUTATIONS
// ===============================

// SAVE JOBS
export const useSaveJob = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data) => saveJob(data),

    onSuccess: () => {
      // Invalidate any query that needs refreshing after saving a job
      qc.invalidateQueries({ queryKey: ["primary_data"] });
      qc.invalidateQueries({ queryKey: ["saved_jobs"] }); // Optional: refresh saved jobs
    },
  });
};

export const useCreateSubscription = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createSubscription,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["subscription_status"] });
    },
  });
};

export const useUploadProfileImage = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["applicant_profile"] });
    },
  });
};

export const useUploadBackgroundImage = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: uploadBackgroundImage,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["applicant_profile"] });
    },
  });
};

export const useApplyJobInternal = (options = {}) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: applyJobInternal,

    // RUN YOUR CUSTOM CALLBACK FIRST
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);

      // THEN RUN INTERNAL INVALIDATION LOGIC
      qc.invalidateQueries({ queryKey: ["applicant_pipeline"] });
    },

    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },
  });
};

export const useViewCount = () => {
  return useMutation({
    mutationFn: trackViewCount,
  });
};

export const useUpdateWelcomeNote = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (applicantId) => updateWelcomeNoteApi(applicantId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["welcome_note"] });
    },
  });
};

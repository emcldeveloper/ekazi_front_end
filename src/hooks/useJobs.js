import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchJobsApi,
  fetchFeaturedJobsApi,
  getAppliedJobsApi,
  getJobsMatchApi,
  fetchJobDetailApi,
  getJobMatchData,
  jobIncrementApi,
  interviewResponseApi,
  offerResponseApi,
} from "../services/job.service.js";
import { jobEmailApplicationApi } from "../services/jobs/job-application.service.js";

export const useJobs = ({ limit = 12, page = 1 }) => {
  return useQuery({
    queryKey: ["jobs", { limit, page }],
    queryFn: () => fetchJobsApi({ limit, page }),
    keepPreviousData: true,
  });
};

export const useFeaturedJobs = ({ page = 1 }) => {
  return useQuery({
    queryKey: ["featured-jobs", page],
    queryFn: () => fetchFeaturedJobsApi({ page }),
    keepPreviousData: true,
  });
};

export const useAppliedJobs = () => {
  const applicant_id = localStorage.getItem("applicantId");

  return useQuery({
    queryKey: ["applied-jobs", applicant_id],
    queryFn: () => getAppliedJobsApi({ applicant_id }),
    enabled: !!applicant_id,
  });
};

export const useJobMatch = () => {
  const applicant_id = localStorage.getItem("applicantId");

  return useQuery({
    queryKey: ["job-match", applicant_id],
    queryFn: () => getJobsMatchApi({ applicant_id }),
    enabled: !!applicant_id,
  });
};

export const useJobDetail = (jobId) => {
  return useQuery({
    queryKey: ["job-detail", jobId],
    queryFn: () => fetchJobDetailApi(jobId),
    enabled: !!jobId,
  });
};

// ---- Job Comparison Match When Applying ----
export const useJobMatchData = () => {
  const jobId = localStorage.getItem("jobId");
  const applicantId = localStorage.getItem("applicantId");

  return useQuery({
    queryKey: ["jobMatchData", applicantId, jobId],
    queryFn: () => getJobMatchData(applicantId, jobId),
    enabled: !!applicantId && !!jobId,
  });
};

export const useJobIncrement = (jobId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => jobIncrementApi({ job_id: jobId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-detail", jobId] });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};

export const useApplicationByEmail = () => {
  return useMutation({
    mutationFn: jobEmailApplicationApi,
  });
};

// Interview response hook
export const useInterviewResponse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: interviewResponseApi,

    onSuccess: () => {
      // refresh applications list
      queryClient.invalidateQueries({ queryKey: ["applied-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job-detail"] });
    },
  });
};

// Offer response hook
export const useOfferResponse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: offerResponseApi,

    onSuccess: () => {
      // refresh applications list
      queryClient.invalidateQueries({ queryKey: ["applied-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job-detail"] });
    },
  });
};

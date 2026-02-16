import api from "../lib/axios.js";

// ---- Fetch paginated jobs for infinite scroll ----
export const fetchJobsApi = async ({ limit = 12, page = 1 }) => {
  const res = await api.get("/jobs", { params: { limit, page } });
  return res.data.data || [];
};

// ---- Featured Jobs ----
export const fetchFeaturedJobsApi = async ({ page = 1 }) => {
  const res = await api.get(`/applicant/featuredJobs`, {
    params: { limit: 10, page },
  });

  return {
    list: res.data.data,
    hasMore: res.data.data.length > 0,
  };
};

// ---- Applied Jobs ----
export const getAppliedJobsApi = async ({ applicant_id }) => {
  const res = await api.get(`/applicant/appliedjob`, {
    params: { applicant_id },
  });
  return res.data;
};

// ---- Job Match ----
export const getJobsMatchApi = async ({ applicant_id }) => {
  const res = await api.get(`/applicant/job_match`, {
    params: { applicant_id },
  });
  return res.data;
};

// ---- Job Details ----
export const fetchJobDetailApi = async (jobId) => {
  const res = await api.get(`/jobdetail/${jobId}`);
  return res.data;
};

// ---- Job Comparison Match When Applying ----
export const getJobMatchData = async (applicantId, jobId) => {
  const res = await api.get(`/applicant/jobmatchData/${applicantId}/${jobId}`);

  return res.data;
};

// ---- Job Match ----
export const jobIncrementApi = async ({ job_id }) => {
  const res = await api.post(`/applicant/jobView`, {
    job_id,
  });
  return res.data;
};

// ---- Job Interview ----
export const interviewResponseApi = async ({
  id,
  status,
  reason,
  reschedule_date,
}) => {
  const res = await api.post(`/applicant/interview/response`, {
    id,
    status,
    reason,
    reschedule_date,
  });
  return res.data;
};

export const offerResponseApi = async ({ id, status, reason }) => {
  const res = await api.post(`/applicant/offer/response`, {
    id,
    status,
    reason,
  });
  return res.data;
};

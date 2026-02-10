import api from "../lib/axios.js";

// =====================
//        FETCHERS
// =====================

export const fetchCvProfile = async (uuid) => {
  const res = await api.get(`/cv/cv_builder/${uuid}`);
  return res.data;
};

export const fetchApplicantProfile = async (applicant_id) => {
  const res = await api.get("/applicant/profile", {
    params: { applicant_id },
  });
  return res.data;
};

export const fetchSavedJobs = async (applicant_id) => {
  const res = await api.get("/applicant/getcartJobs", {
    params: { applicant_id },
  });
  return res.data;
};

export const fetchApplicantPipeline = async (applicant_id) => {
  const res = await api.get(`/applicant/applicantpipeline/${applicant_id}`);
  return res.data?.applicant_pipeline;
};

export const fetchCompleteProfile = async (applicant_id) => {
  const res = await api.get(`/applicant/complete/${applicant_id}`, {
    params: { applicant_id },
  });
  return res.data;
};

export const fetchJobCompleteProfile = async (applicant_id) => {
  const res = await api.get(`/applicant/checkProfileForJob/${applicant_id}`, {
    params: { applicant_id },
  });
  return res.data;
};

export const fetchPrimaryData = async (applicant_id) => {
  const res = await api.get(`/applicant/primarydata/${applicant_id}`, {
    params: { applicant_id },
  });
  return res.data;
};

export const fetchFeaturedJobSeeker = async () => {
  const res = await api.get(`/applicant/feacture-candidate`);
  return res.data.data;
};

export const fetchSubscriptionStatus = async (applicant_id) => {
  const res = await api.get(
    `/applicant/accountsubscriptionStatus/${applicant_id}`,
  );
  return res.data?.verification_status ?? null;
};

export const fetchDashboardStatistics = async (applicant_id) => {
  const res = await api.get(`/applicant/dashboardstatistics/${applicant_id}`);
  return res.data;
};

export const welcomeNoteApi = async (applicant_id) => {
  const res = await api.get(`/applicant/wellcomeNote/${applicant_id}`);
  return res.data;
};

// =====================
//       MUTATIONS
// =====================

export const createReferee = async (data) => {
  const res = await api.post("/applicant/refereestore", data);
  return res.data;
};

export const applyJobInternal = async (data) => {
  const res = await api.post("/applicant/jobInternalApplication", data);
  return res.data;
};

export const updateProficiency = async (data) => {
  const res = await api.put("/applicant/updateproficiency", data);
  return res.data;
};

export const updateReferee = async (data) => {
  const res = await api.put("/applicant/updatereferee", data);
  return res.data;
};

export const updateEducation = async (data) => {
  const res = await api.put("/applicant/updateeducation", data);
  return res.data;
};

export const createCulture = async (data) => {
  const res = await api.post("/applicant/culturestore", data);
  return res.data;
};

export const createKnowledge = async (data) => {
  const res = await api.post("/applicant/knowledgestore", data);
  return res.data;
};

export const createSoftware = async (data) => {
  const res = await api.post("/applicant/softwarestore", data);
  return res.data;
};

export const createExperience = async (data) => {
  const res = await api.post("/applicant/experiencestore", data);
  return res.data;
};

export const createSubscription = async (data) => {
  const res = await api.post("/applicant/accountsubscription", data);
  return res.data;
};

export const uploadProfileImage = async (formData) => {
  const res = await api.post("/applicant/profileimagesave", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const uploadBackgroundImage = async (formData) => {
  const res = await api.post("/applicant/backgroundimagesave", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const saveJob = async (data) => {
  const res = await api.post("/applicant/cartJobs", data);
  return res.data;
};

export const updateWelcomeNoteApi = async (applicantId) => {
  const res = await api.put("/applicant/OfficialNote", null, {
    params: { id: applicantId },
  });
  return res.data;
};

// =====================
//       DELETE
// =====================

export const deleteReferee = async (id) => {
  const res = await api.delete(`/applicant/refereedelete/${id}`);
  return res.data;
};

export const deleteTraining = async (id) => {
  const res = await api.delete(`/applicant/trainingdelete/${id}`);
  return res.data;
};

export const deleteProficiency = async (id) => {
  const res = await api.delete(`/applicant/deleteproficiency/${id}`);
  return res.data;
};

export const deleteEducation = async (id) => {
  const res = await api.delete(`/applicant/deleteeducation/${id}`);
  return res.data;
};

export const deleteExperience = async (id) => {
  const res = await api.delete(`/applicant/deleteexperience/${id}`);
  return res.data;
};

// Extra endpoint
export const trackViewCount = async (data) => {
  const res = await api.post("/applicant/trackviewcount", data);
  return res.data;
};

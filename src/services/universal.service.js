import api from "../lib/axios.js";

/* --- BASIC UNIVERSAL DATA --- */

export const getGenders = async () => {
  const res = await api.get("/universal/gender");
  return res.data.gender;
};

export const getMaritalStatuses = async () => {
  const res = await api.get("/universal/marital");
  return res.data.marital;
};

export const getCountries = async () => {
  const res = await api.get("/universal/country");
  return res.data.country;
};

export const getCitizenship = async () => {
  const res = await api.get("/universal/citizenship");
  return res.data.citizenship;
};

export const getRegions = async () => {
  const res = await api.get("/universal/regions");
  return res.data.region;
};

export const getIndustry = async () => {
  const res = await api.get("/universal/industry");
  return res.data.industry;
};

export const getPosition = async () => {
  const res = await api.get("/universal/position");
  return res.data;
};

export const getPositionLevel = async () => {
  const res = await api.get("/universal/position_level");
  return res.data.position_level;
};

export const getJobTypes = async () => {
  const res = await api.get("/universal/job-type");
  return res.data.type;
};

export const getPackagePrice = async () => {
  const res = await api.get("/universal/employer/packages");
  return res.data.data;
};

/* --- COURSE, MAJOR, SCHOOL DATA --- */

/* --- LANGUAGE DATA --- */

/* --- SKILLS & TOOLS DATA --- */

export const getTool = async () => {
  const res = await api.get("/applicant/tool");
  return res.data.tool;
};

/* --- CULTURE --- */

/* --- EXPERIENCE / EMPLOYERS --- */

export const getEmployer = async () => {
  const res = await api.get("/applicant/applicant_employer");
  return res.data.data;
};

/* --- SALARY / STATS --- */

export const getSalaryRange = async () => {
  const res = await api.get("/applicant/salary_range");
  return res.data.salary_range;
};

export const getSiteStatistics = async () => {
  const res = await api.get("/site-statistics");
  return res.data;
};

export const saveCareerProfile = async ({ applicant_id, career }) => {
  const response = await api.put(
    `/applicant/storecareerobjective/${applicant_id}`,
    { career }
  );
  return response.data;
};

export const saveTraining = async (formData) => {
  const response = await api.post("applicant/storetraining", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  return response.data;
};

export const uploadBackgroundImage = async (formData) => {
  const res = await api.post("/applicant/backgroundimagesave", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  return res.data;
};

export const uploadProfileImage = async (formData) => {
  const res = await api.post("/applicant/profileimagesave", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  return res.data;
};

export const getOrganizationApi = async () => {
  const res = await api.get("/applicant/organization");
  return res.data.organization;
};

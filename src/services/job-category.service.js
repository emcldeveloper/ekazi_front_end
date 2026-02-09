import api from "../lib/axios.js";

// Get job count grouped by region
export const fetchJobCountByRegion = async () => {
  const { data } = await api.get("job-count-by-region");
  return data;
};

// Get job category summary
export const fetchJobCategorySummary = async () => {
  const { data } = await api.get("job-category-summary");
  return data;
};

// Get clients job count grouped by industry
export const fetchClientsJobCountByIndustry = async () => {
  const { data } = await api.get("clients-job-count-by-industry");
  return data;
};

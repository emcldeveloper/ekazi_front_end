import { useQuery } from "@tanstack/react-query";
import {
  fetchJobCountByRegion,
  fetchJobCategorySummary,
  fetchClientsJobCountByIndustry,
} from "../services/job-category.service.js";

// Get job count by region
export const useJobCountByRegion = () => {
  return useQuery({
    queryKey: ["job-count-by-region"],
    queryFn: fetchJobCountByRegion,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

// Get job category summary
export const useJobCategorySummary = () => {
  return useQuery({
    queryKey: ["job-category-summary"],
    queryFn: fetchJobCategorySummary,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

// Get clients job count by industry
export const useClientsJobCountByIndustry = () => {
  return useQuery({
    queryKey: ["clients-job-count-by-industry"],
    queryFn: fetchClientsJobCountByIndustry,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

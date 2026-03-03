import { useMutation, useQuery } from "@tanstack/react-query";
import { createInsightApi, getSalaryApi } from "../services/calculator.service";

/**
 * POST: Increment applicant view
 */
export const useCreateInsight = () => {
  return useMutation({
    mutationFn: (payload) => createInsightApi(payload),
  });
};

/**
 * GET: Salary Calculator
 */
export const useGetSalary = () => {
  return useQuery({
    queryKey: ["salary-calculator"],
    queryFn: getSalaryApi,
  });
};
